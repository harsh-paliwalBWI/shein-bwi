"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchCategoryProducts } from "../../utils/databaseService";
// import FilterSection from "./filterSections";
// import ProductCard from "./productCard";
import { useMediaQuery } from "@mui/material";
import ProfileOptions from "./ProfileOptions";
import { getUserData } from "../../utils/databaseService";
// import { cookies } from "next/dist/client/components/headers";
import { db } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";


const Profile = ({cookie}) => {
  const matches = useMediaQuery("(min-width:1024px)");
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    refetchInterval: 2000,
    // keepPreviousData: true,
    // enabled: isClient,
  });
  const [state, setState] = useState({
    firstName:userData?.name,
    lastName: userData?.lastName?userData?.lastName:"",
    email: userData?.email,
    phone: userData?.phoneNo,
    about: userData?.aboutMe?userData?.aboutMe:"",
    // currPassword: "",
    // newPassword: "",
  });
  // const cookie = cookies().get("uid");

  // const { data: userData } = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: () => getUserData(cookie),
  //   refetchInterval: 2000,
  //   keepPreviousData: true,
  //   // enabled: isClient,
  // });
// console.log(userData,"userData");


  const onSaveChangesHandler=async()=>{
    console.log("start");
    const newInfo={
      firstName:state.firstName,
      lastName:state.lastName,
      email:state.email,
      phone:state.phone,
      about:state.about,
      // currPass:state.currPassword,
      // newPass:state.newPassword
    }
    const userId = await userData.id
if(userId){
  console.log("inside if start");
  await setDoc(doc(db, "users", userId), { name:state.firstName,lastName:state.lastName,email:state.email,phoneNo:state.phone,aboutMe:state.about }, { merge: true })
  console.log("inside if end");

}
    // console.log(newInfo,"new info");
    
  }
  return (
    <div className="flex flex-col px-body gap-2 mt-2  h-full ">
      <div className="w-full flex flex-col lg:flex-row gap-4 mt-5 sm:mb-20 mb-10">
        <ProfileOptions  cookie={cookie} />
        <hr />
        <div className="w-full flex-[0.60]">
          <div className="w-full">
            <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
              <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                <label className="text-[#555555] font-medium text-sm">
                  First Name*
                </label>
                <input className="py-3 border-[1px] border-[#838383] outline-0 px-3 "
                value={state.firstName} onChange={(e)=>setState({...state,firstName:e.target.value})} />
              </div>
              <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                <label className="text-[#555555] font-medium text-sm">
                  Last Name*
                </label>
                <input className="py-3 border-[1px] border-[#838383] outline-0 px-3" 
                  value={state.lastName} onChange={(e)=>setState({...state,lastName:e.target.value})}/>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
              <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                <label className="text-[#555555] font-medium text-sm">
                  Email Address*
                </label>
                <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
                  value={state?.email} onChange={(e)=>setState({...state,email:e.target.value})} />
              </div>
              <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                <label className="text-[#555555] font-medium text-sm">
                  Phone No.
                </label>
                <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
                  value={state?.phone} onChange={(e)=>setState({...state,phone:e.target.value})} />
              </div>
            </div>
            <div className="w-full  flex flex-col gap-3 mb-5">
              <label htmlFor="" className="text-[#555555] font-medium">
                About Me
              </label>
              <textarea
                value={state.about} onChange={(e)=>setState({...state,about:e.target.value})}
                name=""
                id=""
                className=" border-[1px] border-[#838383] w-full outline-0 px-3 py-2"
                rows={4}
              ></textarea>
            </div>
            <div className="flex md:flex-row flex-col gap-4 w-full mb-7">
              <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                <label className="text-[#555555] font-medium text-sm">
                  Current Password
                </label>
                <input className="py-3 border-[1px] border-[#838383] outline-0 px-3" 
                  // value={state.currPassword} onChange={(e)=>setState({...state,currPassword:e.target.value})}
                  />
              </div>
              <div className="md:w-[50%] w-full flex flex-col gap-3 ">
                <label className="text-[#555555] font-medium text-sm">
                  New Password
                </label>
                <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
                  // value={state.newPassword} onChange={(e)=>setState({...state,newPassword:e.target.value})}
                   />
              </div>
            </div>
            <div className="bg-secondary text-white text-center  py-3  text-sm font-medium cursor-pointer"
            onClick={()=>onSaveChangesHandler()}>
              <button>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
