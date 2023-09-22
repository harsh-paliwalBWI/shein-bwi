"use client";
import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
// import { fetchSimilarProductsForCart } from '../../../config/typesense';
import { fetchSimilarProductsForCart } from "../../config/typesense";
// import VideoCard from '../videoCard/VideoCard';
import InstaFamilyCard from "./InstaFamilyCard";
import FlatIcon from "../flatIcon/flatIcon";

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

  return (
    <>
      {similarData && similarData.length > 0 && (
        <div className="px-body bg-instagram-section-bg bg-cover bg-no-repeat  md:py-16 py-10  -mb-4">
          <div className="text-white">
            <div className="flex justify-center items-center gap-2 ">
              <FlatIcon className="flaticon-instagram  sm:text-5xl text-3xl" />
              <h1 className="sm:text-3xl text-xl font-bold">
                INSTAGRAM FAMILY
              </h1>
            </div>
            <h5 className="text-center sm:text-xl sm font-semibold">
              Tag us @shienstylestores to get featured
            </h5>
          </div>
          <div className="  justify-center items-center relative    md:py-12 py-6">
            <div className="back  ">
              <div className="w-[100%]  h-auto only-carousel">
                <Slider
                  ref={slider}
                  {...settings}
                  className=""
                  dotsClass={`slick-dots `}
                  nextArrow={<SampleNextArrow />}
                  prevArrow={<SamplePrevArrow />}
                  draggable={true}
                >
                  {[1,2,3,4,6,7,5,6,8].map((item: any, idx: number) => {
                      return (
                        <div key={idx}>
                          <InstaFamilyCard />
                        
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstaFamilySlider;
