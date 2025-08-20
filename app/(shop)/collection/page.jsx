"use client";
import { ProductContainer } from "@/app/components/collection/ProductContainer";
import CustomerReviews from "@/app/components/global/CustomerReviews";
import PromotionalSection from "@/app/components/global/PromotionalSection";
import { useCloset } from "@/app/context/ClosetContex";
import useToggle from "@/app/hooks/useToggle";
import ApiCall from "@/app/util/ApiCall";
import { useRouter } from 'next-nprogress-bar';
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import Search from "../../components/collection/Search";
import Sidebar from "../../components/collection/Sidebar";
import TailwindDrawer from "@/app/components/global/drawerMenu/TailwindDrawer";
import Category from "@/app/components/collection/Category";
import BreadcrumbResponsive from "@/app/components/global/BreadcrumbResponsive";
import CollectionPagePromotionCard from "@/app/components/global/promotionalCard/CollectionPagePromotionCard";
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { sendGTMEvent } from '@next/third-parties/google';



const CollectionPage = () => {
  const { isClosetOpen, toggleCloset } = useCloset();
  const searchParams = useSearchParams();
  const { isOpen, toggle } = useToggle();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const queryParams = {
    brand_id: searchParams.get("brand"),
    model_id: searchParams.get("model"),
    product_id: searchParams.get("product_type"),
    sub_model_category_id: searchParams.get("sub_model_category"),
    sneaker_id: searchParams.get("sneaker"),
    design_id: searchParams.get("designs"),
  };

  const [isLoading, setIsLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(12);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [data, setData] = useState([]);
  const { performGet, performPost } = ApiCall();
  const [colorList, setColorList] = useState([]);
  // const [sneakerList, setSneakerList] = useState([]);
  const [sneakerList, setSneakerList] = useState([]);
  const [productType, setProductType] = useState("");
  // const [fetchingColor, setFetchingColor] = useState("");
  // var fetchingColor = "";
  const fetchingColor = useRef(null);

  const getLastFilterColorValue=()=>{
    return fetchingColor.current;
  }
  const fetchProduct = async (colorList) => {
    setIsLoading(true);
    setImageLoaded(Array(displayedItems).fill(false));
    setData([]);
    let response;
    const colorString = colorList.join(",").toLowerCase();
    fetchingColor.current=colorString;
    if (queryParams.sneaker_id) {
      let popularSneakers = {
        sneakers: sneakerList.length !== 0 ? sneakerList : queryParams.sneaker_id,
        product_types: productType === "" ? queryParams.product_id : productType,
        product_colors: colorString,
        designs: queryParams.design_id,
      }
      response = await performPost(
        `api/v1/collections`, popularSneakers
      );
      if (response.success) {
        if(getLastFilterColorValue()==colorString){
          console.log("wil change")
          setData(response.data);
          setIsLoading(false);
        }
        // setData(response.data);
      }
    } else {
      const res=null;
      // const res = await performGet(
      //   `api/v1/sneaker-by-category?brand=${queryParams.brand_id
      //   }&sub_model_category&model=${queryParams.model_id || ""}`
      // );
      const slugs = res && res.data ? res.data.map((item) => item.slug):[];
      const sneakerListSlug = slugs.join(",");

      let sneakers = {
        sneakers: sneakerList.length !== 0 ? sneakerList : sneakerListSlug,
        product_types: productType === "" ? queryParams.product_id : productType,
        product_colors: colorString,
        designs:  queryParams.design_id,
      };
      response = await performPost(
        `api/v1/collections`, sneakers
      );
      if (response.success) {
        setData(response.data);
        setIsLoading(false);
      }
    }
  }


  const gtmEvent=(productItems)=>{
    let items=[];
    let pType=productType === "" ? queryParams.product_id : productType;
    productItems.forEach((data)=>{
      items.push({
        item_id: `D${data.design_id}S${data.sneaker_info.id}P${pType=="T-shirt"?1:2}`,
        item_name: `${data.sneaker_info.sneaker_title} ${data.design} Matching ${data.type}`,
        // discount: 2.22,
        item_brand: data.sneaker_info.sneaker_brand,
        item_category: data.sneaker_info.sneaker_sub_model_category,
        item_variant: data.color,
        price: data.price

      })
    })
    if(items.length>0){
      sendGTMEvent({ event: 'view_item_list', item_list_name: queryParams.sneaker_id,
        items
      });
    }
  }


  useEffect(() => {
    fetchProduct(colorList);
    if (typeof window !== 'undefined') {
      if(searchParams.get('product_type')=="T-shirt"){
        document.getElementsByTagName("title")[0].text="Best matching T-shirt with your sneakers |MatchMyTees";
        document.getElementsByName("description")[0].content="MatchMyTees offers sneaker-matching designer t-shirts for all sneaker brands including Nike, Jordan, Puma, Yeezy, Adidas, New Balance .Buy now & save 46%.";
      }
      else if(searchParams.get('product_type')=="Hoodie"){
        document.getElementsByTagName("title")[0].text="Shop Custom Matching Hoodies for Sneakers | MatchMyTees";
        document.getElementsByName("description")[0].content="Boost your sneaker style with our custom matching hoodies, designed for your favorite kicks. Explore brands like Adidas, Nike & Jordan. Shop now and save Up to 46%";
      }
      document.querySelector('link[rel="canonical"]').setAttribute("href", window.location.href);
    }
  }, [colorList, queryParams.sneaker_id, sneakerList, productType, searchParams]);

  const [imageLoaded, setImageLoaded] = useState(Array(12).fill(false));

  const handleImageLoaded = useCallback((index) => {
    setImageLoaded((prevImageLoaded) => {
      const newImageLoaded = [...prevImageLoaded];
      newImageLoaded[index] = true;
      return newImageLoaded;
    });
  }, []);

  const loadMore = useCallback(() => {
    setIsLoadMore(true);
    setDisplayedItems((prevItem) => {
      const newItemsCount = 12;
      setImageLoaded((prevImageLoaded) => [
        ...prevImageLoaded,
        ...Array(newItemsCount).fill(false),
      ]);
      return prevItem + newItemsCount;
    });
    setIsLoadMore(false);
  }, []);

  const changeColorByUrl = (color) => {
    setColorList((prevColorList) => {
      const colorExists = prevColorList.includes(color);
      if (colorExists) {
        return prevColorList.filter((prevColor) => prevColor !== color);
      } else {
        return [...prevColorList, color];
      }
    });
    setDisplayedItems(12);
  };

  const handleChangeSneaker = (sneaker) => {
    // setSneakerList((prevData) => [...prevData, sneaker]);
    setSneakerList(sneaker);
    toggle();
  };

  const handleChangeProduct = (type) => {
    setColorList([]);
    setDisplayedItems(12);
    setProductType(type);
  };

  const displayedData = data.slice(0, displayedItems);

  useEffect(() => {
    gtmEvent(displayedData);
  },[displayedData])

  const [productTypeData, setProductTypeData] = useState([]);
  // const [data, setData] = useState([]);
  const [colorData, setColorData] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  const { data: productTypes } = useSelector(state => state.productTypes);
  // const fetchProductDetails = async () => {
  //   setSidebarLoading(true);
  //   const response = await performGet(`api/v1/product-types`);
  //   if (response.status_code === 200) {
  //     setProductTypeData(response.data);
  //     setSidebarLoading(false);
  //   }
  // };

  useEffect(() => {
    // fetchProductDetails();
    setProductTypeData(productTypes);
    setSidebarLoading(false);
  }, []);

  useEffect(() => {
    let productName=productType?productType:(queryParams.product_id?queryParams.product_id:"T-shirt");
    if (!sidebarLoading) {
      const initialColorData = productTypeData.find(
        (product) => product.type === productName
      );
      if (initialColorData) {
        const sortedColorData = initialColorData.product_colors.slice().sort((a, b) => {
          return a.color_name.localeCompare(b.color_name);
        });
        setColorData(sortedColorData);
      }
    }
  }, [sidebarLoading, queryParams.product_id, productTypeData, setColorData]);




  const handleProduct = (id, type) => {
    handleChangeProduct(type);
    const colors = productTypeData.find((product) => product.id === id);
    setColorData(colors.product_colors);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setIsOpenSidebar(false);
  }, [searchParams, colorList]);

  //filter unique brands
  const addedSneakerBrands = [];
  const uniqueSneakerInfoData = [];
  const sneakerInfo = data.map(item => item.sneaker_info);
  sneakerInfo.forEach(item => {
    if (!addedSneakerBrands.includes(item.sneaker_title)) {
      addedSneakerBrands.push(item.sneaker_title);
      uniqueSneakerInfoData.push(item);
    }
  });

  const manipulatedData = {};

  uniqueSneakerInfoData.forEach(sneaker => {
    const brandName = sneaker.sneaker_brand.toLowerCase();
    const { sneaker_brand, ...sneakerDataWithoutBrand } = sneaker;

    if (!manipulatedData[brandName]) {
      manipulatedData[brandName] = [];
    }

    manipulatedData[brandName].push(sneakerDataWithoutBrand);
  });

  return (
    <>
      <BreadcrumbResponsive
        title={"Home > " + productType && "Home > " + queryParams.product_id +'s'}
      />
      <div className="flex flex-col gap-5 md:flex-row md:gap-x-10 my-container md:mt-11 mb-32">
        {/*  h-[120vh] sticky top-32 */}
        <div className="max-md:hidden">
          <Sidebar
            productData={productTypeData}
            handleProduct={handleProduct}
            createQueryString={createQueryString}
            productType={productType}
            colorData={colorData}
            changeColorByUrl={changeColorByUrl}
            queryParams={queryParams}
            router={router}
            pathname={pathname}
            selectedColor={colorList}
          />
        </div>
        <div className="flex w-full flex-col gap-4 top-bottom-margin mt-0 md:gap-5">
          <Category
            isLoading={sidebarLoading}
            data={productTypeData}
            handleProduct={handleProduct}
            createQueryString={createQueryString}
            productType={productType}
            queryParams={queryParams}
            router={router}
            pathname={pathname}
          />
          <div className="flex w-full gap-5">
            <Search
              type="collection"
              handleChangeSneaker={handleChangeSneaker}
              isOpen={isOpen}
              toggle={toggle}
            />
            <button className="md:hidden">
              {searchDrawerIcon(isOpenSidebar, setIsOpenSidebar)}
            </button>
            <button
              onClick={() => toggleCloset(!isClosetOpen)}
              className="shadow-[0_0px_10px_rgba(0,0,0,0.1)] min-w-[143px] h-[52px] xl:h-full xl:min-w-[243px] max-md:hidden justify-between rounded-md px-3 items-center gap-x-1 sm:py-2.5
                lg:py-[15px] xl:w-[308px] leading-none text-neutral-400 capitalize !font-normal group hover:!border-none hover:!bg-slate-200"
            >
              <div className="flex items-center justify-center gap-4">
                <svg className="max-xl:hidden" width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.4125 0H11.6C6.13205 0 3.39735 -1.78096e-07 1.6994 1.75094C-1.72853e-07 3.50039 0 6.31802 0 11.9518V14.9398C0 20.5735 -1.72853e-07 23.3912 1.6994 25.1406C2.14421 25.5963 2.67666 25.951 3.2625 26.1819V29.8795C3.2625 30.1767 3.37708 30.4617 3.58102 30.6718C3.78497 30.882 4.06158 31 4.35 31C4.63842 31 4.91503 30.882 5.11898 30.6718C5.32292 30.4617 5.4375 30.1767 5.4375 29.8795V26.6988C6.989 26.8916 8.9813 26.8916 11.6 26.8916H13.4125V0ZM10.15 9.33735C10.4384 9.33735 10.715 9.4554 10.919 9.66553C11.1229 9.87566 11.2375 10.1607 11.2375 10.4578V16.4337C11.2375 16.7309 11.1229 17.0159 10.919 17.226C10.715 17.4362 10.4384 17.5542 10.15 17.5542C9.86158 17.5542 9.58497 17.4362 9.38102 17.226C9.17708 17.0159 9.0625 16.7309 9.0625 16.4337V10.4578C9.0625 10.1607 9.17708 9.87566 9.38102 9.66553C9.58497 9.4554 9.86158 9.33735 10.15 9.33735ZM15.5875 26.8916H17.4C20.0187 26.8916 22.011 26.8916 23.5625 26.6988V29.8795C23.5625 30.1767 23.6771 30.4617 23.881 30.6718C24.085 30.882 24.3616 31 24.65 31C24.9384 31 25.215 30.882 25.419 30.6718C25.6229 30.4617 25.7375 30.1767 25.7375 29.8795V26.1819C26.3233 25.951 26.8558 25.5963 27.3006 25.1406C29 23.3912 29 20.5735 29 14.9398V11.9518C29 6.31802 29 3.50039 27.3006 1.75094C25.6026 -1.78096e-07 22.868 0 17.4 0H15.5875V26.8916ZM18.85 9.33735C19.1384 9.33735 19.415 9.4554 19.619 9.66553C19.8229 9.87566 19.9375 10.1607 19.9375 10.4578V16.4337C19.9375 16.7309 19.8229 17.0159 19.619 17.226C19.415 17.4362 19.1384 17.5542 18.85 17.5542C18.5616 17.5542 18.285 17.4362 18.081 17.226C17.8771 17.0159 17.7625 16.7309 17.7625 16.4337V10.4578C17.7625 10.1607 17.8771 9.87566 18.081 9.66553C18.285 9.4554 18.5616 9.33735 18.85 9.33735Z" fill="#474747" />
                </svg>
                <p className="w-[114.48px]"><span className="group-hover:hidden md:text-sm xl:text-base text-sub-work-card">Select sneakers</span> <span className="hidden group-hover:block group-hover:text-title-work-card md:text-sm xl:text-base self-start">Open Closet</span></p>
              </div>
            </button>
          </div>
          <ProductContainer
            handleImageLoaded={handleImageLoaded}
            imageLoaded={imageLoaded}
            isLoading={isLoading}
            dataLength={data.length}
            data={displayedData}
            loadMore={loadMore}
          />
        </div>
      </div>
      {/* <PromotionalSection uniqueSneakerInfoData={uniqueSneakerInfoData} queryData={queryParams} /> */}
      <CollectionPagePromotionCard uniqueSneakerInfoData={manipulatedData} />
      <CustomerReviews />
      <TailwindDrawer
        isOpen={isOpenSidebar}
        setIsOpen={setIsOpenSidebar}
        position="right"
        hideDrawerStyle="md:hidden"
      >
        <div className="px-5 py-6">
          <Sidebar
            isLoading={sidebarLoading}
            productData={productTypeData}
            handleProduct={handleProduct}
            createQueryString={createQueryString}
            productType={productType}
            colorData={colorData}
            changeColorByUrl={changeColorByUrl}
            queryParams={queryParams}
            router={router}
            pathname={pathname}
            selectedColor={colorList}
          />
        </div>
      </TailwindDrawer>
    </>
  );
};

