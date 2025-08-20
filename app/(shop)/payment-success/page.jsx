'use client'
import FullPageLoader from "@/app/components/global/FullPageLoader";
import PaymentSuccess from "@/app/components/global/PaymentSuccess";
import ApiCall from "@/app/util/ApiCall";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sendGTMEvent } from '@next/third-parties/google';


const SuccessPage = () => {
  const [data, setData] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState(false); // State for invalid credentials
  const searchParams = useSearchParams();
  const { performPost } = ApiCall();

  const gtmEvent=(gtmData)=>{
    let items=[];
    gtmData.cart.items.forEach(data => {
      items.push({
          item_id: `D${data.design_id}S${data.sneaker_id}P${data.type=="T-shirts"?1:2}`,
          item_name: `${data.sneaker} ${data.design} Matching ${data.type}`,
          // discount: 2.22,
          // item_brand: data.sneaker.brand.title,
          // item_category: data.sneaker.sub_model_category.title,
          item_variant: data.product_color,
          price: data.total_price,
          item_variant: data.product_color,
          quantity: data.quantity

        })
      });
      sendGTMEvent({ event: 'purchase', currency: "USD", 
        value:gtmData.paid_amount, 
        transaction_id:gtmData.trx_id,
        items
      });  

      if(window.klaviyo){
        let items2=[];
        let price=0;
        let names=[];
        gtmData.cart.items.forEach(data => {
          names.push(`${data.sneaker} ${data.design} Matching ${data.type}`);
          price=price+parseFloat(data.total_price);
          items2.push({
            "ProductID": `D${data.design_id}S${data.sneaker_id}P${data.type=="T-shirts"?1:2}`,
            "SKU": `D${data.design_id}S${data.sneaker_id}P${data.type=="T-shirts"?1:2}`,
            "ProductName": `${data.sneaker} ${data.design} Matching ${data.type}`,
            "Quantity": data.quantity,
            "ItemPrice": data.total_price,
            "RowTotal": data.total_price,
            // "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": data.image,
            // "ProductCategories": ["Fiction", "Children"]
          })
        });

        window.klaviyo.push(["track", "Placed Order", {
          "$value": price,
          'OrderID': gtmData.order_id,
          'TnxID': gtmData.trx_id,
          // "AddedItemProductName": "A Tale of Two Cities",
          // "AddedItemProductID": "1112",
          // "AddedItemSKU": "TALEOFTWO",
          // "AddedItemCategories": ["Fiction", "Classics", "Children"],
          // "AddedItemImageURL": "http://www.example.com/path/to/product/image2.png",
          // "AddedItemURL": "http://www.example.com/path/to/product2",
          "AddedItemPrice": price,
          "AddedItemQuantity": items2.length,
          "ItemNames": names,
          "CheckoutURL": "https://matchmytees.com/checkout",
          "Items": items2
        }]);
      }
     
  }

  const verifySession = async () => {
    const query = searchParams.get("session_id");

    if (!query) {
      setInvalidCredentials(true); // Set invalid credentials flag
      return; // Return early
    }

    const formData = {
      session_id: query,
    };
    Cookies.remove("cart-token");

    const response = await performPost("payment-success-message", formData);
    if (response.success) {
      setData(response.data);
      gtmEvent(response.data);
    } else {
      console.log("Invalid Credential!")
      setInvalidCredentials(true); // Set invalid credentials flag
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  return (
    <>
      {invalidCredentials ? (
        <InvalidCredentials /> // Render InvalidCredentials component if invalid credentials
      ) : (
        <>
          {data && Object.keys(data).length > 0 ? (
            <PaymentSuccess data={data} />
          ) : (
            <div className="h-[calc(80dvh)]">
              <FullPageLoader topMessage={'Please wait a moment!'} bottomMessage={'We verify your payment status!'} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SuccessPage;

export const InvalidCredentials = () => {
  return (
    <div className="h-[calc(80vh)] flex items-center justify-center my-container">
      <div className="flex flex-col items-center justify-center gap-8 bg-white rounded-lg p-8 shadow-[0px_0px_4px_rgba(0,0,0,0.12)] text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 ">
          <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
        </svg>

        <div className="flex flex-col text-[#222222] font-semibold text-[32px] text-center">
          <p>Oops! Invalid Session!</p>
        </div>
        <Link href="/" className="inline-block bg-orange-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-primary/70 active:scale-95 transition duration-300 ease-in-out">Back to Home</Link>
      </div>
    </div>
  );
}
