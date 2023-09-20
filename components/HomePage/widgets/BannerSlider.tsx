"use client";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeSections } from "../../../utils/databaseService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { bannerLink } from "../../../utils/bannerLink/bannerLinking";

const BannerSlider = ({ section, myKey }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });
  const slider = useRef<any>(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative">
      {homeData &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
          ?.arr?.length !== 0 && (
          <div className="w-full">
            <Slider
              ref={slider}
              {...settings}
              nextArrow={<></>}
              prevArrow={<></>}
              className="overflow-hidden"
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
                  ?.arr?.map((banner: any, idx: any) => (
                    <div
                      className="h-auto w-full"
                      key={idx}
                      onClick={() => bannerLink(banner)}
                    >
                      <Image
                        src={banner?.image?.org}
                        alt={banner?.image?.caption || "image"}
                        width={1000}
                        height={100}
                        layout="responsive"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
            </Slider>
          </div>
        )}
    </div>
  );
};

export default BannerSlider;
