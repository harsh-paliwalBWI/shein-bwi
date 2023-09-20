"use client"
import React from 'react'
import Image from "next/image";
import productImg from "../../../images/beautiful-elegance-luxury-fashion-green-handbag 1.svg"
import FlatIcon from '../../flatIcon/flatIcon';
const VideoMiniCard = () => {
  return (
    <>
    <div className='absolute bottom-[18px] bg-[#ffffff]  left-1/2 transform -translate-x-1/2    w-[90%] p-1 rounded-md'>
        <div className='flex items-start border border-primary'>
            <div className=''><Image src={productImg} alt='' height={1000} width={1000} className='aspect-auto w-[69px] h-[84px]'/></div>
            <div>
                <h4 className='text-sm font-semibold truncate'>Green Crossbody bag with </h4>
                <div className='flex items-center '>
                    <div>
                    <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-sm"} />
                    </div>
                    <p className='text-xs font-medium'>3.8</p>
                </div>
                <div className='flex items-center'>
                    <h3 className='text-sm'>Rs. 2,999</h3>
                    <h4 className='text-xs'>Rs. 3,999</h4>
                </div>
            </div>
        </div>
        {/* <div className="bg-primary absolute bottom-[18px] left-[8px]"> */}
          {/* <div className="flex gap-1 text-[10px] text-white px-2.5 py-1"> <p>15%</p><p>OFF</p></div> */}
        </div></>
  )
}

export default VideoMiniCard