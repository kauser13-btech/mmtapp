import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import ApiCall from "@/app/util/ApiCall";
import Input from "../ui/Input";
import { useRouter } from 'next-nprogress-bar';
import { toast } from "react-toastify";

const ResetPassForm = () => {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { performPost } = ApiCall();
  const router = useRouter();

  const onSubmit = async (data) => {
    const resetPasswordData = JSON.parse(localStorage.getItem("resetPasswordData"));
    let loadingId = toast.loading("Please wait..."); // Initial loading toast id

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
          email: resetPasswordData.email,
          otp: resetPasswordData.otp,
          password: data.password,
          password_confirmation: data.password2,
        };

        const response = await performPost(`api/v1/rest-password`, formData);

        if (response.success) {
          toast.update(loadingId, {
            render: "Password has been successfully updated. Please login!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          localStorage.removeItem("resetPasswordData");
          router.push("/sign-in");
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
      <Button disable={isSubmitted} name={"Change Password"} type={"submit"} />
    </form>
  );
};

export default ResetPassForm;
