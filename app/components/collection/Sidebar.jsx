import TailwindLoader from "../global/TailwindLoader";
import ColorSelection from "./ColorSelection";

const Sidebar = ({
  productData,
  handleProduct,
  createQueryString,
  productType,
  colorData,
  changeColorByUrl,
  queryParams,
  router,
  pathname,
  selectedColor
}) => {

  return (
    <div
      className="flex flex-col gap-5 md:w-[182px] xl:w-[348px] xl:p-6 h-fit rounded-[5px] xl:shadow-[0_0px_10px_rgba(0,0,0,0.1)] max-md:max-h-[calc(100vh-15vh)] max-md:overflow-y-auto bg-transparent"
    >
      {(productData.length > 0) ? productData.map((product) => (
        <button
          key={product.id}
          onClick={() => {
            handleProduct(product.id, product.type);
            router.push(
              pathname +
              "?" +
              createQueryString("product_type", product.type)
            );
          }}
          className={`max-md:hidden btn min-h-[fit-content] h-12 xl:h-[68px] text-sm text-sub-work-card border border-black rounded-md border-none 
              lg:drop-shadow-[0_0px_5px_rgba(0,0,0,0.15)] hover:bg-yellow-primary/70 font-medium bg-white ${productType === ""
              ? queryParams.product_id === product.type &&
              "bg-yellow-primary"
              : productType === product.type && "bg-yellow-primary"
            }`}
        >
          {product.type}s
        </button>
      )) : (
        Array.from({ length: 2 }).map((_, index) => (
          <TailwindLoader key={index} height={`max-md:hidden h-12 xl:h-[68px] rounded-md`} />
        ))
      )}

      <hr className="hidden lg:block" />
      <div className="flex flex-col gap-9">
        <p className="text-gray-700 text-lg font-semibold">Color</p>
        <ColorSelection
          data={colorData}
          selectedColor={selectedColor}
          changeColorByUrl={changeColorByUrl}
        />
      </div>
    </div>
  );
};

export default Sidebar;
