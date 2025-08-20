"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ApiCall from "@/app/util/ApiCall";

import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
import { useCart } from "@/app/context/CartContext";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

const PasswordModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  const { fetchCartData } = useCart();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { performPost } = ApiCall();
  const router = useRouter();

  useEffect(() => {
    const status = Cookies.get("status");
    if (status !== "otp complete") {
      router.push("/");
    }
  });

  const onSubmit = async (data) => {
    let loadingId = toast.loading("Please wait..."); // Initial loading toast id
    const token = Cookies.get("cart-token");
    if (data.password !== data.password2) {
      const message = "Passwords do not match";
      setErrorMessage(message);

      toast.update(loadingId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      setIsSubmitted(true);

      try {
        const formData = {
          email: Cookies.get("email"),
          password: data.password,
          confirm_password: data.password2,
          status: 2,
        };

        const response = await performPost(
          `api/v1/create-dummy-user`,
          formData
        );
        const status = Cookies.get("status");
        if (response.success && status == "otp complete") {
          toast.update(loadingId, {
            render: "Registration has been completed!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          Cookies.set("mmt_user_session", response.data.token);
          Cookies.set("mmt_user_name", response.data.userExist.name);
          Cookies.set("mmt_user_id", response.data.userExist.id);

          const response = await performGetToken(`cart?cart=${cartToken}`);
          if (response.success) {
            Cookies.remove("status");
            Cookies.remove("cart-token");
            Cookies.remove("email");
            window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pay/${token}`;
          }
        }
      } catch (err) {
        toast.update(loadingId, {
          render: "An error occurred. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsSubmitted(false);
      }
    }
  };

  return (
    <div className="my-[160px] ">
      <div className=" max-w-[685px] mx-auto max-sm:p-4 py-12 px-[60px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] rounded-[13px]">
        <div className="flex flex-col items-center gap-1 xl:gap-4 mb-6">
          <h2 className="font-staatliches text-black text-xl lg:text-5xl">
            Set Up Your Password
          </h2>
          <p className="font-roboto font-medium capitalize text-sub-work-card text-sm xl:text-xl xl:font-normal">
            Protect Your Account with a Strong Password
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            error={errors.password}
          />
          <Input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            register={register}
            error={errors.password2 || errorMessage}
          />
          <Button
            disable={isSubmitted}
            name={"Create account"}
            type={"submit"}
          />
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
