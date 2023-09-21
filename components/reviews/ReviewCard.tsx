"use client"
import React from 'react'
import FlatIcon from '../flatIcon/flatIcon';
// import usrImg from "../../images/el"

const ReviewCard = ({item}) => {
    console.log(item);
    
  return (
    <div className='flex flex-col gap-y-4'>
        <div className='flex justify-center items-center sm:flex-row flex-col gap-y-4 gap-x-4  w-full'>
        <div className='h-[74px] w-[74px] rounded-full border border-gray-500 p-1'><div className='border border-gray-400 rounded-full w-full h-full'></div></div>
        <div className='sm:text-start text-center'>
            <h1 className='font-bold sm:text-base text-sm'>{item.name}</h1>
            <h3 className='text-[#999999] sm:text-sm text-xs font-semibold'>{item.about}</h3>
        </div>
        </div>
        <div className='flex flex-col gap-y-10 '>
        <div className='text-sm font-bold text-center leading-6'>{item.review}</div>
        <div className='flex justify-center items-center gap-x-1'>
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
        </div>
        </div>
    </div>
  )
}

export default ReviewCard