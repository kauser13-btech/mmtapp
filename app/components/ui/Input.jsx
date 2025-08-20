import Link from "next/link";

const Input = ({
  type,
  name,
  placeholder,
  register,
  value,
  error,
  isForgot = false,
  handleChange,
  errorsHandle,
  notRequired,
  defaultValue,
  validation
}) => {
  const handleInputChange = (e) => {
    const data = e.target.value;
    if (data.length > 2 && handleChange) {
      handleChange(data);
    }
  };
  return (
    <main className="w-full">
      <div className="flex flex-col w-full gap-0.5">
        <input
          className={`w-full h-12 px-4 border border-[#B1B5B8] focus:outline focus:outline-[#00A6AC] rounded-md text-black placeholder:text-[#989898] ${name == 'discount' && 'bg-[#FBFBFB]'}`}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(name, {
            onChange: (e) => {
              handleInputChange(e);
            },
            ...(notRequired && { required: `${name} is required`, ...validation }),
            
          })}
        />
        {isForgot && (
          <Link
            className="self-end font-roboto font-medium underline text-sm text-sub-work-card"
            href="/forgotpassword"
          >
            Forgot password?
          </Link>
        )}
      </div>
      {error && <p className="font-roboto font-medium underline text-sm text-red-400 first-letter:uppercase">{error.message}</p>}
      {/* {error && <p className="font-roboto text-end font-medium underline text-sm text-red-400">{error}</p>} */}
    </main>
  );
};

export default Input;
