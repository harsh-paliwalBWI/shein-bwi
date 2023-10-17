"use client"
import React, { useState } from 'react'
import { getUserAddresses, getUserData } from '../../utils/databaseService'
import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { deleteUserAddress,getUserData } from '../../utils/databaseService'
import AddressEditModal from '../addressEditModal/AddressEditModal'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../config/firebase-config'
import { toast } from 'react-toastify'


const Addresses = ({ userId }) => {
    const queryClient = useQueryClient();
    const [isAddressEdit, setIsAddressEdit] = useState(false)
    const [userAddress, setUserAddress] = useState("")
    // const 
    // console.log(userId,"userId");

    const { data: userAddresses } = useQuery({
        queryKey: ["userAddresses"],
        queryFn: () => getUserAddresses(null),
        // 
        // keepPreviousData: true,
        // enabled: isClient,
    });
    // console.log(userAddresses, "userAddresses");

    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: () => getUserData(null),
        
        // keepPreviousData: true,
        // enabled: isClient,
    });

    async function deleteUserAddress({ userId, docId }) {
        console.log(userId, docId);
        try {
            if (userId && docId) {
                await deleteDoc(doc(db, "users", userId, "addresses", docId));
                await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
                toast.success("Address deleted successfully.")
            } else {
                console.log("inside else");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(userData,"USER");

    return (
        <div className='w-full '>
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 '>
                {
                    userAddresses && userAddresses.length > 0 && userAddresses?.map((item: any, idx: number) => {
                        // console.log(item,"item");

                        return <div key={idx} className=' border border-primary '>
                            <div className='lg:px-5 px-2 lg:py-5 py-3'>

                                <div className='text-secondary text-lg font-semibold flex justify-between'>
                                    <h2>{item.name}{" "}{item?.lastName && item?.lastName}</h2>
                                    {userData && userData?.defaultAddress?.address === item?.address && <div className=' lg:text-sm text-xs lg:px-5 px-3 py-1.5 rounded-2xl font-medium bg-secondary text-white flex justify-center items-center'><h2>DEFAULT</h2></div>}
                                </div>
                                <div className='my-2 flex flex-col gap-1'>
                                    <div className='text-gray-500 text-sm font-semibold '>{item.address}</div>
                                    {/* <div className='text-gray-500 text-sm font-semibold '>{item.address2}</div> */}
                                    <div className='text-gray-500 text-sm font-semibold  '>{item.city}{" "}-{" "}{item.pincode}</div>
                                </div>
                                <div className='text-secondary text-sm font-semibold'><span className='text-gray-500 font-semibold '>Mobile</span>{" "}:{" "}{item.phoneNo}</div>

                            </div>
                            <div className='flex w-full bg-[#FFEEF4]  border-t border-t-primary  md:text-base text-sm font-semibold'>
                                <div onClick={() => deleteUserAddress({ userId: userId, docId: item?.id })} className='w-[50%] flex justify-center text-primary border-r border-r-primary py-3 cursor-pointer'><button>Remove</button></div>
                                <div onClick={() => {
                                    setIsAddressEdit(true)
                                    setUserAddress(item)
                                }} className='w-[50%] flex justify-center py-3 cursor-pointer'><button>Edit</button></div>

                            </div>
                            {isAddressEdit && <AddressEditModal setIsAddressEdit={setIsAddressEdit} item={userAddress} />}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Addresses