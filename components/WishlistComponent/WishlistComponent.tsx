"use client"
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase-config';
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserData,getUserWishlistData} from "../../utils/databaseService";
import { getUserWishlistData2 } from '../../utils/databaseService';
import { fetchSimilarProductsForCart } from '../../config/typesense';
import ProductCard from '../categoryProduct/productCard';


const WishlistComponent = ({ cookie }) => {
  const [isClient, setIsClient] = useState(false);
  const { data: similarData } = useQuery({
    queryKey: ["product", "caricature-cartoon", "similar-product"],
    queryFn: () => fetchSimilarProductsForCart({ searchKeywords: ["Gentlemen's Collection", 'Nike'] })
  })

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    // refetchInterval: 2000,
    // keepPreviousData: true,
    // enabled: isClient,
  });

  console.log(userData,"user");
  
  // const {data:wishlistData}=useQuery({
  //   queryKey: ["wishlistData"],
  //   queryFn: () => getUserWishlistData(userData?.id),
  //   refetchInterval: 2000,
  // })

// console.log(wishlistData,"wishlistData");

const {data:wishlistData2}=useQuery({
  queryKey: ["wishlistData"],
  queryFn: () => getUserWishlistData2(null),
  refetchInterval: 2000,
})
console.log(wishlistData2,"wishlistData2-------");


  useEffect(() => {
    setIsClient(true);
  }, [wishlistData2]);
  return (
    <>
       {wishlistData2&&wishlistData2.length>0&&isClient? 
        <div className='px-body'>
          <h1 className='sm:text-2xl text-xl font-semibold md:mt-10 mt-5 sm:mx-0 mx-5'>MY WISHLIST</h1>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 sm:gap-y-10 gap-y-5 md:my-16 my-8'>
            {
             wishlistData2&&wishlistData2.length>0&&isClient&&wishlistData2.map((item: any, idx: number) => {
                return <div key={idx} className='sm:mx-0 mx-5'>
                  <ProductCard product={item} mx={0} />
                </div>
              })
            }
          </div>
        </div>
        :
      <div className='w-full flex justify-center items-center h-[70vh]'>
          <h3 className='bg-secondary text-white sm:px-5 px-3 py-2  sm:text-base  text-xs font-medium'>Your wishlist  is empty !{" "} Add something !</h3>
        </div>
     } 
      {/* <div className='w-full flex justify-center items-center h-[70vh]'>
          <h3 className='bg-secondary text-white sm:px-5 px-3 py-2  sm:text-base  text-xs font-medium'>Your wishlist  is empty !{" "} Add something !</h3>
        </div> */}
      {/* {similarData &&
        <div className='px-body'>
          <h1 className='sm:text-2xl text-xl font-semibold md:mt-10 mt-5 sm:mx-0 mx-5'>MY WISHLIST</h1>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 sm:gap-y-10 gap-y-5 md:my-16 my-8'>
            {
              [1,2,3,4,4,5,6,6,7].map((item: any, idx: number) => {
                return <div key={idx} className='sm:mx-0 mx-5'>
                  <ProductCard product={item} mx={0} />
                </div>
              })
            }
          </div>
        </div>
      } */}
    </>
  )
}

export default WishlistComponent