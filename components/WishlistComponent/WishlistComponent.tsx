"use client"
import React,{useState,useEffect} from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase-config';
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserData } from "../../utils/databaseService";
import { fetchSimilarProductsForCart } from '../../config/typesense';
import ProductCard from '../categoryProduct/productCard';


const WishlistComponent = ({cookie}) => {
  const { data: similarData } = useQuery({
    queryKey: ["product", "caricature-cartoon", "similar-product"],
    queryFn: () => fetchSimilarProductsForCart({ searchKeywords: ["Gentlemen's Collection", 'Nike']  })
  })


  console.log(similarData,"from WishlistComponent");
  
// const { data: userData } = useQuery({
//     queryKey: ["userData"],
//     queryFn: () => getUserData(cookie),
//     refetchInterval: 2000,
//     // keepPreviousData: true,
//     // enabled: isClient,
//   });

//   const getData=async()=>{
//     const userId=userData.id
//     console.log(userId),"-------";
    
//     if(userId){
//         console.log("inside if");
        
//         const querySnapshot = await getDocs(collection(db, "users",userId,"wishlist"));
//         console.log("querySnapshot");
        
//         querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, " => ", doc.data());
//         });
//     }
  
// }
// console.log(userData,"user");
// useEffect(()=>{
//     getData()
// },[])
  return (
   <>
   {similarData&&
   <div className='px-body'>
    <h1 className='sm:text-2xl text-xl font-semibold md:mt-10 mt-5 sm:mx-0 mx-5'>MY WISHLIST</h1>

   <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 sm:gap-y-10 gap-y-5 md:my-16 my-8'>
   {
   
    similarData&&similarData.length>0&&similarData.map((item:any,idx:number)=>{
     return <div key={idx} className='sm:mx-0 mx-5'>
      <ProductCard product={item} mx={0}/>
     </div>
    })
   }
   </div>
   </div>
   }
   </>
  )
}

export default WishlistComponent