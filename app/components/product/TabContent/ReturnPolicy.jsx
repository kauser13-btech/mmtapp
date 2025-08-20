const ReturnPolicy = () => {
  return (
    <ul className="flex flex-col gap-6 text-base text-sub-work-card font-roboto font-normal leading-[23px] text-left">
      <li className="text-lg font-medium">1. What is your return policy?</li>
      <li className="text-base">
        Our return policy allows you to return items within 30 days of the
        delivery date. To be eligible for a return, the item must be unused, in
        its original condition, and in the original packaging.
      </li>
      <li className="text-lg font-medium">2. How do I initiate a return?</li>
      <li className="text-base">
        To initiate a return, please visit our Returns and Exchanges page and
        follow the instructions provided. You will need your order number and
        details about the item you wish to return.
      </li>
      <li className="text-lg font-medium">3. Is there a restocking fee for returns?</li>
      <li className="text-base">
        We do not charge restocking fees for returns. However, return shipping
        costs are the responsibility of the customer unless the return is due to
        an error on our part.
      </li>
      <li className="text-lg font-medium">4. Can I return a t-shirt if I've worn it or washed it?</li>
      <li className="text-base">
        Unfortunately, we cannot accept returns for items that have been worn,
        washed, or altered. Please ensure that the item is in its original
        condition with tags attached.
      </li>
      <li className="text-lg font-medium">5. What if I receive a defective or damaged item?</li>
      <li className="text-base">
        We apologize for any inconvenience. If you receive a defective or
        damaged item, please contact our customer support team immediately with
        your order number and photos of the issue. We will assist you in
        resolving the problem.
      </li>
      <li className="text-lg font-medium">6. How long does it take to process a return?</li>
      <li className="text-base">
        Once we receive your returned item, it will undergo a thorough
        inspection. The processing time can vary but typically takes 5-7
        business days. You will be notified via email once your return is
        processed.
      </li>
      <li className="text-lg font-medium">7. Can I exchange an item instead of returning it?</li>
      <li className="text-base">
        Yes, we offer exchanges. If you would like to exchange an item for a
        different size or color, please indicate your preference when initiating
        the return on our Returns and Exchanges page.
      </li>
    </ul>
  );
};

export default ReturnPolicy;
