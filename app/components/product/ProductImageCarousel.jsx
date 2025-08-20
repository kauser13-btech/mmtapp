import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageWithLoader from "../global/ImageWithLoader";
import TailwindLoader from "../global/TailwindLoader";
import TshirtPlaceholder from "../global/TshirtPlaceholder";

export const ProductImageCarousel = ({ isLoading, images, imageAlt }) => {
    const [currentSlider, setCurrentSlider] = useState(0);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const prevSlider = () => setCurrentSlider((currentSlider) => currentSlider === 0 ? images.length - 1 : currentSlider - 1);
    const nextSlider = () => setCurrentSlider((currentSlider) => currentSlider === images.length - 1 ? 0 : currentSlider + 1);

    useEffect(() => {
        setCurrentSlider(0);
    }, [pathname, searchParams, isLoading]);

    return (
        <div className="w-full 2xl:min-h-[768px] flex flex-col-reverse 2xl:flex-row max-sm:items-center overflow-hidden gap-5 lg:gap-10">
            <div className="select-none flex flex-row 2xl:min-h-[768px] 2xl:flex-col justify-center items-center gap-5 md:py -[25px] max-w-full 2xl:min-w-[131px]">
                <div className="rounded-full size-6 flex items-center justify-center max-md:bg-gray-secondary cursor-pointer">
                    <svg
                        className="fill-black -rotate-90 2xl:rotate-0 w-3 h-3 md:w-4 md:h-4 2xl:w-[26px] 2xl:h-4"
                        onClick={prevSlider}
                        viewBox="0 0 26 16"
                        fill="none"
                    >
                        <path
                            d="M23.3509 14.3617L23.0051 14.6917L22.6599 14.3612L13.1806 5.28584L3.69452 14.3613L3.3484 14.6924L3.00274 14.3608L1.65409 13.0671L1.27761 12.7059L1.65441 12.3451L12.835 1.63887L13.1808 1.30773L13.5266 1.63887L24.7071 12.3451L25.0849 12.7069L24.7065 13.068L23.3509 14.3617Z"
                            // fill="#474747"
                            stroke="#474747"
                        />
                    </svg>
                </div>
                <div className="flex 2xl:flex-col overflow-scroll max-w-[180px] sm:max-w-[400px] max-h-[743px] hideScroll">
                    {(!isLoading && images?.length > 0) ? (
                        images?.map((product, index) => (<div onClick={() => setCurrentSlider(index)} key={index} className={`${index === currentSlider && "border border-[#ff5e01] rounded-[10px]"} flex items-center justify-center min-w-[46.44px] min-h-[46.44px] max-w-[46.44px] max-h-[46.44px] sm:min-h-[68.33px] sm:min-w-[68.33px] sm:max-h-[68.33px] sm:max-w-[68.33px] md:min-h-[70px] md:min-w-[70px] md:max-h-[70px] md:max-w-[70px] 2xl:min-w-[131px] 2xl:min-h-[131px] 2xl:max-w-[131px] 2xl:max-h-[131px] p-1 2xl:p-2.5 cursor-pointer`}>
                            <ImageWithLoader
                                src={product.url}
                                alt={imageAlt ? (index%2==0 ? imageAlt+ ' for Men' : imageAlt+ ' for Women') : 'Tees to Match with Jordans, Adidas, Nike | MatchMyTees'}
                                isLoading={isLoading}
                                imgHeight={'min-w-[36.44px] min-h-[36.44px] sm:min-h-[58.33px] sm:min-w-[58.33px] md:min-h-[60px] md:min-w-[60px] max-w-[36.44px] max-h-[36.44px] sm:max-h-[58.33px] sm:max-w-[58.33px] md:max-h-[60px] md:max-w-[60px] 2xl:min-w-[109px] 2xl:min-h-[101.94px] 2xl:max-w-[109px] 2xl:max-h-[101.94px]'}
                            // onLoad={() => handleArrayImageLoaded(index)}
                            />
                        </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center 2xl:flex-col relative overflow-scroll max-h-[743px] hideScroll">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className={`${index === 0 && "border border-[#ff5e01] rounded-[10px]"} flex items-center justify-center min-w-[46.44px] min-h-[46.44px] sm:min-h-[68.33px] sm:min-w-[68.33px] md:min-h-[70px] md:min-w-[70px] 2xl:w-[131px] 2xl:h-[131px] p-1 2xl:p-2.5 cursor-pointer`}>
                                    <TshirtPlaceholder imgHeight={'min-w-[36.44px] min-h-[36.44px] sm:min-h-[58.33px] sm:min-w-[58.33px] md:min-h-[60px] md:min-w-[60px] 2xl:w-[109px] 2xl:h-[101.94px]'} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-full size-6 flex items-center justify-center max-md:bg-gray-secondary cursor-pointer">
                    <svg
                        className="fill-slate-50 rotate-90 2xl:-rotate-180 w-3 h-3 md:w-4 md:h-4 2xl:w-[26px] 2xl:h-4"
                        onClick={nextSlider}
                        viewBox="0 0 26 16"
                        fill="none"
                    >
                        <path
                            d="M23.3509 14.3617L23.0051 14.6917L22.6599 14.3612L13.1806 5.28584L3.69452 14.3613L3.3484 14.6924L3.00274 14.3608L1.65409 13.0671L1.27761 12.7059L1.65441 12.3451L12.835 1.63887L13.1808 1.30773L13.5266 1.63887L24.7071 12.3451L25.0849 12.7069L24.7065 13.068L23.3509 14.3617Z"
                            fill="#474747"
                            stroke="#474747"
                        />
                    </svg>
                </div>
            </div>
            <div className="w-full max-w-7xl flex overflow-hidden ">
                <div className="relative overflow-hidden w-full">
                    {/* slider container gap-5 lg:gap-10 px-10*/}
                    <div className="ease-linear duration-[400ms] flex transform-gpu relative" style={{ transform: `translateX(-${!isLoading ? currentSlider * 100 : 0}%)`, }} >
                        {/* sliders */}
                        {(!isLoading && images?.length > 0) ? images?.map((slide, inx) => <div key={inx} className="min-w-full duration-200">
                            <ImageWithLoader
                                src={slide.url}
                                alt={imageAlt ?? 'Tees to Match with Jordans, Adidas, Nike | MatchMyTees'}
                                imgHeight={'!min-w-full !h-[276px] sm:!h-[500px] md:!h-[328px] lg:!h-[497px] xl:!h-[682px] 2xl:!h-[731px]'}
                            />
                        </div>
                        ) : <TshirtPlaceholder imgHeight={'!min-w-full !h-[276px] sm:!h-[500px] md:!h-[328px] lg:!h-[497px] xl:!h-[682px] 2xl:!h-[731px]'} />}
                    </div>
                </div>
            </div>
        </div>
    );
};