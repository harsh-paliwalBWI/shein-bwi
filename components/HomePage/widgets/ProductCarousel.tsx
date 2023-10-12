"use client";
import React, { useRef, useState } from "react";
import { fetchHomeSections } from "../../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCarouselCard from "../productCarouselCard/ProductCarouselCard";

const ProductCarousel = ({ section, myKey,cookie }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });
  // const [page, setPage] = useState(0);
  // const [totalPage, setTotalPage] = useState(100);

  const slider = useRef<any>(null);
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
          // dots: true,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          // dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
          infinite: false,
          dots: false,
          arrows:false
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
          slidesToScroll: 1.5,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  function getProduct(product:any) {
    return product?.data || product;
  }

  function getProductId(product:any){
return product?.id
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }
  const arrowButtonClass =
  "absolute top-0 bottom-0 my-auto bg-black w-10 h-10 block text-white cursor-pointer z-20";
  return (
    <>
      {homeData &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
          ?.arr?.length !== 0 && (
          <div className="">
            {section?.sectionName && (
              <div className=" w-auto flex justify-start mb-2 px-body">
                <h3 className=" text-secondary  sm:text-3xl text-xl font-bold">
                  {section?.sectionName}
                  {/* Nutrition & Supplements */}
                </h3>
              </div>
            )}
            <div className="  justify-center items-center relative lg:mt-5 ">
              {/* {page != 0 && (
                <div className="hidden lg:flex">
                  <button
                    className={`${arrowButtonClass} left-0 lg:left-4 `}
                    onClick={() => slider.current?.slickPrev()}
                  >
                    L
                  </button>
                </div>
              )} */}
              <div className="back  ">
                <div className="w-[100%] lg:px-body h-auto only-carousel">
                  <Slider
                    ref={slider}
                    {...settings}
                    className=""
                    dotsClass={`slick-dots `}
                    nextArrow={<SampleNextArrow />}
                    prevArrow={<SamplePrevArrow />}
                    draggable={true}
                  >
                    {homeData &&
                      homeData?.data?.filter(
                        (val: any) => val?.id === section?.widgetID
                      ) &&
                      homeData?.data?.filter(
                        (val) => val?.id === section?.widgetID
                      ) &&
                      homeData?.data
                        ?.filter((val: any) => val?.id === section?.widgetID)[0]
                        ?.arr?.map((product: any, idx: any) => {
                          // console.log(product,"product carousel");  
                          const productData = getProduct(product);
                          const productId = getProductId(product);
                          return (
                            <div className="flex-1  " key={idx}>
                              <ProductCarouselCard product={productData} id={productId} />
                            </div>
                          );
                        })}
                  </Slider>
                </div>
              </div>
              {/* {page < totalPage-1 && (
                <div className=" hidden lg:flex">
                  <button
                    className={`${arrowButtonClass} right-0 lg:right-4 `}
                    onClick={() => slider.current?.slickNext()}
                  >
                    R
                  </button>
                </div>
              )} */}
            </div>
          </div>
        )}
    </>
  );
};

export default ProductCarousel;
