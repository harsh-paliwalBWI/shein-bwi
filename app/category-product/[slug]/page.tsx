import React from "react";
import CategoryProductComponent from "../../../components/categoryProduct/CategoryProductComponent";
import Hydrate from "../../../utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../utils/getQueryClient";
import { fetchCategoryProducts } from "../../../utils/databaseService";
const CategoryProducts = async ({ params }) => {
  const queryClient: any = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["category-product", params?.slug],
    queryFn: () => fetchCategoryProducts(params?.slug,"gfd"),
    cacheTime: 60 * 60 * 3,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <CategoryProductComponent params={params} />
    </Hydrate>
  );
};
export default CategoryProducts;