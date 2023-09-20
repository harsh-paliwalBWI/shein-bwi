import React from 'react'
import Image from 'next/image';
import { constant } from "../../../utils/constants";

const CategoryGridCard = ({cat}) => {
  // console.log(cat,"cat");
  
  return (
    <div>
      <div className='relative cursor-pointer'>
        <Image src={cat?.image?.url || cat?.image?.mob || constant?.errImage} alt='' width={1000} height={1000} className='h-[310px] rounded-lg'/>
        <div className='absolute bottom-[22px] text-white  left-1/2 transform -translate-x-1/2    w-[85%]' >
          <div className='font-semibold text-lg'>{cat.name}</div>
          <div className='font-semibold text-xs'>3 for Rs. 2,799</div>
        </div>
      </div>
    </div>
  )
}

export default CategoryGridCard