"use client"
import React from 'react'
import SubCategoryProductComponent from '../../../components/subCategoryProductComponent/SubCategoryProductComponent'
import Hydrate from "../../../utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../utils/getQueryClient";
import { fetchCategoryProducts } from "../../../utils/databaseService";

const category = async({params}) => {
  const queryClient: any = getQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["category-product", params?.slug],
  //   queryFn: () => fetchCategoryProducts(params?.slug),
  //   cacheTime: 60 * 60 * 3,
  // });
  // console.log(params,"from category ");
  
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
    <div> <SubCategoryProductComponent params={params}/></div>
    </Hydrate>
  
  )
}

export default category