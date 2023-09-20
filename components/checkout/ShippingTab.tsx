import { useQuery } from "@tanstack/react-query";
import CheckoutNewAddress from "./CheckoutNewAddress";
import { getUserAddresses, getUserData } from "../../utils/databaseService";
import { initialAddress } from "../../utils/utilities";

function ShippingTab(props) {
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    refetchInterval: 2000,
    keepPreviousData: true,
  });
  const { data: userAddresses } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: () => getUserAddresses(null),
    refetchInterval: 2000,
    keepPreviousData: true,
  });

  return (
    <div className="flex flex-col md:mt-2 mt-4 w-full  ">
      <h6 className="font-medium  xl:text-lg md:text-base text-sm  ">Enter your Shipping Details</h6>
      {props.userData?.defaultAddress && !props.isNewAddress ? (
        <div className="flex flex-col gap-4 ">
          <div className=" rounded-br-[10px] border border-primary mt-4 flex justify-between  px-4 py-4  shadow-md">
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-lg font-medium">Shipping Address</p>
              <div className="flex flex-col gap-2">
                <p className="font-medium">
                  Name:{" "}
                  <span className="text-gray-500">
                    {props.userData?.defaultAddress?.name}
                  </span>
                </p>
                <p className="font-medium">
                  Address:{" "}
                  <span className="text-gray-500">
                    {props.userData?.defaultAddress?.address}
                  </span>
                </p>
                <p className="font-medium">
                  Phone:{" "}
                  <span className="text-gray-500">
                    {props.userData?.defaultAddress?.phoneNo}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <button className=" bg-primary text-white py-2 px-2 hover:bg-white hover:text-black cursor-pointer rounded-br-[10px] border border-primary">
                Change Address
              </button>
              <button
                className=" bg-primary text-white py-2 px-2 hover:bg-white hover:text-black cursor-pointer rounded-br-[10px] border border-primary"
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
    </div>
  );
}

export default ShippingTab;
