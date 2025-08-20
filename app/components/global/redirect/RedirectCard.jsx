import React from "react";

const RedirectCard = () => {
  return (
    <div className="flex items-center justify-center mt-[60px] mb-[130px] px-7">
      <div className="w-[683px] md:w-[896px] px-[60px] py-[80px] md:py-[135px] text-center ">
        <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-10 h-1-"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>

          <h3 className="font-roboto text-lg md:text-3xl font-bold text-[#525252]">
            Invalid Session...
          </h3>
        </div>
        <div className="flex flex-col gap-6 max-lg:text-center">
          <div className="flex flex-col gap-4">
            <p className="font-normal text-[#4B4B4B] mt-2.5 text-md md:text-xl">
              This page is not authorize to view. Redirecting to home page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectCard;
