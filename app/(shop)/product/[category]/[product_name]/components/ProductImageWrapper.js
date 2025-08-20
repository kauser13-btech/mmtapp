"use client";
import TailwindLoader from "@/app/components/global/TailwindLoader";
import { ProductImageCarouselClient } from "./carousel/ProductImageCarouselClient";
import DaisyModal from "@/app/components/global/modal/DaisyModal";
import SneakerModal from "@/app/components/global/searchSneakerModal/SneakerModal";
import SignInModal from "@/app/components/sign-in/modal/SignInModal";

const ProductImageWrapper = ({
  data,
  isLoading,
  handleChangeSneaker,
  imageLoaded,
}) => {
  return (
    <>
      <div className="flex flex-col max-md:gap-11 min-w-full">
        <h1 className="md:hidden items-center text-sub-work-card font-staatliches text-xl font-normal tracking-[.2px]">
          {isLoading ? <TailwindLoader height={'h-14'} /> : data?.title}
        </h1>
        <div className="relative flex flex-col-reverse gap-2 xl:gap-10 2xl:flex-row">
        <ProductImageCarouselClient  isLoading={isLoading} images={data?.image_urls} imageAlt={data?.title+' '+data?.type}/>
    
          {imageLoaded && <button
            onClick={() =>
              document.getElementById("outfit_category_modal").showModal()
            }
            type="button"
            className="absolute inline flex w-fit -top-6 z-10 bg-gradient-to-r text-gray-500 font-roboto font-light px-5 py-1.5 
                  focus:outline-none rounded-md transition-all duration-300 text-[12px]
                 hover:from-yellow-200 hover:to-yellow-300 hover:border-yellow-200 right-0
                  sm:right-28
                  md:-top-4 md:left-10 md:rounded-[3px]
                  xl:-top-3 xl:rounded-[10px] 2xl:text-base 2xl:left-36 border border-gray-200"
          >
           
              <span>Change sneakers</span>
          </button>}
        </div>
      </div>
      
      <DaisyModal modalId="outfit_category_modal" background="bg-white max-w-[1460px] h-fit max-lg:h-[400px] lg:h-[727px] p-0 overflow-hidden">
        <div className="relative">
          <SneakerModal
            // modalHandle={modalHandle}
            handleChangeSneaker={handleChangeSneaker}
            type="outfit"
          />
          <button
            className="modal-close text-black absolute top-0 right-0 self-end m-6"
            onClick={() =>
              document.getElementById("outfit_category_modal").close()
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </DaisyModal>
      <DaisyModal
        modalId="sign-in-modal-in-search"
      >
        <SignInModal
        />
      </DaisyModal>
    </>
  )
}


export default ProductImageWrapper;
