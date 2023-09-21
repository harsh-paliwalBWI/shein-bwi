"use client";
import React from "react";
import Image from "next/image";
import productImg from "../../../images/beautiful-elegance-luxury-fashion-green-handbag 1.svg";
import FlatIcon from "../../flatIcon/flatIcon";
const VideoMiniCard = () => {
  return (
    <>
      <div className="absolute bottom-[18px] bg-[#ffffff]  left-1/2 transform -translate-x-1/2    w-[90%] p-1 rounded-md">
        <div className="flex items-center border  w-full gap-1">
          {/* <div className="md:w-[69px] md:h-[84px] border border-[green] w-[50%]"> */}
          <div className="w-[25%] flex items-center h-full">
            <Image
              src={productImg}
              alt=""
              height={1000}
              width={1000}
              // className="aspect-auto w-[69px] h-[84px] border border-secondary object-cover"
              className="w-full h-full object-contain"
            />
          </div>
          {/* <div className="relative h-[84px] md:w-auto w-[50%] border "> */}
          <div className="relative h-[84px] w-[50%]  flex-1 border ">
            <h4 className="text-sm font-semibold truncate mb-5">
              Green Crossbody bag with{" "}
            </h4>
            <div className="flex items-center gap-1">
              <div>
                <FlatIcon
                  icon={"flaticon-star text-[#FFBA07] font-normal text-base"}
                />
              </div>
              <p className="text-xs font-medium">3.8</p>
            </div>
            <div className="flex items-center justify-between absolute bottom-0 left-0">
              <h3 className="sm:text-sm text-xs font-semibold">Rs. 2,999 &nbsp;</h3>
              <h4 className="text-xs text-gray-500 font-semibold">Rs. 3,999</h4>
            </div>
          </div>
        </div>
        {/* <div className="bg-primary absolute bottom-[18px] left-[8px]"> */}
        {/* <div className="flex gap-1 text-[10px] text-white px-2.5 py-1"> <p>15%</p><p>OFF</p></div> */}
      </div>
    </>
  );
};

export default VideoMiniCard;
