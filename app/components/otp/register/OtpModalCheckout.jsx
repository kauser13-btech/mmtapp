"use client";
import React, { useState, useEffect } from "react";
import ApiCall from "@/app/util/ApiCall";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Input from "@/app/components/ui/Input";
import DaisyModal from "@/app/components/global/modal/DaisyModal";
import useCountdownTimer from "@/app/hooks/checkout/useCountdownTimer";


const OtpModalCheckout = ({modalHandle,handlePasswordModal}) => {
    const { minutes, seconds, resend ,setMinutes,setResend,setSeconds} = useCountdownTimer();

    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm();
  
    const { performPost } = ApiCall();

    const OpenPassword = (bool) =>{
      handlePasswordModal(bool)
    }

    const handleRequestForOTP = async (data) => {
      const formData = {
        email: Cookies.get("email"),
        status: 1,
        otp: data.otp,
      };
     
      const id = toast.loading("Please wait...");
      const status = Cookies.get("status");
      try {
        const response = await performPost("api/v1/create-dummy-user", formData);
        if (response.success && response.data && status == "checkout complete") {
          toast.success(response.message, {
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
          });
          OpenPassword(true)
          Cookies.set("status", "otp complete");
          document.getElementById("otp_checkout_modal").close();
          document.getElementById("password_checkout_modal").showModal();
          setError("otp", {
            type: "manual",
            message: "",
          });
        } else {
          toast.error(response.message, {
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
          });
          setError("otp", {
            type: "manual",
            message: "Otp is not valid. Please check the code.",
          });
        }
        toast.dismiss(id);
      } catch (error) {
        toast.dismiss(id);
        console.error("Error while handling OTP request:", error);
      }
    };
    
    const resendOtpCode = async () => {
        const formData = {
          email: Cookies.get("email"),
        };
    
        const response = await performPost(
          `api/v1/verify-dummy-user-otp`,
          formData
        );
        console.log(response);
        if (response.success) {
          setResend(false);
          setMinutes(3);
          setSeconds(0);
          setError("otp", {
            type: "manual",
            message: "",
          });
        } else {
          toast.error(response.message, {
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
          });
        }
      };


  return (
    <DaisyModal
      onClick={modalHandle}
      modalId="otp_checkout_modal"
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
            Verify your email
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
            <div className="w-full sm:w-80 relative">
              <Input
                name={"otp"}
                type={"number"}
                placeholder={"OTP code"}
                register={register}
                notRequired={true}
                error={errors.otp}
              />
              <button
                type="submit"
                className="w-full absolute right-0 top-0 sm:w-fit btn bg-orange-primary text-white font-medium hover:bg-yellow-primary hover:text-black border-none"
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
export default OtpModalCheckout;
