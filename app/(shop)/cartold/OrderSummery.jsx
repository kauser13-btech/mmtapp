const OrderSummery = () => {
  return (
    <>
      <div className="">
        <div className="">
          <h3>Order summery</h3>
        </div>
        <div className="">
          <hr />
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="">
            <p>Subtotal item ( 3 items )</p>
            <p>$140</p>
          </div>
          <div className="">
            <p>Promo code</p>
            <input type="" placeholder="   Enter Your Promo Code" />
            <button>Apply</button>
          </div>
        </div>
        <div className="">
          <div>
            <p>My saving with coupon code :</p>
            <p>$05</p>
          </div>
          <div>
            <p>Estimated Shipping :</p>
            <p>Free</p>
          </div>
          <div>
            <p>Estimated Taxes :</p>
            <p>Free</p>
          </div>
          <hr />
          <div>
            <p>Gross Total :</p>
            <p>$05</p>
          </div>
        </div>
        <div className="">
          <button>Check out</button>
          <p Style={"display: none"}>
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purpose describe
            in our <a>privacy policy</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderSummery;
