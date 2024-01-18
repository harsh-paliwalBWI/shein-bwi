"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchCategoryProducts, fetchFiltersData } from "../../utils/databaseService";
import FilterSection from "./filterSections";
import ProductCard from "./productCard";
import { useMediaQuery, Skeleton } from "@mui/material";
import FlatIcon from "../flatIcon/flatIcon";
import listImg from "../../images/list 1.svg";
import gridImg from "../../images/grid 1.svg";
import Image from "next/image";
import { constant } from "../../utils/constants";
import { getFilteredProducts, getOtherFilteredProducts } from "../../utils/utilities";

const CategoryProductComponent = ({ params, queryKey = [] }: any) => {
  const matches = useMediaQuery("(min-width:1024px)");
  const [filters, setFiters] = useState(constant.filters);
  const [minMax, setMinMax] = useState(null);
  const [products, setProducts] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filterSelected, setFilterSelected] = useState<{ [key: string]: string[] }>({});
  // const [filteredProducts,setFilteredProducts]

  const { data: categoryProducts, isLoading } = useQuery({
    queryKey: ["shop", "category", params?.slug],
    queryFn: () =>
      fetchCategoryProducts({
        slug: params?.slug,
        subCatSlug: params?.subCategorySlug,
        subSubCatSlug: params?.subSubCategorySlug,
      }),
  });
  // console.log(categoryProducts,"category Products");
  // console.log(params,"from cat page");

  const { data: filtersData } = useQuery({
    queryKey: ["filtersData"],
    queryFn: () => fetchFiltersData(),
  });
  // console.log("filtersData", filtersData);

  const { data: priceFilteredData } = useQuery({
    queryKey: ["priceFilteredData"],
    queryFn: () => getFilteredProducts({
      filters: filters,
      products: categoryProducts?.products

    }),
  });
  // console.log("priceFilteredData",priceFilteredData);


  const { data: otherFiltersData } = useQuery({
    queryKey: ["otherFiltersData"],
    queryFn: () => getOtherFilteredProducts({
      filters: filters,
      products: categoryProducts?.products,
      otherFilters: filterSelected
    }),
  });
  // console.log(otherFiltersData,"otherFiltersData");

  const handleFiltersApply = async (data) => {
    console.log("data from handleFiltersApply", data);
    const result = await getOtherFilteredProducts({
      filters: filters,
      products: categoryProducts?.products,
      otherFilters: data
    })
    console.log("result from handleFiltersApply from check", result);
    setFilteredProducts(result)
  };

  const clearFilterHandler = async (data) => {
    // console.log("data from clearFilterHandler",data);
    if (filtersData) {
      const initialFilterState = Object.fromEntries(filtersData.map(filter => [filter.name, []]));
      setFilterSelected(initialFilterState)
    }
  };

  const handleFiltersApplySelected = async (data) => {
    console.log("data from handleFiltersApply from check", data);
    const result = await getOtherFilteredProducts({
      filters: filters,
      products: categoryProducts?.products,
      otherFilters: data
    })
    console.log("result from handleFiltersApply", result);
    setFilteredProducts(result)
  };

  useEffect(() => {
    if (filtersData) {
      const initialFilterState = Object.fromEntries(filtersData.map(filter => [filter.name, []]));
      setFilterSelected(initialFilterState)
    }
  }, [filtersData])


  useEffect(() => {
    // console.log("inside otherFiltersData useeffect");
    setFilteredProducts(otherFiltersData)
    // const result:any= getOtherFilteredProducts({
    //   filters: filters,
    //   products: categoryProducts?.products,
    //   otherFilters:filterSelected
    // })
    // console.log("result from useEffect",result);
    // setFilteredProducts(result)
  }, [filterSelected, otherFiltersData])

  useEffect(() => {
    // console.log("inside priceFilteredData useeffect");
    setFilteredProducts(priceFilteredData)
  }, [priceFilteredData])

  useEffect(() => {
    if (!products) {
      setProducts(categoryProducts?.products);
    }
    if (categoryProducts) {
      setMinMax(categoryProducts?.minMax);
      if (!filters.price) {
        // console.log("insdie filters.price ");
        setFiters({ ...filters, price: categoryProducts?.minMax });
      }
    }
  }, [categoryProducts]);
  // console.log("filter ---------",filters);
  // console.log("filterSelected from comp",filterSelected);

  return (
    <div className="flex flex-col px-body   h-full  ">
      <div className="w-full flex flex-col lg:flex-row gap-x-4 gap-y-4  mb-20 pt-5 sm:pt-10 md:pt-0 ">
        {minMax && filters?.price ? (
          <FilterSection
            filters={filters}
            setFiters={setFiters}
            minMax={minMax}
            setMinMax={setMinMax}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
            onhandleFiltersApply={handleFiltersApply}
            onClearFilter={clearFilterHandler}
          />
        ) : isLoading ? (
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
                  {/* {
                      getFilteredProducts({
                        filters: filters,
                        products: categoryProducts?.products,
                      })?.length
                    } Items Found  */}
                  {
                    filteredProducts && filteredProducts.length
                  }{" "}Items Found

                </h4>

              </div>
              {/* <hr className="mb-2" /> */}
            </>
          )}
          {categoryProducts?.products?.length === 0 ? (
            <div className="w-full flex justify-center items-center py-20 lg:py-32">
              <h2 className="font-semibold text-xl">No Products Found</h2>
            </div>
          ) :
            (<div className="w-full    md:mb-10   ">
              {/* {categoryProducts &&
              getFilteredProducts({
                filters: filters,
                products: categoryProducts?.products,
              })?.map((product: any) => {
                return <ProductCard product={product} key={product?.id} />;
              })
              } */}

              {categoryProducts &&
                filteredProducts && filteredProducts.length > 0 ?
                (<div className=" w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 grid sm:gap-y-8 gap-y-4">
                  {
                    filteredProducts?.map((product: any) => {
                      return <ProductCard product={product} key={product?.id} />;
                    })
                  }
                </div>)
                :
                (<div className="  flex justify-center items-center text-xl h-[50vh] text-primary">No products found !</div>)
              }
            </div>)
          }
        </div>
      </div>

    </div>
  );
};

export default CategoryProductComponent;
