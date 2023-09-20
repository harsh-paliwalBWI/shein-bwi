"use client"
import React from 'react'
import CategoryGridCard from '../categoryGridCard/CategoryGridCard'
import { useQuery } from '@tanstack/react-query'
import { fetchHomeSections } from '../../../utils/databaseService'
import FlatIcon from '../../flatIcon/flatIcon'
const CategoryGrid = ({section}) => {
    const { data: homeData } = useQuery({
        queryKey: ["homeSections"],
        queryFn: fetchHomeSections,
      });
      // console.log(homeData,"from CategoryGrid");
      
  return (
    <>
    <div className='px-body'>
    <div className='text-3xl  text-center font-bold mb-5 '>
        <div><span className='text-primary'>#SHIEN </span><span>STYLE STORES</span></div>
        <h1>COMBO SALE</h1>
    </div>
    <div className='flex items-center justify-between w-full mb-14  '>
    <div className='flex items-center gap-6 w-1/3 '>
        <div className='text-xl font-medium'>Ends in</div>
        <div className='flex items-center gap-x-2'>
        <div className='px-3 py-2 bg-primary text-white text-base font-semibold'>08</div><div>:</div> 
        <div className='px-3 py-2 bg-primary text-white'>46</div><div>:</div> 
        <div className='px-3 py-2 bg-primary text-white'>23</div>
        </div>
        </div>
        <div className='text-primary w-1/3  text-center texr-sm font-semibold underline cursor-pointer' >View All</div>
        <div className='flex items-center w-1/3  justify-end'>
            <div className='h-[48px] w-[48px] flex items-center justify-center rounded-full arrow-container cursor-pointer'><FlatIcon className="flaticon-arrow text-lg"/></div>
            <div className='h-[48px] w-[48px] flex items-center justify-center rounded-full arrow-container cursor-pointer'><FlatIcon className="flaticon-arrow rotate-180 text-lg"/></div>
        </div>
    </div>
    <div className='grid grid-cols-4 gap-5'>
    {homeData &&
                      homeData?.data?.filter(
                        (val: any) => val?.id === section?.widgetID
                      ) &&
                      homeData?.data?.filter(
                        (val) => val?.id === section?.widgetID
                      ) &&
                      homeData?.data
                        ?.filter((val: any) => val?.id === section?.widgetID)[0]
                        ?.arr?.map((cat: any, idx: any) => {
                          // console.log();

                          return (
                            <div className="" key={idx}>
                              <CategoryGridCard
                                cat={cat}
                                // heading={cat?.name}
                                // slug={cat?.slug?.name}
                              />
                            </div>
                          );
                        })}
                        </div>
                        </div>
    {/* <CategoryGridCard/> */}
    </>
    // <div><CategoryGridCard/></div>
  )
}

export default CategoryGrid