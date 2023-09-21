"use client"
import React from 'react'
import Image from "next/image"
import videoImg from "../../images/0c8ce2ac-59a4-444a-b6ac-09a3637f205d.svg"

const WatchShopCard = () => {
  return (
   <>
    <div className={`flex flex-col mx-2.5 relative   bordered-shape overflow-hidden `}
   
      >
     
<div className="  product-card ">
<Image
          src={videoImg}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-fit"
        />
      
    </div>
    </div>
   </>
  )
}

export default WatchShopCard