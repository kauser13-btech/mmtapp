import FooterPageImgContainer from '@/app/components/footerPageComponents/FooterPageImgContainer'
import PageHeader from '@/app/components/footerPageComponents/PageHeader'
import PageParagraph from '@/app/components/footerPageComponents/PageParagraph'
import PageSubHead from '@/app/components/footerPageComponents/PageSubHead'
import BreadcrumbResponsive from '@/app/components/global/BreadcrumbResponsive'
export const metadata = {
    title: 'Discount and Offer | MatchMyTees',
    description: "At MatchMyTees, we celebrate our heroes with a perpetual 10% OFF for Military, First Responders, Healthcare Workers, and their families. Use code HERO10 at checkout.",
}

const page = () => {
    const bgUrl = 'discount.png'
    return (
        <div>
            <BreadcrumbResponsive
                title={"Home > Military or First Responder Discount"}
            />
            <FooterPageImgContainer bgImgName={bgUrl} />

            <div className='my-container flex flex-col gap-10 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px] lg:sha dow-[0px_0px_4px_rgba(0,0,0,.25)] lg:rounded-[15px]'>
                <PageHeader title={'Military or First Responder Discount'} />
                <PageParagraph text={`At MatchMyTees, we honor the courage and dedication of our global heroes—Military, First Responders, Healthcare Workers, and their families. As a token of gratitude, enjoy a perpetual 10% OFF on all your purchases. Your service deserves recognition, and we're here to show our appreciation. Shop with us today and proudly wear your support!`} />

                <p className='text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl xl:font-medium'>Use code: <span className='font-bold '>HERO10</span> at checkout.</p>
            
                
            </div>
        </div>
    )
}

export default page