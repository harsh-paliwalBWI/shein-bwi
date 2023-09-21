"use client"
import React,{useState,useEffect} from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase-config';
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserData } from "../../utils/databaseService";
import { fetchSimilarProductsForCart } from '../../config/typesense';


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
    <div>WishlistComponent</div>
  )
}

export default WishlistComponent