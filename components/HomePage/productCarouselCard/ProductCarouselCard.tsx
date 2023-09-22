// "use client";
// import React, { useState } from "react";
// import { constant } from "../../../utils/constants";
import { useMediaQuery } from "@mui/material";
// import Link from "next/link";
// import Image from "next/image";
import { checkIfPriceDiscounted } from "../../../utils/utilities";
import FlatIcon from "../../flatIcon/flatIcon";
import {
  moveToWishListHandler,
  removeFromWishListHandler,
} from "../../../utils/databaseService";

// const ProductCarouselCard = ({ product }) => {
//   const [image, setImage] = useState(
//     product.images && product?.images?.length != 0
//       ? product?.images[0]?.url
//       : constant.errImage
//   );
//   const matchesSm = useMediaQuery("(min-width:640px)");

//   const [hoveredProduct, setHoveredProduct] = useState("");

//   return (
//     <Link href={`/product/${product?.slug?.name}`} className="flex-1">
//       <div
//         className="h-full mx-3 min-h-[250px] flex flex-col  lg:min-h-[360px]   gap-2 hover:shadow-productCarouselShadow hover:rounded-lg p-6 "
//         key={product?.id}
//         onMouseEnter={() => {
//           setHoveredProduct(product?.id);
//         }}
//         onMouseLeave={() => {
//           setHoveredProduct("");
//         }}
//       >
//         <div className="h-[120px] sm:h-[150px] md:h-[150px] xl:h-[200px]  ">
//           <Image
//             src={image}
//             alt={product?.prodName}
//             width={1000}
//             height={1000}
//             className="w-full h-full object-fit"
//           />
//         </div>
//         <div className="text-ellipsis  overflow-hidden ... truncate     px-2">
//           <h4 className="text-base  text-[#4d4d4d]  text-ellipsis overflow-hidden ... truncate text-center ">
//             {product?.prodName}
//           </h4>
//         </div>
//         {product?.rating && <div>Rating</div>}
//         <div className="flex flex-col   flex-1 justify-end">
//           {checkIfPriceDiscounted({
//             discountedPrice: product?.discountedPrice,
//             price: product?.prodPrice,
//           }) && (
//             <div className="text-ellipsis overflow-hidden ... truncate  px-2">
//               <p className="text-ellipsis overflow-hidden ... truncate  px-2 line-through text-xs text-center text-gray-500 font-medium">
//               AED {product?.prodPrice}
//               </p>
//             </div>
//           )}
//           <div className="text-ellipsis overflow-hidden ... truncate  px-2">
//             <p className="text-ellipsis overflow-hidden ... truncate text-center  px-2 text-highlight font-bold text-xl">
//               AED {product?.discountedPrice.toFixed(2)}
//             </p>
//           </div>
//         </div>
//         {matchesSm && (
//           <div
//             className={`flex justify-center items-center  ${
//               hoveredProduct === product?.id ? "visible" : "invisible"
//             }`}
//           >
//             <button className="w-full bg-highlight py-2 text-white font-medium">
//               Shop now
//             </button>
//           </div>
//         )}
//       </div>
//       {/* <div
//         className={`h-full flex flex-col gap-2 py-2 cursor-pointer hover:shadow-productShadow hover:rounded-lg`}
//         key={product?.id}
//         onMouseEnter={() => {
//           setHoveredProduct(product?.id);
//         }}
//         onMouseLeave={() => {
//           setHoveredProduct("");
//         }}
//       >
//         <div className="h-[120px] sm:h-[150px] md:h-[150px] xl:h-[200px]">
//           <Image
//             src={image}
//             alt={product?.prodName}
//             width={1000}
//             height={1000}
//             className="w-full h-full object-contain"
//           />
//         </div>
//         <div className="text-ellipsis overflow-hidden ... truncate text-center px-2">
//           <h4 className="text-sm text-gray-800 font-medium text-ellipsis overflow-hidden ...">
//             {product?.prodName}
//           </h4>
//         </div>
//         {product?.rating && <div>Rating</div>}
//         <div className="flex flex-col">
//           {checkIfPriceDiscounted({
//             discountedPrice: product?.discountedPrice,
//             price: product?.prodPrice,
//           }) && (
//             <div className="text-ellipsis overflow-hidden ... truncate text-center px-2">
//               <p className="text-ellipsis overflow-hidden ... truncate text-center px-2 line-through text-xs text-gray-500">
//                 {constant.currency} {product?.prodPrice}
//               </p>
//             </div>
//           )}
//           <div className="text-ellipsis overflow-hidden ... truncate text-center px-2">
//             <p className="text-ellipsis overflow-hidden ... truncate text-center px-2 text-highlight font-bold">
//               {constant.currency} {product?.discountedPrice.toFixed(2)}
//             </p>
//           </div>
//         </div>
//         {matchesSm && (
//           <div
//             className={`flex justify-center items-center ${
//               hoveredProduct === product?.id ? "visible" : "invisible"
//             }`}
//           >
//             <button className="w-[80%] bg-highlight py-2 text-white font-medium">
//               Shop now
//             </button>
//           </div>
//         )}
//       </div> */}
//     </Link>
//   );
// };

