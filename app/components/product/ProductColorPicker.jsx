import TailwindLoader from "../global/TailwindLoader";

const ProductColorPicker = ({ data, handleColorChange, isLoading }) => {
  const filterColor = data?.available_colors?.find(
    (color) => color.is_selected === true
  );

  return (
    <div className="flex flex-col gap-[18px]">
      {isLoading ? <TailwindLoader height={'h-5 !w-[140px]'} /> : <p className="text-sub-work-card font-roboto text-base text-normal md:text-sm xl:text-base">
        Color: <span className="font-medium">{filterColor?.color}</span>
      </p>}
      <div className="flex gap-3 flex-wrap">
        {!isLoading ? data?.available_colors?.map((color) => (
          <div
            className={`size-5 md:size-6 xl:size-[30px] border rounded-[5px] cursor-pointer hover:scale-110 duration-200 ${color?.is_selected ? "border-orange-primary " : "border-gray-secondary"
              }`}
            style={{ background: `${color?.code}` }}
            key={color?.code}
            onClick={(e) => handleColorChange(color?.color)}
          />
        )) :
          Array.from({ length: 20 }, (_, index) => (
            <TailwindLoader key={index} height={'!size-[30px] rounded-md'} />))}
      </div>
    </div>
  );
};

export default ProductColorPicker;
