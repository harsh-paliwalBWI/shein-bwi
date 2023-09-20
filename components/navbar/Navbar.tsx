// "use client"
import { fetchCategories, getUserData,getUserWishlist } from "../../utils/databaseService";
import getQueryClient from "../../utils/getQueryClient";
import { cookies } from "next/dist/client/components/headers";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../../utils/hydrate.client";
import NavbarClient from "./NavbarClient";
import { useQuery } from "@tanstack/react-query";


const Navbar = async () => {
    const queryClient = getQueryClient();
    const cookie = cookies().get("uid");
    await queryClient.prefetchQuery(["categories"], fetchCategories);
   await queryClient.prefetchQuery(["userData"], () => getUserData(cookie));
   await queryClient.prefetchQuery(["wishlistData"],()=>getUserWishlist())

    // console.log(data,"data");
    
    // const { data: userData } = useQuery({
    //   queryKey: ["userData"],
    //   queryFn: () => getUserData(cookie),
    //   refetchInterval: 2000,
    //   keepPreviousData: true,
    //   // enabled: isClient,
    // });
    
    const dehydratedState = dehydrate(queryClient);
    console.log("data gjfg");
    
    return (
      <Hydrate state={dehydratedState}>
        <NavbarClient cookie={cookie} />
      </Hydrate>
    );
  };
  
  export default Navbar;
  