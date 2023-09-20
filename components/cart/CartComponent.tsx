"use client"
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import product1 from "../../images/productimg1.svg";
import Image from "next/image";
import { constant } from "../../utils/constants";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  initializeCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";
import { updatedCartFromBackend } from "../../utils/cartUtilities/cartUtility";
import CartItemCard from "../cartitemcard/Cartitemcard";
import CouponCode from "../couponCode/CouponCode";
import { addCartObjToUser, fetchSingleProduct, } from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import { fetchSimilarProductsForCart } from "../../config/typesense";
import SimilarProducts from "../SimilarProducts/SimilarProducts";

const CartComponent = ({cookie}) => {
  const cart = useAppSelector((state) => state.cartReducer.cart);
  // console.log(cart,"cart--------------------");
  
  const dispatch = useDispatch();
  const [updatedCart, setUpdatedCart] = useState(cart);
  const [loading, setLoading] = useState(true);

  const { data: similarData } = useQuery({
    queryKey: ["product", "caricature-cartoon", "similar-product"],
    queryFn: () => fetchSimilarProductsForCart({ searchKeywords: ["Gentlemen's Collection", 'Nike']  })
  })


  console.log(similarData,"from CartComponent");
  
  async function updateCart() {
    // console.log("hii");
    console.log(updateCart.length);
    
    if (updatedCart.length !== 0) {
      const newCart = await updatedCartFromBackend(updatedCart);
// console.log(newCart,"newCart--------------");

      setUpdatedCart(newCart);
      dispatch(initializeCart(newCart));
    }

    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      // console.log("inside if");
      
      updateCart();
    } else {
      // console.log("inside elss");
      setUpdatedCart(cart);
    }
  }, [cart]);

  if (!updatedCart || updatedCart?.length === 0) {
    return (
      <div className="flex flex-col px-body justify-center items-center gap-6 h-[70vh]">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link href={"/"} className="bg-black text-white px-3 py-2">
          Start Shopping
        </Link>
      </div>
    );
  }
  console.log(updatedCart)

  return (
    <>
    <div className="flex flex-col px-body  w-full md:mb-10 mb-5 md:mt-8 mt-4 ">
      <div className="flex md:flex-row flex-col gap-6   border-gray-300   w-full ">
        <div className=" md:w-[70%] w-[100%]">
          <div className='flex items-center gap-2 md:mb-8 mb-4'>
            <h1 className='font-semibold md:text-2xl text-xl px-2 '>MY CART </h1>
          </div>
          <div className=" flex flex-col gap-y-4">
          {
            updatedCart?.map((item: any, key: any) => (
              <div key={key}>
              <CartItemCard mykey={key} item={item} cookie={cookie} />
              </div>
            ))}
            </div>
        </div>
        <div className=" md:w-[30%] sm:w-[80%] w-[90%] md:mx-0 mx-auto">
          <div className='flex items-center gap-2 sm:mb-8 mb-4'>
            <h1 className='font-semibold md:text-xl text-lg px-2'>ORDER SUMMARY </h1><h3 className='text-sm font-semibold text-secondary'>(1 Item)</h3>
          </div>
          <CouponCode />
        </div>
      </div>
     
      {/* <Link href={"/checkout"}>
          <div className=" my-16  flex  w-full justify-center items-center  h-[60px] rounded-br-[10px]  bg-primary text-white">
            <p className=" h-[25px] text-center text-white text-xl font-semibold leading-[25px] tracking-tight">Proceed to Checkout</p>
          </div>
        </Link> */}
      {/* </div> */}
    </div>
    <div className=" my-20">
            <SimilarProducts heading={"YOU MIGHT ALSO LIKE"} similarProductData={similarData} from="cart"/>
          </div>
    </>
  );
};



export default CartComponent;
