"use client";
import React, { useState, useEffect } from "react";

import ApiCall from "@/app/util/ApiCall";
import { useForm } from "react-hook-form";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Input from "@/app/components/ui/Input";

const OtpPage = () => {
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
        router.push("/checkout/register/password");
        Cookies.set("status", "otp complete");

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

  useEffect(() => {
    const status = Cookies.get("status");
    if (status !== "checkout complete") {
      router.push("/");
    }
  }, []);

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
    <div className="my-[160px] ">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[685px] mx-auto max-sm:p-4 py-12 px-[60px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] rounded-[13px]">
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
          {!resend ? (
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
    </div>
  );
};
export default OtpPage;
