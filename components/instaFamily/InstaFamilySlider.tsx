"use client";
import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
// import { fetchSimilarProductsForCart } from '../../../config/typesense';
import { fetchSimilarProductsForCart } from "../../config/typesense";
import instagram from "../../images/instagram (3) 1.svg";
import instagram2 from "../../images/instagram (9) 1.svg";

// import VideoCard from '../videoCard/VideoCard';
import InstaFamilyCard from "./InstaFamilyCard";
import FlatIcon from "../flatIcon/flatIcon";
import Image from "next/image";

const InstaFamilySlider = () => {
  const slider = useRef<any>(null);
  const { data: similarData } = useQuery({
    queryKey: ["product", "caricature-cartoon", "similar-product"],
    queryFn: () =>
      fetchSimilarProductsForCart({
        searchKeywords: ["Gentlemen's Collection", "Nike"],
      }),
  });
  // console.log(similarData,"simildar data");

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2.5,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }
  const arrowButtonClass =
  "absolute top-0 bottom-0 my-auto bg-[#F2F7FF] sm:w-10 sm:h-10 h-8 w-8 block text-white cursor-pointer z-20 rounded-full ";

  return (
    <>
      {similarData && similarData.length > 0 && (
        // <div className="px-body bg-instagram-section-bg bg-cover bg-no-repeat  md:py-16 py-10  -mb-4">
        <div className="px-body relative  bg-cover bg-no-repeat   ">
          {/* <div className="text-white"> */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-2 ">
              {/* <div>
                <Image src={instagram} alt="" />
              </div> */}
              {/* <FlatIcon className="flaticon-instagram  sm:text-5xl text-3xl" /> */}
              <h1 className="sm:text-3xl text-xl font-bold">
                INSTAGRAM FAMILY
              </h1>
            </div>
            <h5 className="text-center sm:text-xl sm font-semibold">
              {/* Tag us @shienstylestores to get featured */}
              Tag us @sheinstylestores and use #sheinstylestores to get feautured
            </h5>
            <div className="text-primary font-medium underline text-center cursor-pointer">
                  {/* <Link
                    href={`/view-all?type=${section?.widgetType}&id=${section?.widgetID}&name=${encodeURIComponent(section?.sectionName)}`}
                    className="text-primary font-medium underline"
                  > */}
                    View All
                  {/* </Link> */}
                </div>
          </div>
          <div className="  justify-center items-center    md:py-12 py-6">
          <div className="">
                <button
                  className={`${arrowButtonClass} left-0 lg:left-4 flex items-center justify-center`}
                  onClick={() => slider.current?.slickPrev()}
                >
                  <FlatIcon className="flaticon-left-arrow text-secondary sm:text-2xl text-lg font-bold"/>
                </button>
              </div>
            <div className="back  ">
              <div className="w-[100%]  h-auto only-carousel">
                <Slider
                  ref={slider}
                  {...settings}
                  className=""
                  dotsClass={`slick-dots `}
                  nextArrow={<></>}
                  prevArrow={<></>}
                  draggable={true}
                >
                  {[1, 2, 3, 4, 6, 7, 5, 6, 8].map((item: any, idx: number) => {
                    return (
                      <div key={idx}>
                        <InstaFamilyCard />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="">
                <button
                  className={`${arrowButtonClass} right-0 lg:right-4 text-center flex items-center justify-center   `}
                  onClick={() => slider.current?.slickNext()}
                >
                  <FlatIcon className="flaticon-left-arrow -rotate-180 text-secondary sm:text-2xl text-lg font-bold"/>
                </button>
              </div>
          </div>
          <div className="flex items-center sm:gap-3 gap-2 justify-center lg:text-2xl md:text-xl sm:text-base text-sm font-semibold ">
            <h2>EXPLORE MORE ON</h2>
              <div className="sm:w-fit sm:h-full h-8 w-8 ">
                <Image src={instagram2} alt="" />
              </div>
              {/* <FlatIcon className="flaticon-instagram  sm:text-5xl text-3xl" /> */}
            <h2>@sheinstylestores</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default InstaFamilySlider;
