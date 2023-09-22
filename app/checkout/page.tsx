"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getGstAppilicableInfo } from "../../utils/cartUtilities/cartUtility";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../../config/firebase-config";
import { useQuery } from "@tanstack/react-query";
import {addAddressToUser,fetchStates,getUserData,updateDefaultAddress,} from "../../utils/databaseService";
import ShippingTab from "../../components/checkout/ShippingTab";
import { initialAddress, paymentMethods, tabs } from "../../utils/utilities";
import PaymentMethodTab from "../../components/checkout/PaymentMethodTab";
import ReviewTab from "../../components/checkout/ReviewTab";
import Hr from "../../components/Hr/Hr";
import { constant } from "../../utils/constants";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/slices/cartSlice";
import FlatIcon from "../../components/flatIcon/flatIcon";
import tag from "../../images/tag 1.svg"
import Image from "next/image";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    refetchInterval: 2000,
    keepPreviousData: true,
  });
  const { data: states } = useQuery({
    queryKey: ["stateCodes"],
    queryFn: () => fetchStates(),
    keepPreviousData: true,
  });
  const [completedSteps, setCompletedSteps] = useState([]);
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const [selectedTab, setSelectedTab] = useState("Shipping");
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [userAddress, setUserAddress] = useState(
    userData?.defaultAddress || initialAddress
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0].value
  );
  const [makeDefaultAddress, setMakeDefaultAddress] = useState(true);
  const [addressToDeliver, setAddressToDeliver] = useState(
    (userData && userData?.defaultAddress) || initialAddress
  );
  const [isNewAddress, setIsNewAddress] = useState(
    !(userData && userData?.defaultAddress)
  );
  async function getPaymentSummary() {
    const getPaymentSummaryDetails = httpsCallable(
      functions,
      "orders-getOrderPaymentDetails"
    );
    const isGst = await getGstAppilicableInfo();
    let data = {
      address: addressToDeliver,
      products: cart,
      isGstApplicable: isGst,
      customDeliverySettings: null,
    };
    const res = await getPaymentSummaryDetails(data);
    console.log("PAYMENT ", res);
    setPaymentSummary(res.data);
  }
