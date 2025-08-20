
const FreeShipping = () => {
  return (
    <ul className="flex flex-col gap-6 text-base text-sub-work-card font-roboto font-normal leading-[23px] text-left">
      <li className="font-medium text-lg">1. Do you offer free shipping?</li>
      <li className="text-base">
        Yes, we offer free standard shipping on all orders within [specified
        regions or countries].
      </li>
      <li className="font-medium text-lg">2. How can I qualify for free shipping?</li>
      <li className="text-base">
        To qualify for free shipping, simply place an order that meets the
        minimum purchase requirement. The minimum purchase amount for free
        shipping is [specify the amount].
      </li>
      <li className="font-medium text-lg">3. Is free shipping available for international orders?</li>
      <li className="text-base">
        Free shipping is currently available for orders shipped within
        [specified regions or countries]. For international orders, shipping
        rates apply and can be viewed during the checkout process.
      </li>
      <li className="font-medium text-lg">4. What shipping methods are included with free shipping?</li>
      <li className="text-base">
        Free shipping is provided through our standard shipping method. The
        estimated delivery time can be found on our Shipping Information page.
      </li>
      <li className="font-medium text-lg">5. Can I combine multiple orders to qualify for free shipping?</li>
      <li className="text-base">
        Unfortunately, orders cannot be combined for the purpose of qualifying
        for free shipping. Each order must individually meet the minimum
        purchase requirement.
      </li>
      <li className="font-medium text-lg">6. Is free shipping available for returns and exchanges?</li>
      <li className="text-base">
        While the initial shipping is free, return shipping costs are the
        responsibility of the customer. Please refer to our Returns and
        Exchanges policy for more details.
      </li>
    </ul>
  );
};

export default FreeShipping;
