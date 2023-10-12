"use client"
import React,{useState,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../utils/databaseService';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';


const EditProfile = () => {
  const [isClient, setIsClient] = useState(false);

    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: () => getUserData(null),
        
        // keepPreviousData: true,
        // enabled: isClient,
      });
      // console.log(userData,"user");
      
    const [state, setState] = useState({
        firstName: userData?.name,
        lastName: userData?.lastName ? userData?.lastName : "",
        email: userData?.email,
        phone: userData?.phoneNo,
        about: userData?.aboutMe ? userData?.aboutMe : "",
        // currPassword: "",
        // newPassword: "",
      });



    const onSaveChangesHandler = async () => {
        console.log("start");
        const newInfo = {
          name: state.firstName,
          lastName: state.lastName,
          email: state.email,
          // phone: state.phone,
          about: state.about,
          // currPass:state.currPassword,
          // newPass:state.newPassword
        }
        console.log(newInfo, "fdg");
        const userId = await userData.id
        if (userId) {
          console.log("inside if start");
          await setDoc(doc(db, "users", userId), { name: state.firstName, lastName: state.lastName, email: state.email, phoneNo: state.phone, aboutMe: state.about }, { merge: true })
          console.log("inside if end");
        }
        // console.log(newInfo,"new info");
      }

      useEffect(() => {
        setIsClient(true);
      }, []);
  return (
    <div className="w-full ">
    <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
      <div className="md:w-[50%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          First Name*
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3 "
          value={isClient && state.firstName} onChange={(e) => setState({ ...state, firstName: e.target.value })} />
      </div>
      <div className="md:w-[50%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          Last Name*
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
          value={isClient && state.lastName} onChange={(e) => setState({ ...state, lastName: e.target.value })} />
      </div>
    </div>
    <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
      <div className="md:w-[50%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          Email Address*
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
          value={isClient && state?.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
      </div>
      <div className="md:w-[50%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          Phone No.
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3 bg-gray-200"
          value={isClient && state?.phone} disabled 
          // onChange={(e) => setState({ ...state, phone: e.target.value })} 
          />
      </div>
    </div>
    <div className="w-full  flex flex-col gap-3 mb-5">
      <label htmlFor="" className="text-[#555555] font-medium">
        About Me
      </label>
      <textarea
        value={isClient && state.about} onChange={(e) => setState({ ...state, about: e.target.value })}
        name=""
        id=""
        className=" border-[1px] border-[#838383] w-full outline-0 px-3 py-2"
        rows={4}
      ></textarea>
    </div>
    {/* <div className="flex md:flex-row flex-col gap-4 w-full mb-7">
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
    </div> */}
    <div className="bg-secondary text-white text-center  py-3  text-sm font-medium cursor-pointer mt-10"
      onClick={() => onSaveChangesHandler()}>
      <button>Save Changes</button>
    </div>
  </div>
  )
}

export default EditProfile