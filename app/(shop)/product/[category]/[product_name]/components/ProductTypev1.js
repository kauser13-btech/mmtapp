import TailwindDrawer from "@/app/components/global/drawerMenu/TailwindDrawer";
import TailwindLoader from "@/app/components/global/TailwindLoader";
import ApiCall from "@/app/util/ApiCall";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

const ProductTypev1 = ({ isLoading, setColorChange }) => {
  const { performGet } = ApiCall();
  const searchParams = useSearchParams();

  const [showDrawer, setShowDrawer] = useState(false);
  // const [productTypes, setProductTypes] = useState([]);
  const { data: productTypes } = useSelector(state => state.productTypes);

  // const fetchProductDetails = async () => {
  //   const response = await performGet(`api/v1/product-types`);
  //   if (response.status_code === 200) {
  //     setProductTypes(response.data);
  //   }
  // };

  useEffect(() => {
    setShowDrawer(false);
  }, [searchParams]);

  useEffect(() => {
    // fetchProductDetails();
  }, []);

  const router = useRouter();
  const handleOnPickCategory = (url) => {
    setColorChange("");
    router.push(url);
  };
  return (
    <>
      <button
        onClick={() => setShowDrawer(true)}
        className={`btn w-full min-h-12 rounded-[10px] px-[18px] font-roboto hover:bg-transparent 
    text-sub-work-card text-base md:text-sm xl:text-base font-normal focus:outline-none flex items-center justify-between
    xl:min-h-14 ${
      isLoading
        ? "animate-pulse bg-slate-200 border-none "
        : "bg-transparent !border !border-gray-200 shadow-none"
    }`}
      >
        {!isLoading && (
          <>
            <p>
              Type:{" "}
              <span className="font-medium">{searchParams.get("type")}</span>
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </>
        )}
      </button>
      <TailwindDrawer
        position="right"
        isOpen={showDrawer}
        setIsOpen={() => setShowDrawer(!showDrawer)}
      >
        <div className="w-full mx-auto max-w-[374px] flex flex-col gap-[30px] max-md:px-4">
          <h3 className="font-staatliches text-title-work-card text-[28px] font-normal">
            Pick product category
          </h3>
          <div className="flex justify-between flex-wrap w-full">
            {productTypes.length == 0 ? (
              <>
                {/* <li>hi</li>
                <li>hi</li> */}
              </>
            ) : (
              productTypes.length && productTypes.map((product, index) => {
                const formatedType = product.type
                  .toLowerCase()
                  .replace(/-/g, "");
                const currentProuctType = searchParams.get("type");
                const sneaker = searchParams.get("sneaker");
                const design = searchParams.get("design");

                return (
                  currentProuctType !== product.type && (
                    <div
                      key={index}
                      onClick={(e) =>
                        handleOnPickCategory(
                          `/product/?type=${product.type}&color=Black&sneaker=${sneaker}&design=${design}`
                        )
                      }
                      className="flex flex-col items-center gap-2.5 justify-center bg-white cursor-pointer"
                    >
                      <div className="bg-white w-[157px] h-[201px] flex items-center justify-center drop-shadow-[0_0px_4px_rgba(0,0,0,0.35)]">
                        {isLoading ? (
                          <TailwindLoader height={"h-full"} />
                        ) : (
                          <img
                            src={`/images/product/type/${formatedType}.png`}
                            alt=""
                          />
                        )}
                      </div>
                      {isLoading ? (
                        <TailwindLoader height={"h-4"} />
                      ) : (
                        <p className="font-roboto text-base font-medium text-sub-work-card">
                          {product.type}
                        </p>
                      )}
                    </div>
                  )
                );
              })
            )}
          </div>
        </div>
      </TailwindDrawer>
    </>
  );
};

export default ProductTypev1;
