"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchCategoryProducts } from "../../utils/databaseService";
import FilterSection from "./filterSections";
import ProductCard from "./productCard";
import { useMediaQuery ,Skeleton} from "@mui/material";
import FlatIcon from "../flatIcon/flatIcon";
import listImg from "../../images/list 1.svg";
import gridImg from "../../images/grid 1.svg";
import Image from "next/image";
import { constant } from "../../utils/constants";
import { getFilteredProducts } from "../../utils/utilities";



const CategoryProductComponent = ({ params, queryKey = [] }: any) => {
  const matches = useMediaQuery("(min-width:1024px)");
  const [filters, setFiters] = useState(constant.filters);
  const [minMax, setMinMax] = useState(null);
  const [products, setProducts] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const { data: categoryProducts,isLoading } = useQuery({
    queryKey: ["shop", "category", params?.slug],
    queryFn: () =>
      fetchCategoryProducts({
        slug: params?.slug,
        subCatSlug: params?.subCategorySlug,
        subSubCatSlug: params?.subSubCategorySlug,
      }),
  });
  console.log(categoryProducts,"category Products");
  // console.log(params,"from cat page");
  useEffect(() => {
    if (!products) {
      setProducts(categoryProducts?.products);
    }
    if (categoryProducts) {
      setMinMax(categoryProducts?.minMax);
      if (!filters.price) {
        console.log("insdie filters.price ");
        
        setFiters({ ...filters, price: categoryProducts?.minMax });
      }
    }
  }, [categoryProducts]);
  console.log("filter ---------",filters);
  
  return (
    <div className="flex flex-col px-body   h-full  ">
      <div className="w-full flex flex-col lg:flex-row gap-x-4 gap-y-4  mb-20 pt-5 sm:pt-10 md:pt-0 ">
      {minMax && filters?.price ? (
        <FilterSection 
         filters={filters}
            setFiters={setFiters}
            minMax={minMax}
            setMinMax={setMinMax}
        />
      ): isLoading ? (
        <div className="w-full flex-[0.2] flex lg:hidden gap-4 bg-red-300">
          {isClient && (
            <Skeleton variant="rounded" animation="wave" height={600} />
          )}
        </div>
      ) : (
        <></>
      )}
       
        <div className="w-full flex-1">
          {matches && (
            <>
              <div className="flex justify-between mt-4 mb-5 items-center border border-[#EEF0F5] px-5 py-4">
                <h4 className=" text-sm font-medium  ">
                {
                      getFilteredProducts({
                        filters: filters,
                        products: categoryProducts?.products,
                      })?.length
                    } Items Found 
                  {/* {categoryProducts?.products?.length} Items Found */}
                </h4>
                {/* <div className="flex gap-20 items-center">
                  <h3 className="text-sm font-medium"> Best Selling</h3>
                  <div>
                    <FlatIcon className="flaticon-arrow-down text-xs font-bold text-secondary" />
                  </div>
                  <div className="flex items-center gap-7">
                    <div>
                      <Image
                        src={listImg}
                        alt=""
                        width={1000}
                        height={1000}
                        style={{
                          aspectRatio: "auto",
                          height: "24px",
                          width: "24px",
                        }}
                      />
                    </div>
                    <div>
                      <Image
                        src={gridImg}
                        alt=""
                        className=""
                        width={1000}
                        height={1000}
                        style={{
                          aspectRatio: "auto",
                          height: "24px",
                          width: "24px",
                        }}
                      />
                    </div>
                  </div>
                </div> */}
              </div>
              {/* <hr className="mb-2" /> */}
            </>
          )}
           {categoryProducts?.products?.length === 0 ? (
            <div className="w-full flex justify-center items-center py-20 lg:py-32">
              <h2 className="font-semibold text-xl">No Products Found</h2>
            </div>
          ) :
         ( <div className="w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 grid sm:gap-y-8 gap-y-4   md:mb-10  ">
            {categoryProducts &&
              // categoryProducts?.products?.map((product: any) => {
              //   return (
              //     <ProductCard product={product} key={product?.id} mx={2.5} />
              //   );
              // })

              getFilteredProducts({
                filters: filters,
                products: categoryProducts?.products,
              })?.map((product: any) => {
                return <ProductCard product={product} key={product?.id} />;
              })
              }
          </div>)
}
        </div>
      </div>
      {/* <div className="text-center flex justify-center items-center md:my-20 my-10   ">
        <button className="flex items-center gap-3 border-[2px] border-secondary py-3 px-7">
          <span>
            <FlatIcon className="flaticon-reload text-secondary text-xl font-bold" />
          </span>
          <span className="text-sm font-semibold">Load More</span>
        </button>
      </div>
          <span><FlatIcon className="flaticon-reload text-secondary text-xl font-bold" /></span><span className="text-sm font-semibold">Load More</span></button>
          </div> */}
    </div>
  );
};

export default CategoryProductComponent;
