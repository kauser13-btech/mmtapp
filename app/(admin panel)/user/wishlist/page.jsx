import TopNavigation from "@/app/components/user/global/TopNavigation";
import WishTableList from "@/app/components/user/wishlist/WishTableList";
import React from "react";
const pageWishList = () => {
  return (
    <div>
      <header>
        <TopNavigation title={"Wishlist"} />
      </header>
      <div className="">
        <div className="">
          <WishTableList />
        </div>
      </div>
    </div>
  );
};

export default pageWishList;
