"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState, useEffect } from "react";
import {
  addCartObjToUser,
  fetchSingleProduct,
} from "../../utils/databaseService";
import Image from "next/image";
import { constant } from "../../utils/constants";
import p1 from "../../images/p1.svg";
import p2 from "../../images/p2.svg";
import diamond from "../../images/diamond.svg";
import Hr from "../Hr/Hr";
import useOnScreen from "../../utils/visibleElement";
import { Transition } from "@headlessui/react";
import {
  addToCart,
  getCartObj,
  getPriceListCartObj,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { auth } from "../../config/firebase-config";
import { fetchSimilarProductsForCart } from "../../config/typesense";
import Modal from "../Modal/modal";
import Headersection from "../headersection/Headersection";
import img1 from "../../images/image 146.svg";
import img2 from "../../images/da1cd32c-33a4-48a2-9873-f45c918d31f5 1.svg";
import img3 from "../../images/image 147.svg";
import img4 from "../../images/Fedex-logo 1.svg";
import img5 from "../../images/pngkit_delivery-com-logo-png_5554386 1.svg";
import codImg from "../../images/image 148.svg";
import americanExpImg from "../../images/pngwing 1.svg";
import masterCardImg from "../../images/MasterCard_Logo 1.svg";
import visaImg from "../../images/visa 3.svg";
import gpayImg from "../../images/google-pay 1.svg";
import paytmImg from "../../images/Paytm-Logo 1.svg";
import paypalImg from "../../images/paypal 1.svg";
import discoverImg from "../../images/discover 1.svg";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import FlatIcon from "../flatIcon/flatIcon";
import firstImg from "../../images/6840240711_1_1_1 1.svg";
import secImg from "../../images/6840240711_2_1_1 2.svg";
import thirdImg from "../../images/6840240711_2_3_1 1.svg";
import fourImg from "../../images/6840240711_6_1_1 2.svg";
import fiveImg from "../../images/6840240711_6_2_1 1.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
const features = [
  " 10 in stock",
  " Easy Return Policy",
  " Quality Assured Products",
];

const pyamentModeImages = [
  { image: visaImg },
  { image: masterCardImg },
  { image: americanExpImg },
  { image: paypalImg },
  { image: discoverImg },
];

const ProductInfo = ({ params }: any) => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const dispatch: any = useDispatch();
  const [similarProductData, setSimilarProductData] = useState([]);
  const { data: product } = useQuery({
    queryKey: ["product", params?.slug],
    queryFn: () => fetchSingleProduct(params?.slug),
  });

  //   console.log(product, "product from single product---------->");
  //   console.log(product?.images, "images---------->");
  // console.log(product?.searchKeywords,"product?.searchKeywords");
  // console.log(params.slug,"params slug");

  const { data: similarData } = useQuery({
    queryKey: ["product", params?.slug, "similar-product"],
    queryFn: () =>
      fetchSimilarProductsForCart({ searchKeywords: product?.searchKeywords }),
  });
  // console.log(similarData,"similarData--------->");

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = product ? useOnScreen(ref) : false;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [quantity, setQuantity] = useState((product && product?.minQty) || 1);
  const [variant, setVariant] = useState(0);
  // const similarDataHandler=()=>{
  // if(similarData){
  //   setSimilarProductData(similarData)
  //   console.log(similarData,"similarDataHandler");
  // }
  // }
  //   useEffect(()=>{
  // similarDataHandler()
  //   },[similarProductData])

  function getImage(product: any, idx: number) {
    // console.log(product)
    // console.log("gggggggggg")
    if (product?.images && product?.images[idx]?.url) {
      return product?.images[idx]?.url;
    }
    return constant?.errImage;
  }
  async function addItemToCart() {
    let data: any = {
      product,
      productID: product?.id,
      quantity: quantity,
      index: variant,
      isPriceList: product?.isPriceList,
    };
    const cartObject = data.isPriceList
      ? getPriceListCartObj({
          product: product,
          quantity: quantity,
          index: data.index,
        })
      : getCartObj({
          product: product,
          productID: data?.productID,
          quantity: data?.quantity,
        });
    if (auth.currentUser) {
      const docId = await addCartObjToUser(cartObject);
      cartObject["id"] = docId;
    }
    dispatch(addToCart(cartObject));
  }

  function handleRemoveFromCart() {
    let data: any = {
      product,
      productID: product?.id,
      quantity: quantity,
      index: variant,
      isPriceList: product?.isPriceList,
    };
    dispatch(removeFromCart(data));
  }

  const [selectedTab, setSelectedTab] = useState("description");

  return (
    <>
      {!product && (
        <div className="grid place-items-center h-[70vh]">
          <h2 className="font-bold text-xl">Page Not Found</h2>
        </div>
      )}
      {product && (
        <div className="sm:pb-10 ">
          {/* <Headersection heading={product?.prodName} /> */}
          <div className="flex flex-col px-body   ">
            <div className="flex flex-col lg:flex-row gap-6 mt-10  ">
              <div className=" md:flex lg:flex-col md:flex-row   gap-4   hidden ">
                {/* {product && product?.images?.map((item: any, idx: number) => {
                  return <div key={idx} className=" ">
                    <Image
                      src={getImage(product, idx)}
                      alt={product?.prodName || ""}
                      className="w-full"
                      width={1000}
                      height={1000}
                      // style={{
                      //   maxWidth: "100%",
                      //   height: "auto",
                      // }}
                      style={{ width: "139px", height: "135px", aspectRatio: "auto" }}

                    />
                  </div>
                })} */}
                <div className="  w-[139px] h-[135px]  ">
                  <Image
                    src={secImg}
                    alt=""
                    className=" w-[139px] h-[135px] aspect-auto object-cover"
                    width={1000}
                    height={1000}
                    // style={{
                    //   maxWidth: "100%",
                    //   height: "auto",
                    // }}
                    // style={{ width: "139px", height: "135px", aspectRatio: "auto" }}
                  />
                </div>
                <div className="w-[139px] h-[135px]">
                  <Image
                    src={thirdImg}
                    alt=""
                    className="w-[139px] h-[135px] aspect-auto object-cover"
                    width={1000}
                    height={1000}
                    // style={{
                    //   maxWidth: "100%",
                    //   height: "auto",
                    // }}
                    // style={{width: "139px", height: "135px", aspectRatio: "auto" }}
                  />
                </div>
                <div className="   w-[139px] h-[135px]  ">
                  <Image
                    src={firstImg}
                    alt=""
                    className="w-[139px] h-[135px] aspect-auto object-cover"
                    width={1000}
                    height={1000}
                    // style={{
                    //   maxWidth: "100%",
                    //   height: "auto",
                    // }}
                    // style={{ width: "139px", height: "135px", aspectRatio: "auto" }}
                  />
                </div>
                <div className="  w-[139px] h-[135px]  ">
                  <Image
                    src={fourImg}
                    alt=""
                    className="w-[139px] h-[135px] aspect-auto object-cover"
                    width={1000}
                    height={1000}
                    // style={{
                    //   maxWidth: "100%",
                    //   height: "auto",
                    // }}
                    // style={{ width: "139px", height: "135px", aspectRatio: "auto" }}
                  />
                </div>
                <div className="  w-[139px] h-[135px]  ">
                  <Image
                    src={fiveImg}
                    alt=""
                    className="w-[139px] h-[135px] aspect-auto object-cover"
                    width={1000}
                    height={1000}
                    // style={{
                    //   maxWidth: "100%",
                    //   height: "auto",
                    // }}
                    // style={{ width: "139px", height: "135px", aspectRatio: "auto" }}
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col w-full  sm:gap-16 gap-6">
                <div className=" h-fit lg:w-[50%] w-[100%] flex lg:flex-col sm:flex-row flex-col sm:gap-7 gap-7  ">
                  <div className=" md:w-[100%]  sm:w-[50%] w-[100%] lg:h-[595px] sm:h-[300px] h-auto ">
                    <Image
                      // src={getImage(product, 0)}
                      src={secImg}
                      alt={product?.prodName || ""}
                      width={1000}
                      height={1000}
                      // style={{ width: "100%", height: "595px" }}
                      className="w-[100%]   object-cover lg:h-[595px] h-[300px]"
                    />
                  </div>
                  <div className=" md:w-[100%]  sm:w-[50%] w-[100%] lg:h-[595px]  sm:block hidden">
                    <Image
                      // src={getImage(product, 1)}
                      src={fourImg}
                      alt={product?.prodName || ""}
                      width={1000}
                      height={1000}
                      // style={{ width: "100%", height: "595px" }}
                      className="w-[100%]   object-cover lg:h-[595px] h-[300px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:w-[50%] w-[100%]   ">
                  <div className="flex items-center  sm:mb-3 mb-1">
                    <h2 className="md:text-xl text-lg   font-semibold leading-[35px] text-[#555555] ">
                      {product?.prodName}
                    </h2>
                  </div>
                  <div className="flex sm:flex-row flex-col gap-y-2  gap-x-4 sm:items-center ">
                    <h2 className=" md:text-2xl text-lg  sm:text-center text-start text-secondary font-bold  ">
                      {constant?.currency}{" "}
                      {parseFloat(product?.prodPrice).toFixed(2)}
                    </h2>
                    <div className="flex items-center gap-2 text-start ">
                      <div className="text-primary text-xl flex ">
                        {" "}
                        <FlatIcon
                          icon={
                            "flaticon-star text-[#FFBA07] font-normal text-xl"
                          }
                        />
                        <FlatIcon
                          icon={
                            "flaticon-star text-[#FFBA07] font-normal text-xl"
                          }
                        />
                        <FlatIcon
                          icon={
                            "flaticon-star text-[#FFBA07] font-normal text-xl"
                          }
                        />
                        <FlatIcon
                          icon={
                            "flaticon-star text-[#FFBA07] font-normal text-xl"
                          }
                        />
                        <FlatIcon
                          icon={
                            "flaticon-star text-[#FFBA07] font-normal text-xl"
                          }
                        />
                        {/* &#10027;&#10027;&#10027;&#10027;&#10027; */}
                        <span className="text-sm font-medium text-zinc-400">
                          (27)
                        </span>{" "}
                      </div>
                      <h4 className="text-[#777777] text-xs font-medium">
                        1.2k reviews
                      </h4>
                    </div>
                  </div>
                  <h6 className="text-xs text-[#777777] font-semibold  sm:my-6 my-4 ">
                    {/* {product?.prodDesc} */}
                    Strapless bustier. Front pocket. Frayed trims. Asymmetric
                    hem. Side metal zip fastening. Asymmetrical Beige frayed
                    Bustier.
                  </h6>
                  <div className="">
                    <h4 className="text-secondary sm:text-sm text-xs font-semibold mb-3 ">
                      COLOR : DARK OLIVE GREEN
                    </h4>
                    <div className="flex gap-3 sm:mb-8 mb-4">
                      {[1, 2, 4, 4].map((item: any, idx: number) => {
                        return (
                          <div
                            key={idx}
                            className="  border border-[#E6DBD7] p-1 rounded-full flex justify-center items-center"
                          >
                            <div className="h-[25px] w-[25px] rounded-full bg-black"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex items-center gap-6 sm:text-sm text-xs  font-semibold mb-3 ">
                      <div className="flex gap-1 items-center">
                        <h4 className="    ">SIZE : </h4>
                        <h4>S</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <div>
                          <FlatIcon
                            icon={
                              "flaticon-measure text-[#777777]  font-normal text-3xl"
                            }
                          />
                        </div>
                        <h4 className="underline ">Size Chart</h4>
                      </div>
                    </div>
                    <div className="flex gap-3 text-[#555555] text-sm font-semibold sm:mb-6 mb-4">
                      <div className="sm:px-4 px-3 sm:py-4 py-2 border border-secondary ">
                        <h2 className="sm:text-sm text-xs font-normal">XS</h2>
                      </div>
                      <div className="sm:px-4 px-3 sm:py-4 py-2 border border-secondary  ">
                        <h2 className="sm:text-sm text-xs font-normal">S</h2>
                      </div>
                      <div className="sm:px-4 px-3 sm:py-4 py-2   flex items-center gap-2   border border-[#C6C6C6]">
                        <h2 className="sm:text-sm text-xs font-normal">M</h2>
                        {/* <div>mail icon</div> */}
                      </div>
                      <div className="sm:px-4 px-3 sm:py-4 py-2  bg-secondary text-white">
                        <h2 className="sm:text-sm text-xs font-normal ">L</h2>
                      </div>
                    </div>
                    <h3 className="text-secondary sm:text-sm text-xs font-semibold mb-3 ">
                      QUANTITY :
                    </h3>
                    <div className="flex sm:items-center sm:flex-row flex-col gap-y-4 justify-between   sm:mb-10 mb-5 ">
                      <div className=" flex border border-[#C6C6C6]  w-fit  ">
                        <div
                          className=" text-[#CCCCCC] flex-[0.4] flex justify-center items-center text-lg font-bold cursor-pointer select-none px-3 py-3 "
                          onClick={() => {
                            setQuantity((val) => val - product?.minQty || 1);
                          }}
                        >
                          -
                        </div>

                        <div className="flex-1 flex justify-center items-center  px-10 py-3 bg-gray-200 border-r-[1px] border-r-[#C6C6C6] border-l-[1px] border-l-[#C6C6C6]">
                          <p className="">{quantity}</p>
                        </div>
                        <div
                          className=" flex-[0.4] text-[#CCCCCC]  flex justify-center items-center text-lg font-bold cursor-pointer select-none  px-3 py-3 "
                          onClick={() => {
                            setQuantity((val) => val + product?.minQty || 1);
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <p>
                          <FlatIcon icon={"flaticon-heart text-2xl"} />
                        </p>
                        <h3 className="text-secondary font-semibold sm:text-sm text-xs">
                          Add to Wishlist
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold  mb-3">
                      <div className="">
                        <FlatIcon icon={"flaticon-express-delivery text-2xl"} />
                      </div>
                      <h3 className="text-secondary sm:text-sm text-xs font-semibold  ">
                        WHEN WILL I RECIVE MY ORDER ?
                      </h3>
                    </div>
                    <div className="border border-[#E1E1E1] flex items-center justify-between p-2 gap-4  mb-6">
                      <input
                        type="text"
                        className=" py-1 w-full b"
                        placeholder="Enter your pincode"
                      />
                      <button className="bg-primary text-white sm:px-10 px-6 sm:py-3 py-2 sm:text-sm text-xs font-semibold">
                        Check
                      </button>
                    </div>
                    {/* old code start  */}
                    {/* <h2 className="text-xl   font-medium leading-[35px] mb-1">Flavour:</h2>
                <div className="flex gap-3">
                  <div className="px-8 py-3 bg-[#F7F7F7] w-fit">
                    <h2 className="text-sm font-normal">Vanila</h2>
                  </div>
                  <div className="px-8 py-3 bg-[#F7F7F7] w-fit">
                    <h2 className="text-sm font-normal">Strawberry</h2>
                  </div>
                  <div className="px-8 py-3 bg-[#F7F7F7] w-fit">
                    <h2 className="text-sm font-normal">Fruity Pebbles</h2>
                  </div>
                </div> */}
                    {/* old code end  */}
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* <div className="flex-1 lg:flex-none  flex border border-black p-px lg:w-[25%]">
                  <div
                    className="bg-gray-100 flex-[0.4] flex justify-center items-center text-lg font-bold cursor-pointer select-none"
                    onClick={() => {
                      setQuantity((val) => val - product?.minQty || 1);
                    }}
                  >
                    -
                  </div>

                  <div className="flex-1 flex justify-center items-center">
                    <p className="">{quantity}</p>
                  </div>
                  <div
                    className="bg-gray-100 flex-[0.4]  flex justify-center items-center text-lg font-bold cursor-pointer select-none"
                    onClick={() => {
                      setQuantity((val) => val + product?.minQty || 1);
                    }}
                  >
                    +
                  </div>
                </div> */}
                    <div className="flex justify-between">
                      {/* <h2 className="hidden lg:block text-2xl  text-center text-red-600 text-[22px] font-medium ">
                    {constant?.currency}{" "}
                    {parseFloat(product?.prodPrice).toFixed(2)}
                  </h2>
                  {product?.isPriceList && (
                    <div className=" hidden gap-2 lg:flex ">
                      {product?.priceList?.map((variant: any, idx: any) => {
                        return (
                          <div className="px-2 py-1 bg-gray-200" key={idx}>
                            <p>{variant?.weight} "PRICELIST CHECKS"</p>
                          </div>
                        );
                      })}
                    </div>
                  )} */}
                      {/* old code start  */}
                      {/* <div className="flex gap-2 align-items-center">
                    <Image
                    src={diamond}
                    alt=""
                    className=""
                    width={20}
                    height={20}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                    <h2 className=" text-neutral-950 text-lg font-medium leading-normal tracking-tight ">20 Calories Per Serving </h2></div> */}
                      {/* old code end  */}
                    </div>
                  </div>
                  {/* <h2 className="lg:hidden sm:text-2xl text-xl font-bold">
                    {constant?.currency}{" "}
                    {parseFloat(product?.prodPrice).toFixed(2)}
                  </h2> */}
                  <div
                    className="flex justify-between lg:flex w-full "
                    ref={ref}
                  >
                    {/* <div className=" w-full flex gap-x-3 text-xs font-bold">
                      <Link href={"/cart"} className="bg-[#EBEDF1] w-[50%] text-center py-4 cursor-pointer">
                      <div className="">
                        <button>ADD TO BAG</button>
                        </div>
                      </Link>
                      <div className="bg-secondary text-white w-[50%] text-center py-4 cursor-pointer"><button>BUY NOW</button></div>
                    </div> */}

                    {/* previous button with functionality start */}
                    {/* {isClient &&
                      cart?.filter((item) => item?.productId === product?.id)
                        .length == 0 && (
                        <div className="flex-1 lg:flex-none w-[48%] h-14 bg-black rounded-br-[10px] flex justify-center items-center py-2 border  cursor-pointer">
                          <button className="text-white text-lg font-normal">
                            "Add To Wishlist"
                          </button>
                        </div>
                      )} */}
                    <div className="w-full flex gap-3 ">
                      {isClient && (
                        <div
                          className="flex-1 lg:flex-none w-[48%]  sm:h-14 bg-[#EBEDF1] h-12  flex justify-center items-center py-2  cursor-pointer"
                          onClick={
                            cart?.filter(
                              (item) => item?.productId === product?.id
                            ).length !== 0
                              ? () => {
                                  handleRemoveFromCart();
                                }
                              : addItemToCart
                          }
                        >
                          <button className=" text-secondary font-medium  sm:text-lg text-base">
                            {cart?.filter(
                              (item) => item?.productId === product?.id
                            ).length !== 0
                              ? "Remove From Bag"
                              : "ADD TO BAG"}
                          </button>
                        </div>
                      )}

                      <div
                        className=" lg:flex w-[48%] flex-1  h-14 bg-black  hidden justify-center items-center py-2 cursor-pointer  "
                        // onClick={handleRemoveFromCart}
                      >
                        <button className="text-white font-bold">
                          Buy Now
                        </button>
                      </div>
                    </div>
                    {/* previous button with functionality end*/}
                  </div>
                  <h3 className="font-medium sm:text-sm text-xs my-5">
                    GUARANTEED SAFE CHECKOUT:
                  </h3>
                  <div className="flex items-center sm:flex-nowrap flex-wrap gap-6">
                    {pyamentModeImages.map((item: any, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className=" bg-[#f5f5f5ff] flex justify-center items-center px-3 py-2"
                        >
                          <Image
                            src={item.image}
                            alt=""
                            width={1000}
                            height={1000}
                            style={{
                              aspectRatio: "auto",
                              width: "40px",
                              height: "20px",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex items-center gap-2">
                      <div>
                        <FlatIcon icon={"flaticon-share text-xl"} />
                      </div>
                      <p>Share :</p>
                    </div>
                    <div className="flex items-center gap-x-6">
                      <div>
                        <FlatIcon icon={"flaticon-facebook text-xl"} />
                      </div>
                      <div>
                        <FlatIcon icon={"flaticon-twitter text-2xl"} />
                      </div>
                      <div>
                        <FlatIcon icon={"flaticon-instagram text-xl"} />
                      </div>
                      <div>
                        <FlatIcon icon={"flaticon-pinterest text-xl"} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-[#CCCCCC] h-[1px]"></div>
                  <div className=" y">
                    <div className="my-3 flex items-center justify-between">
                      <h2 className="font-medium sm:text-base  text-sm ">
                        Product Info
                      </h2>
                      <FlatIcon icon={"flaticon-plus text-secondary text-xs"} />
                    </div>
                    <p className="sm:text-sm text-xs  mb-7 mt-4">
                      A visually pleasing lilac colourway and flower-shaped
                      buckle take these crossover mules to greater style
                      heights. Between the rounded square-toes and chunky
                      platform soles, there is no shortage of details to admire
                      when it comes to this slip-and-go design. Style yours with
                      everything from cropped jeans to midi skirts.
                    </p>
                    <div>
                      <h3 className="font-medium sm:text-base  text-sm mb-1">
                        Material & Care
                      </h3>
                      <p className="sm:text-base text-xs">Dupion-Silk</p>
                      <p className="sm:text-base text-xs">Machine-Wash</p>
                    </div>
                  </div>
                  <div className="">
                    <h3 className="font-medium sm:text-base text-sm mt-3 ">
                      Specifications
                    </h3>
                    <div className="flex flex-col gap-y-5  md:w-[80%] w-[100%] mt-4 mb-8 ">
                      <div className="flex items-center justify-between ">
                        <div>
                          <h3 className="font-medium sm:text-sm text-xs mb-1">
                            Type
                          </h3>
                          <p className="text-[#555555] sm:text-sm text-xs">
                            Top
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium  sm:text-sm text-xs mb-1">
                            Pattern
                          </h3>
                          <p className="text-[#555555] sm:text-sm text-xs">
                            {" "}
                            Adjustable Strap
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium sm:text-sm text-xs mb-1">
                            Material
                          </h3>
                          <p className="text-[#555555] sm:text-sm text-xs">
                            Elastane
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium  sm:text-sm text-xs mb-1">
                            Color
                          </h3>
                          <p className="text-[#555555] sm:text-sm text-xs">
                            Breathable Lining
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-[#CCCCCC] h-[1px]"></div>
                  <div className="flex items-center justify-between sm:text-base font-medium text-xs  my-5 text-gray-400">
                    <h3>Reviews & Ratings</h3>
                    <FlatIcon icon={"flaticon-plus text-[#999999] text-xs"} />
                  </div>
                  <div className="w-full bg-[#CCCCCC] h-[1px]"></div>
                  <div className="flex items-center sm:text-base font-medium text-xs   my-5 justify-between text-gray-400">
                    <h3>Reviews & Ratings</h3>
                    <FlatIcon icon={"flaticon-plus text-[#999999] text-xs"} />
                  </div>
                  <div className="w-full bg-[#CCCCCC] h-[1px]"></div>

                  {/* old code start  */}
                  {/* <div className="flex gap-2 flex-col">
                {features.map((feature, index) => (
                  <div className='text-black text-sm font-semibold leading-normal tracking-tight' key={index}> icon {feature}</div>
                ))}
              </div> */}

                  {/* <div className=" h-2 relative w-full ">
                <div className="absolute top-0 left-0 w-1/3 h-full border-t-[4px] border-[#EA1F27]"></div>
                <div className="absolute top-0 right-0 w-2/3 h-full border-t-[4px] border-[#ebebeb]"></div>
              </div> */}
                  {/* old code end  */}
                </div>
              </div>
            </div>
            {/* old code start  */}
            {/* <div className="border border-primary ">
              <div className="flex flex-col gap-[2rem] ">
                <div className="flex justify-between">
                  <div
                    className={`font-medium text-xl md:text-2xl leading-tight  ${
                      selectedTab === "description"
                        ? "text-red-600 underline underline-offset-4"
                        : "text-[#555555]"
                    }`}
                    onClick={() => setSelectedTab("description")}
                  >
                    Description
                  </div>
                  <div
                    className={`font-medium text-xl md:text-2xl leading-tight  ${
                      selectedTab === "additionalInfo"
                        ? "text-red-600 underline underline-offset-4"
                        : "text-[#555555]"
                    }`}
                    onClick={() => setSelectedTab("additionalInfo")}
                  >
                    Additional Information
                  </div>
                  <div
                    className={`font-medium text-xl md:text-2xl leading-tight  ${
                      selectedTab === "review"
                        ? "text-red-600 underline underline-offset-4"
                        : "text-[#555555]"
                    }`}
                    onClick={() => setSelectedTab("review")}
                  >
                    Review
                  </div>
                </div>
                <div className="text-sm font-normal leading-[27px] mt-2 md:mt-4">
                  {selectedTab === "description" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.prodDesc }}
                    />
                  )}
                  {selectedTab === "additionalInfo" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.prodaddinfo }}
                    />
                  )}
                  {selectedTab === "review" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.prodreview }}
                    />
                  )}
                </div>
              </div>
            </div> */}
            {/* old code end  */}
            <div className=" w-full h-[1px] border-b border-b-[#CCCCCC] border-dashed md:my-20 my-10"></div>
          </div>
          <div>
            <SimilarProducts
              heading={"SIMILAR PRODUCTS"}
              similarProductData={similarData}
              from="info"
            />
          </div>
          <div>
            <SimilarProducts
              heading={"RECENTLY VIEWED"}
              similarProductData={similarData}
              from="info"
            />
          </div>
          {/* old code start  */}
          {/* <Transition
            show={!isVisible}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="lg:hidden"
          >
            <div className="fixed bottom-0 w-full bg-white py-2 px-body">
              <div className="flex gap-2">
                <div className="flex-1 flex border border-black p-px">
                  <div className="bg-gray-100 flex-[0.4] flex justify-center items-center text-lg font-bold">
                    -
                  </div>
                  <div className="flex-1 flex justify-center items-center">
                    <p className="">{quantity}</p>
                  </div>
                  <div className="bg-gray-100 flex-[0.4] flex justify-center items-center text-lg font-bold">
                    +
                  </div>
                </div>
                <div
                  className="flex-1 bg-highlight flex justify-center items-center py-2 border border-[#a9e1fc]"
                  onClick={addItemToCart}
                >
                  <button className="text-white font-bold">Add To Cart</button>
                </div>
              </div>
            </div>
          </Transition> */}
          {/* old code end  */}
        </div>
      )}
    </>
  );
};
export default ProductInfo;
