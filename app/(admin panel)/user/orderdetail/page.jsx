import TopNavigation from "@/app/components/user/global/TopNavigation";
import React, { Suspense } from "react";
import OrderDetail from "@/app/components/user/order_detail/OrderDetail";
const OrderDetailPage = () => {
  return (
    <div className="h-screen bg-[#f8f8f8] overflow-y-auto hideScroll">
      <header>
        <TopNavigation title={"Order History"} />
      </header>

      <div className="pt-[40px] bg-[#f8f8f8]">
        <Suspense><OrderDetail /></Suspense>
      </div>
    </div>
  );
};

export default OrderDetailPage;
