import { useCart } from "@/app/context/CartContext";
import ApiCall from "@/app/util/ApiCall";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import SelectSecondary from "../ui/SelectSecondary";
import CheckoutMessage from "./components/CheckoutMessage";
import { toast } from "react-toastify";
import { useUserName } from "@/app/context/UserNameContext";

import useOtpToSendData from "@/app/hooks/checkout/useOtpToSendData";
import OtpModalCheckout from "../otp/register/OtpModalCheckout";
import PasswordModalCheckout from "../otp/register/PasswordModalCheckout";
import ProductViewMobile from "./ProductViewMobile";
const CustomerInfo = ({ adjustTaxPrice, additionalPrice, loadingStarted, loading }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [checkoutFormData, setCheckoutFormData] = useState({});
  const [countryIndex, setCountryIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(checkoutFormData.country_name || "");
  const [selectedState, setSelectedState] = useState(checkoutFormData.state_name || "");
  const [errorsHandle, setErrorsHandle] = useState([]);
  const [isClickedPaymentBtn, setIsClickedPaymentBtn] = useState(false);
  const localStorageKey = 'checkoutFormData';
  const { fetchCartData } = useCart();
  const { getUser } = useUserName();
  const router = useRouter();

  const onSubmit = async (formData) => {
    const token = Cookies.get("cart-token");
    setIsClickedPaymentBtn(true);
    if (!token) {
      setIsClickedPaymentBtn(false);
      toast.warn("Please add a product into cart!", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return;
    }

    const shippingForm = {
      ...formData,
      cart: token,
      shipping_type: "STANDARD",
      country_name: selectedCountry,
      state_name: selectedState,
      country_code: countryCode,
      state_code: stateCode,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(shippingForm));
    setCheckoutFormData(shippingForm);
    const status = Cookies.get("status");
    if (!loading) {
      const response = await performPost("shipping-address", shippingForm);
      setIsClickedPaymentBtn(true);
      if (response.success) {

        if (registerUser) {
          const registerFormData = {
            name: formData.name,
            email: formData.email,
            status: 0,
            phone: formData.phone,
          };
          // return console.log(registerFormData);
          const res = await performPost(
            `api/v1/create-dummy-user`,
            registerFormData
          );

          if (res.success) {
            console.log('hi', res.message);
            toast.success("Otp mail has been sent successfully", {
              autoClose: 3000,
              hideProgressBar: true,
              pauseOnHover: true,
            });

            Cookies.set("email", res.data.email);

            Cookies.set("status", "checkout complete");
            handleModalOpen()

          } else {
            toast.warning(
              res.message + " Redirecting to payment page. Please wait.",
              {
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: true,
              }
            );
            setTimeout(() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pay/${shippingForm.cart}`;
            }, 3000);
          }
        } else {
          window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pay/${shippingForm.cart}`;
          toast.success("Redirecting to payment page. Please wait.", {
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
          });
        }
      } else if (response.message) {
        if(!response?.errors){
          toast.error(response.message, {
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
          });
        }else{

          setErrorsHandle(response.errors);
        }
        setIsClickedPaymentBtn(false);
      }
    } else {
      toast.warn("Calculating your total cost, please wait!", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
      });
    }
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [zip, setZip] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    getCountryDetail();
  }, []);

  useEffect(() => {
    setCheckoutFormData(JSON.parse(localStorage.getItem('checkoutFormData')) || {});
  }, []);

  const handleCountryOption = (index) => {
    if (index !== "") {
      setCountryIndex(index);
      setStates(countries[index].states);
      setSelectedCountry(countries[index].name);
      setCountryCode(countries[index].code);
    } else {
      setStates([]);
    }
  };

  const handleStateOption = (name) => {
    setSelectedState(countries[countryIndex].states[name].name);
    setStateCode(countries[countryIndex].states[name].code);
  };

  const { performGet, performPost } = ApiCall();

  const getCountryDetail = async () => {
    const response = await performGet("api/v1/countries");
    if (response.code === 200) {
      const countries = response.result.filter(
        (country) => country.name === "United States" || country.name === "Canada"
      );
      setCountries(countries);
    }
  };

  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  const handleTaxCalculation = (value) => {
    adjustTaxPrice(value);
  };

  const fetchTaxCalculation = () => {
    const token = Cookies.get("cart-token");
    if (!token) {
      setIsClickedPaymentBtn(false);
      console.log("token not exist");
      return;
    }
    if (countryCode && stateCode && zip !== "") {
      loadingStarted(true);
      const taxData = {
        country_code: countryCode,
        state_code: stateCode,
        city: city,
        zip: zip,
        cart: token,
      };

      setTimeout(async () => {
        const response = await performPost("get-tax", taxData);
        if (response.success) {
          loadingStarted(false);
          handleTaxCalculation(response.data);
          setMessage("Tax, Shipping Cost & Delivery Estimation Added");
          setTypeMessage("success");
        } else {
          setMessage(response.message);
          setTypeMessage("alert");
          loadingStarted(false);
          setIsClickedPaymentBtn(false);
        }
      }, 3000);
    }
  };

  useEffect(() => {
    fetchTaxCalculation();
  }, [countryCode, stateCode, zip]);

  const onChangeZipHandle = (value) => {
    setZip(value);
  };
  const onChangeCityHandle = (value) => {
    setCity(value);
  };

  //checkout for user
  const [registerUser, setRegisterUser] = useState(false);

  const handleRegisterUser = () => {
    setRegisterUser((prevData) => !prevData);
  };





  const handleModalOpen = () => {
    document.getElementById("otp_checkout_modal").showModal();
  };

  // const handleModalClose = () => {
  //   setShowModal(false);
  //   document.getElementById("otp_modal").close();
  // };

  const [openPasswordModal, setOpenPasswordModal] = useState(false)


  const handlePasswordModal = (bool) => {
    setOpenPasswordModal(bool)
  }

  return (
    <>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col max-md:items-center gap-10 max-w-[665px] max-sm:p-4 py-12 px-[60px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] rounded-[13px]"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between font-roboto max-sm:flex-col max-sm:gap-2">
            <h3 className="text-sm font-medium md:font-semibold xl:text-base text-title-work-card">
              Contact Information
            </h3>
            {getUser == null && (
              <Link href={"/sign-in"} className="text-xs xl:text-sm">
                Have an account?{" "}
                <span className="underline text-[#0340DC] md:font-medium">
                  Log in
                </span>
              </Link>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <Input
              type={"text"}
              name={"email"}
              placeholder={"Email *"}
              register={register}
              error={errors.email}
              notRequired={true}
              validation={{pattern: {value: /^\S+@\S+$/i, message: "Please enter valid email address"}}}
            />
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Full Name *"}
              register={register}
              error={errors.name}
              notRequired={true}
            />
            <Input
              type={"tel"}
              name={"phone"}
              placeholder={"Phone *"}
              register={register}
              // error={errors.name}
              // notRequired={true}
            />
            <Input
              type={"text"}
              name={"company"}
              placeholder={"Company"}
              register={register}
            />
            <div className="flex items-center gap-10 max-sm:gap-4 max-sm:flex-wrap">
              {getUser == null && (<div>
                <input
                  type="checkbox"
                  id="newsAndOffer"
                  name="newsAndOffer"
                  onChange={handleRegisterUser}
                  className="checkbox [--chkbg:black] [--chkfg:white] size-4 rounded-sm"
                />
                <label
                  htmlFor="newsAndOffer"
                  className="text-sub-work-card text-sm font-medium xl:text-base ml-2"
                >
                  Register as user
                </label>
              </div>)}
              <div className="">
                {" "}
                <input
                  type="checkbox"
                  id="newsAndOffer"
                  name="newsAndOffer"
                  value="1"
                  className="checkbox [--chkbg:black] [--chkfg:white] size-4 rounded-sm"
                />
                <label
                  htmlFor="newsAndOffer"
                  className="text-sub-work-card text-sm font-medium xl:text-base ml-2"
                >
                  {" "}
                  Email me with news and offers
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-sm font-medium md:font-semibold xl:text-base text-title-work-card">
            Shipping Address
          </h3>
          <div className="flex flex-col gap-4">
            <Input
              type={"text"}
              name={"address1"}
              placeholder={"Address *"}
              register={register}
              error={errors.address1}
              notRequired={true}
              defaultValue={checkoutFormData.zip || ""}
            />
            <div className="flex flex-col gap-4">
              <Input
                type={"text"}
                name={"city"}
                placeholder={"City"}
                register={register}
                error={errors.city}
                notRequired={true}
                handleChange={onChangeCityHandle}
              />
              <div className="">
                <SelectSecondary
                  defaultValue={"Country/Region"}
                  name={"country_name"}
                  info={countries}
                  onSelectGetChange={handleCountryOption}
                  type={"countries"}
                  register={register}
                  error={errors.country_name}
                  notRequired={true}
                />
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <Input
                type={"text"}
                name={"zip"}
                placeholder={"Zip Code *"}
                register={register}
                handleChange={onChangeZipHandle}
                error={errors.zip}
                notRequired={true}
                validation={{minLength:{ value: 5, message: "Please enter 5 digit zip code"}, maxLength: { value: 5, message: "Please enter 5 digit zip code"}}}
              />
              <div className="w-full">
                {/* <label> </label> */}
                <SelectSecondary
                  defaultValue={"State"}
                  info={states}
                  name={"state_name"}
                  register={register}
                  onSelectGetChange={handleStateOption}
                  type={"state_name"}
                  error={errors.state_name}
                  notRequired={true}
                />
              </div>
            </div>
          </div>
        </div>
        <CheckoutMessage message={message} type={typeMessage} />
        <ProductViewMobile adjustTaxPrice={adjustTaxPrice} additionalPrice={additionalPrice} />
        <div className="flex items-center justify-center w-full">
          <button
            type=""
            className="btn bg-orange-primary hover:bg-orange-primary/80 active:bg-orange-primary/90 border-none *:text-white px-6 xl:px-8 disabled:bg-orange-primary text-xl md:!text-[2rem] !w-full !font-normal !font-staatliches uppercase"
          >
            {isClickedPaymentBtn ? (
              <span className="flex gap-3">
                Progress...{" "}
                <span className="loading loading-spinner loading-sm" />
              </span>
            ) : (
              <span>Continue to payment</span>
            )}
          </button>
        </div>
          <div className="text-xs xl:text-sm mt-[-30px]">
                By continuing the order you are accepting our <a  href={"/privacy"} target="_blank" className="underline text-[#0340DC] md:font-medium">Privacy Policy</a> , <a  href={"/return-refund"} target="_blank" className="underline text-[#0340DC] md:font-medium">Return & Refund Policy</a>. Do you have any question before you place an order? {" "}
                <a  href={"/support"} target="_blank" className="underline text-[#0340DC] md:font-medium">
                  Contact Us
                </a>
              </div>
      </form>
      <OtpModalCheckout modalHandle={handleModalOpen} handlePasswordModal={handlePasswordModal} />
      <PasswordModalCheckout />

    </>

  );
};

export default CustomerInfo;

