"use client";
import Link from "next/link";
import { get, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "@/app/components/ui/Input";
import React, { useEffect, useState } from "react";
import Image from 'next/image';



const Footer = () => {
  const menuItems = [
    {
      title: "ABOUT MatchMyTees",
      links: [
        { text: "Designs We Do", href: "/design" },
        { text: "Military or First Responder Discount", href: "/discount" },
        { text: "Size Chart", href: "/size-chart" },
        { text: "How It Works", href: "/how-it-works" },
      ],
    },
    {
      title: "Information",
      links: [
        // { text: "FAQ", href: "/faq" },
        { text: "Support", href: "/support" },
        { text: "Returns & Refunds", href: "/return-refund" },
        // { text: "Terms of Use", href: "/terms-of-use" },
        { text: "Shipping", href: "/shipping" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/about-us" },
        // { text: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState({});
  
  const onSubmit = async (data) => {
    try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(email),
      }
    );
    if (response.ok) {
      toast("Subscribed successfully", {
        position: "top-right",
        render: "Subscribed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    } 
    else if(response.status==409){
      toast("Email already subscribed", {
        position: "top-right",
        render: "Email already subscribed",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    }
    } catch (err) {
      
      console.log(err)
    }
  };

  const handleInputChange = (e) => {
    const data = e.target.value;
    if (data.length > 2) {
      setEmail({email:data});
    }
  };

  return (
    <div className="footer-gradient">
      <div className="my-container py-8">
        <div className="flex flex-col gap-12">
          <div className="flex w-full flex-wrap gap-6 justify-between">
            {menuItems.map((menuItem, index) => (
              <div key={index} className="flex flex-col gap-5 text-title-work-card w-fit">
                <h2 className="font-medium text-sm xl:text-base uppercase">{menuItem.title}</h2>
                <div className="font-normal text-sm flex flex-col gap-6 xl:gap-2 xl:text-base">
                  {menuItem.links.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link.href} className="capitalize hover:underline hover:scale-[1.02] duration-200">
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="bg-transparent lg:bg-white lg:p-8 rounded-lg max-w-[364px] flex flex-col gap-4">
              <h3 className="font-medium text-base text-title-work-card">Subscribe</h3>
              <form className="flex h-12 border border-border-primary rounded-[8px] max-lg:bg-white" onSubmit={handleSubmit(onSubmit)}>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <input type="email"
                   placeholder="Email address" 
                   name="email" 
                   className="bg-transparent  size-full focus:outline-none px-3"
                   onChange={handleInputChange}
                  />
                <button className="btn btn-sm h-[46px] bg-orange-primary border-none hover:bg-orange-primary/80 active:bg-orange-primary/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="13"
                    viewBox="0 0 17 13"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4392 13L16.5398 7.42846C17.1015 6.91519 17.1015 6.08324 16.5398 5.57154L10.4392 0L8.40549 1.8581L12.0509 5.18669H0.480469L0.480469 7.81292H12.0509L8.40549 11.1427L10.4392 13Z"
                      fill="white"
                    />
                  </svg>
                </button>
                {/* </form> */}
              </form>
              <p className="font-normal text-title-work-card/60 text-sm hidden lg:block">
                Hello, we are MatchMyTees. Our goal is to translate the
                positive effects from revolutionizing how companies engage
                with their clients & their team.
              </p>
            </div>
          </div>
          <hr className="border-[#9F9F9F]/30" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link className="hover:underline hover:scale-[1.02] duration-200 nav-link" href="/">
              <Image width={199} height={22} src={'/images/landing/logo.svg'} alt="" />
            </Link>
            <div className="max-md:order-3 flex items-center gap-0 text-title-work-card text-xs md:font-medium md:text-sm">
              <div className="hover:underline hover:scale-[1.02] duration-200 no-underline hover:no-underline" >©Pippa Technologies<span className="px-1.5">|</span> </div>
              <Link className="hover:underline hover:scale-[1.02] duration-200" href={'/privacy'}>Privacy Policy<span className="px-1.5">|</span></Link>
              <Link className="hover:underline hover:scale-[1.02] duration-200" href={'/terms-of-use'}>Terms of Use</Link>
            </div>
            <div className="flex gap-8">
              <Link target="_blank" className="hover:underline hover:scale-[1.02] duration-200" href="https://www.instagram.com/matchmytees/">
                <Image width={30} height={30} className="size-7 xl:size-9" src={'/images/social_icons/instagram.png'} alt="" />
              </Link>
              <Link target="_blank" className="hover:underline hover:scale-[1.02] duration-200" href="https://www.facebook.com/matchmytees/">
                <Image width={30} height={30} className="size-7 xl:size-9" src={'/images/social_icons/facebook.png'} alt="" />
              </Link>
              <Link target="_blank" className="hover:underline hover:scale-[1.02] duration-200" href="https://tiktok.com/@matchmytees">
                <Image width={30} height={30} className="size-7 xl:size-9" src={'/images/social_icons/tiktok.png'} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
