"use client";
import React from "react";
const SneakerSearch = ({ handleOnClick, handleChange, type, isOpen }) => {
  return (
    <div
      className={`${
        type === "collection"
          ? "w-full flex sm:grow-0 justify-between rounded-md px-3 items-center gap-x-1 lg:grow shadow-[0_0px_10px_rgba(0,0,0,0.1)] h-12 xl:h-[64px]"
          : type === "home" && isOpen === true
            ? "bg-yellow-primary w-full flex items-center rounded-lg"
            : type === "home"
              ? "bg-yellow-primary w-full flex items-center rounded-lg"
              : "bg-yellow-primary w-full flex items-center rounded-lg"
      } relative`}
    >
      <input
        type="text"
        className={`bg-transparent size-full text-sm md:text-base xl:text-[22px] focus:outline-none border-none gap-4 p-4 max-md:pr-10 md:py-[13px] xl:py-[15px] xl:px-8 placeholder:text-title-work-card placeholder:font-medium xl:placeholder:font-normal focus:placeholder-custom-search-focus text-title-work-card ${type === "collection" ? "max-lg:pr-10" : ""}`}
        placeholder="Search sneakers to match"
        onClick={() => handleOnClick(true)}
        onChange={(e) => handleChange(e)}
      />
      {/* <svg
        className={`${
          type === "collection"
            ? "right-7 xl:right-11"
            : type === "home" && isOpen === true
              ? "right-4 xl:right-8"
              : type === "home"
                ? "right-4 xl:right-8"
                : "right-4 xl:right-8"
        } absolute`}
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
      >
        <path
          d="M16.7207 14.4753L13.5106 11.463C14.5464 10.2211 15.1083 8.68756 15.1062 7.10882C15.1062 5.70283 14.6633 4.32841 13.8333 3.15937C13.0034 1.99033 11.8237 1.07918 10.4436 0.54113C9.06343 0.00308013 7.54475 -0.137698 6.07958 0.136597C4.61442 0.410893 3.26858 1.08794 2.21226 2.08213C1.15594 3.07631 0.436573 4.34299 0.145134 5.72196C-0.146304 7.10094 0.00327264 8.53028 0.57495 9.82925C1.14663 11.1282 2.11473 12.2385 3.35684 13.0196C4.59894 13.8007 6.05926 14.2176 7.55312 14.2176C9.23053 14.2196 10.8599 13.6907 12.1794 12.7159L15.38 15.7372C15.4678 15.8204 15.5722 15.8865 15.6873 15.9317C15.8023 15.9768 15.9257 16 16.0504 16C16.175 16 16.2984 15.9768 16.4135 15.9317C16.5285 15.8865 16.633 15.8204 16.7207 15.7372C16.8092 15.6545 16.8795 15.5563 16.9274 15.448C16.9753 15.3397 17 15.2236 17 15.1062C17 14.9889 16.9753 14.8728 16.9274 14.7645C16.8795 14.6562 16.8092 14.5579 16.7207 14.4753ZM1.88828 7.10882C1.88828 6.05433 2.22052 5.02352 2.84298 4.14674C3.46544 3.26996 4.35017 2.58659 5.38528 2.18305C6.4204 1.77952 7.55941 1.67393 8.65828 1.87965C9.75715 2.08537 10.7665 2.59316 11.5588 3.3388C12.351 4.08444 12.8905 5.03444 13.1091 6.06868C13.3277 7.10291 13.2155 8.17492 12.7868 9.14914C12.358 10.1234 11.6319 10.9561 10.7003 11.5419C9.76876 12.1277 8.67352 12.4404 7.55312 12.4404C6.05071 12.4404 4.60984 11.8787 3.54748 10.8788C2.48511 9.87897 1.88828 8.52285 1.88828 7.10882Z"
          fill="#161616"
        />
      </svg> */}
    </div>
  );
};

export default SneakerSearch;
