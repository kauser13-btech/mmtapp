import BillingAddress from "./BillingAddress";
import EmptyCart from "./EmptyCart";
import OrderSummery from "./OrderSummery";
import ShippingAddress from "./ShippingAddress";
import ShoppingCart from "./ShoppingCart";

const page = () => {
  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <p>Continue shopping</p>
          </div>
          <div className="">
            <div className="">
              <div className="">
                <div className="">
                  <h3>Shopping cart</h3>
                  <h3>3 items</h3>
                </div>
                <div className="">
                  <hr />
                </div>
              </div>
              <ShoppingCart />
            </div>
            <div className="">
              <OrderSummery />
            </div>
          </div>

          <div className="">
            <div className="">
              <div className="">
                <div className="">
                  <h3>Shopping cart</h3>
                  <h3>3 items</h3>
                </div>
                <div className="">
                  <hr />
                </div>
              </div>
              <ShippingAddress />
            </div>
            <div className="">
              <OrderSummery />
            </div>
          </div>

          <div className="">
            <div className="">
              <div className="">
                <div className="">
                  <h3>Billing Address</h3>
                  <h3>
                    <input type="checkbox" /> Same as Shipping address
                  </h3>
                </div>
                <div className="">
                  <hr />
                </div>
              </div>
              <BillingAddress />
            </div>
            <div className="">
              <OrderSummery />
            </div>
          </div>
        </div>
      </div>

      {/* Empty Cart */}
      <EmptyCart />
    </>
  );
};

export default page;
