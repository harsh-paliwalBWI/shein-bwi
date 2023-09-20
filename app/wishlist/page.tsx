
import React from 'react'
import WishlistComponent from '../../components/WishlistComponent/WishlistComponent'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase-config';
import { cookies } from "next/dist/client/components/headers";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";

const page = async() => {
  const cookie = cookies().get("uid");
  // const { data: userData } = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: () => getUserData(cookie),
  //   refetchInterval: 2000,
  //   // keepPreviousData: true,
  //   // enabled: isClient,
  // });

  // console.log(userData,"-----------");
  
//   const getData=async()=>{
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//     });
// }
  return (
    <div className='body'>
<h1>MY WISHLIST</h1>
<div>
    {1}
</div>
<WishlistComponent cookie={cookie}/>
    </div>
  )
}

export default page