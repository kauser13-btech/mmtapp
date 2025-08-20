import ProductComponent from "../global/ProductComponent";
import LoadingButton from "./LoadingButton";
export const ProductContainer = ({
  data,
  isLoading,
  imageLoaded,
  handleImageLoaded,
  loadMore,
  dataLength,
}) => {
  return (
    <div className="flex flex-col items-center gap-10 xl:gap-20 w-full">
      <div className="grid gap-x-5 gap-y-7 grid-cols-2 lg:grid-cols-3 md:gap-8 w-full">
        <ProductComponent
          products={data}
          type={"product"}
          isLoading={isLoading}
          imageLoaded={imageLoaded}
          handleImageLoaded={handleImageLoaded}
          handleChangeSneaker={() => {}}
        />
      </div>
      {data.length !== dataLength && <LoadingButton loadMore={loadMore} />}
    </div>
  );
};
