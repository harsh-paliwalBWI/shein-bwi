"use client"
import React from 'react'
import { fetchCategoryProducts } from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import { Image } from 'react-bootstrap';
import Link from 'next/link';

const SubCategoryProductComponent = ({params}) => {
    const { data: categoryProducts } = useQuery({
        queryKey: ["category-product", params?.slug],
        queryFn: () => fetchCategoryProducts(params?.slug,"category"),
      });
      // console.log(params,"SubCategoryProductComponent ");
      console.log(categoryProducts,"category ");
      console.log(params?.slug,"category");
      
      
  return (
    <div className='px-body'>
          <div className="w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid gap-y-6 gap-x-6  my-5">

      { categoryProducts&& categoryProducts.length>0&& categoryProducts.map((item:any,idx:number)=>{
        //  <Link href={`/categry/${product?.slug?.name}`}>
        return <Link href={`/category/${params?.slug}/sub-category-product/${item?.slug?.name} `} key={idx}>
        <div className=' text-center border-[1px] border-[#D2D2D2]  rounded-br-3xl '>
          {/* <div><Image src={item.image.url} alt=''/></div> */}
          <div className="h-[100px] lg:h-[200px]    rounded-br-3xl  ">
        {/* <Image
          src={item?.image?.url}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-fit  rounded-br-3xl "
        /> */}
      </div>
          <p className='my-2 text-ellipsis overflow-hidden ... truncate text-center   text-base font-bold '>{item.name}</p>
        </div>
         </Link>
      })}
      </div>
    </div>
  )
}

export default SubCategoryProductComponent
