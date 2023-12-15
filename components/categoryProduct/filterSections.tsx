"use client";
import React from "react";
import Slider from "rc-slider";
import { useState,FC } from "react";
import "rc-slider/assets/index.css";
import FlatIcon from "../flatIcon/flatIcon";
import listImg from "../../images/list 1.svg"
import gridImg from "../../images/grid 1.svg"
import Image from "next/image"
import { useAppSelector } from "../../redux/hooks";

interface Props{
  filters:any,
  setFiters:any,
  minMax:any,
  setMinMax:any
}
import Modal from "../Modal/modal";

const FilterSection:FC<Props> = ({ filters, setFiters, minMax, setMinMax }) => {
  const [sliderValue, setSliderValue] = useState(filters?.price);
  const [isChecked, setIsChecked] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [modalPriceState, setModalPriceState] = useState(filters?.price);


  const { currRate, currency } = useAppSelector(
    (state: any) => state.appReducer
  )
  // console.log(currRate,currency,"----------");
  

  const handleSliderChange = (value: any) => {
    setFiters({ ...filters, price: value });
    // setSliderValue(value);
  };

  const handleModalSliderChange = (value: any) => {
    setModalPriceState(value);
    // setSliderValue(value);
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const dummmyDATA=["Tshirts","Shirts","Footwear","Jeans","Shorts and Skirts","Bags","Accessories","Sunglasses"]
  const colors=["#379788","#D1DCEB","#F4E6A2","#B18249","#6185C4","#222222","#FFC50A","#C7CF56","#6639A6","#F35528","#03C2FF","#C8DB9B"]
  return (
    <>
 <div className="w-full flex-[0.2] flex lg:hidden gap-4  ">
        <h1 className=" pl-2">
          Filters:{" "}
          <span>
            <button
              onClick={() => setIsMobileModalOpen(true)}
              className="underline font-semibold"
            >
              Apply Filters
            </button>
          </span>
        </h1>

        {/* <div className="flex-1 flex justify-end">
          <h1>Sort By:</h1>
          <select name="" id="">
            <option value="">Best Selling</option>
          </select>
        </div> */}

        <Modal isOpen={isMobileModalOpen} setOpen={setIsMobileModalOpen}>
          <div className="bg-white w-[70vw] p-body h-auto">
            <h4 className="font-semibold text-lg text-[#232738]">
              Filter by Price
            </h4>
            <div className=" my-3 ">
              <Slider
                range
                min={minMax[0]}
                max={minMax[1]}
                className="text-red"
                defaultValue={filters?.price}
                allowCross={false}
                onChange={(e) => handleModalSliderChange(e)}
              />
            </div>
            <div className="flex justify-between">
              <h2 className="text-xs font-bold">
                {currency}{" "}
              
                {Math.floor(
                  parseFloat(modalPriceState[0].toString()) * currRate
                )}
              </h2>
              <h2 className="text-xs font-bold">
                {currency}{" "}
                {Math.ceil(
                  parseFloat(modalPriceState[1].toString()) * currRate
                )}
              </h2>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="bg-gray-300  rounded-md px-3 py-1"
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white rounded-md px-3 py-1"
                onClick={() => {
                  setFiters({ ...filters, price: modalPriceState });
                  setIsMobileModalOpen(false);
                }}
              >
                {" "}
                Apply
              </button>
            </div>
          </div>
        </Modal>
      </div>

    <div className="hidden lg:flex flex-col flex-[0.25] filter-border mt-2">
     
  
        <div className="px-3">
          {/* <h4 className="font-semibold text-sm text-secondary my-4">CATEGORIES</h4> */}
          {/* <div className="flex items-center justify-between mb-2 "><p className="text-primary font-semibold ">Tops</p>
            <p className="h-[30px] w-[30px] rounded-full bg-primary text-white flex justify-center items-center"><FlatIcon className="flaticon-arrow-down text-xs" /></p>
            </div> */}
          {/* <div className="flex items-center justify-between text-xs font-medium mb-1 "><p>View All Tops</p><p>320</p></div> */}
          {/* {dummmyDATA.map((item: any, idx: number) => {
            return <div className="flex items-center justify-between" key={idx}>
              <p className="  py-2.5 mb-1 text-sm t font-medium text-secondary ">{item}</p>
              <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-left-arrow rotate-180 text-sm text-secondary font-bold" /></p>
            </div>
          })} */}
          <div className="flex justify-between items-center   py-5">
            <h4 className="font-semibold text-sm text-secondary ">FILTER BY PRICE</h4>
            {/* <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-minus text-secondary text-xs" /></p> */}
          </div>
        </div>
        <div className="px-3 border-t-[1px] border-t-[#EEF0F5] border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className=" my-3 px-1 ">
            <Slider
              range
              min={minMax[0]}
              max={minMax[1]}
              className="text-red"
              defaultValue={filters?.price}
              allowCross={false}
              onChange={(e) => handleSliderChange(e)}
            />
          </div>
          <div className="flex justify-between">
            <h2 className="text-xs font-semibold">{currency}{" "}{Math.floor(parseFloat(filters?.price[0].toString()) * currRate)}</h2>
            <h2 className="text-xs font-semibold">{currency}{" "}{Math.ceil(parseFloat(filters?.price[1].toString()) * currRate)}</h2>
          </div>
        </div>
        {/* <div className="px-3   border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary">SIZE</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div>
        </div> */}
        {/* <div className="px-3  border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary">BRANDS</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div>

        </div> */}
        {/* <div className="px-3 py-4"> */}
          {/* <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm text-secondary">DISCOUNT</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div> */}
          {/* <div className="flex flex-col gap-3">
            {
              [1, 2, 3, 4].map((item: any, idx: number) => {
                return <div className="flex gap-6 justify-between" key={idx}>
                  <div className="flex  gap-3">
                    <div
                      className={`w-5 h-5   cursor-pointer flex justify-center rounded-sm items-center ${isChecked
                        ? "bg-primary "
                        : "bg-[#F6F6F6]"
                        }`}
                      onClick={toggleCheckbox}
                    >
                      {isChecked && <span>v</span>}
                    </div>
                    <div className="text-[#555555] text-xs font-medium">80% Discount</div>
                  </div>
                  <div className="font-medium text-xs text-[#555555] px-2">57</div>
                </div>
              })
            }
          </div> */}
        {/* </div> */}
        {/* <div className=" px-3 border-t-[1px] border-t-[#EEF0F5] border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary">OCCASION</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div>
        </div> */}
        {/* <div className="px-3  border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary mb-5">COLORS</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-minus text-secondary text-xs" /></p>
          </div>
          <div className="grid-cols-6  grid gap-y-4 gap-x-2">
           
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#379788]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#D1DCEB]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#F4E6A2]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#B18249]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#6185C4]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#222222]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#FFC50A]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#C7CF56]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#6639A6]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#F35528]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#03C2FF]`}></div></div>
            <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" ><div className={`h-[25px] w-[25px] rounded-full bg-[#C8DB9B]`}></div></div>



          </div>
        </div> */}
     
      </div>
    </>
  );
};

export default FilterSection;

