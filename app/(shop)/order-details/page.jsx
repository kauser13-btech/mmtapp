import logo from "@/public/images/landing/logo.svg";
import Image from "next/image";

const page = () => {
  const product = [...Array(2)];
  return (
    <div className="">
      <div className="">
        <div className="">
          <img src={logo} alt="" />
        </div>
        <div className="">
          <div className="">
            <h2>Your order confirmed !</h2>
            <span>Hello Crist,</span>
            <p>
              Your order has been confirmed and will be shipping within next 2
              days
            </p>
          </div>

          <div className="">
            <div className="">
              <p>Order date</p>
              <span>18 Jan,2023</span>
            </div>
            <div className="">
              <p>Order Number</p>
              <span>MATCH20222A</span>
            </div>
            <div className="">
              <p>Payment</p>
              <span>Cash</span>
            </div>
            <div className="">
              <p>Shipping address</p>
              <span>1901 Thornridge Cir. Shiloh, Hawaii 81063</span>
            </div>
          </div>
          {product.map(() => (
            <div className="" key={product}>
              <div className="">
                <div className="">
                  <img
                    src="../../../../images/landing/products/product01.webp"
                    alt=""
                  />
                </div>
                <div className="">
                  <h4>T-Shirt - Jordan Sky Fundamental</h4>
                  <p>Quantity: 2</p>
                  <p>Color: Dark Blue</p>
                </div>
              </div>
              <div className="">
                <p>$24.00</p>
              </div>
            </div>
          ))}
          <div className="">
            <div className="">
              <div className="">
                <p>Sub Total</p>
                <p>$140.00</p>
              </div>
              <div className="">
                <p>Shipping Fee</p>
                <p>$12.00</p>
              </div>
              <div className="">
                <p>Tax Fee</p>
                <p>$07.00</p>
              </div>
              <div className="">
                <p>Discount</p>
                <span>-$05.00</span>
              </div>
              <hr />
              <div className="">
                <h4>Gross Total</h4>
                <h4>$135</h4>
              </div>
              <hr />
            </div>
          </div>
          <div className="">
            <div className="">
              <p>
                We’ll be sending shipping confirmations email when the items
                shipped successfully
              </p>
              <h3>Thank You for Shopping with us!</h3>
              <h4>MatchMyTees Team </h4>
            </div>
            <div className="">
              <button>Cancel</button>
              <button className="">Print</button>
            </div>
          </div>
        </div>
        <div className="">
          <h3>
            Need help ? Visit our
            <a href=""> help center</a>
          </h3>
          <h3>©MatchMyTees</h3>
        </div>
      </div>
    </div>
  );
};

export default page;
