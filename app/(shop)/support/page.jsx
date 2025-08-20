'use client';
import React, { useState } from 'react';
import PageHeader from '@/app/components/footerPageComponents/PageHeader';
import BreadcrumbResponsive from '@/app/components/global/BreadcrumbResponsive';
import Input from '@/app/components/ui/Input';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ApiCall from "@/app/util/ApiCall";
const FAQPage = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
      } = useForm({
        defaultValues: {
          name: "",
          email: "",
          phone: "",
          message: ""
        },
      });

    const [openIndex, setOpenIndex] = useState(null);
    const [successStatus, setSuccessStatus] = useState(false);
    const toggleAccordion = (index) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index)); // Toggle open/close state
    };

    const handleAccordionClick = (index) => {
        if (openIndex === index) {
            toggleAccordion(null); // Uncheck if already checked
        } else {
            toggleAccordion(index); // Check if unchecked
        }
    };
    const { performPost } = ApiCall();
    const onSubmit = async (data, e) => {
        try {
          const id = toast.loading("Please wait...",);
          const postFormData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
          };
    
          const response = await performPost(`api/v1/contact`, postFormData);
          if (response.status == "success") {
            reset();
            setSuccessStatus(true);
            toast.update(id, {
              render: response.message,
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            Object.keys(response.errors).forEach((fieldName) => {
              setError(fieldName, {
                type: "manual",
                message: response.errors[fieldName][0],
              });
            });
            toast.update(id, {
              render: response.message,
              type: "warning",
              isLoading: false,
              autoClose: 3000,
            });
          }
        } catch (err) {
          console.log(err);
        }
      };

    const faqs = [
        {
            question: "How do I place an order for a sneaker match t-shirt?",
            answer: "To find matching t-shirt designs for your sneaker model, simply visit our website and enter the name or model number of your sneakers. We'll present you with a wide range of styles and colors to choose from. Once you have selected your preferred design, choose the size and quality you want and complete the checkout process."
        },
        {
            question: "Can I customize the design further?",
            answer: "Currently, we offer pre-designed t-shirt designs that match specific sneaker models. However, if you have a special request for customization, please contact us and we will do our best to assist you."
        },
        {
            question: "What if I receive my T-shirt and it doesn't fit?",
            answer: "We understand that getting the right size can be difficult. If your t-shirt doesn't fit as expected, please contact our customer service team for assistance with the exchange or return process."
        },
        {
            question: "How long does it take to receive my T-shirt?",
            answer: "Our team works diligently to fulfill orders promptly. Generally, we offer a 99% 3-day first delivery service and you can expect to receive your t-shirt within 3-7 business days of placing your order. Please note that shipping times may vary depending on your location."
        },
        {
            question: " Do you offer international shipping?",
            answer: "Yes, we offer international shipping to most countries. However, international orders are shipped via USPS Flat Rate International, taking approximately 16-20 business days."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order has been shipped, you will receive a tracking number via email, allowing you to monitor the progress of your delivery."
        },
        {
            question: "How can I contact customer support?",
            answer: `Our customer support team is always ready to assist you with any questions or concerns you may have. You can get in touch with us by sending an email to {{email}} or by filling out the contact form on our website. We make it our top priority to respond to all inquiries promptly.`,
           
        }
    ];


    const replaceAnchors = (text, targets = []) => {
        if (!targets.length) {
          return <span dangerouslySetInnerHTML={{ __html: text }} />;
        }
      
        let parts = text.split(/({{.*?}})/g); 
      
        return (
          <>
            {parts.map((part, index) => {
              if (part.startsWith("{{") && part.endsWith("}}")) {
                const key = part.slice(2, -2).trim(); 
                const target = targets.find(t => t.key === key);
      
                if (target) {
                  return (
                    <a
                    className='text-blue-600'
                     key={index} href={target.href} target="_blank" rel="noopener noreferrer">
                      {target.text}
                    </a>
                  );
                }
              }
              return <span key={index}>{part}</span>; 
            })}
          </>
        );
      };

      const targets = [
        { key: "email", href: "mailto:support@matchmytees.com", text: "support@matchmytees.com" },
      ];
      

    return (
        <div>
            <BreadcrumbResponsive
                title={"Home > Support"}
            />
            <div className='my-container flex max-md:flex-col gap-20 md:gap-10 xl:gap-32 my-6 md:my-10 xl:my-14 lg:p-[60px] lg:sha dow-[0px_0px_4px_rgba(0,0,0,.25)] lg:rounded-[15px]'>
                <div className="w-full">
                    <PageHeader title={'Contact us'} />
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col max-md:items-center gap-10 py-12"
                    >
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="name" className='font-roboto text-base text-sub-work-card md:text-xl'>Name</label>
                                <Input
                                    type={"text"}
                                    name={"name"}
                                    placeholder={"Enter your name"}
                                    register={register}
                                    error={errors.name}
                                    notRequired={true}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="Email" className='font-roboto text-base text-sub-work-card md:text-xl'>Email</label>
                                <Input
                                    type={"text"}
                                    name={"email"}
                                    placeholder={"Enter your email"}
                                    register={register}
                                    error={errors.email}
                                    notRequired={true}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="phone" className='font-roboto text-base text-sub-work-card md:text-xl'>Phone Number</label>
                                <Input
                                    type={"text"}
                                    name={"phone"}
                                    placeholder={"Enter your phone number"}
                                    register={register}
                                    error={errors.phone}
                                    notRequired={true}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="message" className='font-roboto text-base text-sub-work-card md:text-xl'>Message</label>
                                <textarea {...register("message", { required: "Message is required" })} id='message' className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A6AC] focus:border-transparent bg-white text-black" placeholder="Enter your message"></textarea>
                            </div>
                            {successStatus &&
                            <div className="flex flex-col gap-2 w-full">
                                <p className="font-roboto font-medium text-sm text-green-400 first-letter:uppercase">Thank you for contacting us. We will contact you soon.</p>
                            </div>
                            }
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
                    <div className="text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl mt-20">
                        <h4 className='font-medium font-roboto text-base text-title-work-card max-md:text-center md:font-medium xl:text-[26px] my-3'>Contact Information:</h4>
                        <ul className="list-none leading-8">
                            <li className="decoration-1">Pippa Technologies Inc</li>
                            <li className="decoration-1"><a href="mailto:support@matchmytees.com" class="text-blue-600 font-bold">support@matchmytees.com</a></li>
                            {/* <li className="decoration-1">458 Main St, Kentville, NS, B4N 3X3, Canada.</li> */}
                        </ul>
                    </div>
                </div>
                <div className="w-full">
                    <PageHeader title={'Frequently Asked Questions'} />
                    <div className="join join-vertical rounded-none mt-12 max-md:mb-12">
                        {faqs.map((faq, index) => (
                            <div key={index} className="collapse collapse-arrow join-item border border-x-0 rounded-none" onClick={() => handleAccordionClick(index)}>
                                <input type="radio" name="my-accordion-4" defaultChecked={index === 0}  checked={openIndex === index}  />
                                <div className="collapse-title font-medium font-roboto text-base text-title-work-card max-md:text-center md:font-medium xl:text-[22px] !cursor-pointer">
                                    {index + 1}. {faq.question}
                                </div>
                                <div className="collapse-content text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl xl:font-medium">
                                    <p>{replaceAnchors(faq.answer, targets)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;