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
import { addDoc, collection, doc, setDoc,deleteDoc } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
// import { cookies } from "next/dist/client/components/headers";
import { db } from "../../config/firebase-config";
// import { doc, deleteDoc } from "firebase/firestore";
import { moveToWishListHandler } from "../../utils/databaseService";
import { removeFromWishListHandler,getUserWishlist } from "../../utils/databaseService";
// import {getUserWishlist}


const CartItemCard = ({ item, mykey, cookie }) => {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState(localStorage.getItem(`wishlist_${item.productId}`) === 'true');
  const [isInitialRender, setIsInitialRender] = useState(true);

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    refetchInterval: 2000,
    // keepPreviousData: true,
    // enabled: isClient,
  });
  const {data:wishlistData}=useQuery({
    queryKey: ["wishlistData"],
    queryFn: () => getUserWishlist(userData?.id),
    refetchInterval: 2000,
  })
  console.log(wishlistData,"from wishlistData");
  
  // console.log();

  // console.log(userData, "from cart item card");
console.log(item,"item");
// console.log(item?.productId,"----------->");

useEffect(() => {
  // This useEffect is used to prevent localStorage updates on the initial render
  if (!isInitialRender) {
    localStorage.setItem(`wishlist_${item.productId}`, wishlist.toString());
  } else {
    setIsInitialRender(false);
  }
}, [wishlist, item.productId]);

// useEffect(()=>{
//   // getUserWishlist(userData.id)
//   },[])
  // const moveToWishListHandler = async () => {
  //   const userId = userData?.id
  //   const productId=item?.productId
  //   try {
  //     if (userId&&productId) {
  //       console.log("inside if");
  //       console.log(userId);
  //       const collectionRef = collection(db, "users")
  //       const docRef = doc(collectionRef, userId)
  //       const refDoc = doc(db, "users", userId, "wishlist", productId);
  //       await setDoc(refDoc, {createdAt: new Date(), id: productId }, { merge: true });
    
  //     } else {
  //       console.log("inside else");
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // }


// const  removeFromWishListHandler=async()=>{
//   const userId = userData?.id
//   const productId=item?.productId
// try{
//   if (userId&&productId) {
//     console.log("inside if start");
//     console.log(userId,"userId");
//     console.log(productId,"productId");
//     // const refDoc = doc(db, "users", userId, "wishlist", productId);
//     await deleteDoc(doc(db, "users", userId, "wishlist", productId));
//     // await setDoc(refDoc, {createdAt: new Date(), id: productId }, { merge: true });
//     console.log("inside if end");

//   } else {
//     console.log("inside else");
//   }
// }catch(error){
//   console.log(error);
// }
// }


  return (
    <div className="flex sm:flex-row flex-col gap-x-2 md:gap-y-0 gap-y-4 justify-between items-center  border border-gray-400 w-full h-fit px-3 py-3 ">
      <div className="">
        <div className="flex sm:flex-row flex-col  gap-4  sm:items-start items-center ">
          <div className="flex flex-col gap-2 ">
            <div className="">
              <Image
                src={product1}
                alt="productalt"
                width={1000}
                height={1000}
                style={{ width: "138px", height: "154px", aspectRatio: "auto" }}
                className="object-contain"
              />
            </div>
            {/* <div className="flex gap-2  ">
            <div>X</div>
            <p className="text-[#FF0000] text-base font-semibold">Remove Item
            </p>
          </div> */}
          </div>
          <div className="flex flex-col">
            {/* <p className="text-zinc-400 text-sm font-medium flex gap-1">
          <span>  By</span> <span className="text-red-500 text-sm font-medium">Natura</span>
          </p> */}

            <p className="  text-neutral-950 text-lg  font-semibold leading-[25px] tracking-tight  mb-1 ">
              {item.name}
            </p>
            <div className="flex items-center gap-2 text-[#555555] text-sm font-medium mb-1 "><span>Size : </span> <span>L</span> <span>|</span> <span>Color :  </span> <span>Beige</span></div>
            {/* <div className="flex items-center gap-1">
            <h2 className="text-primary text-xl">&#10027;&#10027;&#10027;&#10027;&#10027;</h2>
            <p className="text-zinc-400 text-xs font-medium">(27)</p>
          </div> */}
            <div className="flex items-center sm:justify-start justify-center gap-2 my-3">
              <div className="text-primary text-xl flex ">
                {" "}
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />
                <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"} />

                {/* &#10027;&#10027;&#10027;&#10027;&#10027; */}
                <span className="text-sm font-medium text-zinc-400">
                  (27)
                </span>{" "}
              </div>
              <h4 className="text-[#777777] text-xs font-medium">
                1.2k reviews
              </h4>
            </div>
            <div className="flex items-center   gap-4 ">
              <p className="text-center text-black text-lg font-bold leading-[29px]">
                {constant.currency} {item?.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center  mt-2 ">
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

        <div className="flex items-center gap-2  text-end cursor-pointer "
            >
            <FlatIcon icon={"flaticon-heart text-secondary font-normal text-2xl"} />
            <h3 className="text-secondary font-semibold sm:text-base text-sm">
              Move to Wishlist
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CartItemCard;
