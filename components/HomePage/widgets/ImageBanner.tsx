import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchHomeSections } from "../../../utils/databaseService";
import Image from "next/image";
import { constant } from "../../../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const ImageBanner = ({ section, myKey = `` }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });
  const [hoveredProduct, setHoveredProduct] = useState(false);

  const imagesArr =
    homeData &&
    homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
    homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
    homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr;
// console.log(imagesArr,"img arr");

  const newImagesArr = imagesArr.slice(0, 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: hoveredProduct ? true : false,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  function getProduct(product) {
    return product?.data || product;
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }

  if (imagesArr.length === 0) return <div className="hidden"></div>;

  // if(imagesArr.length>3){
  //   ima
  // }
  if (imagesArr.length > 3) {
    return (
      <div
        className={` only-carousel `}
        onMouseEnter={() => {
          setHoveredProduct(true);
        }}
        onMouseLeave={() => {
          setHoveredProduct(false);
        }}
      >
        <Slider
          {...settings}
          className=""
          dotsClass={`slick-dots `}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
          draggable={true}
        >
          {imagesArr?.map((image: any,idx:number) => {
            return (
              <div className="rounded-lg px-[10%]" key={idx}>
                <Image
                  src={image?.image?.org}
                  alt="banner"
                  width={100}
                  height={100}
                  layout="responsive"
                  className="flex-1 max-h-[450px] object-fill rounded-lg cursor-pointer"
                />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }

  const image =
    (homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr &&
      homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr[0]
        ?.image?.org) ||
    homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr[0]
      ?.image?.url;

  return (
    // <div className={`px-body`} key={key}>
    //   {/* {section?.sectionName && (
    //     <div className="mx-auto w-auto flex justify-center mb-2">
    //       <h3 className="mx-auto text-lg lg:text-3xl font-semibold">
    //         {section?.sectionName}
    //       </h3>
    //     </div>
    //   )} */}
    //   {newImagesArr.length===1&&<div>
    //      <div className="w-full flex justify-center items-center rounded-br-2xl  ">
    //     <Image
    //       src={image}
    //       alt="banner"
    //       width={100}
    //       height={100}
    //       layout="responsive"
    //       className="flex-1 h-[280px] object-fit rounded-br-2xl"
    //     />
    //   </div>
    //   </div>}
    //   {newImagesArr.length===2&&<div className="flex w-full gap-3">
    //      <div className="w-1/2 rounded-br-2xl  ">
    //     <Image
    //       src={image}
    //       alt="banner"
    //       width={1000}
    //       height={1000}
    //       // layout="responsive"
    //       className="flex-1 h-[280px] object-fit rounded-br-2xl "
    //     />
    //   </div>
    //   <div className="w-1/2  rounded-br-2xl ">
    //     <Image
    //       src={image}
    //       alt="banner"
    //       width={1000}
    //       height={1000}
    //       // layout="responsive"
    //       className="flex-1 h-[280px] object-fit rounded-br-2xl "
    //     />
    //   </div>
    //   </div>}
    //   {newImagesArr.length===3&&<div className="flex w-full">
    //      <div className="w-1/3 rounded-br-2xl ">
    //     <Image
    //       src={image}
    //       alt="banner"
    //       width={100}
    //       height={100}
    //       // layout="responsive"
    //       className="flex-1 h-[280px] object-fit rounded-br-2xl"
    //     />
    //   </div>
    //   <div className="w-1/3  rounded-br-2xl  ">
    //     <Image
    //       src={image}
    //       alt="banner"
    //       width={100}
    //       height={100}
    //       layout="responsive"
    //       className="flex-1 h-[280px] object-fit rounded-br-2xl"
    //     />
    //   </div>
    //   <div className="w-1/3  rounded-br-2xl  ">
    //     <Image
    //       src={image}
    //       alt="banner"
    //       width={100}
    //       height={100}
    //       layout="responsive"
    //       className="flex-1 h-[280px] object-fit rounded-br-2xl"
    //     />
    //   </div>
    //   </div>}
    //   {/* <div className="w-full flex justify-center items-center rounded-lg  ">
    //     <Image
    //       src={image}
    //       alt="banner"
    //       width={100}
    //       height={100}
    //       layout="responsive"
    //       className="flex-1 max-h-[450px] object-fill rounded-lg"
    //     />
    //   </div> */}
    // </div>
    // ${imagesArr.length===1?"px-0":"px-body"}
<div className={` w-full ${imagesArr.length===3?"px-body":imagesArr.length===2?"px-[1.5%]":"px-0"}   ${imagesArr.length===3?"lg:-mt-36 -mt-16":"-mt-0"} z-30`}>
{/* <div className="flex justify-center items-center mb-8"><h1 className="sm:text-3xl text-xl font-bold">#SHEINSTYLESTORES CAMPAIGN</h1></div> */}

    <div className={` w-full  flex  items-center ${imagesArr.length===3?"sm:gap-7":"sm:gap-2"} `} key={myKey}>
      {newImagesArr.map((imageData, index) => (
        <div
          key={imageData.image.org || imageData.image.url}
          className={` ${
            newImagesArr.length === 1
              ? "w-full flex justify-center items-center  "
              : `w-${100 / newImagesArr.length} `
          }  `}
        >
          <Image
            src={imageData.image.org || imageData.image.url}
            alt="banner"
            width={1000}
            height={1000}
            // layout="responsive"
            style={{aspectRatio:"auto"}}
            className={`flex-1 ${imagesArr.length===2?"sm:h-[25rem] h-[10rem]":"h-auto"} object-fit`   }
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default ImageBanner;
