"use client";
import TailwindLoader from "@/app/components/global/TailwindLoader";
import SizeGuideModal from "@/app/components/product/SizeGuideModal";
import React, { useEffect, useState } from "react";


const ProductSizev1 = ({ isLoading,  filterColor, size }) => {
    
  const [showModal, setShowModal] = useState(false);
  const handleSize = ()=>{}
  return (
    <>
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <TailwindLoader height={'!w-[128px] h-5'} />
      ) : (
          <div className="flex justify-between items-center">
            <p className="text-sub-work-card font-roboto text-base font-normal md:text-sm xl:text-base">
              Size: <span className="font-medium">{filterColor?.variants[size]}</span>
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-500 duration-300 outline-none 
          transition-all hover:text-blue-700 hover:underline focus:outline-none
           font-roboto text-base font-normal md:text-sm xl:text-base"
            >
              Size guide
            </button>
          </div>
      )}
      <div className="flex flex-wrap gap-[7px] md:gap-[11px] ml-1">
        {!isLoading ? filterColor.variants.map((variant, index) => (
          <div
            key={index}
            className={`flex justify-center items-center cursor-pointer size-8
                text-xs xl:text-base 
                rounded-[3px] md:rounded-md
                hover:scale-110 duration-200
                md:size-[34px] lg:w-[48px] lg:h-[37px]
                 ${index === size ? "bg-black text-white" : "bg-[#e3e3e3] text-title-work-card"}`}
            onClick={() => handleSize(index)}
          >
            {variant}
          </div>
        )) : Array.from(Array(7).keys()).map((_, index) => (
          <div
            key={index}
            className={`flex justify-center items-center cursor-pointer size-8
            text-xs xl:text-base 
            rounded-[3px] md:rounded-md
            hover:scale-110 duration-200
            md:size-[34px] lg:w-[48px] lg:h-[37px]
                 bg-[#e3e3e3] text-title-work-card`}
          >
            <TailwindLoader height={'h-full'} />
          </div>)
        )}
      </div>
    </div>
    {showModal && <SizeGuideModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default ProductSizev1;
