"use client"
import React, { useState } from 'react'
import { getUserAddresses, getUserData } from '../../utils/databaseService'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import AddressCard from './AddressCard'
import Modal from '../Modal/modal'
import { CircularProgress } from "@mui/material";

const Addresses = ({ userId }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { data: userAddresses } = useQuery({
        queryKey: ["userAddresses"],
        queryFn: () => getUserAddresses(null),
    });

    return (
        <div className='w-full h-full '>
            {
                userAddresses&&userAddresses.length===0?<div className='w-full h-full flex  justify-center items-center sm:text-xl text-sm text-gray-500'>No Address Found !</div>:
            
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 '>
                <Modal isOpen={isDeleting} setOpen={setIsDeleting}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <CircularProgress className="!text-white"></CircularProgress>
                        <p className="text-white font-medium text-lg">Deleting Address.</p>
                    </div>
                </Modal>

                {
                    userAddresses && userAddresses.length > 0 && userAddresses?.map((singleaddress: any, idx: number) => {
                        return <AddressCard singleaddress={singleaddress} setIsDeleting={setIsDeleting} />
                    })
                }
            </div>
}
        </div>
    )
}

export default Addresses