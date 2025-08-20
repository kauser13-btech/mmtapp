const EmptyCart = () => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <h3>Your Product</h3>
          <hr />
        </div>
        <div className="">
          <div className="">
            <img src="../../../images/common/emptyCart.webp" alt="" />
            <h3>Your cart is empty</h3>
            <p>
              Look like you have not added anything to you cart Go ahead &
              explore top categories
            </p>
            <button>Shop now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
