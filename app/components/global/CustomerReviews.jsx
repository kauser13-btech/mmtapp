"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import 'swiper/scss/autoplay';
// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { customerReviewData } from "@/app/constant/customerReviewData";

const CustomerReviews = () => {

  return (
    <div className="top-bottom-margin">
      <div className="my-container flex flex-col items-center gap-4 w-full md:gap-8 xl:gap-10">
        <div className="flex flex-col items-center gap-8">
          <h2 className="font-staatliches text-3xl text-title-work-card md:tracking-[0.52px] md:leading-[30px]
               lg:text-[45px] lg:tracking-[0.072px]"
          >
            Customer Reviews
          </h2>
          <p className="text-center text-sub-work-card font-roboto text-xl w-full leading-6 md:font-medium lg:text-2xl">
            Satisfied clients are not just customers; they are the lifeblood of 
            any enterprise.<br className="hidden md:block" /> MatchMyTees understand and respect the experiences feedback, and loyalty of
            customers. <br className="hidden md:block" />Discover what our valued clients have to say about their
            experiences.
          </p>
        </div>
        {/* <div className={styles.content}> */}
        <div className="w-full mt-4">
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            spaceBetween={10}
            pagination={{
              el: ".my-custom-pagination-div",
              clickable: true,
              renderBullet: (index, className) => {
                return '<span class="' + className + '">' + "</span>";
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1324: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
          >
            {customerReviewData.map((data, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex flex-col gap-2 !min-h-full font-roboto text-sub-work-card 
                md:bg-white md:p-4 md:rounded-[10px] md:gap-4 
                xl:gap-5 xl:px-7 xl:py-[55px] md:shadow-[0_0_10px_1px_rgba(0,0,0,0.10)]"
                >
                  <div className="flex flex-col items-center gap-.5 md:gap-3 xl:flex-row xl:items-start">
                    <Image
                      className="size-5 rounded-full md:size-8"
                      src={data.profile}
                      alt={data.name}
                      height={100}
                      width={100}
                    />
                    <h2 className="text-base font-medium leading-[-0.48px]">
                      {data.name}
                    </h2>
                  </div>
                  <div className="flex flex-col items-center gap-4 xl:items-start">
                    <div className="flex gap-1">
                      <Image src={"/images/reviews/star.svg"} alt="Star 1" height={0} width={0} style={{ width: 'fit-content', height: 'auto' }}/>
                      <Image src={"/images/reviews/star.svg"} alt="Star 2" height={100} width={100} style={{ width: 'fit-content', height: 'auto' }}/>
                      <Image src={"/images/reviews/star.svg"} alt="Star 3" height={100} width={100} style={{ width: 'fit-content', height: 'auto' }}/>
                      <Image src={"/images/reviews/star.svg"} alt="Star 4" height={100} width={100} style={{ width: 'fit-content', height: 'auto' }}/>
                      <Image src={"/images/reviews/star.svg"} alt="Star 5" height={100} width={100} style={{ width: 'fit-content', height: 'auto' }}/>
                    </div>
                    <p className="text-base font-normal text-center md:h-[120px] lg:h-[168px] xl:h-[144px] 2xl:h-[120px] xl:text-base xl:text-left">
                      {data.comment}
                    </p>
                  </div>
                  {/* <div className="">
                <p>Read More</p>
              </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="my-custom-pagination-div" />
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
