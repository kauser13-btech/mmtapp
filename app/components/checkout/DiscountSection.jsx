import React from "react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";

const DiscountSection = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex items-center gap-4 max-sm:flex-wrap max-sm:justify-end">
      <Input
        type={"text"}
        name={"discount"}
        placeholder={"Discount Code"}
        register={register}
        error={errors.message}
      />

      <button className="border border-[#B1B5B8] h-12 px-6 md:px-9 rounded-lg max-sm:self-end">Apply</button>
    </div>
  );
};

export default DiscountSection;
