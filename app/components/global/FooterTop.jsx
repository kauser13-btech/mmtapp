import FooterTopCard from "./footerTop/FooterTopCard";
const FooterTop = () => {
  return (
    <div className="bg-footer-feature py-6">
      <div className="my-container flex flex-wrap justify-between gap-5">
        <FooterTopCard title={'Free Shipping'} subtitle={'Free Shipping USA & CA'} img={'/images/footer/footerIcon1.svg'} />
        <div className="min-h-full w-[.5px] bg-title-work-card max-md:hidden"></div>
        <FooterTopCard title={'Secure Payment'} subtitle={'100% Secure Guarantee'} img={'/images/footer/footerIcon2.svg'} />
        <div className="min-h-full w-[.5px] bg-title-work-card max-md:hidden"></div>
        <FooterTopCard title={'Easy Process'} subtitle={'Order in 2 Minutes'} img={'/images/footer/footerIcon3.svg'} />
        <div className="min-h-full w-[.5px] bg-title-work-card max-md:hidden"></div>
        <FooterTopCard title={'Special Support'} subtitle={'24/7 Dedicated Support'} img={'/images/footer/footerIcon4.svg'} />
      </div>
    </div>
  );
};

export default FooterTop;
