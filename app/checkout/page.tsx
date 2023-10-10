"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getGstAppilicableInfo } from "../../utils/cartUtilities/cartUtility";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../../config/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { addAddressToUser, fetchStates, getUserData, updateDefaultAddress, } from "../../utils/databaseService";
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
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { couponsAvailable, fetchCouponList } from "../../utils/databaseService";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    refetchInterval: 2000,
    keepPreviousData: true,
  });
  // console.log(userData,"usre data");

  const { data: states } = useQuery({
    queryKey: ["stateCodes"],
    queryFn: () => fetchStates(),
    keepPreviousData: true,
  });

  const { data: couponAvl } = useQuery({
    queryKey: ["isCoupon"],
    queryFn: () => couponsAvailable(),
    refetchInterval: 2000,
    // keepPreviousData: true,
  });

  // console.log(couponAvl, "couponData-------");

  const { data: couponList } = useQuery({
    queryKey: ["couponlist"],
    queryFn: () => fetchCouponList(),
    refetchInterval: 2000,
    // keepPreviousData: true,
  });

  // console.log(couponList, "couponList-------");

  const [completedSteps, setCompletedSteps] = useState([]);
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const [selectedTab, setSelectedTab] = useState("Shipping");
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [isCoupon, setIsCoupon] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [couponDiscount, setCouponDiscount] = useState(null)
  const [isLoading,setIsLoading]=useState(false)
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
    setPaymentSummary(res.data);
  }

  async function getCouponDiscount(couponText: any) {
   
    // console.log(couponText, "couponText");
    if (couponText) {
      setIsLoading(true)
      const getCouponDiscountDetails = httpsCallable(functions, "orders-verifyCouponCode")
      const isGst = await getGstAppilicableInfo();
      let data = {
        userId: userData?.id,
        paymentDetails: paymentSummary,
        code: couponText,
        isGstApplicable: isGst,
      };
      const res = await getCouponDiscountDetails(data)
      let res2 = await res.data
      if (res2["success"]) {
        const couponDiscount = paymentSummary.totalPayable - res2["details"]["totalAmountToPaid"]
        setPaymentSummary((prev: any) => {
          return { ...prev, totalPayable: res2["details"]["totalAmountToPaid"] }
        })
        setCouponDiscount(couponDiscount)
        toast.success("Coupon applied succesfully")
        setIsCoupon((prev) => !prev);
        setIsLoading(false)
      } else {
        const error = res2["failureMsg"]
        toast.error(error)
        setIsCoupon((prev) => !prev);
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
      toast.error("Please apply coupon first.")
    }
  }


  const handleChange = (name, value) => {
    // console.log(name, "name", value, "value");
    setUserAddress((val:any) => {
      return { ...val, [name]: value };
    });
  };
  function handleAddressSubmit() {
    // console.log(userAddress, "userAddress");

    const {
      address,
      // address2,
      city,
      lat,
      lng,
      name,
      lastName,
      phoneNo,
      pincode,
      state,
      stateCode,
      country,
    } = userAddress;
    if (
      !address ||
      // !address2 ||
      !city ||
      !phoneNo ||
      !pincode ||
      !state ||
      !stateCode ||
      !country ||
      !lastName ||
      !name
    ) {

      // console.log("ENTER DETAILS CORRECTLY", userAddress);
      toast.error("Enter all the details.")
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
      if (!val?.includes(tabs[0])) {
        arr?.push(tabs[0]);
      }
      if (!val?.includes(tabs[1])) {
        arr?.push(tabs[1]);
      }
      // console.log(arr, "steps arr");
      return arr;
    });
  }

  function handlePaymentMethod() {
    // console.log("inside handlePaymentMethod");

    if (selectedPaymentMethod) {
      setCompletedSteps((val: any) => {
        let arr = val;
        if (!val.includes(tabs[0])) {
          arr.push(tabs[0]);
        }
        if (!val.includes(tabs[1])) {
          arr.push(tabs[1]);
        }
        if (!val.includes(tabs[2])) {
          arr.push(tabs[2]);
        }
        return arr;
      });
      setSelectedTab(tabs[2]);
      // setIsStripeOpen(false);
    } else {
      toast.error("Select Payment Method");
    }
  }

  const handleClick = () => {
    // console.log(selectedTab, "selectedTab");
    switch (selectedTab) {
      case tabs[0]: handleAddressSubmit()
        return
      case tabs[1]: handlePaymentMethod()
      default: break;
    }
  }
  async function placeOrder(isCod = true) {
    // console.log("inside placeOrder");
    // console.log(paymentSummary,"--");
    // toast.success("Order Placed Successfully");

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
    // router.push("/");
    if (isCod) {
      toast.success("Order Placed Successfully");
      // router.push("/");
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
    } else {
      return orderId
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
                        if (completedSteps.includes(tab)) {
                          // console.log(completedSteps.includes(tab), "tab");
                          setSelectedTab(tab);
                        }
                        // setSelectedTab(tab);

                      }}
                    >
                      <p
                        className={`${tab === selectedTab && "text-primary  "
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
                  <div className="text-gray-500 font-semibold  text-base">Coupons</div>
                  <div onClick={() => setIsCoupon((prev) => !prev)}>
                    {/* <h5 className="  text-base font-semibold text-primary underline cursor-pointer">Coupons</h5> */}
                    <div className="flex border border-primary items-center  rounded-md lg:px-5 px-3 justify-between  py-2 cursor-pointer">
                      <div className="flex items-center gap-2 text-primary w-full"><Image src={tag} alt="" />
                        <input className="xl:text-base text-sm font-medium outline-0  sm:w-[80%] w-[70%]" onChange={() => { () => setIsCoupon(true) }} /></div>
                      <div><FlatIcon className="flaticon-close text-primary text-lg" /></div>
                    </div>
                  </div>
                  {isCoupon && <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-30 flex justify-center items-center">
                    <div className="xl:w-[40%] md:w-[50%] w-[90%] sm:w-[70%] h-auto   px-5 py-5 flex flex-col justify-end gap-y-3 ">
                      <div className="w-full flex justify-end items-center cursor-pointer " onClick={() => {
                        setIsCoupon((prev) => !prev);
                      }}><button className="bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer"><FlatIcon icon={"flaticon-close text-secondary font-bold text-[10px]"} /></button>
                      </div>
                      <div className="flex flex-col gap-y-5 w-full h-auto  bg-white  px-5 py-5 rounded-xl" >
                        <h3 className="sm:text-lg text-base font-semibold text-center ">Apply Coupon</h3>
                        <div className="my-4">
                          <div className="flex border border-primary items-center  rounded-md lg:px-5 px-3 justify-between  py-2 cursor-pointer">
                            <div className="flex items-center gap-2 text-primary w-full"><Image src={tag} alt="" />
                              <input className="xl:text-base text-sm font-medium outline-0  sm:w-[80%] w-[70%]" value={coupon} onChange={(e) => {
                                // console.log(e.target.value);

                                setCoupon(e.target.value)
                              }} /></div>
                            <div className="flex items-center gap-5">
                             {coupon&&
                               <div onClick={() => setCoupon("")}>
                               <FlatIcon className="flaticon-close text-primary text-lg" />
                             </div>
                             }
                              <div className="text-white bg-secondary px-5 py-1 text-sm" onClick={() => getCouponDiscount(coupon)}>Apply</div>
                            </div>
                          </div>
                          {
                            couponAvl && couponList && couponList.length > 0 &&
                            <div>
                              <h2 className="text-primary text-base font-semibold my-6">Coupons Available</h2>
                              {couponAvl && couponList && couponList.length > 0 && couponList.map((item: any, idx: number) => {
                                return <div className="flex justify-between items-center" key={idx}>
                                  <div><h2>{item?.name}</h2><p className="text-sm text-[#555555] mt-1">{item?.description}</p></div>
                                  <div className="cursor-pointer" onClick={() => getCouponDiscount(item.name)}><button className="text-white bg-secondary px-5 py-1 text-sm">Apply</button></div>
                                </div>
                              })}
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>}
                  <div className="flex   justify-between gap-4  text-base">
                    <p className="text-gray-500 font-semibold  text-base">Price</p>
                    <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                      {constant.currency} {paymentSummary?.totalMrp?.toFixed(2)}
                    </p>
                  </div>
                  {/* <div className="flex  justify-between gap-4  text-base">
                    <p className="text-gray-500 font-semibold  text-base">Subtotal</p>
                    <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                      {constant.currency} {paymentSummary?.totalMrp?.toFixed(2)}
                    </p>
                  </div> */}
                  {paymentSummary?.discountOnMrp !== 0 && (
                    <div className="flex  justify-between ">
                      <p className="text-gray-500 font-semibold  text-base">
                        Discount
                      </p>
                      <p className="font-semibold  text-base text-right   leading-tight tracking-tight">
                        {constant.currency}{" "}
                        {paymentSummary?.discountOnMrp.toFixed(2)}
                      </p>
                    </div>
                  )}
                  {/* coupon  start */}
                  {couponDiscount && <div className="flex  justify-between ">
                    <p className="text-gray-500 font-semibold  text-base">
                      Coupon discount
                    </p>
                    <p className="font-semibold  text-base text-right   leading-tight tracking-tight">
                      {constant.currency}{" "}
                      {couponDiscount && couponDiscount.toFixed(2)}
                      {/* {paymentSummary?.discountOnMrp.toFixed(2)} */}
                    </p>
                  </div>}
                  {/* coupon  end */}

                  <div className="flex justify-between  ">
                    <p className="text-gray-500 font-semibold  text-base">
                      Shipping Fees
                    </p>
                    <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                      {paymentSummary?.delivery?.deliveryCost === 0
                        ? "Free"
                        : `${constant.currency
                        } ${paymentSummary?.delivery?.deliveryCost.toFixed(2)}`}
                    </p>
                  </div>
                  {/* <div className="flex justify-between gap-4  text-base">
                    <p className="text-gray-500 font-semibold  text-base">Taxes</p>
                    <p className="font-semibold  text-base text-right text-black  leading-tight tracking-tight">
                      {constant.currency} {paymentSummary?.totalMrp.toFixed(2)}
                    </p>
                  </div> */}
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
                      if (selectedTab === tabs[2]) {
                        // setIsStripeOpen(true);
                        placeOrder()
                      } else {
                        handleClick();
                      }
                    }}
                  //  previous onclick start 
                  // onClick={() => {
                  //   handleAddressSubmit();
                  // }}
                  //  previous onclick end
                  >
                    {/* {tabs} */}
                    {selectedTab === tabs[2]
                      ? "Proceed To Payment"
                      : selectedTab === tabs[1]
                        ? "Proceed To Review"
                        : "Select Payment Method"}
                    {/* Proceed To Payment */}
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
