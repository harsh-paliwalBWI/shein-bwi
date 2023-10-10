"use client";
import Image from "next/image";
import React, { useState } from "react";
import { checkIfPriceDiscounted } from "../../utils/utilities";
import { constant } from "../../utils/constants";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import discountBg from "../../images/Vector (2).svg";
import btnBg from "../../images/image (8).png";
import FlatIcon from "../flatIcon/flatIcon";

const ProductCard = ({ product, idx = Math.random(), mx }: any) => {
  const [image, setImage] = useState(
    product.images && product?.images?.length != 0
      ? product?.images[0]?.url
      : product?.coverPic?.url
      ? product?.coverPic?.url
      : constant.errImage
  );
  const matchesSm = useMediaQuery("(min-width:640px)");

  const [hoveredProduct, setHoveredProduct] = useState("");
  // console.log(product?.slug?.name,"slug name");

  return (
    // old product card code start
    // <Link href={`/product/${product?.slug?.name}`}>
    //   <div
    //     className={`h-full flex flex-col gap-2 py-2 cursor-pointer hover:shadow-productShadow hover:rounded-lg relative   bordered-shape overflow-hidden`}
    //     key={product?.id || idx || Math.random().toString()}
    //     onMouseEnter={() => {
    //       setHoveredProduct(product?.id);
    //     }}
    //     onMouseLeave={() => {
    //       setHoveredProduct("");
    //     }}
    //   >
    //     <div className=" white-triangle flex justify-center items-center"><div className=" green-triangle  "></div></div>
    //     <div className="border border-secondary p-2">
    //       <div className=" relative  mb-2">
    //         <div className="h-[100px] lg:h-[300px] relative ">
    //           <Image
    //             src={image}
    //             alt={product?.prodName}
    //             width={1000}
    //             height={1000}
    //             className="w-full h-full object-fit "
    //           />
    //           <div className="bg-primary absolute top-[8px] left-[8px]"><div className="flex gap-1 text-[10px] text-white px-2.5 py-1"> <p>15%</p><p>OFF</p></div></div>
    //           <div className={`absolute bottom-0 left-0 w-full h-[45px] bg-primary flex items-center ${hoveredProduct === product?.id ? "visible" : "invisible"
    //             }`}>

    //             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 w-full">
    //               <h2 >Add To Bag</h2><div>bag icon</div></div></div>
    //         </div>
    //       </div>
    //       <div className="text-ellipsis overflow-hidden ... truncate   ">
    //         <h4 className=" text-ellipsis overflow-hidden text-sm font-medium text-primary capitalize mb-1 ">
    //           {product?.prodName}
    //         </h4>
    //       </div>
    //       {product?.rating && <div className="">Rating</div>}
    //       <div className="flex    w-full text-xs font-bold mb-3 ">
    //         <h2 className="">Calcium Magnesium Zinc </h2>
    //       </div>
    //       <div className="flex items-center  gap-2   mb-2">
    //         <p className="text-ellipsis overflow-hidden ... truncate    text-primary font-bold ">
    //           AED {product?.discountedPrice.toFixed(2)}
    //         </p>
    //         {checkIfPriceDiscounted({
    //           discountedPrice: product?.discountedPrice,
    //           price: product?.prodPrice,
    //         }) && (
    //             <p className="text-ellipsis overflow-hidden ... truncate  text-xs  line-through   text-gray-500 font-semibold ">
    //               {product?.prodPrice}  AED
    //             </p>
    //           )}
    //       </div>
    //     </div>

    //   </div>
    // </Link>
    // old product card code end

    // new

    <Link href={`/product/${product?.slug?.name}`}>
      <div
        className={`flex flex-col mx-${mx} relative   bordered-shape overflow-hidden `}
        key={product?.id || idx || Math.random().toString()}
        onMouseEnter={() => {
          setHoveredProduct(product?.id);
        }}
        onMouseLeave={() => {
          setHoveredProduct("");
        }}
      >
        <div className={`white-triangle flex justify-center items-center border ${ hoveredProduct === product?.id?"border-primary":"border-secondary"} `}>
          <div
            className={` green-triangle  border  ${
              hoveredProduct === product?.id
                ? "border-secondary"
                : "border-primary"
            }  ${
              hoveredProduct === product?.id ? "bg-secondary" : "bg-primary"
            }`}
          ></div>
        </div>
        <div className={`border-[1px]  p-2 product-card ${ hoveredProduct === product?.id?"border-primary":"border-secondary"}`}>
          <div className=" relative  mb-2">
            <div className="h-[250px] relative ">
              <Image
                src={image}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-fit"
              />
              <div className="bg-primary absolute top-[8px] left-[8px]">
                <div className="flex gap-1 text-[10px] text-white px-2.5 py-1">
                  {" "}
                  <p>15%</p>
                  <p>OFF</p>
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 w-full h-[45px] bg-primary flex items-center ${
                  hoveredProduct === product?.id ? "visible" : "invisible"
                }`}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 w-full">
                  <h2>Add To Bag</h2>
                  <div>
                    <FlatIcon className="flaticon-bag-fill text-xl" />
                  </div>
                </div>
              </div>
              <div
                className={`absolute right-[15px] top-[20px] ${
                  hoveredProduct === product?.id ? "visible" : "invisible"
                } flex flex-col gap-y-2 items-center`}
              >
                <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                  <FlatIcon
                    icon={
                      "flaticon-heart text-secondary font-normal text-base rounded-full text-secondary "
                    }
                  />
                </div>
                <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                  <FlatIcon
                    className={"flaticon-search  text-lg text-secondary"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex  overflow-hidden truncate w-full text-sm font-medium text-primary capitalize mb-3">
            <h2 className="">{product?.prodName}</h2>
          </div>
          {/* <div className="flex    w-full text-sm font-semibold mb-3 ">
            <h2 className="">Calcium Magnesium Zinc </h2>
          </div> */}
          <div className="flex items-center gap-4">
            <div className="text-ellipsis overflow-hidden ... truncate text-center ">
              <p className="text-ellipsis overflow-hidden ... truncate text-center  text-primary font-bold text-lg">
                {constant?.currency} {product?.discountedPrice?.toFixed(2)}
              </p>
            </div>
            {checkIfPriceDiscounted({
              discountedPrice: product?.discountedPrice,
              price: product?.prodPrice,
            }) && (
              <div className="text-ellipsis overflow-hidden ... truncate text-center ">
                <p className="text-ellipsis overflow-hidden ... truncate text-center  line-through text-sm text-gray-500 font-semibold">
                  {constant.currency} {product?.prodPrice}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
