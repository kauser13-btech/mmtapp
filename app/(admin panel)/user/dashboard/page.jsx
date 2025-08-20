"use client";
import TopNavigation from "@/app/components/user/global/TopNavigation";
import React from "react";
import OrderDetail from "@/app/components/user/dashboard/OrderDetailList";
import DeliveryDate from "@/app/components/user/dashboard/DeliveryDate";
import useGetCurrentUser from "@/app/hooks/useGetCurrentUser";
const pageDashboard = () => {
  const userName = useGetCurrentUser();
  return (
    <div className="bg-[#f8f8f8] h-screen overflow-y-auto hideScroll">
      <header>
        <TopNavigation title={"Dashboard"} />
      </header>
        <div className="max-w-[1330px] m-auto py-10 px-10">
          {userName && <h2 className="text-4xl font-medium">Hi, {userName}!</h2>}
          <h3 className="text-xl mt-[5px] font-normal">Welcome to your account</h3>
          <p className="mt-11 mb-[23px] text-[#5e5d72] font-semibold text-base">Your latest order</p>
          <OrderDetail />
          {/* <DeliveryDate /> */}
        </div>
    </div>
  );
};

export default pageDashboard;
