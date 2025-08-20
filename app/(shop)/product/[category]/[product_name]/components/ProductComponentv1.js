'use client';
import ImageWithLoader from "@/app/components/global/ImageWithLoader";
import TailwindLoader from "@/app/components/global/TailwindLoader";
import TshirtPlaceholder from "@/app/components/global/TshirtPlaceholder";
import Link from "next/link";
import NProgress from 'nprogress';
import ImageWithLoaderv1 from "./ImageWithLoaderv1";

const ProductComponentv1 = ({
  products,
  isLoading,
  outfitOpenModal,
  type,
}) => {
  const className = 'h-[200px] w-full object-fit sm:h-[291.19px]';
  const loaderHeight = 'h-[200px] w-full object-fit sm:h-[291.19px]';
  const arrayItems = 12;
  console.log('products', products?.length);
  return (
   products?.length  &&  products?.length !== 0 ?
      products?.map((product, index) =>
        type !== "outfit" ? (
         
          <Link
            key={index}
            
            href={type=='search' ? `/collection/?brand=&model=&sub_model_category=&sneaker=${product.productType=='sneaker'? product.slug:''}&product_type=${product.type}&product_colors=&designs=${product.productType=='design'? product.slug:''}`:`/product?type=${product.type}&color=${product.color}&sneaker=${product.sneaker}&design=${product.design}`}
            className="flex flex-col items-center gap-2.5 group text-black py-2 group"
          >
            <ImageWithLoaderv1
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
           
          </Link>
        ) : (
         
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

          
        
        </div>
      ))
  );
};

export default ProductComponentv1;
