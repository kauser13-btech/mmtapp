"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DaisyModal from "../global/modal/DaisyModal";
import Input from "../ui/Input";
import ApiCall from "@/app/util/ApiCall";
import { useForm } from "react-hook-form";
import { useRouter } from 'next-nprogress-bar';
import { toast } from "react-toastify";

const OtpModal = ({ modalHandle, sendOtpEmail, type }) => {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [resend, setResend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { performPost } = ApiCall();
  const router = useRouter();

  const handleRequestForOTP = async (data) => {
    if (sendOtpEmail === "") {
      return toast.error('something went wrong with otp email', {
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
        })
    } else {
      const formData = {
        email: sendOtpEmail,
        otp: data.otp,
      };

      const id = toast.loading("Please wait...");
      let response;
      try {
        if (type === "ResetPassword") {
          response = await performPost(`api/v1/otp-validate`, formData);
        } else {
          response = await performPost(`api/v1/email-verify`, formData);
        }
        if (response.success) {
          if (type === "ResetPassword") {
            localStorage.setItem(
              "resetPasswordData",
              JSON.stringify({
                email: sendOtpEmail,
                otp: data.otp,
              })
            );

            toast.update(id, {
              render: response.message,
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            // Delay the redirection and modal closing after the toast is updated
            setTimeout(() => {
              router.push("/resetpassword");
              handleModalClose();
            }, 0);
          } else {
            toast.update(id, {
              render: response.message,
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            // Delay the redirection and modal closing after the toast is updated
            setTimeout(() => {
              router.push("/sign-in");
              handleModalClose();
            }, 0);
          }
        } else {
          setError("otp", {
            type: "manual",
            message: "Otp is not valid. Please check the code.",
          });
        }
      } catch (error) {
        console.error("Error while handling OTP request:", error);
      }
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(countdown);
        // Perform any actions you want when the timer reaches 0, e.g., show an error message, close the modal, etc.
        setResend(true);
      }
    }, 1000);

    // Clear the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const handleModalClose = () => {
    document.getElementById("otp_modal").close();
  };

  const resendOtpCode = async () => {
    const formData = {
      email: sendOtpEmail,
    };
    const id = toast.loading("Please wait...");
    let response;
    if (type === "ResetPassword") {
      response = await performPost(`api/v1/password/otp-mail`, formData);
    } else {
      response = await performPost(`api/v1/verify-email-otp`, formData);
    }

    if (response.success) {
      toast.update(id, {
        render: response.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setResend(false);
      setMinutes(3);
      setSeconds(0);
      setError("otp", {
        type: "manual",
        message: "",
      });
    } else {
      toast.update(id, {
        render: "Please register as new user.",
        type: "warning",
        isLoading: false,
        autoClose: 3000,
      });
      router.push("/sign-up");
    }
  };

  return (
    <DaisyModal
      onClick={modalHandle}
      modalId="otp_modal"
      type="otp"
      background="bg-white max-w-[905px] h-fit p-4 sm:h-[328px] p-0 overflow-hidden flex "
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[685px]  m-auto">
        <img
          src={"/images/otp/otp.svg"}
          width={176}
          height={176}
          className="w-24 md:w-[176px]"
        />
        <div className="sm:ml-12">
          <p className="font-semi text-black text-xl mt-4 sm:text-3xl ">
            {type == "ResetPassword"
              ? "Two-factor authentication"
              : "Verify your email"}
          </p>
          <p className="text-black mt-2 ">
            A verification code has been sent to your email. This code will be
            valid for {minutes} minute{minutes !== 1 && "s"} and {seconds}{" "}
            second
            {seconds !== 1 && "s"}.
          </p>{" "}
          {resend ? (
            <button
              className="text-sm mt-4 text-black hover:underline"
              onClick={(e) => resendOtpCode()}
            >
              Resend OTP
            </button>
          ) : (
            <button className="text-gray-200 text-sm mt-4 underline" disabled>
              Resend OTP
            </button>
          )}
          <form onSubmit={handleSubmit(handleRequestForOTP)}>
            <div className=" sm:relative">
              <div className="w-full sm:w-80">
                <Input
                  name={"otp"}
                  type={"number"}
                  placeholder={"OTP code"}
                  register={register}
                  notRequired={true}
                  error={errors.otp}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full sm:mt-0 sm:absolute sm:w-fit sm:right-10 sm:top-0 btn bg-orange-primary text-white font-medium hover:bg-yellow-primary hover:text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </DaisyModal>
  );
};
export default OtpModal;
