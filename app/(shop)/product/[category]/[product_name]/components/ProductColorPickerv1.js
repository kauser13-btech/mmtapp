import TailwindLoader from "@/app/components/global/TailwindLoader";
import Link from "next/link";

const ProductColorPickerv1 = ({
  data,
  isLoading,
  queryParams,
}) => {
  const { color = "", sneaker, design, type } = queryParams;
  // console.log("queryParams__", queryParams);
  const objectToQueryParamsModern = (obj) => {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
      params.append(key, value);
    });
    return params.toString();
  };
  return (
    <div className="flex flex-col gap-[18px]">
      {isLoading ? (
        <TailwindLoader height={"h-5 !w-[140px]"} />
      ) : (
        <p className="text-sub-work-card font-roboto text-base text-normal md:text-sm xl:text-base">
          Color: <span className="font-medium">{color}</span>
        </p>
      )}
      <div className="flex gap-3 flex-wrap">
        {!isLoading
          ? data?.available_colors?.map((color) => (
              <Link
                href={
                  `/product/${type}/${sneaker}-matching-${design}?` +
                  objectToQueryParamsModern({ color: color?.color || "" })
                }
              >
                <div
                  className={`size-5 md:size-6 xl:size-[30px] border rounded-[5px] cursor-pointer hover:scale-110 duration-200 ${
                    color?.is_selected
                      ? "border-orange-primary "
                      : "border-gray-secondary"
                  }`}
                  style={{ background: `${color?.code}` }}
                  key={color?.code}
                />
              </Link>
            ))
          : Array.from({ length: 20 }, (_, index) => (
              <TailwindLoader key={index} height={"!size-[30px] rounded-md"} />
            ))}
      </div>
    </div>
  );
};

export default ProductColorPickerv1;
