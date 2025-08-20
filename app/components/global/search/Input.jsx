"use client";
import Search from "../navbar/Search";

const Input = ({ searchInput, handleInputChange ,isLoading}) => {
  return (
    <div className="w-full flex items-center px-4 border border-solid border-[#979797] rounded-lg">
      <input
        type="text"
        className="size-full bg-transparent py-4 focus:outline-none border-none"
        placeholder="Search Sneakers"
        name="searchInput"
        value={searchInput}
        onChange={(e) => handleInputChange(e.target.value)}
        autoComplete="off"
      />
      {/* <Search color="#A9A9A9"/> */}
    </div>
  );
};

export default Input;
