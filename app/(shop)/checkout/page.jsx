"use client";
import CustomerInfo from "@/app/components/checkout/CustomerInfo";
import ProductView from "@/app/components/checkout/ProductView";
import FullPageLoader from "@/app/components/global/FullPageLoader";
import { useState } from "react";

const CheckoutPage = () => {
  const [additionalPrice, setAdditionalPrice] = useState({});

  const [loading, setLoading] = useState(false);
  const adjustTaxPrice = (value) => {
    setAdditionalPrice(value);
  };
  const loadingStarted = (value) => {
    setLoading(value);
  };
  return (
    <>
      {/* style={{ background: 'linear-gradient(to right, white 50%, rgb(247 247 247) 50%)' }} */}
      <div className="my-container top-bottom-padding ">
        <div className="flex max-xl:items-center max-xl:flex-col-reverse justify-center gap-8 xl:gap-20 min-w-full">
          <CustomerInfo
            adjustTaxPrice={adjustTaxPrice}
            loadingStarted={loadingStarted}
            loading={loading}
            additionalPrice={additionalPrice}
          />
          <ProductView adjustTaxPrice={adjustTaxPrice} additionalPrice={additionalPrice} loading={loading} />
        </div>
      </div>
      {loading && <FullPageLoader/>}
    </>
  );
};

export default CheckoutPage;
