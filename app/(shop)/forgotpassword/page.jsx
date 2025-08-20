
"use client";
import OtpModal from "@/app/components/otp/OtpModal";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import ApiCall from "@/app/util/ApiCall";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { performPost } = ApiCall();
  const [sendOtpEmail, setSendOtpEmail] = useState("");

  const onSubmit = async (data) => {
    try {
      const id = toast.loading("Please wait...");
      const response = await performPost(`api/v1/password/otp-mail`, data);
      if (response.success) {
        toast.update(id, {
          render: response.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setSendOtpEmail(data.email);
        document.getElementById("otp_modal").showModal();
      } else {
        toast.update(id, {
          render: "Email is not registered",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [switchPassword, setSwitchPassword] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");

  const resetPasswordHandler = (email, otp) => {
    if (email && otp) {
      setSwitchPassword(true);
      setOtpEmail(email);
      setOtp(otp);
    }
  };

  return (
    <>
      <div className="my-container lg:max-w-xl mx-auto top-bottom-margin flex flex-col justify-center gap-4">
        <div className="flex flex-col items-center gap-1 xl:gap-4">
          <h2 className="font-staatliches text-black text-xl lg:text-5xl">
            Forgot your password!
          </h2>
          <p className="font-roboto text-center font-medium capitalize text-sub-work-card text-sm xl:text-xl xl:font-normal">
            instructions to reset your password will be sent you. please check your email
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email}
            notRequired={true}
          />
          <div className="mt-3 flex items-center justify-center">
            <Button name={"Submit"} type={"submit"} />
          </div>
        </form>


        <p className="font-roboto text-xs lg:text-sm font-normal text-title-work-card">
          By continuing you agree to our{" "}
          <Link className="text-[#1599D2] underline" href="/#">
            Terms and Conditions,
          </Link>
          our{" "}
          <Link className="text-[#1599D2] underline" href="/#">
            Privacy Policy,
          </Link>{" "}
          and the MatchMyTees
          <Link className="text-[#1599D2] underline" href="/#">
            {" "}
            Program Terms.
          </Link>
        </p>
        <hr className="border-[#7F7F7F] w-full" />
        <h3 className="font-roboto text-sm font-normal text-title-work-card">
          Don’t have an account?{" "}
          <Link className="text-[#1599D2] underline" href="/sign-up">
            Create an account
          </Link>{" "}
          or Sigin your existing account{" "}
          <Link className="text-[#1599D2] underline" href="/sign-in">
            Sign in
          </Link>
        </h3>
      </div>
      
        <OtpModal
          sendOtpEmail={sendOtpEmail}
          type="ResetPassword"
          resetPasswordHandler={resetPasswordHandler}
        />
      
    </>
  );
};


export default ForgotPasswordPage;
