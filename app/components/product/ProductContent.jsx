"use client";
import React, { useEffect, useRef, useState } from "react";
import BreadcrumbResponsive from "@/app/components/global/BreadcrumbResponsive";
import ProductContainer from "@/app/components/product/ProductContainer";
import ProductImageContainer from "@/app/components/product/ProductImageContainer";
import ProductDetailsTab from "@/app/components/product/ProductDetailsTab";
import { useSearchParams, usePathname } from "next/navigation";
import ApiCall from "@/app/util/ApiCall";
import dynamic from 'next/dynamic';
// import DesignCollection from "@/app/components/product/MoreDesignCollection/DesignCollection";
const DesignCollection = dynamic(() => import('@/app/components/product/MoreDesignCollection/DesignCollection'));
import PromotionalSection from "@/app/components/global/PromotionalSection";
import Head from "next/head";
import { sendGTMEvent } from '@next/third-parties/google';
import Service from "./Service";





const ProductContent = () => {
  const pathname = usePathname(); // Get the current path
  const canonicalUrl = `https://matchmytees.com${pathname}`;
  const searchParams = useSearchParams();
  const queryParams = {
    type: searchParams.get("type"),
    color: searchParams.get("color"),
    sneaker: searchParams.get("sneaker"),
    design: searchParams.get("design"),
  };
  const { performGet } = ApiCall();
  const [data, setData] = useState([]);
  const [colorChange, setColorChange] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sneakerChange, setSneakerChange] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [changeImageIndex, setChangeImageIndex] = useState(0);
  const [imageLoadedArray, setImageLoadedArray] = useState(
    Array(4).fill(false)
  );
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const initialRender = useRef(true);

  const gtmEvent=(data)=>{

    sendGTMEvent({ event: 'view_item', currency: "USD", value:data.price, 
      items: [{
        item_id: `D${data.design.id}S${data.sneaker.id}P${searchParams.get("type")=="T-shirt"?1:2}`,
        item_name: `${data.sneaker.title} ${data.design.title} Matching ${searchParams.get("type")}`,
        // discount: 2.22,
        item_brand: data.sneaker.brand.title,
        item_category: data.sneaker.sub_model_category.title,
        item_variant: data.color,
        price: data.price

      }] 
    });
    if(window.klaviyo){
      window.klaviyo.push(['track', 'Viewed Product', {
        "Title": `${data.sneaker.title} ${data.design.title} Matching ${searchParams.get("type")}`,
        "ItemId": `D${data.design.id}S${data.sneaker.id}P${searchParams.get("type")=="T-shirt"?1:2}`,
        "Categories": data.sneaker.sub_model_category.title,
        "ImageUrl": data.image_urls.length?data.image_urls[0].url:'',
        "Url": window.location.href,
        "Metadata": {
          "Brand": data.sneaker.brand.title,
          "Price": data.price,
          "CompareAtPrice": data.price
        }
      }]);
    }

  }

  const getProductDetails = async () => {
    if(!(sneakerChange || queryParams.sneaker)) return;

    setIsLoading(true);
    setImageLoaded(true);
    setChangeImageIndex(0);
    setImageLoadedArray(Array(4).fill(false));
    const response = await performGet(
      `api/v1/view-product?type=${queryParams.type}&color=${colorChange !== "" ? colorChange : queryParams.color
      }&sneaker=${sneakerChange !== "" ? sneakerChange : queryParams.sneaker
      }&design=${queryParams.design}`
    );
    if (response.success) {
      setData(response.data);
      gtmEvent(response.data);
      if (typeof window !== 'undefined') {
        document.getElementsByTagName("title")[0].text=response.data.title.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) + " | MatchMyTees";
        document.getElementsByName("description")[0].content="Order your favorite " + response.data.title.toLowerCase()+ " from MatchMyTees. 100% color match guarantees. Save up to 46% off.";
        document.getElementsByName("keywords")[0].content=response.data.sneaker?.brand.title + " " + response.data.sneaker?.model.title.toLowerCase()+ " Sneakers Tees, " + response.data.sneaker?.brand.title+ " Sneakers Match Tshirt, " + response.data.sneaker?.brand.title+ " matching shirts, " + response.data.sneaker?.brand.title+ " matching Outfit ";
        document.querySelector('link[rel="canonical"]').setAttribute("href", window.location.href);
        }
      setIsLoading(false);
    }
  };

  const handleChangeSneaker = (sneaker) => {
    setSneakerChange(sneaker);

    document.getElementById("outfit_category_modal").close();
  };

  const handleColorChange = (color) => {
    setColorChange(color);
  };

  const handleImageLoaded = (bool) => {
    setImageLoaded(bool);
  };

  const handleArrayImageLoaded = (index) => {
    setImageLoadedArray((prevImageLoaded) => {
      const newImageLoaded = [...prevImageLoaded];
      newImageLoaded[index] = true;
      return newImageLoaded;
    });
  };
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      getProductDetails();
    }
  }, [colorChange, sneakerChange]);

  const promotionalData = [
    {
      id: 1,
      title: data?.sneaker?.brand?.title ?? "Demo Title",
      description: data?.sneaker?.brand?.description ?? "Demo Description",
      image:
        data?.sneaker?.brand?.asset?.image_url ??
        "/images/promotional/promotion1.png",
    },
    {
      id: 2,
      title: data?.sneaker?.model?.length
        ? data?.sneaker?.model?.title
        : data?.sneaker?.sub_model_category?.title,
      description: data?.sneaker?.description ?? "Demo Description",
      image:
        data?.sneaker?.sneaker_image?.image_url ??
        "/images/promotional/promotion1.png",
    },
    {
      id: 3,
      title: data?.design?.title ?? "Demo Title",
      description:
        data?.design?.description ??
        `More Than Thousands of Designs To Match Your ${data?.sneaker?.brand?.title}.`,
      image: data?.design?.image_url ?? "/images/promotional/promotion1.png",
    },
  ];

  useEffect(() => {
    if (childRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const childRect = childRef.current.getBoundingClientRect();

      const offset = childRect.top - parentRect.top;

      if (
        parentRef.current.scrollTop > 0 ||
        offset + childRect.height > parentRect.height
      ) {
        const scrollValue = changeImageIndex < 2 ? 0 : offset;
        parentRef.current.scrollTo({
          top: scrollValue,
          behavior: "smooth",
        });
      }
    }
  }, [changeImageIndex]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      getProductDetails();
    }
  }, [searchParams]);
  return (
    <>
      <Head>
        <title>My page title</title>
        {/* <meta property="og:title" content="My page title" key="title" /> */}
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.title,
          "image": data && data.image_urls ? data.image_urls[0].url:'',
          "description": "Perfectly matches with your Jordans. High-quality material.",
          "sku": data.design ? `D${data.design.id}S${data.sneaker.id}P${searchParams.get("type")=="T-shirt"?1:2}` : '',
          "brand": {
            "@type": "Brand",
            "name": 'MatchMyTees'
          },
          // "offers": {
          //   "@type": "Offer",
          //   "url": data.sneaker ? `https://matchmytees.com/product/?type=${data.type}&color=${data.color}&sneaker=${data.sneaker.slug}&design=${data.design.slug}`:'',
          //   "priceCurrency": "USD",
          //   "price": data.price,
          //   "itemCondition": "https://schema.org/NewCondition",
          //   "availability": "https://schema.org/InStock"
          // },
          "offers": [
            {
              "@type": "Offer",
              "url": data.sneaker ? `https://matchmytees.com/product/?type=${data.type}&color=${data.color}&sneaker=${data.sneaker.slug}&design=${data.design.slug}`:'',
              "priceCurrency": "USD",
              "price": data.price ? (parseFloat(data.price.replace(/[^\d.]/g, ''))):0,
              // "priceValidUntil": "2025-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "url": data.sneaker ? `https://matchmytees.com/product/?type=${data.type}&color=${data.color}&sneaker=${data.sneaker.slug}&design=${data.design.slug}`:'',
              "priceCurrency": "USD",
              "price": '59.99',
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "500"
          }
        })}} />
        <BreadcrumbResponsive
          title={`Home > ${queryParams.type} > ${data.title || ""}`}
        />
        <div className="grid gap-7 md:gap-5 xl:gap-12 w-full h-full md:px-[40px] md:grid-cols-2 lg:grid-cols-[1fr_415px] xl:grid-cols-[1fr_558px] my-container pt-0 sm:pt-[30px]">
          <ProductImageContainer
            data={data}
            isLoading={isLoading}
            handleChangeSneaker={handleChangeSneaker}
            imageLoaded={imageLoaded}
            imageLoadedArray={imageLoadedArray}
            handleArrayImageLoaded={handleArrayImageLoaded}
            handleImageLoaded={handleImageLoaded}
            changeImageIndex={changeImageIndex}
            setChangeImageIndex={setChangeImageIndex}
          />
          <ProductContainer
            data={data}
            queryParams={queryParams}
            isLoading={isLoading}
            handleColorChange={handleColorChange}
            setColorChange={setColorChange}
          />
          <ProductDetailsTab
            data={data}
            isLoading={isLoading}
            customClass="md:col-span-2 lg:hidden"
          />
        </div>
        <Service/>
        {imageLoaded && !isLoading &&
        <DesignCollection
          data={data?.similar_designs ?? []}
          isLoading={isLoading}
          imageLoaded={imageLoadedArray}
          handleImageLoaded={handleArrayImageLoaded}
          type="similar_design"
        />}
        <PromotionalSection queryData={promotionalData} />
      </div>
    </>
  )
}

export default ProductContent