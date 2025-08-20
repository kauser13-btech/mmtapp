const Button = ({ modalHandle }) => {
  return (
      <button
        type="button"
        className="absolute inline -top-6 z-10 bg-gradient-to-r from-green-200 to-blue-300 text-black font-roboto border-none px-2.5 py-1 
        focus:outline-none rounded-md transition-all duration-300 text-[10px]
        hover:bg-gradient-to-r hover:from-yellow-200 hover:to-yellow-300
        max-md:right-0 
        md:-top-2 md:left-0 md:px-2 md:rounded-[3px] 
        xl:px-[22px] xl:top-0 xl:left-40 xl:py-2.5 xl:rounded-[10px] 2xl:text-base"
        // onClick={() => modalHandle()}
      >
        Change Sneaker
      </button>
  );
};

export default Button;
