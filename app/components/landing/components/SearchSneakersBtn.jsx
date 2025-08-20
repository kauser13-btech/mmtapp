"use client";
const SearchSneakersBtn = () => {
  return (
    <button
      onClick={() => document.getElementById("search_modal").showModal()}
      className="btn bg-orange-primary hover:bg-yellow-primary hover:text-black border-none text-white text-sm px-14
   md:text-base md:font-medium xl:font-normal xl:text-[22px] xl:leading-6"
    >
      Start By Searching Your Sneakers
    </button>
  );
};

export default SearchSneakersBtn;
