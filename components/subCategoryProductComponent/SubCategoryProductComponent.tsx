"use client"
import React, { useState, useEffect } from 'react'
import { fetchCategoryProducts } from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import FlatIcon from '../flatIcon/flatIcon';

const SubCategoryProductComponent = ({ params }) => {
  const [hoveredProduct, setHoveredProduct] = useState("");

  const { data: categoryProducts } = useQuery({
    queryKey: ["category-product", params?.slug],
    queryFn: () => fetchCategoryProducts(params?.slug, "category"),
  });
  // console.log(params,"SubCategoryProductComponent ");
  // console.log(categoryProducts,"category ");
  // console.log(params?.slug,"category");


  return (
    <div className='px-body'>
      <div className="w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid gap-y-6 gap-x-6  my-5">
        {categoryProducts && categoryProducts.length > 0 && categoryProducts.map((item: any, idx: number) => {
          return <Link href={`/category/${params?.slug}/sub-category-product/${item?.slug?.name} `} key={idx}>
            <div
              className={`flex flex-col  relative   bordered-shape overflow-hidden `}
            >
              <div className="border-[1px] border-secondary p-2 product-card ">
                <div className=" relative  mb-2">
                  <div className="h-[250px] relative ">
                    <Image
                      src={item?.image?.url}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full h-full object-fit"
                    />
                  </div>
                </div>
                <div className="flex justify-center  overflow-hidden   truncate w-full text-sm font-medium text-primary capitalize mb-3">
                  <h2 className="">{item.name}</h2>
                </div>
              </div>
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}

export default SubCategoryProductComponent
