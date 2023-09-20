import React from 'react'
import Image from 'next/image'
import referAndEarnImg from "../../images/Group 1797.svg"
const ReferAndEarn = () => {
  return (
    <div className='flex px-body md:flex-row flex-col items-center sm:gap-10 gap-5 justify-between w-full mt-8'>
        <div className='md:w-[55%] w-[100%] '>
            <h1 className='md:text-5xl text-2xl font-bold text-secondary'>Refer & Earn</h1>
            <p className='text-[#555555] sm:text-sm text-xs font-semibold mt-5 '>Welcome to our "Refer and Earn" program – the ultimate way to share the benefits of our products/services with your friends and family while earning fantastic rewards in the process.</p>
            <div className='md:mt-14 mt-6'><button className='bg-[#171717] text-white font-medium text-sm px-12 py-2.5'>Sign Up</button></div>
        </div>
        <div className='md:w-[45%] sm:w-[70%] w-[100%]'><Image src={referAndEarnImg} alt='' height={1000} width={1000} style={{width:"100%",height:"auto",aspectRatio:"auto" }}/></div>
    </div>
  )
}

export default ReferAndEarn