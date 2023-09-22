"use client";
import React from "react";
import Slider from "rc-slider";
import { useState } from "react";
import "rc-slider/assets/index.css";
import FlatIcon from "../flatIcon/flatIcon";

const FilterSection = () => {
  const [sliderValue, setSliderValue] = useState([1000, 10000]);
  const [isChecked, setIsChecked] = useState(false);

  const handleSliderChange = (value: any) => {
    setSliderValue(value);
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const dummmyDATA=["Tshirts","Shirts","Footwear","Jeans","Shorts and Skirts","Bags","Accessories","Sunglasses"]
  const colors=["#379788","#D1DCEB","#F4E6A2","#B18249","#6185C4","#222222","#FFC50A","#C7CF56","#6639A6","#F35528","#03C2FF","#C8DB9B"]
  return (
    <>
      <div className="w-full flex-[0.2] flex lg:hidden gap-4 mt-2  ">
        <h1>FILTER</h1>
        <div className="flex-1 flex items-center gap-5 justify-end">
          {/* <h1>Sort By</h1>
          <select name="" id="">
            <option value="">Best Selling</option>
          </select> */}

<h3 className="text-sm font-medium"> Best Selling</h3>
                  <div><FlatIcon className="flaticon-arrow-down text-xs font-bold text-secondary" /></div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col flex-[0.35]  filter-border mt-3">
        <div className="px-3">
          <h4 className="font-semibold text-sm text-secondary my-4">CATEGORIES</h4>
          <div className="flex items-center justify-between mb-2 "><p className="text-primary font-semibold ">Tops</p>
            <p className="h-[30px] w-[30px] rounded-full bg-primary text-white flex justify-center items-center"><FlatIcon className="flaticon-arrow-down text-xs" /></p></div>
          <div className="flex items-center justify-between text-xs font-medium mb-1 "><p>View All Tops</p><p>320</p></div>
          {dummmyDATA.map((item: any, idx: number) => {
            return <div className="flex items-center justify-between" key={idx}>
              <p className="  py-2.5 mb-1 text-sm t font-medium text-secondary ">{item}</p>
              <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-left-arrow rotate-180 text-sm text-secondary font-bold" /></p>
            </div>
          })}
          <div className="flex justify-between items-center  mt-5 mb-1">
            <h4 className="font-semibold text-sm text-secondary ">FILTER BY PRICE</h4>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-minus text-secondary text-xs" /></p>
          </div>
        </div>
        <div className="px-3 border-t-[1px] border-t-[#EEF0F5] border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className=" my-3 px-1 ">
            <Slider
              range
              min={1000}
              max={10000}
              className="text-red"
              defaultValue={[1000, 10000]}
              allowCross={false}
              onChange={(e) => handleSliderChange(e)}
            />
          </div>
          <div className="flex justify-between">
            <h2 className="text-xs font-semibold">Rs {sliderValue[0]}</h2>
            <h2 className="text-xs font-semibold">Rs {sliderValue[1]}</h2>
          </div>
        </div>
        <div className="px-3   border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary">SIZE</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div>
        </div>
        <div className="px-3  border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary">BRANDS</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div>

        </div>
        <div className="px-3 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm text-secondary">DISCOUNT</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div>
          {/* <h4 className="font-bold text-sm text-secondary my-4">DISCOUNT</h4> */}
          <div className="flex flex-col gap-3">
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
          </div>
        </div>
        <div className=" px-3 border-t-[1px] border-t-[#EEF0F5] border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary">OCCASION</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-plus text-secondary text-xs" /></p>
          </div>
        </div>
        <div className="px-3  border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-secondary mb-5">COLORS</p>
            <p className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"><FlatIcon className="flaticon-minus text-secondary text-xs" /></p>
          </div>
          <div className="grid-cols-6  grid gap-y-4 gap-x-2">
            {/* {colors.map((item: any, idx: number) => {
              return <div className="border border-[#E9EEF3] p-1 rounded-full w-fit" key={idx}><div className={`h-[25px] w-[25px] rounded-full bg-[${item}]`}></div></div>
            })} */}
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
        </div>
      </div>
    </>
  );
};

export default FilterSection;
