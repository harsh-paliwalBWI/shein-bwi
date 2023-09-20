import React , { useState } from "react";
import { paymentMethods, tabs } from "../../utils/utilities";
import FlatIcon from "../flatIcon/flatIcon";

const PaymentMethodTab = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setSelectedTab,
  setCompletedSteps,
}) => {

  const [selectionIndex, setSelectionIndex] = useState(-1);

  return (
    <div className="flex flex-col md:mt-2 mt-4 w-full ">
      <h6 className="font-medium  xl:text-lg md:text-base text-sm ">Choose your preferred Payment Method</h6>
      <div className="flex flex-col gap-2 sm:mt-12 mt-4">
        {paymentMethods.map((method, idx) => {
          return (
            <div
              onClick={() => {
                setSelectedPaymentMethod(method.value);
                setSelectionIndex(idx);
                // setSelectedTab(tabs[2]);
                // setCompletedSteps((val: any) => {
                //   if (!val.includes(tabs[2])) {
                //     let arr = val;
                //     arr.push(tabs[2]);
                //     return arr;
                //   }
                // });
              }}
              className="flex justify-between items-center sm:px-8 px-5 py-6 bg-white  border  border-[#838383]  cursor-pointer "
              key={idx}
            >
              <div className="flex sm:gap-8 gap-4 items-center">
                <p>icon</p>
                <p className="text-black md:text-base text-sm font-semibold">{method.name}</p>
              </div>
              <div className="flex gap-4">
              {selectionIndex === idx && <p>✔️</p>} 
              <div><FlatIcon icon={"flaticon-arrow-down text-lg"} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodTab;