export default CollectionPage;

export const searchDrawerIcon = (isOpenSidebar, setIsOpenSidebar) => {
  return (
    <div
      onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      className="shadow-md size-12 rounded-md p-1 flex items-center justify-center bg-white border border-solid border-gray-50"
    >
      <svg
        className="min-size-6"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4_5635)">
          <path
            d="M21 6.75H8.25C8.05109 6.75 7.86032 6.67098 7.71967 6.53033C7.57902 6.38968 7.5 6.19891 7.5 6C7.5 5.80109 7.57902 5.61032 7.71967 5.46967C7.86032 5.32902 8.05109 5.25 8.25 5.25H21C21.1989 5.25 21.3897 5.32902 21.5303 5.46967C21.671 5.61032 21.75 5.80109 21.75 6C21.75 6.19891 21.671 6.38968 21.5303 6.53033C21.3897 6.67098 21.1989 6.75 21 6.75Z"
            fill="#B1B5B8"
          />
          <path
            d="M5.25 6.75H3C2.80109 6.75 2.61032 6.67098 2.46967 6.53033C2.32902 6.38968 2.25 6.19891 2.25 6C2.25 5.80109 2.32902 5.61032 2.46967 5.46967C2.61032 5.32902 2.80109 5.25 3 5.25H5.25C5.44891 5.25 5.63968 5.32902 5.78033 5.46967C5.92098 5.61032 6 5.80109 6 6C6 6.19891 5.92098 6.38968 5.78033 6.53033C5.63968 6.67098 5.44891 6.75 5.25 6.75Z"
            fill="#B1B5B8"
          />
          <path
            d="M15.75 12.75H3C2.80109 12.75 2.61032 12.671 2.46967 12.5303C2.32902 12.3897 2.25 12.1989 2.25 12C2.25 11.8011 2.32902 11.6103 2.46967 11.4697C2.61032 11.329 2.80109 11.25 3 11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75Z"
            fill="#B1B5B8"
          />
          <path
            d="M8.25 18.75H3C2.80109 18.75 2.61032 18.671 2.46967 18.5303C2.32902 18.3897 2.25 18.1989 2.25 18C2.25 17.8011 2.32902 17.6103 2.46967 17.4697C2.61032 17.329 2.80109 17.25 3 17.25H8.25C8.44891 17.25 8.63968 17.329 8.78033 17.4697C8.92098 17.6103 9 17.8011 9 18C9 18.1989 8.92098 18.3897 8.78033 18.5303C8.63968 18.671 8.44891 18.75 8.25 18.75Z"
            fill="#B1B5B8"
          />
          <path
            d="M6.75 8.25C6.30499 8.25 5.86998 8.11804 5.49997 7.87081C5.12996 7.62357 4.84157 7.27217 4.67127 6.86104C4.50097 6.4499 4.45642 5.99751 4.54323 5.56105C4.63005 5.12459 4.84434 4.72368 5.15901 4.40901C5.47368 4.09434 5.87459 3.88005 6.31105 3.79323C6.74751 3.70642 7.1999 3.75097 7.61104 3.92127C8.02217 4.09157 8.37357 4.37996 8.62081 4.74997C8.86804 5.11998 9 5.55499 9 6C9 6.59674 8.76295 7.16903 8.34099 7.59099C7.91903 8.01295 7.34674 8.25 6.75 8.25ZM6.75 5.25C6.60167 5.25 6.45666 5.29399 6.33332 5.3764C6.20999 5.45881 6.11386 5.57594 6.05709 5.71299C6.00033 5.85003 5.98547 6.00083 6.01441 6.14632C6.04335 6.2918 6.11478 6.42544 6.21967 6.53033C6.32456 6.63522 6.4582 6.70665 6.60368 6.73559C6.74917 6.76453 6.89997 6.74968 7.03701 6.69291C7.17406 6.63615 7.29119 6.54002 7.3736 6.41668C7.45601 6.29334 7.5 6.14834 7.5 6C7.5 5.80109 7.42098 5.61032 7.28033 5.46967C7.13968 5.32902 6.94891 5.25 6.75 5.25Z"
            fill="#B1B5B8"
          />
          <path
            d="M17.25 14.25C16.805 14.25 16.37 14.118 16 13.8708C15.63 13.6236 15.3416 13.2722 15.1713 12.861C15.001 12.4499 14.9564 11.9975 15.0432 11.561C15.1301 11.1246 15.3443 10.7237 15.659 10.409C15.9737 10.0943 16.3746 9.88005 16.811 9.79323C17.2475 9.70642 17.6999 9.75097 18.111 9.92127C18.5222 10.0916 18.8736 10.38 19.1208 10.75C19.368 11.12 19.5 11.555 19.5 12C19.5 12.5967 19.2629 13.169 18.841 13.591C18.419 14.0129 17.8467 14.25 17.25 14.25ZM17.25 11.25C17.1017 11.25 16.9567 11.294 16.8333 11.3764C16.71 11.4588 16.6139 11.5759 16.5571 11.713C16.5003 11.85 16.4855 12.0008 16.5144 12.1463C16.5434 12.2918 16.6148 12.4254 16.7197 12.5303C16.8246 12.6352 16.9582 12.7067 17.1037 12.7356C17.2492 12.7645 17.4 12.7497 17.537 12.6929C17.6741 12.6361 17.7912 12.54 17.8736 12.4167C17.956 12.2933 18 12.1483 18 12C18 11.8011 17.921 11.6103 17.7803 11.4697C17.6397 11.329 17.4489 11.25 17.25 11.25Z"
            fill="#B1B5B8"
          />
          <path
            d="M9.75 20.25C9.30499 20.25 8.86998 20.118 8.49997 19.8708C8.12996 19.6236 7.84157 19.2722 7.67127 18.861C7.50097 18.4499 7.45642 17.9975 7.54323 17.561C7.63005 17.1246 7.84434 16.7237 8.15901 16.409C8.47368 16.0943 8.87459 15.8801 9.31105 15.7932C9.74751 15.7064 10.1999 15.751 10.611 15.9213C11.0222 16.0916 11.3736 16.38 11.6208 16.75C11.868 17.12 12 17.555 12 18C12 18.5967 11.7629 19.169 11.341 19.591C10.919 20.0129 10.3467 20.25 9.75 20.25ZM9.75 17.25C9.60167 17.25 9.45666 17.294 9.33332 17.3764C9.20999 17.4588 9.11386 17.5759 9.05709 17.713C9.00033 17.85 8.98547 18.0008 9.01441 18.1463C9.04335 18.2918 9.11478 18.4254 9.21967 18.5303C9.32456 18.6352 9.4582 18.7067 9.60368 18.7356C9.74917 18.7645 9.89997 18.7497 10.037 18.6929C10.1741 18.6361 10.2912 18.54 10.3736 18.4167C10.456 18.2933 10.5 18.1483 10.5 18C10.5 17.8011 10.421 17.6103 10.2803 17.4697C10.1397 17.329 9.94891 17.25 9.75 17.25Z"
            fill="#B1B5B8"
          />
          <path
            d="M21 12.75H18.75C18.5511 12.75 18.3603 12.671 18.2197 12.5303C18.079 12.3897 18 12.1989 18 12C18 11.8011 18.079 11.6103 18.2197 11.4697C18.3603 11.329 18.5511 11.25 18.75 11.25H21C21.1989 11.25 21.3897 11.329 21.5303 11.4697C21.671 11.6103 21.75 11.8011 21.75 12C21.75 12.1989 21.671 12.3897 21.5303 12.5303C21.3897 12.671 21.1989 12.75 21 12.75Z"
            fill="#B1B5B8"
          />
          <path
            d="M21 18.75H11.25C11.0511 18.75 10.8603 18.671 10.7197 18.5303C10.579 18.3897 10.5 18.1989 10.5 18C10.5 17.8011 10.579 17.6103 10.7197 17.4697C10.8603 17.329 11.0511 17.25 11.25 17.25H21C21.1989 17.25 21.3897 17.329 21.5303 17.4697C21.671 17.6103 21.75 17.8011 21.75 18C21.75 18.1989 21.671 18.3897 21.5303 18.5303C21.3897 18.671 21.1989 18.75 21 18.75Z"
            fill="#B1B5B8"
          />
        </g>
        <defs>
          <clipPath id="clip0_4_5635">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
