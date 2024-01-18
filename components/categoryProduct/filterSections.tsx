"use client";
import React, { useEffect } from "react";
import Slider from "rc-slider";
import { useState, FC } from "react";
import "rc-slider/assets/index.css";
import FlatIcon from "../flatIcon/flatIcon";
import listImg from "../../images/list 1.svg"
import gridImg from "../../images/grid 1.svg"
import Image from "next/image"
import { useAppSelector } from "../../redux/hooks";
import { Disclosure } from "@headlessui/react";


interface Props {
  filters: any,
  setFiters: any,
  minMax: any,
  setMinMax: any
  filterSelected:any
  setFilterSelected:any
  onhandleFiltersApply:any
  onClearFilter:any
}
import Modal from "../Modal/modal";
import { useQuery } from "@tanstack/react-query";
import { fetchFiltersData } from "../../utils/databaseService";
import { getOtherFilteredProducts } from "../../utils/utilities";
import FilterSidebar from "./FilterSidebar";

const FilterSection: FC<Props> = ({ filters, setFiters, minMax, setMinMax,filterSelected,setFilterSelected,onhandleFiltersApply,onClearFilter }) => {
  const [sliderValue, setSliderValue] = useState(filters?.price);
  const [isChecked, setIsChecked] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [modalPriceState, setModalPriceState] = useState(filters?.price);
  const [isSize, setIsSize] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: boolean }>({});
  const [selectedFilters, setSelectedFilters] = useState({})
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isFabricOpen, setIsFabricOpen] = useState(false);
  const [isFilterByPrice,setIsFilterByPrice]=useState(false)
  // const [filterSelected, setFilterSelected] = useState<{ [key: string]: string[] }>({
  //   'colour': [],
  //   'size': [],
  //   'fabric': [],
  // });

  const { data: filtersData } = useQuery({
    queryKey: ["filtersData"],
    queryFn: () => fetchFiltersData(),
  });
  // const data=filtersData&&filtersData.length>0&&filtersData.map((filter:any,idx:number)=>{
  //   return {[filter.name]:false}
  // })

  const [isFiltersOpen,setIsFiltersOpen]=useState([])

  // console.log("data", data);

  
  // console.log("filtersData", filtersData);

  useEffect(()=>{
    if(filtersData){
      const data=filtersData&&filtersData.length>0&&filtersData.map((filter:any,idx:number)=>{
        return {[filter.name]:false}
      })
  // console.log(" FROM USEEFFECT data", data);

      setIsFiltersOpen(data)
    }

  },[filtersData])


  const { currRate, currency } = useAppSelector(
    (state: any) => state.appReducer
  )
  // console.log(currRate,currency,"----------");
  const toggleSizeFilter = (size: string) => {
    console.log("inside toggleSizeFilter");

    setFilterSelected((prevFilterSelected) => ({
      ...prevFilterSelected,
      'size': prevFilterSelected['size'].includes(size)
        ? prevFilterSelected['size'].filter((selectedSize) => selectedSize !== size)
        : [...prevFilterSelected['size'], size],
    }));
  };

  const toggleFabricFilter = (fabric: string) => {
    console.log("inside toggleFabricFilter");

    setFilterSelected((prevFilterSelected) => ({
      ...prevFilterSelected,
      'fabric': prevFilterSelected['fabric'].includes(fabric)
        ? prevFilterSelected['fabric'].filter((selectedFabric) => selectedFabric !== fabric)
        : [...prevFilterSelected['fabric'], fabric],
    }));
  };




  const toggleSizeSection = () => {
    console.log("inside toggleSizeSection");

    setIsSizeOpen((prev) => !prev);
    // setIsFabricOpen(false); // Close fabric section when opening size section
  };

  const toggleFabricSection = () => {
    console.log("inside toggleFabricSection");

    setIsFabricOpen((prev) => !prev);
    // setIsSizeOpen(false); // Close size section when opening fabric section
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prevSelectedSizes) => {
      const updatedSizes = { ...prevSelectedSizes, [size]: !prevSelectedSizes[size] };
      console.log("updatedSizes", updatedSizes);

      return updatedSizes;
    });
  };
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

  const toggleFilterSection = (filterName: string) => {
    // console.log("toggleFilterSection clliecked");
    
    setIsFiltersOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleFilter = (filterType: string, value: string) => {
    // console.log("inside toggleFilter",filterType,value);
    
    setFilterSelected((prevFilterSelected) => ({
      ...prevFilterSelected,
      [filterType]: prevFilterSelected[filterType].includes(value)
        ? prevFilterSelected[filterType].filter((selectedValue) => selectedValue !== value)
        : [...prevFilterSelected[filterType], value],
    }));

    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [value]: !prevSelectedSizes[value],
    }));
  };
  // console.log(filterSelected,"from filter section");
  
  
  const dummmyDATA = ["Tshirts", "Shirts", "Footwear", "Jeans", "Shorts and Skirts", "Bags", "Accessories", "Sunglasses"]
  const colors = ["#379788", "#D1DCEB", "#F4E6A2", "#B18249", "#6185C4", "#222222", "#FFC50A", "#C7CF56", "#6639A6", "#F35528", "#03C2FF", "#C8DB9B"]
  return (
    <>
      <div className="w-full flex-[0.2] flex lg:hidden gap-4  ">
        <h1 className="  border-b w-full pb-2 flex items-center justify-between gap-5">
         <button     onClick={() => {
                // console.log("cliekdd------");
                
                setIsFilterByPrice(true)
                document.body.classList.add("no-scroll");
              }}
              className=" font-semibold "
              >Filter By Price</button>
        
            <button
              onClick={() => {
                // console.log("cliekdd------");
                
                setIsMobileModalOpen(true)
                document.body.classList.add("no-scroll");
              }}
              className=" font-semibold "
            >
            Filter
            </button>
       
        </h1>
        {isMobileModalOpen&&
        <FilterSidebar 
        setIsMobileModalOpen={setIsMobileModalOpen} 
        setFilterSelected={setFilterSelected} 
        setSelectedSizes={setSelectedSizes}
        selectedSizes={selectedSizes}
        onhandleFiltersApply={onhandleFiltersApply}
        filterSelected={filterSelected}
        onClearFilter={onClearFilter}
        /> 
}

        {/* <div className="flex-1 flex justify-end">
          <h1>Sort By:</h1>
          <select name="" id="">
            <option value="">Best Selling</option>
          </select>
        </div> */}

        <Modal isOpen={isFilterByPrice} setOpen={setIsFilterByPrice}>
          <div className="bg-white sm:w-[60%] w-[100%] absolute top-0 left-0  h-screen   flex-col">
          <div className='w-full text-center text-lg font-semibold border-b py-4 relative '>Filter
    {/* <div onClick={() =>{
        setIsMobileModalOpen(false)
        document.body.classList.remove("no-scroll");
    }
    }>
    <FlatIcon  className="flaticon-close absolute top-2 right-2 text-base  text-gray-500" />

    </div> */}
    </div>
            <div className="w-full px-5 p-body">
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
                onClick={() => {
                  setIsFilterByPrice(false)
                  document.body.classList.remove("no-scroll");

                }}
                
                className="bg-gray-300  rounded-md px-3 py-2 w-[50%]"
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white rounded-md px-3 py-2 w-[50%]"
                onClick={() => {
                  setFiters({ ...filters, price: modalPriceState });
                  setIsFilterByPrice(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                {" "}
                Apply
              </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div className="hidden lg:flex flex-col flex-[0.25] filter-border mt-2">


        <div className="px-3">
         
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

        {filtersData &&
          filtersData.length > 0 &&
          filtersData.map((filter: any, idx: number) => (
            <div key={idx}>
              <div className={`px-3 border-b-[1px] border-b-[#EEF0F5] py-4 `}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-secondary">{filter?.name}</p>
                  <p
                    onClick={() => toggleFilterSection(filter.name)}
                    className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"
                  >
                    <FlatIcon className={`${isFiltersOpen[filter.name] ? 'flaticon-minus' : "flaticon-plus"} text-secondary text-xs `} />
                  </p>
                </div>
              </div>

              {isFiltersOpen[filter.name] && (
                <div className="flex items-center gap-5  pt-4 px-3">
                  {filter.values.map((value: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        onClick={async() => {
                        await  toggleFilter(filter.name, value)
                         await onhandleFiltersApply(filterSelected)
                        }}
                        className={`h-[18px] w-[18px] flex items-center justify-center border p-1 border-[gray] cursor-pointer relative`}
                      >
                        {selectedSizes[value] && (
                          <div className="h-full w-full bg-pink-500  "></div>
                        )}
                      </div>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}




       
      </div>
    </>
  );
};

export default FilterSection;

