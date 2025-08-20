import { useCart } from "@/app/context/CartContext";
import React, { useEffect } from "react";
import CartItems from "../global/navbar/addtocart/CartItems";
import Cookies from "js-cookie";
import DiscountSection from "./DiscountSection";
import CostData from "./CostData";
const ProductViewMobile = ({ adjustTaxPrice, additionalPrice, loading }) => {
  const {
    cartData,
    isCartUpdate,
    fetchCartData,
    handleQuantity,
    handleRemove,
    handleRemoveCartData,
    handleIsCartUpdate,
    cartDetailData,
  } = useCart();

  const removeCart = async (
    cart_id,
    index,
    handleRemoveCartData,
    handleIsCartUpdate,
    token
  ) => {
    handleRemove(
      cart_id,
      index,
      handleRemoveCartData,
      handleIsCartUpdate,
      token
    );
    fetchCartData();
  };

  const getCartToken = () => {
    const cartToken = Cookies.get("cart-token");
    if (cartToken) {
      return cartToken;
    }
  };

  useEffect(() => {
    adjustTaxPrice({
      tax: cartDetailData.tax,
      shipping_cost: cartDetailData.shipping_cost,
      shipping_name: cartDetailData?.shipping_details?.shipping_name,
      total_payable: cartDetailData.total_payable,
    })
  }, [cartDetailData]);
  return (
    <div className="w-full h-fit  flex flex-col gap-6 max-w-[665px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] max-sm:p-4 py-12 px-[60px] rounded-[13px] xl:hidden">
      <div className="flex flex-col gap-3">
        <CostData
          name={"Subtotal"}
          type={"secondary"}
          price={(cartData.length > 0 && cartDetailData.total_price) || "-"}
        />
        <CostData
          name={"Tax"}
          type={"tax-data"}
          price={
            cartData?.length > 0 && Object.keys(additionalPrice)?.length === 0
              ? cartDetailData?.tax
              : additionalPrice?.tax || "-"
          }
          loading={loading}
        />
        <CostData
          name={"Shipping cost"}
          type={"tax-data"}
          price={
            cartData?.length > 0 && Object.keys(additionalPrice)?.length === 0
              ? cartDetailData?.shipping_cost
              : additionalPrice?.shipping_cost || "-"
          }
          loading={loading}
        />
        <CostData
          name={"Delivery Est"}
          type={"tax-data"}
          price={
            additionalPrice && Object.keys(additionalPrice)?.length === 0
              ? "-"
              : additionalPrice?.shipping_name
          }
          loading={loading}
        />
        <CostData
          loading={loading}
          name={"Total"}
          type={"bold_text"}
          price={
            cartData.length > 0 && Object.keys(additionalPrice).length === 0
              ? cartDetailData?.total_payable
              : additionalPrice?.total_payable || "-"
          }
        />
      </div>
    </div>
  );
};

export default ProductViewMobile;
