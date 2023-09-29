"use client"
import React,{useState} from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchUsersOrdersList, getUserData } from '../../utils/databaseService';
import Image from 'next/image';
const OrderPage = () => {
    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: () => getUserData(null),
        refetchInterval: 2000,
        keepPreviousData: true,
        // enabled: isClient,
      });

      console.log(userData,"DATA------------");
      const { data: orderList } = useQuery({
        queryKey: ["orderData"],
        queryFn: () => fetchUsersOrdersList(userData?.id),
        refetchInterval: 2000,
        keepPreviousData: true,
        // enabled: isClient,
      })

      console.log(orderList,"orderList");
      
  return (
   <>
    <div className='px-body '>
        <div className='w-full flex md:flex-row flex-col gap-x-8 gap-y-6 my-10 h-auto'>
        <div className='md:w-[25%] w-[100%] border border-primary h-fit px-5 py-5'>
<div className=''><h3 className='text-primary font-semibold text-base mb-1'>My Orders{" "}({orderList?.length})</h3></div>
<h4 className='text-gray-500 text-xs font-semibold'>View Order Status</h4>
        </div>
        <div className='md:w-[75%] w-[100%] flex flex-col gap-y-5 h-auto'>
            
            {
                orderList&&orderList.length>0&&orderList.map((item:any,idx:number)=>{

                    return <div className=' border border-primary '>
                        <div className=' flex flex-col h-auto'>
                        <div className='flex  items-center justify-between  px-5 py-3 border-b border-b-primary'>
                        <h3 className='  text-sm font-semibold'>OD{item.orderId}</h3>
                        <div className='flex items-center gap-5 text-sm font-semibold  px-5'>
                           <h3 >items{" "}:{" "}{item?.products?.length}{" "}|{" "}Qty{" "}:{" "}2</h3> 
                           <div><button className='text-primary '>View Order Details</button></div>
                        </div>
                        </div>
                        <div className=' h-auto flex flex-col '>
                        {
                            item?.products.map((item:any,idx:number)=>{
                                console.log(item.length,"length");
                                
                                console.log((idx),"dgdg");
                                
                                return <div className={`flex items-center gap-5 h-auto  py-5 px-5  ${!(idx===item.length-1)&&"border-b border-b-gray-400"}`}>
                                    <div className='h-[108px] w-[108px]'>
                                        <Image src={item?.img?.url} alt='' width={1000} height={1000} className='aspect-auto h-[108px] w-[108px] object-fill'/></div>
                                       <div className='flex flex-col gap-y-3'>
                                        <h2 className='text-base font-semibold'> {item?.name}</h2>
                                        <h5 className='text-gray-500 text-sm font-semibold'>Qty{" "}:{" "}{item?.quantity}</h5>
                                       </div> 
                                     
                                   
                                </div>
                            })
                        }
                        </div>
                    </div>
                    </div>
                })
            }
        </div>
        </div>
    </div>
   </>
  )
}

export default OrderPage