import Link from "next/link";
import { usePathname } from "next/navigation";
import ImageWithLoader from "./ImageWithLoader";
import TailwindLoader from "./TailwindLoader";
import TshirtPlaceholder from "./TshirtPlaceholder";
import NProgress from 'nprogress';

const ProductComponent = ({
  products,
  isLoading,
  outfitOpenModal,
  type,
}) => {
  const pathname = usePathname();
  const className = pathname === "/collection/" ? 'h-[200px] w-full object-fit sm:h-[291.19px]' : type !== "outfit" ? '!w-full h-[116px] sm:size-[241px] md:size-[206.66px] lg:size-[203px] xl:size-[292px] 2xl:size-[291.19px]' : 'h-[200px] w-full object-fit sm:h-[291.19px]';
  const loaderHeight = pathname === "/collection/" ? 'h-[200px] w-full object-fit sm:h-[291.19px]' : type !== "outfit" ? '!w-full h-[116px] sm:h-[241px] md:h-[206.66px] lg:h-[203px] xl:h-[292px] 2xl:h-[291.19px]' : 'h-[200px] w-full object-fit sm:h-[291.19px]';
  const arrayItems = pathname === "/collection/" ? 12 : 4;
  
  return (
    products?.length !== 0 ?
      products?.map((product, index) =>
        type !== "outfit" ? (
          // <Link
          //   key={index}
          //   href={`/product?type=${product.type}&color=${product.color}&sneaker=${product.sneaker}&design=${product.design}`}
          //   className="flex flex-col items-center gap-2.5 group text-black py-2 group"
          // >
          <Link
            key={index}
            // href={`/product?type=${product.type}&color=${product.color}&sneaker=${product.sneaker}&design=${product.design}`}
            // href={`/product?type=${product.type}&color=${product.color}&sneaker=${product.productType=='sneaker'? product.slug:''}&design=${product.productType=='design'? product.slug:''}`}
            href={type=='search' ? `/collection/?brand=&model=&sub_model_category=&sneaker=${product.productType=='sneaker'? product.slug:''}&product_type=${product.type}&product_colors=&designs=${product.productType=='design'? product.slug:''}`:`/product?type=${product.type}&color=${product.color}&sneaker=${product.sneaker}&design=${product.design}`}
            className="flex flex-col items-center gap-2.5 group text-black py-2 group"
          >
            <ImageWithLoader
              src={product.image_url}
              alt={product.alt ? product.alt +' '+product.type : product.original_title ?? product.title}
              isLoading={isLoading}
              imgHeight={loaderHeight}
              className={className}
              type={type=='search' ?'search':''}
            />
            {!(pathname == "/product/") && (<p className="capitalize px-3 text-sub-work-card text-base font-medium text-center md:text-base xl:text-xl">
              {product.original_title ?? product.title}
            </p>)}
            {/* {pathname == "/collection/" && (
              <div className="flex items-center justify-between px-3 text-sub-work-card w-[116px] sm:w-[208px] md:w-[179.33px] 2xl:w-[291.19px]">
                <p className="text-sm xl:text-base font-roboto font-medium">View</p>
                <p className="text-base xl:text-xl font-bold">
                  {product.price}
                </p>
              </div>
            )} */}
          </Link>
        ) : (
          // <div
          //   className="flex flex-col items-center cursor-pointer group xl:gap-2"
          //   key={type + product.image_url}
          //   onClick={(e) =>
          //     outfitOpenModal(product.type, product.color, product.design)
          //   }
          // >
          //   <ImageWithLoader
          //     src={product.image_url}
          //     alt={product.name}
          //     imgHeight={loaderHeight}
          //     className={className}
          //   />
          //   <p className="capitalize px-3 text-sub-work-card text-base font-medium text-center md:text-base xl:text-xl">
          //     {product.title}
          //   </p>
          // </div>
          <Link
            className="flex flex-col items-center cursor-pointer group xl:gap-2"
            key={type + product.image_url}
            href={`/product?type=${product.type}&color=${product.color}&sneaker=${product.sneaker}&design=${product.design}`}
            onClick={(e) =>{
              e.preventDefault();
              outfitOpenModal(product.type, product.color, product.design)
              // NProgress.configure({ showSpinner: false });
              setTimeout(()=> NProgress.done(),200)
              
            }
            }
          >
            
            <ImageWithLoader
              src={product.image_url}
              alt={product.sneaker_name ? product.sneaker_name +' matching '+product.type: product.name}
              imgHeight={loaderHeight}
              className={className}
              type={type=='search' ?'search':''}
            />
            <p className="capitalize px-3 text-sub-work-card text-base font-medium text-center md:text-base xl:text-xl">
              {product.title}
            </p>
          </Link>

        )
      ) : [...Array(arrayItems)].map((index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2.5 group text-black group"
        >
          {type=='search' ? <TailwindLoader height={loaderHeight} /> : <TshirtPlaceholder imgHeight={loaderHeight}/>}
         {/* <TailwindLoader height={loaderHeight} /> */}
          {!(pathname == "/product/") && (<TailwindLoader height={`${(pathname == "/collection/") ? 'h-10 xl:h-[50px]' : type == 'search' ? `w-[116px] sm:w-[241px] md:w-[206.66px] lg:w-[203px] xl:w-[292px] 2xl:w-[291.19px]`: 'w-full'} h-12 `} />)}
          {/* {pathname == "/collection/" && (<div className="flex items-center gap-2 justify-between w-full">
            <div className="w-full md:w-20">
              <TailwindLoader height={'h-6'} />
            </div>
            <div className="w-full md:w-20">
              <TailwindLoader height={'h-7'} />
            </div>
          </div>)} */}
        </div>
      ))
  );
};

export default ProductComponent;
