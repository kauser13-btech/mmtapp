import ProductDetailsTab from "@/app/components/product/ProductDetailsTab";
import { useEffect, useState, useRef } from "react";
import TailwindLoader from "../global/TailwindLoader";
import ProductColorPicker from "./ProductColorPicker";
import ProductPrice from "./ProductPrice";
import ProductQuanity from "./ProductQuanity";
import ProductSize from "./ProductSize";
import ProductType from "./ProductType";
import Rating from "./Rating";
import ScrollAnimation from "../scrollAnimation/ScrollAnimation";
import Sticker from "../global/Sticker";
const ProductContainer = ({
  data,
  isLoading,
  handleColorChange,
  queryParams,
  setColorChange,
}) => {
  const [size, setSize] = useState(0);
  const [onScroll, setOnScroll] = useState(false);
  const productDesc = useRef(null);

  const handleSize = (data) => {
    setSize(data);
  };
  const filterColor = data?.available_colors?.find(
    (color) => color.is_selected === true
  );

  const handleProductDescScroll = () => {
    const element = productDesc.current;
    if (element.scrollTop > 410) {
      setOnScroll(true);
    } else {
      setOnScroll(false);
    }
  };

  const scrollDown = () => {
    // Scroll the internal div by 50 pixels
    if (productDesc.current) {
      // productDesc.current.scrollTop += 50;
      productDesc.current.scrollTo({
        top: productDesc.current.scrollTop+450,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const element = productDesc.current;
    element.addEventListener("scroll", handleProductDescScroll);
    return () => {
      element.removeEventListener("scroll", handleProductDescScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-6s md:gap-6 relative">
      <h1 className="max-md:hidden w-full font-staatliches text-lg lg:text-2xl xl:text-[32px] font-normal text-sub-work-card">
        {isLoading ? <TailwindLoader height={'h-[4.3rem]'} /> : data.title}
      </h1>
      <div className="w-full overflow-auto hideScroll flex flex-col gap-1 md:justify-start">
        <ProductPrice
          isLoading={isLoading}
          targetPrice={data?.price}
          price={"$59.99"}
          ratingScore={4}
        />
        {onScroll ? (
          <ProductQuanity
            isShowQuantity={false}
            data={data}
            queryParams={queryParams}
            filterColor={filterColor}
            size={size}
            isLoading={isLoading}
          />
        ) : (
          <></>
          // <Rating isLoading={isLoading} ratingScore={4} noOfReviews={14533} />
        )}
      </div>
      <div
        ref={productDesc}
        className="lg:h-[600px] flex flex-col gap-6 md:gap-8 overflow-y-scroll hideScroll"
      >
        <ProductType isLoading={isLoading} setColorChange={setColorChange} />
        <ProductColorPicker
          data={data}
          isLoading={isLoading}
          handleColorChange={handleColorChange}
          queryParams={queryParams}
        />
        <ProductSize
          isLoading={isLoading}
          handleSize={handleSize}
          filterColor={filterColor}
          size={size}
        />
        {/* <ProductDelivery /> */}
        <ProductQuanity
          data={data}
          queryParams={queryParams}
          filterColor={filterColor}
          size={size}
          isLoading={isLoading}
        />
        <Sticker extraClass="pe-16 py-3"/>
        <ProductDetailsTab data={data} isLoading={isLoading} customClass="max-lg:hidden" />
      </div>
      {!isLoading && <div className="cursor-pointer" onClick={scrollDown}><ScrollAnimation /></div>}
    </div>
  );
};

export default ProductContainer;
