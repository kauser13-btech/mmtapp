const BillingAddress = () => {
  return (
    <div className="">
      <div className="">
        <input type="text" placeholder="Postal Code" />
        <input type="text" placeholder="Street Address" />

        <input type="text" placeholder="Phone Number" />
        <select name="" id="">
          <option value="">Country</option>
        </select>

        <select name="" id="">
          <option value="">Choose a state</option>
        </select>
        <input type="text" placeholder="Town City" />

        <input type="text" placeholder="Postal Code" />
        <input type="text" placeholder="Street Address" />

        <textarea
          name=""
          placeholder="Apartment Suite, unit, Etc ( optional) "
        ></textarea>
      </div>
      <div className="">
        <button>Previous</button>
        <button className="">Next</button>
      </div>
    </div>
  );
};

export default BillingAddress;
