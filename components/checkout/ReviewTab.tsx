import Image from "next/image";
import React from "react";
import { constant } from "../../utils/constants";
import { paymentMethods } from "../../utils/utilities";
import FlatIcon from "../flatIcon/flatIcon";

const ReviewTab = ({
  addressToDeliver,
  selectedPaymentMethod,
  paymentSummary,
  placeOrder
}) => {
  return (
    <div className="flex flex-col md:mt-2 mt-4 w-full mb-12">
      <h6 className="font-medium  xl:text-base md:text-base text-sm ">Please review your order details.</h6>
      <div className="w-full flex flex-col sm:gap-5 gap-3 ">
      <div className="flex  items-center justify-end xl:text-base sm:text-base text-sm text-secondary font-semibold  sm:mt-12 mt-4 "><h3 className="text-end">Order Number:</h3 ><h3 className="text-end">#47858740844</h3></div>

        <div className="border border-gray-400     flex flex-col gap-4">
          {paymentSummary &&
            paymentSummary?.products?.map((product, idx) => {
              return (
                <div className="flex sm:flex-row flex-col items-center sm:items-start px-4 py-4 gap-8 " key={idx}>
                  <div className="h-fit w-fit  ">
                    <Image
                      src={
                        product?.img?.url?.includes("assets/img/")
                          ? constant.errImage
                          : product?.img?.url
                      }
                      alt=""
                      width={1000}
                      height={1000}
                      className="   "
                      style={{aspectRatio:"auto",width:"120px",height:"134px"}}
                    />
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <h3 className="font-bold text-black lg:text-lg sm:text-lg text-base  mb-2">
                    Asymmetrical Frayed Bustier
                      {/* {product?.name} */}
                      </h3>
                    <div className="flex gap-2  text-[#555555] lg:text-sm text-xs font-semibold mb-1">Size : <span>L</span>  <span>|</span>  Color :  <span>Beige</span></div>
                    <h3 className="font-semibold text-black text-opacity-75 lg:text-sm text-xs   mb-6">Qty:
                      {" "}{product?.description}
                    </h3>
                    <h3 className="font-bold  text-secondary lg:text-xl sm:text-xl text-base ">
                      {constant.currency} {product?.price.toFixed(2)}
                    </h3>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border border-gray-400     flex flex-col px-4 py-4 gap-8">
          <h4 className="font-bold text-black xl:text-lg text-lg  ">Billing Details</h4>
          <div className="flex flex-col gap-4 ">
            <p className="text-neutral-600 text-sm font-medium"> {addressToDeliver?.name}</p>
            <p className="text-neutral-600 text-sm font-medium"> {addressToDeliver?.address}</p>
            <p className="text-neutral-600 text-sm font-semibold"> {addressToDeliver?.phoneNo}</p>
          </div>
          <div className=" "><button className="bg-secondary text-white flex items-center gap-1 py-1 px-7 xl:text-lg text-base font-semibold"><span><FlatIcon icon={"flaticon-plus-1 text-[10px] font-bold"} /></span><span>Add Address</span></button></div>
        </div>
        <div className="border border-gray-400   flex flex-col p-4 gap-4">
          <h4 className="font-bold text-black xl:text-lg text-lg">Payment Method</h4>
          <div className="flex flex-col gap-3">
            <p className="text-secondary xl:text-lg text-lg font-bold ">
              {" icon "}
              {
                paymentMethods.filter(
                  (method: any) => method.value === selectedPaymentMethod
                )[0]?.name
              }
            </p>
            <div className="">
              <h3 className="font-semibold xl:text-sm text-sm mb-1">Card Number</h3>
              <h3 className="text-[#999999] xl:text-text-sm text-sm font-semibold">1232 * * * * * * * * 2762 (Visa)</h3>
            </div>
            <div className="">
              <h3 className="font-semibold xl:text-sm text-sm mb-1">Card Holder</h3>
              <h3 className="text-[#999999] xl:text-text-sm text-sm font-semibold">Arjun Rawat</h3>
            </div>
            <div className="">
              <h3 className="font-semibold xl:text-sm text-sm mb-1">Expired</h3>
              <h3 className="text-[#999999] xl:text-text-sm text-sm font-semibold">May 2025</h3>
            </div>
          </div>
        </div>
      </div>

      {/* order btn start  */}
      {/* <div className="flex items-center justify-end mt-4 gap-2">
        <button
          className="px-10 border border-black hover:bg-white hover:text-black rounded-full py-2 bg-primary text-white"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div> */}
       {/* order btn end */}
    </div>
  );
};

export default ReviewTab;

