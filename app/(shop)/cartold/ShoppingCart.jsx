const ShoppingCart = () => {
  const names = [...Array(5)];
  return (
    <div className="">
      <div className="">
        <h4>Product details</h4>
        <h4>Quantity</h4>
        <h4>Total</h4>
      </div>
      <div className="">
        <table>
          <thead>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            {names.map(() => (
              <tr>
                <td>
                  <div className="" key={names}>
                    <div className="">
                      <img
                        src="../../images/landing/products/product01.webp"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <h4>T-Shirt - Jordan Sky Fundamental</h4>
                      {/* <p>
                        <span className="">In Stock </span>( 23
                        Stock remaining)
                      </p> */}
                      <button>
                        <img src="../../images/common/deleted.svg" alt="" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <button>
                    <img src="../../images/common/minus.svg" alt="" />
                  </button>
                  <span>1</span>
                  <button>
                    <img src="../../images/common/pluse.svg" alt="" />
                  </button>
                </td>
                <td>
                  <p>$ 39.99</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;