const handleChange = (name, value) => {
    setUserAddress((val) => {
      return { ...val, [name]: value };
    });
  };
  function handleAddressSubmit() {
    const {
      address,
      city,
      lat,
      lng,
      name,
      phoneNo,
      pincode,
      state,
      stateCode,
      country,
    } = userAddress;
    if (
      !address ||
      !city ||
      !phoneNo ||
      !pincode ||
      !state ||
      !stateCode ||
      !country ||
      !name
    ) {
      console.log("ENTER DETAILS CORRECTLY", userAddress);
      return;
    }
    if (makeDefaultAddress) {
      updateDefaultAddress(userAddress);
    }
    addAddressToUser(userAddress);
    setAddressToDeliver(userAddress);
    setSelectedTab(tabs[1]);
    setCompletedSteps((val: any) => {
      let arr = val;
      if (!val.includes(tabs[0])) {
        arr.push(tabs[0]);
      }
      if (!val.includes(tabs[1])) {
        arr.push(tabs[1]);
      }
      return arr;
    });
  }
  async function placeOrder() {
    const autoConfirmOrder = await getDoc(doc(db, "payment", "info")).then(
      (val) => {
        let data = val.data();
        return data?.autoConfirmOrder;
      }
    );
    let orderObj = {
      delivery: paymentSummary?.delivery?.deliveryCost || 0,
      couponDiscount: 0,
      defaultGst: paymentSummary?.totalGst || 0,
      totalAmountToPaid: paymentSummary?.totalPayable,
      couponId: "", //coupon
      couponName: "", //coupon,
      scheduledDate: "",
      scheduledTime: "",
      totalMrp: paymentSummary?.totalMrp, // from backend
      discountOnMrp: paymentSummary?.discountOnMrp, // from backend
      deliveryGstObj: paymentSummary?.deliveryGstObj, // from backend
      customerGstNo: "",
      billingAddress: addressToDeliver,
      autoConfirmOrder: autoConfirmOrder || false, // collection payment -> info
      storePickupObj: {},
      metaData: {
        source: "web",
        inventoryManaged: autoConfirmOrder ? true : false,
      },
      products: paymentSummary?.products,
      address: addressToDeliver,
      orderId: null,
      status: selectedPaymentMethod === "cod" ? "Confirmed" : "Pending",
      createdAt: new Date(),
      payment: {
        completed: false,
        mode: selectedPaymentMethod === "cod" ? "cod" : null,
        details: null,
      },
      userId: auth.currentUser?.uid,
      msgId: doc(collection(db, "chats", auth.currentUser?.uid, "messages")).id,
      userName: userData?.name || addressToDeliver?.name,
      region: "",
    };
    let orderId;
    orderId = (await addDoc(collection(db, "orders"), orderObj)).id;
    dispatch(reset());
    router.push("/");
    if (selectedPaymentMethod === "cod") {
      // if (getCondition(userData, args)) {
      //   await FirebaseFunctions.instance
      //       .httpsCallable('wallet-orderPaymentWithWallet')
      //       .call({...orderObj, "createdAt": "", "orderDocId": orderID});
      // } else {
      //   await FirebaseFunctions.instance
      //       .httpsCallable('payments-ac_paymentWithCash')
      //       .call({...orderObj, "createdAt": "", "orderDocId": orderID});
      // }
    }
  }
  useEffect(() => {
    getPaymentSummary();
  }, [addressToDeliver]);
  function renderTabs() {
    switch (selectedTab) {
      case tabs[0]:
        return (
          <ShippingTab
            userData={userData}
            states={states}
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            makeDefaultAddress={makeDefaultAddress}
            setMakeDefaultAddress={setMakeDefaultAddress}
            isNewAddress={isNewAddress}
            setIsNewAddress={setIsNewAddress}
            handleAddressSubmit={handleAddressSubmit}
            handleChange={handleChange}
          />
        );
      case tabs[1]:
        return (
          <PaymentMethodTab
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            setSelectedTab={setSelectedTab}
            setCompletedSteps={setCompletedSteps}
          />
        );
      case tabs[2]:
        return (
          <ReviewTab
          
            placeOrder={placeOrder}
            addressToDeliver={addressToDeliver}
            selectedPaymentMethod={selectedPaymentMethod}
            paymentSummary={paymentSummary}
          />
        );
      default:
        return <></>;
    }
  }
  return (
    <div className="px-body  ">
      <div className="w-full flex lg:flex-row flex-col-reverse sm:gap-y-8 gap-y-4 gap-x-16 lg:mt-10 mt-5 lg:mb-24 mb-5  ">
        <div className="w-full lg:w-[65%]  flex flex-col  ">
          <div className="flex justify-between sm:flex-row flex-col gap-y-3 items-center ">
            <h2 className="xl:text-3xl text-xl font-bold text-black   uppercase">Checkout</h2>
            <div className="flex items-center sm:justify-center  ">
      <div className="flex  flex-row gap-2 ">
              {tabs.map((tab, idx) => {
                return (
                  <div
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => {
                      // if (completedSteps.includes(tab)) {
                      //   setSelectedTab(tab);
                      // }
                      setSelectedTab(tab);

                    }}
                  >
                    <p
                      className={`${
                        tab === selectedTab && "text-primary  "
                      } font-medium xl:text-base text-sm text-[#555555]`}
                    >
                      {tab}
                      {(idx === 0 || idx === 1) && " >"}
                    </p>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
          {/* <PaymentMethodTab
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            setSelectedTab={setSelectedTab}
            setCompletedSteps={setCompletedSteps}
          /> */}
          {renderTabs()}
        </div>
        <div className="w-full lg:w-[35%]   ">
          {!paymentSummary ? (
            <div className="">
              <Skeleton animation="wave" height={60} className="!mb-2" />
              <Skeleton variant="rounded" animation="wave" height={200} />
            </div>
          ) : (
            <div className="flex flex-col ">
              <div className="flex xl:items-end items-center  ">
              <h2 className="xl:text-3xl  text-xl font-semibold text-black uppercase leading-[30px] tracking-wide">
                ORDER SUMMARY</h2>
                <h4 className="xl:text-base text-sm font-semibold ">({cart.length} Item)</h4>
                {/* <span className=" text-neutral-400 text-base font-normal lowercase leading-[30px] tracking-tight">({cart.length} Items)</span> */}
              
              </div>
              <div className="flex flex-col gap-y-4 ">
              <div className="lg:mt-10 mt-4 flex flex-col gap-4   border border-gray-400 sm:px-6 px-2 sm:py-6 py-2">
               <div><h5 className="text-gray-500  text-base font-semibold ">Coupons</h5>
               <div className="flex border border-primary items-center  rounded-md lg:px-5 px-3 justify-between mt-4 py-2 ">
                {/* <div className="flex items-center gap-x-3 w-[80%]"> */}
                <div className="flex items-center gap-2 text-primary "><Image src={tag} alt=""/><p className="xl:text-base text-sm font-medium">“CODESHE” Applied</p></div>
                {/* <input type="text" className=" py-4 w-[100%] outline-0" /> */}
                {/* </div> */}
                <div><FlatIcon className="flaticon-close text-primary text-lg"/></div>
               </div>
               </div>
               <div className="flex   justify-between gap-4  text-base">
                  <p className="text-gray-500 font-semibold  text-base">Price</p>
                  <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                    {constant.currency} {paymentSummary?.totalMrp.toFixed(2)}
                  </p>
                </div>
                <div className="flex  justify-between gap-4  text-base">
                  <p className="text-gray-500 font-semibold  text-base">Subtotal</p>
                  <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                    {constant.currency} {paymentSummary?.totalMrp.toFixed(2)}
                  </p>
                </div>
                {paymentSummary?.discountOnMrp !== 0 && (
                  <div className="flex  justify-between ">
                    <p className="text-gray-500 font-semibold  text-base">
                    Coupon/ Discount
                    </p>
                    <p className="font-semibold  text-base text-right   leading-tight tracking-tight">
                      {constant.currency}{" "}
                      {paymentSummary?.discountOnMrp.toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="flex justify-between  ">
                  <p className="text-gray-500 font-semibold  text-base">
                  Shipping Fees
                  </p>
                  <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                    {paymentSummary?.delivery?.deliveryCost === 0
                      ? "Free"
                      : `${
                          constant.currency
                        } ${paymentSummary?.delivery?.deliveryCost.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex justify-between gap-4  text-base">
                  <p className="text-gray-500 font-semibold  text-base">Taxes</p>
                  <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                    {constant.currency} {paymentSummary?.totalMrp.toFixed(2)}
                  </p>
                </div> 
                <div className="  border-gray-400 border-t  "></div>
                <div className="flex justify-between     ">
                  <p className=" font-bold text-secondary   text-base leading-tight tracking-tight">Total</p>
                  <p className=" font-bold text-secondary    text-base leading-tight tracking-tight">
                    {constant.currency}{" "}
                    {paymentSummary?.totalPayable.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex  ">
            <button
              className=" w-full text-white py-2 px-2 hover:bg-white hover:text-black cursor-pointer hover:border hover:border-secondary   md:h-[60px] h-[40px] bg-secondary  text-center  text-base font-semibold"
              onClick={() => {
                handleAddressSubmit();
              }}
            >
              Proceed To Payment
            </button>
          </div>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
