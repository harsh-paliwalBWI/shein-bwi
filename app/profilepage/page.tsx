import React from 'react'
import Profile from '../../components/profile/Profile'
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import { cookies } from "next/dist/client/components/headers";


const ProfilePage = async() => {
  const cookie = cookies().get("uid");

//   const { data: userData } = useQuery({
//     queryKey: ["userData"],
//     queryFn: () => getUserData(cookie),
//     refetchInterval: 2000,
//     keepPreviousData: true,
//     // enabled: isClient,
//   });
// console.log(userData,"userData from page");
  return (
    <div><Profile cookie={cookie}/></div>
  )
}

export default ProfilePage