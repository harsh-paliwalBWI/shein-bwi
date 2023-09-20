import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { constant } from "../../utils/constants";
import discountBg from "../../images/Vector (2).svg"
import btnBg from "../../images/image (8).png"

const CategoryCard = ({ cat, heading, slug }) => {
  return (
    <Link href={cat?.isSubcategories ? `/category/${cat?.slug?.name}` : `/category-product/${cat?.slug?.name} `}>
      <div className="flex flex-col  mx-1 relative ">
        <div className=" relative  mb-2 p-2  flex justify-center">
          <div className=" h-[190px] w-[190px] rounded-full relative z-30 ">
            <div className="h-[100%] w-[100%] p-[8px]">
              <Image
                src={cat?.image?.url || cat?.image?.mob || constant?.errImage}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-fit rounded-full border-[3px] border-primary"
              />
            </div>
            <div className="absolute  bottom-0 left-1/2 transform -translate-x-1/2 half-circle z-10  "><div className="absolute bottom-0 second-half w-full h-[50%] rounded-full"></div></div>
          </div>
        </div>
        <div className=" overflow-hidden truncate text-center w-full text-base font-bold  mb-1">
          <h2 className="">{heading}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;


