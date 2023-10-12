"use client"
import React from "react";
import Image from "next/image";
import product1 from "../../images/productimg1.svg";
import { constant } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { initializeCart, updateCartItemQuantity, } from "../../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { updatedCartFromBackend } from "../../utils/cartUtilities/cartUtility";
import FlatIcon from "../flatIcon/flatIcon";
import { addDoc, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import { db } from "../../config/firebase-config";
import { moveToWishListHandler } from "../../utils/databaseService";
import { removeFromWishListHandler, getUserWishlist } from "../../utils/databaseService";
import { toast } from "react-toastify";
import { removeFromCart } from "../../redux/slices/cartSlice";


const CartItemCard = ({ item, mykey, cookie }) => {
  // console.log(item);
  
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState((item && item?.minQty) || 1);
  const [variant, setVariant] = useState(0);
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    refetchInterval: 2000,
  });
  const { data: wishlistData } = useQuery({
    queryKey: ["wishlistData"],
    queryFn: () => getUserWishlist(userData?.id),
    refetchInterval: 2000,
  })

  function handleRemoveFromCart(item: any) {
    let data: any = {
      product: item,
      productID: item?.id,
      quantity: quantity,
      index: variant,
      isPriceList: ""
    };
    dispatch(removeFromCart(data));
  }


  return (
    <div className="flex sm:flex-row flex-col gap-x-2 md:gap-y-0 gap-y-4 justify-between items-center  border border-gray-400 w-full h-fit px-3 py-3 ">
      <div className="">
        <div className="flex sm:flex-row flex-col  gap-4  sm:items-start items-center ">
          <div className="flex flex-col gap-2 ">
            <div className=" ">
              <Image
                src={item?.img?.url}
                alt="productalt"
                width={1000}
                height={1000}
                style={{ width: "138px", height: "154px", aspectRatio: "auto" }}
                className="object-fill"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="  text-neutral-950 text-lg  font-semibold leading-[25px] tracking-tight  mb-1 ">
              {item.name}
            </p>
            <div className="flex items-center gap-2 text-[#555555] text-sm font-medium mb-1 "><span>Size : </span> <span>{item?.pack?.weight}</span> <span>|</span> <span>Color :  </span> <span>{item?.color?.name}</span></div>
            {/* <div className="flex items-center sm:justify-start justify-center gap-2 my-3">
              <div className="text-primary text-xl flex ">
                {" "}
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <span className="text-sm font-medium text-zinc-400">
                  (27)
                </span>{" "}
              </div>
              <h4 className="text-[#777777] text-xs font-medium">
                1.2k reviews
              </h4>
            </div> */}
            <div className="flex items-center   gap-4 mt-3 ">
              {item.pack?.price? <p className="text-center text-black text-lg font-bold leading-[29px]">
                {constant?.currency} {item.pack?.price?.toFixed(2)}
              </p>:
               <p className="text-center text-black text-lg font-bold leading-[29px]">
               {constant?.currency} {item?.price?.toFixed(2)}
             </p>
              }
             
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            handleRemoveFromCart(item)
          }}
          className="flex gap-2 items-center  mt-2 cursor-pointer">
          <div><FlatIcon icon={"flaticon-close text-[#FF0000] font-normal text-xs"} />
          </div>
          <p className="text-[#FF0000] sm:text-sm text-sm font-semibold">Remove Item
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-4  h-fit  text-end  ">
        <div className="  flex border border-[#C6C6C6]  w-fit text-end    ">
          <div
            className=" text-[#000000] flex-[0.4] flex justify-center items-center text-lg font-bold cursor-pointer select-none px-3 py-3 "
            onClick={() => {
              dispatch(
                updateCartItemQuantity({
                  type: "dec",
                  addedQty: item?.minQty || null,
                  index: mykey,
                })
              );
            }}
          >
            <FlatIcon icon={"flaticon-minus text-secondary font-normal text-[10px]"} />
          </div>
          <div className="flex-1 flex justify-center items-center  px-6 py-3 bg-gray-200 border-l  border-l-[#C6C6C6] border-r  border-r-[#C6C6C6] ">
            <p className="">{item.quantity}</p>
          </div>
          <div
            className=" flex-[0.4] text-[#CCCCCC]  flex justify-center items-center text-lg font-bold cursor-pointer select-none  px-3 py-3"
            onClick={() => {
              dispatch(
                updateCartItemQuantity({
                  type: "inc",
                  addedQty: item?.minQty || null,
                  index: mykey,
                })
              );
            }}
          >
            <FlatIcon icon={"flaticon-plus-1 text-secondary font-normal text-[10px]"} />
          </div>
        </div>
        <div className="flex sm:justify-end justify-center  ">
          {wishlistData && wishlistData.length > 0 && wishlistData.includes(`${item?.productId}`) ?
            <div className="flex items-center gap-2  text-end cursor-pointer "
              onClick={() => removeFromWishListHandler({ userId: userData?.id, productId: item?.productId })}
            >
              <FlatIcon icon={"flaticon-heart-fill text-2xl text-secondary font-normal "} />
              <h3 className="text-secondary font-semibold sm:text-base text-sm">
                Remove from Wishlist
              </h3>
            </div> :
            <div className="flex items-center gap-2  text-end cursor-pointer "
              onClick={() => moveToWishListHandler({ userId: userData?.id, productId: item?.productId })}
            >
              <FlatIcon icon={"flaticon-heart text-secondary font-normal text-2xl "} />
              <h3 className="text-secondary font-semibold sm:text-base text-sm">
                Move to Wishlist
              </h3>
            </div>
          }
        </div>
      </div>
    </div>
  );
};



export default CartItemCard;
