
const CostData = ({ name, price, type, loading }) => {
  return (
    <div className={`flex items-center justify-between font-roboto text-hero-title ${type === "primary" && ""}`}>
      <p className="font-medium text-sm lg:text-base">{name}</p>
      {type === "tax-data" || type === "primary" ? (
        <p className="font-normal text-sm xl:text-base font-roboto">{!loading ? price : "calculating..."}</p>
      ) : (
        <p className="font-medium font-roboto text-base md:text-sm xl:text-base">{price}</p>
      )}
    </div>
  );
};

export default CostData;
