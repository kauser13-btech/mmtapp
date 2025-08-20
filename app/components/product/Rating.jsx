import React from "react";
import TailwindLoader from "../global/TailwindLoader";

const Rating = ({ ratingScore, noOfReviews, isLoading }) => {
  return (
    <div className="flex w-full items-center gap-6 md:gap-4 xl:gap-5 ">
      {isLoading ? <>
        <TailwindLoader height={'h-6 !w-16 max-md:hidden'} />
        <TailwindLoader height={'h-6 max-sm:h-10 sm:!w-[207px]'} />
      </>
        :
        <>
          {/* <div className="hidden md:flex flex-row g-.5 ">
            {[...Array(Math.floor(ratingScore))].map((elementInArray, index) => (
              <img className="w-2.5 lg:size-4" key={index} src="/images/product/rating.svg" alt="rating" />
            ))}
          </div> */}
          {/* <p className="text-sm text-sub-work-card md:text-base md:tracking-[-.3px] xl:tracking-[-.48px]">
            {ratingScore} out of 5 within {noOfReviews} reviews
          </p> */}
        </>}
    </div >
  );
};

export default Rating;
