import FooterPageImgContainer from '@/app/components/footerPageComponents/FooterPageImgContainer'
import PageHeader from '@/app/components/footerPageComponents/PageHeader'
import PageParagraph from '@/app/components/footerPageComponents/PageParagraph'
import PageSubHead from '@/app/components/footerPageComponents/PageSubHead'
import BreadcrumbResponsive from '@/app/components/global/BreadcrumbResponsive'

const page = () => {
    const bgUrl = 'terms.png'
    return (
        <div>
            <BreadcrumbResponsive
                title={"Home > Terms"}
            />
            <FooterPageImgContainer bgImgName={bgUrl} />
            <div className='my-container flex flex-col gap-6 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px] lg:sh adow-[0px_0px_4px_rgba(0,0,0,.25)] lg:rounded-[15px]'>
            <PageHeader title={'Terms'} />
                <PageParagraph text={`1. Acceptance of Terms: By using our website and services, you agree to abide by these terms and conditions.`} />
                <PageParagraph text={`2. Ordering Process: Customers must provide accurate information, including the sneaker model name, to receive a customized t-shirt design. Orders are subject to availability.`} />
                <PageParagraph text={`3. Design Approval: Customers are responsible for approving the design provided by us. Once approved, changes may not be possible, and the order may proceed to production.`} />
                <PageParagraph text={`4. Payment: Payment is required upon placing an order. We accept various payment methods, as specified on our website`} />
                <PageParagraph text={`5. Cancellation and Refunds: Orders may be canceled within a specified timeframe, as outlined on our website. Refunds are subject to our discretion and may be issued in accordance with our refund policy`} />
                <PageParagraph text={`6. Shipping and Delivery: We aim to deliver orders within the specified timeframe, but delivery times may vary depending on factors beyond our control. Customers are responsible for providing accurate shipping information`} />
                <PageParagraph text={`7. Quality Assurance: We strive to ensure the quality of our products, but variations may occur due to the customization process. Please refer to our return policy for issues regarding product quality.`} />
                <PageParagraph text={`8. Intellectual Property: Any designs, logos, or trademarks provided by customers or created by us remain the intellectual property of their respective owners`} />
                <PageParagraph text={`9. Privacy and Data Protection: We are committed to protecting customer information and adhere to relevant data protection laws. Please refer to our privacy policy for more information.`} />
                <PageParagraph text={`10. Governing Law: These terms and conditions are governed by the laws of USA, and any disputes shall be resolved in accordance with these laws.`} />
                <PageParagraph text={`11. Contact Information: For inquiries or concerns regarding these terms and conditions or our services, please contact us at <a href="mailto:support@matchmytees.com" class="text-blue-600 font-bold">support@matchmytees.com</a>`} />
               
            </div>
        </div>
    )
}

export default page