// export default ProductCarouselCard;

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { constant } from "../../utils/constants";
import { constant } from "../../../utils/constants";
// import btnBg from "../../images/Rectangle 24048.svg"
import discountBg from "../../../images/Vector (2).svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../../utils/databaseService";

const ProductCarouselCard = async ({ product, cookie }) => {
  const [hoveredProduct, setHoveredProduct] = useState("");

  const [image, setImage] = useState(
    product.images && product?.images?.length != 0
      ? product?.images[0]?.url
      : constant.errImage
  );
  const matchesSm = useMediaQuery("(min-width:640px)");

  // console.log(product,"PRODCUT");
  // console.log(product?.id,"PRODCUT");
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    refetchInterval: 2000,
    // keepPreviousData: true,
    // enabled: isClient,
  });
  // console.log(userData,"USER DATA ");

  return (
    <Link href={`/product/${product?.slug?.name}`}>
      {/* <div className="container relative border-[2px] border-black "> */}
      <div
        className="flex flex-col  mx-2.5 relative   bordered-shape overflow-hidden"
        // onMouseEnter={() => {
        //     setHoveredProduct(product?.id);
        //   }}
        //   onMouseLeave={() => {
        //     setHoveredProduct("");
        //   }}
        // key={product?.id || Math.random().toString()}

        // onMouseEnter={() => {
        //   setHoveredProduct(product?.id);
        // }}
        // onMouseLeave={() => {
        //   setHoveredProduct("");
        // }}
      >
        <div className=" white-triangle flex justify-center items-center">
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
        <div className="border-[1px] border-secondary p-2 product-card ">
          <div className=" relative  mb-2">
            <div className="h-[250px] lg:h-[250px] relative ">
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
                className={`absolute bottom-0 left-0 w-full h-[45px] bg-primary flex items-center  ${
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
              {/* <div className={`absolute bottom-0 left-0 w-full h-[45px] bg-primary flex items-center ${
              hoveredProduct === product?.id ? "visible" : "invisible"
            }` }>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 w-full">
            <h2 >Add To Bag</h2><div> <FlatIcon className="flaticon-bag-fill text-xl" /></div></div></div> */}
              {/* <div className={`absolute right-[15px] top-[20px] ${hoveredProduct === product?.id ? "visible" : "invisible"} flex flex-col gap-y-2 items-center`}>
            <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center" >
          <FlatIcon icon={"flaticon-heart text-secondary font-normal text-base rounded-full text-secondary "} />
            </div>
            <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
            <FlatIcon className={"flaticon-search  text-lg text-secondary"} /> 
            </div>
          </div>  */}
            </div>
          </div>
          <div className="flex  overflow-hidden truncate w-full text-xs font-medium text-primary capitalize mb-1">
            <h2 className="">{""}</h2> {/* to be checked */}
          </div>
          <div className="flex    w-full text-xs font-bold mb-3 ">
            <h2 className="truncate">
              {product?.prodName || "Calcium Magnesium Zinc"}{" "}
            </h2>
          </div>
          {/* <div className="flex gap-2 items-center overflow-hidden  w-full mb-1.5 ">
        <h2 className="text-primary">	&#10027;&#10027;&#10027;&#10027;&#10027; </h2>
        <p className="text-[#ADADAD] text-sm">(10)</p>
      </div> */}
          {/* <div className="flex gap-3 items-center"><h3 className=" text-lg font-semibold">265  {constant.currency}</h3><h6 className="text-[#ADADAD] line-through text-xs font-medium">4354.78 AED</h6></div> */}

          <div className="flex items-center gap-2">
            <div className="text-ellipsis overflow-hidden ... truncate text-center ">
              <p className="text-ellipsis overflow-hidden ... truncate text-center  text-primary font-bold">
                {constant.currency} {product?.discountedPrice.toFixed(2)}
              </p>
            </div>
            {checkIfPriceDiscounted({
              discountedPrice: product?.discountedPrice,
              price: product?.prodPrice,
            }) && (
              <div className="text-ellipsis overflow-hidden ... truncate text-center ">
                <p className="text-ellipsis overflow-hidden ... truncate text-center  line-through text-xs text-gray-500 font-semibold">
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

export default ProductCarouselCard;
