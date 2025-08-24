import TailwindLoader from "@/app/components/global/TailwindLoader";
import ProductQuantityV1 from "./ProductQuantityV1";
import ProductPricev1 from "./ProductPricev1";
import ProductColorPickerv1 from "./ProductColorPickerv1";
import ProductSizev1 from "./ProductSizev1";
import ProductDetailsTab from "@/app/components/product/ProductDetailsTab";
import Sticker from "@/app/components/global/Sticker";
import ScrollAnimation from "@/app/components/scrollAnimation/ScrollAnimation";

const ProductContainerv1 = ({
  data,
  isLoading = false,
  queryParams,
  sneaker,
  design,
}) => {
  const size = "M";
  const filterColor = data?.available_colors?.find(
    (color) => color.is_selected === true,
  );

  return (
    <div className="w-full flex flex-col gap-6s md:gap-6 relative">
      <h1 className="max-md:hidden w-full font-staatliches text-lg lg:text-2xl xl:text-[32px] font-normal text-sub-work-card">
        {isLoading ? <TailwindLoader height={"h-[4.3rem]"} /> : data.title}
      </h1>
      <div className="w-full overflow-auto hideScroll flex flex-col gap-1 md:justify-start">
        <ProductPricev1
          isLoading={isLoading}
          targetPrice={data?.price}
          price={"$59.99"}
          ratingScore={4}
        />

        <ProductQuantityV1
          isShowQuantity={false}
          data={data}
          queryParams={queryParams}
          filterColor={filterColor}
          size={size}
          isLoading={isLoading}
        />
      </div>
      <div
        // ref={productDesc}
        className="lg:h-[600px] flex flex-col gap-6 md:gap-8 overflow-y-scroll hideScroll"
      >
        {/* <ProductTypev1 isLoading={isLoading} setColorChange={setColorChange} /> */}
        <ProductColorPickerv1
          data={data}
          isLoading={isLoading}
          queryParams={queryParams}
          sneaker={sneaker}
          design={design}
        />
        <ProductSizev1
          isLoading={isLoading}
          filterColor={filterColor}
          size={size}
        />
        <Sticker />
        <ProductDetailsTab
          data={data}
          isLoading={isLoading}
          customClass="max-lg:hidden"
        />
        <ScrollAnimation />
      </div>
    </div>
  );
};

export default ProductContainerv1;
