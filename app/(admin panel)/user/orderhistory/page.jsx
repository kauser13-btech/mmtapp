import TopNavigation from "@/app/components/user/global/TopNavigation";
import OrderTableList from "@/app/components/user/order_history/OrderTableList";
import React from "react";
const pageOrderHistory = () => {
  return (
    <div className="h-screen bg-[#f8f8f8] overflow-y-auto">
      <header>
        <TopNavigation title={"Order History"} />
      </header>

      <div className="pt-[40px] bg-[#f8f8f8] ">
        <OrderTableList />
      </div>
    </div>
  );
};

export default pageOrderHistory;
