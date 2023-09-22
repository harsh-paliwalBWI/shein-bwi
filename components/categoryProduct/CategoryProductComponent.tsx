"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCategoryProducts } from "../../utils/databaseService";
import FilterSection from "./filterSections";
import ProductCard from "./productCard";
import { useMediaQuery } from "@mui/material";
import FlatIcon from "../flatIcon/flatIcon";

const CategoryProductComponent = ({ params }) => {
  const matches = useMediaQuery("(min-width:1024px)");
  const { data: categoryProducts } = useQuery({
    queryKey: ["category-product", params?.slug],
    queryFn: () => fetchCategoryProducts(params?.slug,"category-product"),
  });
  console.log(categoryProducts,"category Products");
console.log(params,"from cat page");

  return (
    <div className="flex flex-col px-body   h-full ">
      <div className="w-full flex flex-col lg:flex-row gap-x-4 gap-y-4 ">
        <FilterSection />
        {/* <div className="w-full h-1 bg-[red]"></div> */}
        <hr />
        <div className="w-full flex-1">
          {matches && (
            <>
              <div className="flex justify-between mt-4 mb-5 items-center border border-[#EEF0F5] px-5 py-4">
                <h4 className=" text-sm font-medium  ">
                    {categoryProducts?.length}  Items Found
                </h4>
                <div className="flex gap-20 items-center">
                  {/* <h4 className="font-bold text-lg">Sorted By:</h4> */}
                  {/* <div className=" py-2 px-3">
                    <select name="" id="" className="font-bold outline-none">
                      <option value="" className="font-bold outline-none">
                        Best Selling
                      </option>
                    </select>
                  </div> */}
                  <h3 className="text-sm font-medium"> Best Selling</h3>
                  <div><FlatIcon className="flaticon-arrow-down text-xs font-bold text-secondary" /></div>
                </div>
              </div>
              {/* <hr className="mb-2" /> */}
            </>
          )}
          <div className="w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid sm:gap-y-8 gap-y-4   md:mb-10  ">
            {categoryProducts &&
              categoryProducts?.map((product: any) => {
                return <ProductCard product={product} key={product?.id} mx={2.5} />;
              })}
          </div>
        </div>
      </div>
      <div className="text-center flex justify-center items-center md:my-20 my-10   ">
        <button className="flex items-center gap-3 border-[2px] border-secondary py-3 px-7">
          <span><FlatIcon className="flaticon-reload text-secondary text-xl font-bold" /></span><span className="text-sm font-semibold">Load More</span></button></div>
    </div>
  );
};

export default CategoryProductComponent;
