import getQueryClient from "../utils/getQueryClient";
import { fetchHomeSections } from "../utils/databaseService";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../utils/hydrate.client";
import HomeComponent from "../components/HomePage/HomeComponent";
// import Loading from "./";

export const revalidate = 1800; // revalidate at most every hour
import { cookies } from "next/dist/client/components/headers";

export default async function Home() {
  const cookie = cookies().get("uid");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["homeSections"], fetchHomeSections);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomeComponent cookie={cookie} />
    </Hydrate>
  );
}
