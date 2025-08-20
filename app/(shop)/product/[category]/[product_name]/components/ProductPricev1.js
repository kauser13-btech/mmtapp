import TailwindLoader from "@/app/components/global/TailwindLoader";



const ProductPricev1 = ({ targetPrice, price, ratingScore, isLoading }) => {

  const discount=(100-((parseFloat(targetPrice.replace(/[^\d.]/g, '')))/parseFloat(price.replace(/[^\d.]/g, ''))*100)).toFixed(2);
  
  return (
    <div className="flex flex-col lg:flex-col gap-y-0">

      <div className="flex items-center gap-2.5 md:m-1.5 xl:gap-2.5 min-w-full">
        {isLoading ?
          <TailwindLoader height={'!w-[135px] h-8'} /> :
          <>
            <h1 className="max-md:min-w-[68px] font-roboto text-orange-primary font-medium text-xl md:font-semibold md:tracking-[-0.42px] 
          md:text-2xl 2xl:tracking-[-0.72px] md:min-w-fit">{targetPrice}</h1>
            {
            (discount>0)&& 
            <>
              <p className="text-sub-work-card line-through mt-0 font-normal text-sm p-1">{price}</p>
              <p className="max-md:min-w-[68px] font-roboto text-orange-primary font-normal text-base md:tracking-[-0.42px] 2xl:tracking-[-0.72px] md:min-w-fit">You Save {discount}%</p> 
            </>
            }
          </>}
      </div>



      {/* Show rating for small devices */}
      <div className="md:hidden flex gap-x-1">
        {!isLoading ? (
          [...Array(Math.floor(ratingScore))].map((_, index) => (
            <img className="w-5" key={index} src="/images/product/rating.svg" alt="rating" />
          ))
        ) : (
          [...Array(Math.floor(ratingScore))].map((_, index) => (
            <TailwindLoader key={index} height={'w-5 h-5'} />
          ))

        )}
      </div>
    </div>
  );
};

export default ProductPricev1;
