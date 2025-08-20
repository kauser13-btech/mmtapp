import PageHeader from '@/app/components/footerPageComponents/PageHeader'
import BreadcrumbResponsive from '@/app/components/global/BreadcrumbResponsive'
import Input from '@/app/components/ui/Input'

const page = () => {
    const bgUrl = 'contact-us.png'
    return (
        <div>
            <BreadcrumbResponsive
                title={"Home > Contact us"}
            />
            {/* <FooterPageImgContainer bgImgName={bgUrl} /> */}
            <div className='my-container !max-w-[1132px] flex flex-col gap-6 my-6 items-center justify-center md:my-10 xl:my-14 lg:p-[60px] lg:sh adow-[0px_0px_4px_rgba(0,0,0,.25)] lg:rounded-[15px]'>
                <PageHeader title={'Contact us'} />
                <form
                    className="w-full flex flex-col max-md:items-center gap-10 max-w-[665px] max-sm:p-4 py-12 px-[60px]"
                >
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="name" className='font-roboto text-base text-sub-work-card md:text-xl'>Name</label>
                            <Input
                                type={"text"}
                                name={"name"}
                                placeholder={"Enter your name"}
                                register={() => null}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="Email" className='font-roboto text-base text-sub-work-card md:text-xl'>Email</label>
                            <Input
                                type={"text"}
                                name={"Email"}
                                placeholder={"Enter your email"}
                                register={() => null}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="phone" className='font-roboto text-base text-sub-work-card md:text-xl'>Phone Number</label>
                            <Input
                                type={"text"}
                                name={"phone"}
                                placeholder={"Enter your phone number"}
                                register={() => null}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="message" className='font-roboto text-base text-sub-work-card md:text-xl'>Message</label>
                            <textarea className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A6AC] focus:border-transparent bg-white" placeholder="Enter your message"></textarea>
                           
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            type=""
                            className="btn  text-sm md:text-base md:font-medium xl:text-[22px] xl:font-normal bg-orange-primary w-fit hover:bg-orange-primary/80 active:bg-orange-primary/90 border-none text-white px-6 py-3 md:py-3.5 xl:px-8 "
                        >
                            Send message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page