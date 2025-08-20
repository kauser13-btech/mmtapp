"use client";
import React, { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import Cookies from "js-cookie";
import Link from "next/link";
import { useUserName } from "@/app/context/UserNameContext";
import { useCloset } from "@/app/context/ClosetContex";
import OtpModal from "../otp/OtpModal";
import ApiCall from "@/app/util/ApiCall";

const Form = ({ type, handleSignInModal }) => {
  const { getClosetData } = useCloset();
  const [isClickLogin, setIsClickLogin]= useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { updateUser } = useUserName();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.getElementById("otp_modal").showModal();
    }
  }, [showModal]);

  const handleModalOpen = () => {
    setShowModal(true);
    document.getElementById("otp_modal").showModal();
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.getElementById("otp_modal").close();
  };
  const [otpEmail, setOtpEmail] = useState("");

  const { performPost } = ApiCall();

  const onSubmit = async (data) => {
    // try {
    const id = toast.loading("Please wait...",{position: "top-right"});
    setIsClickLogin(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      // Save token and name into cookies
      Cookies.set("mmt_user_session", responseData.authorisation.token);
      Cookies.set("mmt_user_name", responseData.user.name);
      Cookies.set("mmt_user_id", responseData.user.id);
      updateUser();
      getClosetData(); 
      toast.update(id, {
        render: "Successfully login!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-right"
      });
      if (type == "signInModal") {
        document.getElementById("sign-in-modal-in-search").close();
      } else {
        router.push("/user/dashboard");
      }
    } else if (response.status === 401) {
      const responseData = await response.json();
      setIsClickLogin(false);
      if (responseData.status === "email_verification_error") {
        toast.update(id, {
          render: responseData.message,
          type: "warning",
          isLoading: false,
          autoClose: 2000,
          position: "top-right"
        });
        const id_email = toast.loading("Please wait...",{position: "top-right"});
        const formData = {
          email: data.email,
        };
        setOtpEmail(data.email);
        const response = await performPost(`api/v1/verify-email-otp`, formData);
        toast.update(id_email, {
          render: "Please check your email for otp code",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          position: "top-right"
        });
        handleModalOpen();
      } else if (responseData.status === "error") {
        setIsClickLogin(false);
        toast.update(id, {
          render: "Please provide correct credential",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          position: "top-right"
        });
      }
    } else {
      console.log("API Request Failed");
      setIsClickLogin(false);
      toast.update(id, {
        render: "Please provide correct credential",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "top-right"
      });
    }
    // } catch (err) {
    // }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col gap-10"
      >
        <div className="flex items-center flex-col gap-4 w-full">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email}
            notRequired={true}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            error={errors.password}
            isForgot={true}
            notRequired={true}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button name="Login" type="submit" disable={isClickLogin}/>
          <h3 className="font-roboto text-sm md:font-medium text-sub-work-card md:text-base">
            New customer?{" "}
            <Link className="underline" href="/sign-up">
              Create an account
            </Link>
          </h3>
        </div>
      </form>

      <OtpModal modalHandle={handleModalClose} sendOtpEmail={otpEmail} />
    </>
  );
};

export default Form;
