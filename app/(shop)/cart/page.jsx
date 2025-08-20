const page = () => {
  const product = [...Array(2)];
  return (
    <section className="">
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <img src='/images/landing/logo.svg' alt="" />
            </div>
            <div className="">
              <div className="">
                <div className="">
                  <p>Contact Inforation</p>
                  <p>
                    Have an account? <a href="">Login</a>
                  </p>
                </div>

                <input type="text" placeholder="Email" />
                <div className="">
                  <input type="checkbox" />
                  <p>Email me with news and offers</p>
                </div>
              </div>
              <div className="">
                <p>Shipping Address</p>
                <div className="">
                  <select name="" id="" placeholder="Country">
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="">
                  <div className="">
                    <input placeholder="Frist Name" type="text" />
                  </div>

                  <div className="">
                    <input placeholder="Last Name" type="text" />
                  </div>
                </div>
                <div className="">
                  <input type="text" name="" id="" placeholder="Address" />
                </div>
                <div className="">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Apartment, suite, etc (optional)"
                  />
                </div>

                <div className="">
                  <div className="">
                    <input type="text" name="" id="" placeholder="City" />
                  </div>
                  <div className="">
                    <input type="text" name="" id="" placeholder="Province" />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <p>Payment</p>
            </div>
          </div>
        </div>
        <div className="">
          {product.map(() => (
            <div className="" key={product}>
              <div className="">
                <img
                  src="../../../images/landing/products/product01.webp"
                  alt=""
                />
              </div>
              <div className="">
                <p>T-Shirt for Nike AIR FORCE PIXEL SE LEOPARD LEMON</p>
              </div>
              <div className="">
                <p>$ 39.99</p>
              </div>
            </div>
          ))}

          <div className="">
            <div className="">
              <input type="text" placeholder="Discount Code" />
            </div>
            <button>Apply</button>
          </div>
          <div className="">
            <div className="">
              <p>Subtotal</p>
              <span>$ 39.99</span>
            </div>
            <div className="">
              <p>Shipping</p>
              <span>Calculated at next ship</span>
            </div>
            <div className="">
              <p>Total</p>
              <span>CAD $ 39.99</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
