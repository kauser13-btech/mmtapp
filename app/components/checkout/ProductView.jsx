fimport { useCart } from "@/app/context/CartContext";
import React, { useEffect, useState } from "react";
import CartItems from "../global/navbar/addtocart/CartItems";
import Cookies from "js-cookie";
import DiscountSection from "./DiscountSection";
import { toast } from "react-toastify";
import CostData from "./CostData";
import ApiCall from "@/app/util/ApiCall";
import { sendGTMEvent } from '@next/third-parties/google';
import Sticker from "../global/Sticker";

const { performPost } = ApiCall();
const ProductView = ({ adjustTaxPrice, additionalPrice, loading }) => {
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

  const [discount, setDiscount] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const applyCoupon=async ()=>{

    const couponData = {
      uid: cartDetailData.uid,
      coupon: coupon
    };
    const res = await performPost(
      `api/v1/apply-coupon`,
      couponData
    );
    
    if (res.success) {
      fetchCartData()
      toast.success(res.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
      });
    }else{
      toast.success("Coupon not valid", {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
      });
    }
  };

  const gtmEvent=()=>{
    if(cartData.length){
      let items=[];
      cartData.forEach(data => {
        items.push({
          item_id: `D${data.design_id}S${data.sneaker_id}P${data.type=="T-shirts"?1:2}`,
          item_name: `${data.sneaker} ${data.design} Matching ${data.type}`,
          // discount: 2.22,
          // item_brand: data.sneaker.brand.title,
          // item_category: data.sneaker.sub_model_category.title,
          item_variant: data.product_color,
          price: data.total_price,
          item_variant: data.product_color,
          quantity: data.quantity

        })
      });
      sendGTMEvent({ event: 'begin_checkout', currency: "USD", value:cartDetailData.total_payable, 
        items
      });  
      if(window.klaviyo){
        let items2=[];
        let price=0;
        let names=[];
        cartData.forEach(data => {
          names.push(`${data.sneaker} ${data.design} Matching ${data.type}`);
          price=price+parseFloat(data.total_price.replace('$', ''));
          items2.push({
            "ProductID": `D${data.design_id}S${data.sneaker_id}P${data.type=="T-shirts"?1:2}`,
            "SKU": `D${data.design_id}S${data.sneaker_id}P${data.type=="T-shirts"?1:2}`,
            "ProductName": `${data.sneaker} ${data.design} Matching ${data.type}`,
            "Quantity": data.quantity,
            "ItemPrice": data.total_price,
            "RowTotal": data.total_price,
            // "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": data.image,
            // "ProductCategories": ["Fiction", "Children"]
          })
        });

        window.klaviyo.push(["track", "Started Checkout", {
          "$value": price,
          // "AddedItemProductName": "A Tale of Two Cities",
          // "AddedItemProductID": "1112",
          // "AddedItemSKU": "TALEOFTWO",
          // "AddedItemCategories": ["Fiction", "Classics", "Children"],
          // "AddedItemImageURL": "http://www.example.com/path/to/product/image2.png",
          // "AddedItemURL": "http://www.example.com/path/to/product2",
          "AddedItemPrice": price,
          "AddedItemQuantity": items2.length,
          "ItemNames": names,
          "CheckoutURL": "https://matchmytees.com/checkout",
          "Items": items2
        }]);
      }

    }
     
  }

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
  useEffect(()=>{
    gtmEvent()
  },[cartData]);

  useEffect(() => {
    adjustTaxPrice({
      tax: cartDetailData.tax,
      shipping_cost: cartDetailData.shipping_cost,
      shipping_name: cartDetailData?.shipping_details?.shipping_name,
      total_payable: cartDetailData.total_payable,
    })
    setDiscount(cartDetailData.coupon_discount);
  }, [cartDetailData]);
  return (
    <div className="w-full h-fit  flex flex-col gap-6">
    <div className=" max-w-[665px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] max-sm:p-4 py-12 px-[60px] rounded-[13px]">
      {cartData.length > 0 && (
        <div className="flex flex-col gap-5">
          <CartItems
            cartData={cartData}
            handleQuantity={handleQuantity}
            isCartUpdate={isCartUpdate}
            removeCart={removeCart}
            getCartToken={getCartToken}
            handleRemoveCartData={handleRemoveCartData}
            handleIsCartUpdate={handleIsCartUpdate}
            type="checkout"
            padding="p-0"
          />
        </div>
      )}
      {/* <DiscountSection /> */}
      <div className="flex flex-col gap-3">
        <div className="join gap-0.5">
          <input onChange = {(event)=> setCoupon(event.target.value)} className="border border-[#B1B5B8] px-2 join-item w-full focus:outline focus:outline-[#00A6AC]" placeholder="Please enter your coupon code"/>
          <button className="btn join-item bg-gray-300 text-dark hover:bg-gray-300/80 active:bg-gray-300/90 border-0 " onClick={applyCoupon}>Apply Coupon</button>
        </div>
        <CostData
          name={"Subtotal"}
          type={"secondary"}
          price={(cartData.length > 0 && cartDetailData.total_price) || "-"}
        />
        {discount && <CostData
          name={"Coupon Discount"}
          type={"secondary"}
          price={(discount.length > 0 && discount) || "0"}
        />}
        <CostData
          name={"Tax"}
          type={"tax-data"}
          price={
            cartData.length > 0 && Object.keys(additionalPrice).length === 0
              ? cartDetailData.tax
              : additionalPrice.tax || "-"
          }
          loading={loading}
        />
        <CostData
          name={"Shipping cost"}
          type={"tax-data"}
          price={
            cartData.length > 0 && Object.keys(additionalPrice).length === 0
              ? cartDetailData.shipping_cost
              : additionalPrice.shipping_cost || "-"
          }
          loading={loading}
        />
        <CostData
          name={"Delivery Est"}
          type={"tax-data"}
          price={
            Object.keys(additionalPrice).length === 0
              ? "-"
              : additionalPrice.shipping_name
          }
          loading={loading}
        />
        <CostData
          loading={loading}
          name={"Total"}
          type={"bold_text"}
          price={
            cartData.length > 0 && Object.keys(additionalPrice).length === 0
              ? cartDetailData.total_payable
              : additionalPrice.total_payable || "-"
          }
        />

        {/* <div className="bg-transparent lg:bg-white rounded-lg max-w-[364px] flex flex-col gap-2">
          <h3 className="font-medium text-base text-title-work-card">Coupon</h3>
          <form className="flex h-12 border border-border-primary rounded-[8px] max-lg:bg-white">
            <input type="text"
                placeholder="Enter coupon code" 
                name="email" 
                className="bg-transparent  size-full focus:outline-none px-3"
              />
            <button className="btn btn-sm h-[46px] bg-orange-primary border-none hover:bg-orange-primary/80 active:bg-orange-primary/90">
             Apply
            </button>
          </form>
        </div> */}
      </div>
    </div>
   <div className="max-w-[665px]">
    <Sticker extraClass="py-5" />
   </div>
    </div>
  );
};

export default ProductView;
