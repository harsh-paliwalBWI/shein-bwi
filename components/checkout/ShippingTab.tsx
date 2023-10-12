import { useQuery } from "@tanstack/react-query";
import CheckoutNewAddress from "./CheckoutNewAddress";
import { getUserAddresses, getUserData } from "../../utils/databaseService";
import { initialAddress } from "../../utils/utilities";
import React,{useState,useEffect} from "react";

function ShippingTab(props) {
  // console.log(props.userData,"from shipping");
  
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    
    keepPreviousData: true,
  });
  // console.log(userData,"user");
  
  const { data: userAddresses } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: () => getUserAddresses(null),
    
    keepPreviousData: true,
  });
  const [isClient,setIsClient]=useState(false)
useEffect(()=>{
  setIsClient(true)
},[])
  return (
    <div className="flex flex-col md:mt-2 mt-4 w-full  ">
      <h6 className="font-medium  xl:text-base md:text-base text-sm  ">Enter your Shipping Details</h6>
      {isClient&&props.userData?.defaultAddress && isClient&&!props.isNewAddress ? (
        <div className="flex flex-col gap-4 ">
          <div className=" border border-primary mt-4 flex justify-between  px-4 py-4  shadow-md">
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-lg font-medium">Shipping Address</p>
              <div className="flex flex-col gap-2">
                <p className="font-medium">
                  Name:{" "}
                  <span className="text-gray-500">
                    {isClient&&props.userData?.defaultAddress?.name}{" "}{isClient&&props.userData?.defaultAddress?.lastName}
                  </span>
                </p>
                <p className="font-medium">
                  Address:{" "}
                  <span className="text-gray-500">
                    {isClient&&props.userData?.defaultAddress?.address}
                  </span>
                </p>
                <p className="font-medium">
                  Phone:{" "}
                  <span className="text-gray-500">
                    {isClient&&props.userData?.defaultAddress?.phoneNo}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <button className=" bg-primary text-white py-2 px-2 hover:bg-white hover:text-black cursor-pointer  border border-primary">
                Change Address
              </button>
              <button
                className=" bg-primary text-white py-2 px-2 hover:bg-white hover:text-black cursor-pointer  border border-primary"
                onClick={() => {
                  props.setUserAddress(initialAddress);
                  props.setIsNewAddress(true);
                }}
              >
                Add New Address
              </button>
            </div>
          </div>
          
        </div>
      ) : (
        <CheckoutNewAddress
          states={props.states}
          userAddress={props.userAddress}
          setUserAddress={props.setUserAddress}
          handleAddressSubmit={props.handleAddressSubmit}
          makeDefaultAddress={props.makeDefaultAddress}
          setMakeDefaultAddress={props.setMakeDefaultAddress}
          handleChange={props.handleChange}
          setIsNewAddress={props.setIsNewAddress}
        />
      )}


{/* <CheckoutNewAddress
          states={props.states}
          userAddress={props.userAddress}
          setUserAddress={props.setUserAddress}
          handleAddressSubmit={props.handleAddressSubmit}
          makeDefaultAddress={props.makeDefaultAddress}
          setMakeDefaultAddress={props.setMakeDefaultAddress}
          handleChange={props.handleChange}
          setIsNewAddress={props.setIsNewAddress}
        /> */}
    </div>
  );
}

export default ShippingTab;
