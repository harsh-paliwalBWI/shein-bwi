"use client"
import React from 'react'
import Image from "next/image"
import videoImg from "../../images/0c8ce2ac-59a4-444a-b6ac-09a3637f205d.svg"

const InstaFamilyCard = () => {
  return (
    <div className={`flex flex-col mx-2.5 relative   bordered-shape overflow-hidden cursor-pointer `}
    // key={product?.id || idx || Math.random().toString()}  
    // onMouseEnter={() => {
    //     setHoveredProduct(product?.id);
    //   }}
    //   onMouseLeave={() => {
    //     setHoveredProduct("");
    //   }}
      >
     
<div className="  product-card ">
<Image
          src={videoImg}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-fit"
        />
       {/* <div className=" relative  mb-2">
      <div className="h-[300px] relative ">
        <Image
          src={videoImg}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-fit"
        />
      </div>
      </div> */}
      {/* <div className="flex    w-full text-sm font-semibold mb-3 ">
        <h2 className="">Calcium Magnesium Zinc </h2>
      </div> */}
    </div>
    </div>
  )
}

export default InstaFamilyCard