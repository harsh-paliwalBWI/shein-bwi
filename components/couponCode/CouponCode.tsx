import React from 'react'
import Link from "next/link";

const CouponCode = () => {
  return (<div className='flex flex-col w-full'>
    <div className=' border border-gray-400  flex flex-col w-full  px-5 py-5 '>
      <div className='flex  justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm'>Price </h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>Rs. 3290</h2></div>
      <div className='my-4'><input type="text" className='border border-gray-300 w-full py-3 rounded px-3' placeholder='Enter a Coupon Code' /></div>
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Subtotal</h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>Rs. 3290</h2></div>
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Shipping Fees</h3><h2 className='font-semibold text-secondary sm:text-base text-sm' >Rs. 3290</h2></div>
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Coupon/ Discount</h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>Rs. 3290</h2></div>
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Taxes</h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>Rs. 3290</h2></div>
      <div className='w-full bg-gray-300 h-[1px]'></div>
      <div className='flex items-center justify-between w-full text-secondary'><h3 className=' font-medium sm:text-lg text-sm mt-3 mb-5'>Total</h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>Rs. 3290</h2></div>
      <Link href={"/checkout"}>
        <div className='flex  justify-between w-full'><button className='bg-secondary text-white font-semibold w-full text-center py-2 sm:text-base text-xs'>Checkout</button></div>
      </Link>
    </div>
  </div>
  )
}

export default CouponCode