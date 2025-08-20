import dynamic from 'next/dynamic';
import Link from "next/link";
// import Container from "./Container";
const Container = dynamic(() => import('./Container'));

const DesignCollection = ({
  data,
  isLoading,
  imageLoaded,
  handleImageLoaded,
  type,
}) => {
  return (
    <div className="my-container flex flex-col items-center gap-5 xl:gap-9 top-bottom-margin">
      <h3 className="text-sub-work-card text-xl font-staatliches items-center font-normal md:text-[26px] md:tracking-[.52px] xl:text-[45px]">More design in this collection</h3>
      <Container
        data={data}
        isLoading={isLoading}
        imageLoaded={imageLoaded}
        handleImageLoaded={handleImageLoaded}
        type={type}
      />
      { data[0] &&
        <div className='flex'>
          <Link href={`/collection/?brand=&model=&sub_model_category=&sneaker=${data[0].sneaker}&product_type=${data[0].type}&product_colors=&designs=`} className="btn bg-orange-primary hover:bg-yellow-primary hover:text-black border-none text-white text-sm px-14 md:text-base md:font-medium xl:font-normal xl:text-[22px] xl:leading-6">View more designs</Link>
        </div>
      }
    </div>
  );
};

export default DesignCollection;
