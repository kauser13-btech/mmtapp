"use client";
import TailwindLoader from "../global/TailwindLoader";
import FAQ from "./TabContent/FAQ";
import FreeShipping from "./TabContent/FreeShipping";
import ProductDescription from "./TabContent/ProductDescription";
import ReturnPolicy from "./TabContent/ReturnPolicy";
const ProductDetailsTab = ({ data, customClass, isLoading }) => {
  return (
    <div className={`flex flex-col gap-8 xl:gap-16 w-full mt-0 ${customClass}`}>
      {isLoading ?
        <div className="flex flex-col gap-4">
          <TailwindLoader height={'h-8 w-[128px]'} />
          <div className="flex flex-col gap-4">
            {Array.from(Array(5).keys()).map((item, index) => (
              <TailwindLoader key={index} height={'h-4 rounded-l-md rounded-r-md'} />
            ))}
          </div>
        </div>
        :
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <h3 className="font-normal font-staatliches text-sub-work-card uppercase text-xl md:tracking-[-0.54px] xl:text-2xl xl:tracking-normal">
                Product Description 
              </h3>
              <p className="flex flex-row relative px-5 items-end font-light text-gray-500 text-sm">Scroll down for more information <svg className="fill-slate-50 rotate-90 2xl:-rotate-180 w-3 h-2.5 absolute right-0 bottom-1" viewBox="0 0 26 16" fill="none"><path d="M23.3509 14.3617L23.0051 14.6917L22.6599 14.3612L13.1806 5.28584L3.69452 14.3613L3.3484 14.6924L3.00274 14.3608L1.65409 13.0671L1.27761 12.7059L1.65441 12.3451L12.835 1.63887L13.1808 1.30773L13.5266 1.63887L24.7071 12.3451L25.0849 12.7069L24.7065 13.068L23.3509 14.3617Z" fill="#474747" stroke="#474747"></path></svg></p>
            </div>
            <ProductDescription data={data} />
          </div>
          <hr className="border-t border-gray-200" />
          <div className="flex flex-col gap-4">
            <h3 className="font-normal font-staatliches text-sub-work-card uppercase text-xl md:tracking-[-0.54px] xl:text-2xl xl:tracking-normal">
            SHIPPING & RETURNS POLICY</h3>
            <p className="text-base text-black flex flex-col gap-5">
              <span>We are committed to delivering your order on time to ensure customer satisfaction. We offer a 99% 3-day first delivery service and most of our orders are delivered within 3-7 working days. If the order is not delivered within this time frame, we assure you that we will refund your shipping cost in full. Our shipping methods are tailored to your location, and we use reliable carriers such as USPS, UPS, and FedEx to ensure your order is delivered efficiently and reliably.</span>
              <span>We understand the importance of your shipments and would like to assure you that in the unlikely event of a lost or stolen shipment, we will provide a complimentary replacement with free shipping as part of our commitment to excellent service. However, please note that we are currently unable to accommodate specific carrier requests or offer overnight shipping options.</span>
              <span>At MatchMyTees, we value transparency and customer satisfaction. Our return and refund policy is straightforward, and we offer a 14-day money-back guarantee with no questions asked. In addition, we are happy to facilitate hassle-free exchanges at no additional cost.</span>
              <span>If you need any assistance or have inquiries regarding shipping, returns, or exchanges, our dedicated support team is readily accessible via email at <a href="mailto:support@matchmytees.com" className="text-blue-600 font-bold">support@matchmytees.com</a>.</span>
            </p>
          </div>
          <hr className="border-t border-gray-200" />
          <div className="flex flex-col gap-4">
            <h3 className="font-normal font-staatliches text-sub-work-card uppercase text-xl md:tracking-[-0.54px] xl:text-2xl xl:tracking-normal">
              frequently asked question
            </h3>
            <FAQ />
          </div>
          
          {/* <hr className="border-t border-gray-200" />
          <div className="flex flex-col gap-4">
            <h3 className="font-normal font-staatliches text-sub-work-card uppercase text-xl md:tracking-[-0.54px] xl:text-2xl xl:tracking-normal">
              Return Policy</h3>
            <ReturnPolicy />
          </div> */}
        </>
      }
      {/* product details for mobile screen - end */}
    </div>
  );
};

export default ProductDetailsTab;
