import React from "react";
import Skeleton from "react-loading-skeleton";
const Category = ({ isLoading, data, handleProduct, createQueryString, productType, queryParams, router, pathname }) => {
  return (
    <div className="flex items-center gap-5 md:hidden mt-2">
      {isLoading ? <>
        <div>
          <Skeleton width={100} height={48} />
        </div>
        <div>
          <Skeleton width={100} height={48} />
        </div>
      </> : data.map((product) => (
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
          className={`btn min-h-[fit-content] px-10 h-12 text-sm text-sub-work-card border border-black rounded-md border-none 
        lg:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:bg-yellow-primary/70 font-medium bg-white shadow-lg ${productType === ""
              ? queryParams.product_id === product.type &&
              "bg-yellow-primary"
              : productType === product.type && "bg-yellow-primary"
            }`}
        >
          {product.type}s
        </button>
      ))}
    </div>
  );
};

export default Category;
