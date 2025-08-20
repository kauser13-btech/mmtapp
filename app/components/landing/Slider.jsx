"use client";

import { fetchBannerData } from "@/app/redux/banner/bannerActions";
import ApiCall from "@/app/util/ApiCall";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Slider = () => {
  const { performGet } = ApiCall();
  const [currentLeftSlider, setCurrentLeftSlider] = useState(0);
  const [currentRightSlider, setCurrentRightSlider] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false);
  const [apiCarouselData, setApiCarouselData] = useState([]);
  const [leftBanners, setLeftBanners] = useState([]);
  const [rightBanners, setRightBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {data:banner} = useSelector(state => state.banner);
  const dispatch = useDispatch();
  const leftBanners3 = () => {
    if (banner.length === 0) {
      return [{
        image: '/images/landing/slider/imageleft/left1.webp',
        title: 'Static Left Banner',
        mobileModel: '/images/landing/slider/imagemiddle/mobile1.webp'
      }];
    } else {
      return banner.filter(banner => banner.side === 'left').map((banner, index) => ({
        image: banner.image,
        title: banner.title,
        mobileModel: index % 2 === 0 ? '/images/landing/slider/imagemiddle/mobile1.webp' : '/images/landing/slider/imagemiddle/mobile2.webp'
      }));
    }
  };

  const rightBanners3 = () => {
    if (banner.length === 0) {
      return [{
        image: '/images/landing/slider/imageright/right1.webp',
        title: 'Static Right Banner'
      }];
    } else {
      return banner.filter(banner => banner.side === 'right').map(banner => ({
        image: banner.image,
        title: banner.title
      }));
    }
  };

  // const fetchBanners = async () => {
  //   const response = await performGet("api/v1/banner-assets");
  //   if (response.success) {
  //     setApiCarouselData(response.data);
  //     setIsLoading(false);
  //   }
  // };
  useEffect(() => {
    dispatch(fetchBannerData());
    setApiCarouselData(banner);
    setIsLoading(false);
    // leftBanners();
    // rightBanners();
    // fetchBanners();

    setLeftBanners(leftBanners3());
    setRightBanners(rightBanners3());
    setDomLoaded(true);
    
  }, []);

  useEffect(() => {
    if (domLoaded) {
      const intervalId = setInterval(() => {
        setCurrentLeftSlider(prev => prev === leftBanners.length - 1 ? 0 : prev + 1);
        setCurrentRightSlider(prev => prev === rightBanners.length - 1 ? 0 : prev + 1);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [domLoaded]);

  useEffect(() => {
    // const timeoutId = setTimeout(() => {
      // setDomLoaded(true);
    // }, 3000);

    // return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="bg-gradient py-4 pt-28">
      <div className=" md:mt-5 flex items-center justify-center">
        <div className="inline-flex flex-col gap-4 items-center relative md:-mb-12 xl:mt-8 xl:-mb-20">
          {leftBanners.length&&leftBanners.map((banner, index) => {
            return(
            <Slide key={index} position='md:block hidden absolute top-10 -left-32 xl:-left-64' image={banner.image ?? '/images/landing/slider/imageleft/left1.webp'} isActive={index === currentLeftSlider} />
          )})}
          <div
            className="font-staatliches text-center text-hero-title text-2xl md:text-[30px] md:leading-7 md:tracking-[0.52px] 
          xl:text-[50px] xl:leading-[54px]"
          >
            <p>Match your Outfits</p>
            <p>to your Sneakers</p>
          </div>
          <div className="w-[287px] -mb-12 md:hidden relative">
            {leftBanners.length&&leftBanners.map((banner, index) => (
              <Slide key={index} position='absolute overflow-hidden md:hidden' heightWidth="h-[155px] w-[121px]" image={banner.image} isActive={index === currentLeftSlider} />
            ))}
            <div className="relative flex items-end justify-end">
              <img
                src={'/images/landing/slider/imagemiddle/mobile1.webp'}
                alt="Main Image 1"
                className={(currentLeftSlider % 2 !=0) ? 'hidden' : ''}
              />
              <img
                src={'/images/landing/slider/imagemiddle/mobile2.webp' }
                alt="Main Image 2"
                className={(currentLeftSlider % 2 ==0) ? 'hidden' : ''}
              />
                {/* <img className={`h-[35px] w-[27px] absolute top-[90px] ${currentLeftSlider % 2 ==0 ? "left-[174px]" : "left-[188px]"}`} src={leftBanners.length&&leftBanners[currentLeftSlider].image} /> */}
            </div>
          </div>
          <div className="hidden md:block relative md:mt-5">
            {leftBanners.length&&leftBanners.map((banner, index) => (
              <Slide key={index} heightWidth="md:h-7 md:w-7 xl:w-16 xl:h-16" position="absolute z-30 bg-center md:top-[92px] md:left-[82px] xl:top-48 xl:left-[160px]" image={banner.image} isActive={index === currentLeftSlider} />
            ))}
            <img
              className="w-[397px] h-auto relative z-20 xl:w-[803px]"
              src="/images/landing/slider/imagemiddle/middle1.webp"
              alt=""
            />
            {rightBanners.length&&rightBanners.map((banner, index) => (
              <Slide key={index} heightWidth="md:h-7 md:w-7 xl:w-16 xl:h-16" position="absolute z-30 bg-center md:top-[95px] md:right-[94px] xl:top-48 xl:right-[188px]" image={banner.image ?? '/images/landing/slider/imageright/right1.webp'} isActive={index === currentRightSlider} />
            ))}
          </div>
          {rightBanners.length&&rightBanners.map((banner, index) => (
            <Slide key={index} position="md:block hidden absolute top-10 -right-28 xl:-right-[15.5rem]" image={banner.image ?? '/images/landing/slider/imageright/right1.webp'} isActive={index === currentRightSlider} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;


const Slide = ({ image, isActive, position, heightWidth = 'w-[156px] h-full max-h-[465px] xl:w-[321px]' }) => {
  return (
    <div
      className={`${heightWidth} ${position} bg-no-repeat bg-contain transition-opacity duration-[1.5s] ease-in-out
       ${isActive ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  );
};

