"use client"
import React from "react";
import logo from "../../images/MedX-Pharmacy-Logo-R-01 2 (1).svg";
import Image from "next/image";
import img1 from "../../images/image 146.svg"
import img2 from "../../images/da1cd32c-33a4-48a2-9873-f45c918d31f5 1.svg"
import img3 from "../../images/image 147.svg"
import img4 from "../../images/Fedex-logo 1.svg"
import img5 from "../../images/pngkit_delivery-com-logo-png_5554386 1.svg"
import codImg from "../../images/image 148.svg"
import americanExpImg from "../../images/pngwing 1.svg"
import masterCardImg from "../../images/MasterCard_Logo 1.svg"
import visaImg from "../../images/visa 3.svg"
import gpayImg from "../../images/google-pay 1.svg"
import paytmImg from "../../images/Paytm-Logo 1.svg"
import FlatIcon from "../flatIcon/flatIcon";
import appStoreImg from "../../images/Group 34287.svg"
import playStoreImg from "../../images/Group 34288.svg"
import facebookImg from "../../images/facebook (2) 1.svg"
import instagram from "../../images/instagram (3) 1.svg"
import pinterest from "../../images/pinterest (1) 1.svg"
import twitter from "../../images/twitter 2.svg"
import { getStoreDetails } from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
const Footer = () => {
  const DUMMY_DATA = [
    {
      heading: "SHEIN STYLE STORES",
      subLinks: [
        { name: "About" },
        { name: "Careers" },
        { name: "Influencer Program" },
        { name: "Social Responsibility" },
        { name: "Business Enquiries" },
        { name: "Become a Partner" },
        { name: "Fraud Alert" },
      ],
    },
    {
      heading: "HELP & SUPPORT",
      subLinks: [
        { name: "FAQS" },
        { name: "Happy Customers" },
        { name: "Brand Feedback" },
        { name: "Track Order" },
        { name: "Size Guide" },
        { name: "Loyalty Program" },

      ],
    },
    {
      heading: "OUR SERVICE",
      subLinks: [
        { name: "Return and Exchange" },
        { name: "Privacy Policy" },
        { name: "Terms & Conditions" },
        { name: "Shipping Terms" },
        { name: "Cookies Policy" },
        { name: "Accessibility" },
      ],
    },

  ];
  const images = [
    { image: img1 },
    { image: img2 },
    { image: img5 },
    { image: img3 },
    { image: img4 },

  ];
  const { data: storeData } = useQuery({
    queryKey: ["storeDetails"],
    queryFn: () => getStoreDetails(),
    keepPreviousData: true,
  });
  // console.log(storeData,"storeData");
  
  const pyamentModeImages = [{ image: codImg }, { image: americanExpImg }, { image: masterCardImg }, { image: visaImg }, { image: gpayImg }, { image: paytmImg }]
  return (
    <div className="  h-fit">
      <div className="flex      w-full">
        <div className="bg-[#F6F4F1] text-white  w-full ">
          <div className="px-body sm:py-[40px] py-[20px] ">
            <div className="grid  xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:gap-x-10 gap-x-4 gap-y-4 sm:mb-[60px] mb-[40px]  ">
              {DUMMY_DATA.map((item: any, idx: number) => {
                return (
                  <div className=" flex flex-col gap-4  " key={idx}>
                    <h3 className=" relative font-bold md:text-xl text-base text-secondary ">
                      {item.heading}
                      <div className="bg-primary   absolute bottom-[-12px] p-[1px] w-[55px] h-[2px]"></div>
                    </h3>
                    <div className="flex flex-col gap-4 mt-4">
                      {item.subLinks.map((item: any, idx: number) => {
                        return (
                          <p key={idx} className="text-sm text-[#555555] font-medium">
                            {item.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className=" flex flex-col gap-4    ">
                <h3 className=" relative font-bold md:text-xl text-base text-secondary ">
                  OUR OFFICE
                  <div className="bg-primary   absolute bottom-[-12px] p-[1px] w-[55px] h-[2px]"></div>
                </h3>
                <div className="flex flex-col gap-4 mt-4 text-sm text-[#555555] font-semibold ">
                  <div className="flex gap-3"><div><FlatIcon className="flaticon-address text-2xl font-bold text-secondary " /></div>
                  <p>
                    {storeData?.storeAddress?.address}
                    {/* 3517 W. Gray St. Utica, Pennsylvania 57867 */}
                    </p>
                  </div>
                  <div className="flex gap-3"><div><FlatIcon className="flaticon-contact text-2xl font-bold text-secondary" /></div><p>
                    {/* (217) 555-0113, (217) 555-0113 */}
                    {storeData?.storePhone}
                    </p></div>
                  <div className="flex gap-3"><div><FlatIcon className="flaticon-contact-1 text-2xl font-bold text-secondary" /></div><p>support@shein.com</p></div>
                  <div className="text-secondary text-base font-semibold"><span>Follow us on social media get</span> <span className="text-primary">1000 Bonus </span>Points *<span></span></div>
                  <div className="flex gap-4">
                    <Link href={storeData?storeData?.facebookUrl:""}>
                    <div><Image src={facebookImg} alt="" /></div>
                    </Link>
                    <Link href={storeData?storeData?.instagramUrl:""}>
                    <div><Image src={instagram} alt="" /></div>
                    </Link>
                    <Link href={storeData?storeData?.facebookUrl:""}>
                    <div><Image src={pinterest} alt="" /></div>
                    </Link>
                    <Link href={storeData?storeData?.twitterUrl:""}>
                    <div><Image src={twitter} alt="" /></div>
                    </Link>
                    </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex md:items-center md:flex-row flex-col gap-y-4 justify-between gap-x-3">
                <div className="flex flex-col">
                  <div className=" md:text-2xl sm:text-xl text-lg font-semibold text-secondary mb-3"><h2>We Accept</h2></div>
                  <div className="flex items-center lg:flex-nowrap flex-wrap md:gap-x-6 gap-x-4 gap-y-2 ">
                    {pyamentModeImages.map((item: any, idx: number) => {
                      return <div key={idx}><Image src={item.image} alt="" /></div>
                    })}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className=" md:text-2xl sm:text-xl text-lg font-semibold text-secondary mb-3 md:text-end"><h2>Delivery Partners</h2></div>
                  <div className="flex items-center md:justify-end lg:flex-nowrap flex-wrap md:gap-x-6 gap-x-4  gap-y-2 ">
                    {images.map((item: any, idx: number) => {
                      return <div key={idx}><Image src={item.image} alt="" /></div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-[1.5px] border-[white] border-line"></div>
          <div className="flex sm:flex-row flex-col items-center sm:justify-between gap-x-4 gap-y-4   py-5 px-body">
            <p className="text-secondary md:text-base text-sm font-medium text-center sm:text-start ">
              ©2019-2023 SHEINSTYESTORES INC All Rights Reserved
            </p>
            <div className="">
              <div className="text-secondary md:text-base text-sm font-medium mb-3">Download App and Get 10% Extra Discount</div>
              <div className="flex sm:flex-row flex-row items-center sm:gap-x-6 gap-x-2 gap-y-4">
                <div><Image src={playStoreImg} alt="" height={1000} width={1000} className="aspect-auto sm:w-[170px] w-[150px] h-auto" /></div>
                <div><Image src={appStoreImg} alt="" height={1000} width={1000} className="aspect-auto sm:w-[170px] w-[150px]  h-auto" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
