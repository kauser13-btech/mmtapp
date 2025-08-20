'use client';
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { sendGTMEvent } from '@next/third-parties/google';
import TailwindLoader from "@/app/components/global/TailwindLoader";

const ProductQuantityV1 = ({
  isShowQuantity = true,
  data,
  filterColor,
  isLoading,
  size,
  queryParams,
}) => {
  const gtmEvent=(data)=>{
    sendGTMEvent({ event: 'add_to_cart', currency: "USD", value:data.price, 
      items: [{
        item_id: `D${data.design.id}S${data.sneaker.id}P${queryParams.type=="T-shirt"?1:2}`,
        item_name: `${data.sneaker.title} ${data.design.title} Matching ${queryParams.type}`,
        // discount: 2.22,
        item_brand: data.sneaker.brand.title,
        item_category: data.sneaker.sub_model_category.title,
        item_variant: data.color,
        price: data.price

      }] 
    });
  }

  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      console.log("Quantity cannot be less than 1");
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const { fetchCartData, loading, handleToCart, setOpenCart } = useCart();

  const addToCart = async (quantity, data, filterColor, queryParams, size) => {
    await handleToCart(quantity, data, filterColor, queryParams, size);
    fetchCartData();
    gtmEvent(data);
    setTimeout(() => {
      setOpenCart(true);
    }, 800);
  };

  return (
    <div className="flex gap-4 md:gap-[18px] xl:gap-10 w-full flex-wrap">
      {isShowQuantity && (
        <div className={`inline-flex h-12 max-w-[104px] min-w-[104px] items-center gap-3 text-black font-montserrat font-medium tracking-[-0.6px] rounded-[5px] ${!isLoading && "border border-[#e5e7eb]"}`}>
          {isLoading ? (
            <TailwindLoader height={"h-12 w-[104px] rounded-[5px]"} />
          ) : (
            <>
              <button
                onClick={(e) => decreaseQuantity()}
                className="flex items-center justify-center cursor-pointer h-full w-[35px]"
                disabled={quantity === 1 || loading || isLoading}
              >
                <svg
                  width="10"
                  height="2"
                  viewBox="0 0 10 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="10" height="2" fill="#474747" />
                </svg>
              </button>
              <p className="">{quantity}</p>
              <button
                onClick={(e) => increaseQuantity()}
                className="flex items-center justify-center cursor-pointer h-full w-[35px]"
                disabled={loading || isLoading}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="4.44434"
                    width="10"
                    height="1.11111"
                    fill="#474747"
                  />
                  <rect
                    x="4.44531"
                    y="10"
                    width="10"
                    height="1.11111"
                    transform="rotate(-90 4.44531 10)"
                    fill="#474747"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
      {isLoading ? (
        <div className="flex-grow">
          <TailwindLoader height={"h-12 rounded-[5px]"} />
        </div>
      ) : (
        <div className="flex-grow">
          <button
            className="btn bg-orange-primary !p-0 !px-5 rounded-lg text-white flex-1 justify-center items-center cursor-pointer hover:bg-yellow-primary hover:text-black border-none disabled:text-black text-xl md:!text-[2rem] !w-full !leading-none !font-normal !font-staatliches uppercase"
            onClick={(e) =>
              addToCart(quantity, data, filterColor, queryParams, size)
            }
            disabled={loading}
          >
            {loading ? "Loading" : "Add To Cart"}
          </button></div>
      )}
    </div>
  );
};

export default ProductQuantityV1;
