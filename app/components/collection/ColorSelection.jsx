import { useEffect, useRef } from "react";
import TailwindLoader from "../global/TailwindLoader";
import { usePathname, useSearchParams } from "next/navigation";

const ColorSelection = ({ data, changeColorByUrl,selectedColor }) => {
  const formRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (formRef.current) {
      const checkboxes = formRef.current.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  }, [pathname, searchParams]);
  return (
    <div ref={formRef} className="flex flex-col gap-5 max-md:pr-3">
      {data.length > 0 ? data.map((color) => (
        <div className="flex justify-between items-center" key={color.color_code}>
          <div className="form-control">
            <label className="cursor-pointer label flex items-center gap-2 p-0">
              <input onClick={(e) => changeColorByUrl(color.color_name)}
                type="checkbox"
                id={`color-choose-${color.color_name}`}
                name="color-choose"
                value={color.colorName} className="checkbox [--chkbg:black] [--chkfg:white] size-4 rounded-sm"
                checked={selectedColor.includes(color.color_name)} />
              <span className="label-text md:text-base text-sub-work-card">
                {color.color_name.charAt(0).toUpperCase() +
                  color.color_name.slice(1)}

              </span>
            </label>
          </div>
          <div
            className={`size-5 rounded-sm ${color.color_code === "#ffffff" ? "border border-gray-300" : ""} border rounded-[5px] border-gray-secondary`}
            style={{ background: color.color_code }}
          ></div>
        </div>
      )) : Array.from({ length: 20 }).map((_, index) => (
        <div className="flex justify-between items-center" key={index}>
          <div className="form-control">
            <div className="cursor-pointer label flex items-center gap-2 p-0 w-full">
              <TailwindLoader height="!size-4" />
              <TailwindLoader height="md:!w-[100px] lg:!w-[120px] xl:!w-[140px] !h-6" />
            </div>
          </div>
          <TailwindLoader height="!size-5 !rounded-sm" />
        </div>
      ))}

    </div>
  );
};

export default ColorSelection;
