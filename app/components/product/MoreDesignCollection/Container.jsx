
import ProductComponent from "../../global/ProductComponent";
const Container = ({
  data,
  isLoading,
  imageLoaded,
  handleImageLoaded,
  type,
}) => {
  return (
    <div className="grid gap-8 md:gap-6 xl:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
      <ProductComponent
        products={data}
        isLoading={isLoading}
        imageLoaded={imageLoaded}
        handleImageLoaded={handleImageLoaded}
        type={type}
        handleChangeSneaker={() => {}}
      />
    </div>
  );
};

export default Container;
