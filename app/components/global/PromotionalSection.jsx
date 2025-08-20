"use client";
import ApiCall from "@/app/util/ApiCall";
import { useEffect, useState } from "react";
import PromotionalCard from "./promotionalCard/PromotionalCard";
import { usePathname } from "next/navigation";
const PromotionalSection = ({ queryData }) => {
  const pathname = usePathname();
  const { performGet } = ApiCall();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const promotionData = [
    {
      id: 1,
      title: "Why MatchMyTees",
      description:
        "MatchMyTees offers sneaker-matching t-shirts for all sneaker brands including Nike, Yeezy, Adidas, New Balance & more",
      image: "/images/promotional/promotion1.png",
      explore: false,
      gradient: "linear-gradient(115deg, #95E0E8 16.01%, #CDFEE1 70.42%)",
    },
    {
      id: 2,
      title: `${pathname !== "/product/" ? data[1]?.title : queryData[1]?.title} Sneaker Matching T-Shirt`,
      image: "/images/promotional/promotion2.png",
      explore: false,
      gradient: "linear-gradient(115deg, #95E0E8 16.01%, #CDFEE1 70.42%)",
    },
    {
      id: 3,
      title: `${pathname !== "/product/" ? data[0]?.title : queryData[0]?.title} Matching Shirts`,
      description:
        pathname !== "/product/"
          ? data[0]?.description
          : queryData[0]?.description,
      image: pathname !== "/product/" ? data[0]?.image_url : queryData[0]?.image,
      explore: true,
      gradient: "linear-gradient(107deg, #CDFEE1 20.06%, #95E0E8 84.5%)",
    },
    {
      id: 4,
      title: `Match Your  ${pathname !== "/product/" ? data[1]?.title : queryData[1]?.title}`,
      description:
        pathname !== "/product/"
          ? data[1]?.description
          : queryData[1]?.description,
      image: pathname !== "/product/" ? data[1]?.image_url ?? "/images/promotional/promotion4.png" : queryData[1]?.image,
      explore: true,
      gradient: "linear-gradient(150deg, #CDFEE1 51.22%, #95E0E8 100%)",
    },
    {
      id: 5,
      title: pathname !== "/product/" ? "1000+ designs" : queryData[2]?.title,
      description:
        pathname !== "/product/"
          ? `More Than Thousands of Designs To Match Your ${data[0]?.title}.`
          : queryData[2]?.description,
      image:
        pathname !== "/product/"
          ? "/images/promotional/promotion5.png"
          : queryData[2]?.image,
      explore: pathname !== "/product/"
        ? false
        : true,
      gradient: "linear-gradient(137deg, #CDFEE1 5.76%, #95E0E8 55.96%)",
    },
  ];

  const getPromotionData = async () => {
    const response = await performGet(
      `api/v1/get-description?brand=${queryData.brand_id}&model=${queryData.model_id}&product_type=${queryData.product_id}&sub_model_category=${queryData.sub_model_category_id}`
    );

    if (response.success) {
      setData(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (pathname !== "/product/") {
      getPromotionData();
    }
  }, []);
  return (
    <div className="my-container top-bottom-margin py-5 pb-10 grid md:grid-rows-3 md:grid-cols-2 xl:grid-rows-2 xl:grid-cols-3 gap-4 xl:gap-6 ">
      {promotionData.map((item, index) => (
        <PromotionalCard
          key={index}
          data={item}
          isLoading={isLoading}
          customStyle={index == 0 ? "row-span-2" : ""}
          pathname={pathname}
        />
      ))}
    </div>
  );
};

export default PromotionalSection;
