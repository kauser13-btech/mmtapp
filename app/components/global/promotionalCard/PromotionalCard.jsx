"use client";
import { useEffect, useState } from "react";
import DaisyModal from "../modal/DaisyModal";

const PromotionalCard = ({ data, isLoading, customStyle, pathname }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.getElementById("promotional_modal_id").showModal();
    }
  }, [showModal]);

  const handleModalClose = () => {
    setShowModal(false);
    document.getElementById("promotional_modal_id").close();
  };

  const modalBody = (
    <div className="flex max-xl:flex-col items-center gap-6 xl:gap-28 md:px-[140px] py-10 text-sub-work-card relative">
      <button
        className="absolute top-0 right-0 text-3xl"
        onClick={handleModalClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M1 1.5L20.5 21"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1 21L20.5 1.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="min-w-[224px] min-h-[224px] md:min-w-[310px] md:min-h-[210px] xl:min-w-[585px] xl:min-h-[585px] flex items-center justify-center rounded-md bg-white shadow-lg">
        <img
          className="h-auto w-[160px] md:w-[60px] xl:w-[420px]"
          src={data.image}
          alt={data.title}
        />
      </div>
      <div className="flex flex-col gap-4 max-xl:items-center xl:gap-9">
        <h3 className="font-staatliches texl-base max-md:text-center md:text-2xl xl:text-[40px] xl:leading-normal xl:tracking-[1.6px]">
          {data.title}
        </h3>
        <p className="font-roboto font-normal text-sm max-md:text-center xl:text-xl">
          {data?.description}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {data.id == 1 && (
        <div
          className={`w-full p-6 md:p-8 xl:p-[50px] text-sub-work-card rounded-[10px] hover:scale-[1.025] transition-transform 
        duration-300 hover:promotion-shadow ${customStyle}`}
          style={{ background: data.gradient }}
        >
          <div className="flex flex-col items-center h-full max-md:gap-20 md:gap-[177px]">
            <div className="flex flex-col gap-6 max-xl:items-center">
              <h3 className="font-staatliches text-xl xl:text-[32px] font-normal xl:leading-normal xl:tracking-[1.6px]">
                {data.title}
              </h3>
              {data.description && (
                <p className="font-roboto font-normal text-sm md:text-base max-xl:text-center xl:text-xl">
                  {data.description}
                </p>
              )}
            </div>
            <img
              className="w-[290px] xl:w-[300px] h-auto"
              src={data.image}
              alt={data.title}
            />
          </div>
        </div>
      )}
      {data.id == 2 && (
        <div
          className={`w-full p-6 max-md:hidden  md:p-8 xl:p-[50px] text-sub-work-card rounded-[10px] hover:scale-[1.025] transition-transform 
        duration-300 hover:promotion-shadow ${customStyle}`}
          style={{ background: data.gradient }}
        >
          <div className="flex flex-col gap-10 md:gap-6 xl:gap-16 ">
            <h3 className="font-staatliches text-xl md:tracking-[0.8px] md:w-[140px] xl:w-[300px] xl:text-[32px] xl:leading-normal xl:tracking-[1.6px] font-normal">
              {data.title}
            </h3>
            {data.description && (
              <p className="font-roboto font-normal text-sm md:text-base max-xl:text-center xl:text-xl">
                {data.description}
              </p>
            )}
            <div className="self-center md:w-[250px] xl:w-[300px] md:self-end pl-24">
              <img className="" src={data.image} alt={data.title} />
            </div>
          </div>
        </div>
      )}

      {![1, 2].includes(data.id) && (
        <div
          className={`w-full h-full p-6 md:p-8 xl:p-[50px] text-sub-work-card rounded-[10px] hover:scale-[1.025] transition-transform 
        duration-300 hover:promotion-shadow ${customStyle}`}
          style={{ background: data.gradient }}
        >
          <div className="flex flex-col h-full items-center justify-between md:items-start gap-10 md:gap-8 xl:gap-12 cursor-pointer">
            <div className="flex flex-col gap-14 items-center w-full max-md:justify-center">
              <div className="flex flex-col gap-8 md:flex-row-reverse md:gap-6 xl:gap-9 max-md:items-center max-md:justify-center md:justify-between w-full">
                <div className="flex items-center justify-center size-[224px] md:size-20 xl:size-36 rounded-md bg-white shadow-lg">
                  <img
                    className="h-auto w-[160px] md:w-[60px] xl:w-[100px]"
                    src={data.image}
                    alt={data.title}
                  />
                </div>
                <h3 className="font-staatliches max-md:text-center md:place-self-end w-full md:w-[85px] text-xl xl:w-[180px] xl:text-[32px] xl:leading-normal xl:tracking-[1.6px] font-normal" title={data?.title}>
                  {data?.title?.length > 27 ? data?.title?.slice(0, 27) + '...' : data?.title}
                </h3>
              </div>
              <p className="font-roboto font-normal text-sm md:text-base max-md:text-center xl:text-xl">
                {data?.description?.length > 80 ? data?.description?.slice(0, 80) + '...' : data?.description}
              </p>
            </div>
            {data.explore && (
              <p
                onClick={() => setShowModal(!showModal)}
                className="flex items-center gap-5 text-base md:text-sm xl:text-xl font-medium tracking-[0.8px]"
              >
                Explore more{" "}
                <svg
                  width="25"
                  height="16"
                  viewBox="0 0 25 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H0V9H1V7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9H24V7H1V9Z"
                    fill="#474747"
                  />
                </svg>
              </p>
            )}
          </div>
        </div>
      )}
      {showModal && (
        <DaisyModal
          modalId="promotional_modal_id"
          background="promotional-modal-gradient px-4 md:px-10 w-full md:min-w-[663px] xl:min-w-[90%]"
          onClick={handleModalClose}
        >
          {modalBody}
        </DaisyModal>
      )}
    </>
  );
};

export default PromotionalCard;
