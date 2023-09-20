"use client";
import Link from "next/link";
// import logo from "../../images/MedX-Pharmacy-Logo-R-01 1 (1).svg";
// import Logo from "../../images/Group 34330.png"
// import logo from "../../images/Frame 34430.svg";
import logo from "../../images/Frame 34284.svg";
import React, { useEffect, useState } from "react";
import NavMobile from "../navMobile/NavMobile";
import SearchHeader from "../searchHeader/SearchHeader";
import { usePathname } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import Image from "next/image";
import Categories from "./categories/navCategories";
import { getUserCartDetails } from "../../utils/cartUtilities/cartUtility";
import { initializeCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebase-config";
import { Transition } from "@headlessui/react";
import useDebounce from "../../utils/useDebounce";
import { handleTypesenseSearch } from "../../config/typesense";
import FlatIcon from "../flatIcon/flatIcon";
import Modal from "../Modal/modal";
import SearchResults from "../SeachResults/SearchResults";
import {addCartObjToUser,fetchSingleProduct,} from "../../utils/databaseService";

// import { log } from "console";
import {
  addToCart,
  getCartObj,
  getPriceListCartObj,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const NavbarClient = ({ cookie }: any) => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const mobile = useMediaQuery("(max-width:1080px)");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isCalorieCalculatorOpen, setIsCalorieCalculatorOpen] = useState(false);
  const [isPrescriptionUpload, setIsPrescriptionUpload] = useState(false);
  const matches = useMediaQuery("(max-width:767px)");
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const debouncedSearch = useDebounce(searchQuery, 500);

  async function getCart() {
    const cart = await getUserCartDetails(cookie);
    dispatch(initializeCart(cart));
  }
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    refetchInterval: 2000,
    keepPreviousData: true,
    enabled: isClient,
  });

  // console.log(userData,"userData---------->");
  
  const {
    data: searchData,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => handleTypesenseSearch(searchQuery),
    keepPreviousData: false,
  });

  async function fetchSearchedProducts() {
    const res = await handleTypesenseSearch(debouncedSearch);
    // console.log(res,"res from fetchSearchedProducts");
    
    if (res) {
      setSearchedProducts(res);
    }
  }

  useEffect(() => {
    if (isClient) {
      getCart();
    }
    setIsClient(true);
  }, [isClient]);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchedProducts([]);
    }
    if (debouncedSearch) {
      // console.log(debouncedSearch,"debouncedSearch------------------>");
      fetchSearchedProducts();
      // fetch(`/api/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch]);


  const searchResultsHandler=( query )=>{
    // console.log(query,"from searchResultsHandler function");
    
  }
  async function addItemToCart(product) {
    // console.log(product,"from addItemToCart start");
    
    // let data: any = {
    //   product,
    //   productID: product?.id,
    //   quantity: quantity,
    //   index: variant,
    //   isPriceList: product?.isPriceList,
    // };
    console.log("inside");
    
    const cartObject = product?.isPriceList
      ? getPriceListCartObj({
          product: product,
          quantity: 1,
          index: 0,
        })
      : getCartObj({
          product: product,
          productID: product?.productDocId,
          quantity: 1,
        });
    if (auth.currentUser) {
      const docId = await addCartObjToUser(cartObject);
      cartObject["id"] = docId;
    }
    dispatch(addToCart(cartObject));
    // console.log(" end");
  }
  return (
    <>
      {matches ? (
        <NavMobile />
      ) : (
        <>
          <div className="bg-primary text-white py-2 text-sm font-semibold w-full px-body ">
            <div className="flex items-center   w-full  justify-between lg:gap-5 px-2.5 ">
              <div className="flex items-center lg:gap-8 gap-4 lg:w-1/3 w-[18%] ">
               <div> <FlatIcon className="flaticon-facebook lg:text-base text-sm" /> </div>
               <div> <FlatIcon className="flaticon-twitter lg:text-xl text-lg" /></div>
               <div> <FlatIcon className="flaticon-instagram lg:text-lg text-base" /></div>
               <div> <FlatIcon className="flaticon-youtube lg:text-xl text-lg" /></div>
              </div>
              {/* <div className="flex justify-center  w-2/3 border border-white">
                <span className="text-secondary font-bold">New Users Only</span>
                <span>All India Free Delivery + 15% Extra Discount </span>
                <span className="text-secondary font-bold"> Code: SHE15</span>
              </div> */}
              <div className="flex justify-center gap-2 items-start  lg:w-2/3 w-[64%]  xl:text-sm text-xs ">
          <p className="text-secondary font-bold">New Users Only </p>
          <p>All India Free Delivery + 15% Extra Discount </p>
          <p className="text-secondary font-bold"> Code: SHE15</p>
              </div>
              <div className="flex items-center justify-end gap-4 lg:w-1/3 w-[18%]   xl:text-sm text-xs ">
                <div className="flex items-center gap-3">
                  <h4>English</h4>
                  <FlatIcon className="flaticon-arrow-down-2 text-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <h4>INR</h4>
                  <FlatIcon className="flaticon-arrow-down-2 text-sm" />
                </div>
              </div>
            </div>
          </div>
          <div className="  ">
            {/* nav header section  */}
            <div className="flex text-sm  font-semibold   bg-white  w-full px-body  ">
              <div className=" w-full px-2.5  ">
              <div className="  flex items-center w-full  justify-between   ">
                {/* <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                      setIsPrescriptionUpload(true);
                    }}
                  >
                    <div>
                      <Image
                        alt="prescription"
                        src={require("../../images/prescription.png")}
                        width={100}
                        height={100}
                        className=" w-auto h-auto object-contain"
                      />
                    </div>
                    <h3>Prescription</h3>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <div>
                      <Image
                        alt="prescription"
                        src={require("../../images/calorie_calculator.png")}
                        width={100}
                        height={100}
                        className=" w-auto h-auto object-contain"
                      />
                    </div>
                    <h3>Calorie Calculator</h3>
                  </div>
                </div> */}
                <div className="min-h-[100px] flex items-center   w-[30%]  ">
                  {/* {isSearchOpen ? ( */}
                  <Transition
                    appear={true}
                    show={true}
                    // show={isSearchOpen}
                    className={
                      "w-full z-40 h-full flex items-center justify-center "
                    }
                  >
                    <Transition.Child
                      className="transition duration-300 w-full h-full flex items-center"
                      enter="ease-in-out"
                      enterFrom=" opacity-0"
                      enterTo=" opacity-100"
                      leave="ease-out"
                      leaveFrom=" opacity-100"
                      leaveTo=" opacity-0"
                    >
                      <div className="relative w-full h-full flex items-center border border-[#999999] px-4 justify-between gap-3 search-container  ">
                        {/* <div className="flex w-full gap-3 items-center border border-[red]"> */}
                          <div><FlatIcon className={"flaticon-camera  text-xl text-[#999999]"} /></div>
                          <input
                            type="text"
                            placeholder="What are you Looking for"
                            name=""
                            id=""
                            value={searchQuery}
                            className="py-3 px-4  w-full outline-none focus:border-none  "
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              // console.log(searchQuery,"searchQuery from input field");
                              // searchResultsHandler(searchQuery)
                              
                            }}
                          />
                          <div><FlatIcon className={"flaticon-search  text-xl text-[#999999]"} /></div>
                          {/* code before change start */}
                          {/* <Link
                            href={`/search?q=${searchQuery}`}
                            onClick={() => {
                              // setSearchedProducts([]);
                            }}
                          >
                            <button className="bg-black text-white px-4 py-3 rounded-tr-lg rounded-br-lg">
                              Search
                            </button>
                          </Link> */}
                           {/* code before change end */}
                        {/* </div> */}
                        {
                          searchedProducts.length !== 0 &&
                          pathname !== "/search" && (
                            <div className="absolute top-full left-0 rounded-lg shadow-md bg-white w-full lg:min-h-[100px] lg:max-h-[500px] overflow-y-auto  px-4 flex flex-col py-4 gap-3  ">
                              {/* <div> */}
                              {searchedProducts?.map((prod, idx) => {
                                return (
                                  // <Link
                                  //   key={idx}
                                  //   href={`/product/${prod?.slug?.name}`}
                                  // >
                                    <div className=" flex justify-between items-center  border-t-gray-300  border-t py-4 " key={idx}>
                                      <div className=" flex w-[100%] gap-x-3 ">
                                        <div className="w-[40%] h-[80px] border border-gray-600"></div>
                                        <div className="flex flex-col gap-y-1.5 w-[60%]">
                                        <h1 className="xl:text-sm text-xs font-medium truncate">{prod?.prodName}</h1>
                                    <h4 className="text-gray-500  text-xs font-medium"><span>1.3lb</span>/<span>vanilla</span></h4>
                                    {/* <div className=" font-bold text-xl"> <span>AED 150.00</span> <span className="text-sm text-gray-500">200 AED</span></div> */}
                                    <div className="flex lg:flex-row flex-col lg:items-center gap-x-2 font-bold xl:text-base text-sm truncate"> <h1>AED 150.00</h1><h3 className="text-sm text-gray-500 font-medium">200 AED</h3></div>
                                        </div>
                                      </div>
                                      <div className="w-[20%] flex justify-end">
                                      <div 
                                      onClick={()=>{
                                        addItemToCart(prod)
                                      }}
                                      className=" shadow-lg  rounded-md h-[30px] w-[30px]  text-lg text-gray-500 flex justify-center items-center cursor-pointer">+</div>
                                      </div>
                                    </div>
                                  // </Link>
                                );
                              })}
                              {/* </div> */}
                            </div>
                          )}
                          {/* {searchQuery&&<SearchResults/>} */}
                      </div>
                    </Transition.Child>
                  </Transition>
                  </div>
                  {/* // ) : ( */}
                  <div className=" w-[30%] flex justify-center">
                  
                  <Link href={"/"}>
                      <Image
                        src={logo}
                        alt=""
                        className=" "
                        width={1000}
                        height={1000}
                        style={{
                          aspectRatio: "auto",
                          width: "150px",
                          height: "auto",
                        }}
                      />
                    </Link>
                  </div>
                  {/* </div> */}

                  {/* {isSearchOpen || (
                    
                  )} */}
                
                <div className="flex items-center justify-end gap-7  w-[30%]">
                  {/* <Link href={"/search"}> */}
                  {/* seach icon and logic start  */}
                  {/* <div
                    className="flex items-center gap-2 cursor-pointer border border-primary"
                    onClick={() => {
                      setIsSearchOpen((val) => {
                        return !val;
                      });
                      if (!isSearchOpen) {
                        setIsLogoVisible(false);
                      } else {
                        setTimeout(() => {
                          setIsLogoVisible(true);
                        }, 300);
                      }
                    }}
                  >
                    <FlatIcon className={"flaticon-search text-xl"} />
                    <h3>Search...</h3>
                  </div> */}
                   {/* seach icon and logic end  */}
                  {/* </Link> */}
                
                  {cookie?.value ? (
                    <div className="flex items-center  gap-1 cursor-pointer">
                      <FlatIcon icon={"flaticon-user-fill text-2xl"} />
                      {(userData && userData?.name) || "User"}
                    </div>
                  ) : (
                    <Link href={"/login"} className="flex items-center  gap-2 cursor-pointer">
                      <FlatIcon icon={"flaticon-user text-xl"} />
                      <h3>Login</h3>
                    </Link>
                  )}
                  <div className="cursor-pointer"><FlatIcon icon={"flaticon-heart-fill text-2xl"} /></div>
                  {/* <div><FlatIcon icon={"flaticon-bag-fill text-xl"} /></div> */}
        
                    <Link href={"/cart"} className="flex items-center  gap-2 cursor-pointer">
                    <FlatIcon icon={"flaticon-bag-fill text-2xl"} />
                    {/* <h3>My Cart</h3> */}
                  </Link>
                </div>
              </div>
              </div>
            </div>
            <Categories />
            <Modal
              isOpen={isPrescriptionUpload}
              setOpen={setIsPrescriptionUpload}
            >
              <div className="bg-white">Prescription</div>
            </Modal>
          </div>
        </>
      )}
      {/* {!matches2 && <Categories />} */}
    </>
  );
};

export default NavbarClient;
