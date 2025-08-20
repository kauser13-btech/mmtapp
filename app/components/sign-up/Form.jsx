"use client";

import ApiCall from "@/app/util/ApiCall";
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpModal from "../otp/OtpModal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { toast } from "react-toastify";

const Form = ({type}) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
    },
  });

  const router = useRouter();

  const { performPost } = ApiCall();
  const [sendOtpEmail, setSendOtpEmail] = useState("");
  const onSubmit = async (data, e) => {
    if (data.password !== data.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const id = toast.loading("Please wait...",);
      const postFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password !== "" && data.password,
      };

      const response = await performPost(`api/v1/register`, postFormData);
      if (response.status == "success") {
        setSendOtpEmail(response.user.email);
        toast.update(id, {
          render: response.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        handleModalOpen();
      } else {
        Object.keys(response.errors).forEach((fieldName) => {
          setError(fieldName, {
            type: "manual",
            message: response.errors[fieldName][0],
          });
        });
        toast.update(id, {
          render: response.message,
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full flex-col gap-10"
      >
        <div className="flex items-center flex-col gap-4 w-full">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            register={register}
            error={errors.name}
            notRequired={true}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email}
            notRequired={true}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            register={register}
            error={errors.phone}
            notRequired={false}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            register={register}
            error={errors.password}
            notRequired={true}
          />

          <Input
            type="password"
            name="password2"
            placeholder="Confirm password"
            register={register}
            error={errors.password2}
            notRequired={true}
          />

          <Button name={"Create an Account"} type={"submit"} />
        </div>
      </form>

      
        <OtpModal modalHandle={handleModalClose} type={type} sendOtpEmail={sendOtpEmail} />
      
    </>
  )
};

export default Form;
