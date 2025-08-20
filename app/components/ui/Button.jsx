const Button = ({ name, type, disable }) => {
  return (
    <button
      type={type}
      className="btn w-full max-w-fit md:max-w-full border-none text-white bg-orange-primary hover:bg-orange-primary/80
       active:bg-orange-primary/90 text-sm font-normal md:font-medium md:text-base xl:text-[24px] disabled:bg-orange-primary"
       disabled={disable}
    >
      {!disable ? name : <span className="loading loading-spinner loading-sm !bg-white"/>}
    </button>
  );
};

export default Button;
