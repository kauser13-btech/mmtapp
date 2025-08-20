import dynamic from 'next/dynamic';
import Slider from "../components/landing/Slider";
import HowItWorks from "../components/landing/HowItWorks";

// import CustomerReviews from "../components/global/CustomerReviews";
// import ChooseBySneakers from "../components/landing/ChooseBySneakers";
// import FeaturedProductTab from "../components/landing/FeaturedProductTab";
// import OutfitCategory from "../components/landing/OutfitCategoryTab";
// import SneakersTab from "../components/landing/SneakersTab";
// import TeesWithMatch from "../components/landing/TeesWithMatch";
const CustomerReviews = dynamic(() => import('../components/global/CustomerReviews'))
const ChooseBySneakers = dynamic(() => import('../components/landing/ChooseBySneakers'))
const FeaturedProductTab = dynamic(() => import('../components/landing/FeaturedProductTab'))
const OutfitCategory = dynamic(() => import('../components/landing/OutfitCategoryTab'))
const SneakersTab = dynamic(() => import('../components/landing/SneakersTab'))
const TeesWithMatch = dynamic(() => import('../components/landing/TeesWithMatch'))

export const metadata = {
  title: 'Tees to Match with Jordans, Adidas, Nike | MatchMyTees',
  description: 'Match your trendsetting sneakers with Tees, featuring millions of products from famous brands like Adidas, ASICS, Nike, Puma, Gucci, Jordan & more. Buy and save up to 46%.',
  keywords: 'tees to match, match my tees, jordan tees, nike tees, adidas tees, sneaker outfits, sneaker tees, puma tees, gucci tees, fashion tees'
}
const HomePage = () => {
  return (
    <>
      <Slider />
      {/* <div className="h-20 bg-white"></div> */}
      {/* <SearchingSneakers /> */}
      <HowItWorks />
      <TeesWithMatch />
      <SneakersTab />
      <OutfitCategory />
      <ChooseBySneakers />
      <FeaturedProductTab />
      <CustomerReviews />
    </>
  );
};

export default HomePage;
