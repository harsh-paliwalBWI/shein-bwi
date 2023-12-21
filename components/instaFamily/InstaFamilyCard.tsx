"use client";
import React from "react";
import Image from "next/image";
import videoImg from "../../images/0c8ce2ac-59a4-444a-b6ac-09a3637f205d.svg";
import ReactPlayer from "react-player";

const InstaFamilyCard = ({ item }) => {
  return (
    <div
      className={`flex flex-col mx-2.5 relative   bordered-shape overflow-hidden cursor-pointer rounded-2xl border border-[#d7d7d7] `}
    >
      {/* <div className=" rounded-2xl product-card "> */}
      <ReactPlayer
        url={item?.link}
        light={item?.thumbnail}
        width={"100%"}
        playing={true}
        loop={true}
        // controls
        // controls
      />
      {/* </div> */}
    </div>
  );
};

export default InstaFamilyCard;
