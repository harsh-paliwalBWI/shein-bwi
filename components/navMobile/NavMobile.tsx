"use client";
import React, { useState } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
// import logo from "../../images/logo.png";
import { usePathname } from "next/navigation";
// import logo from "../../images/logo.a2e454d6.svg"
import logo from "../../images/Frame 34284.svg";


const Navmobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const matches2 = useMediaQuery("(max-width:785px)");
  return (
    <div className={`text-center  ${matches2 ? "px-[5%]" : "px-[7%]"} `}>
      <div className="flex items-center justify-between py-[10px]">
        <div>
          <Image
            src={logo}
            alt=""
            height={1000}
            width={1000}
            style={{ aspectRatio: "auto", width: "100px", height: "auto" }}
          />
        </div>
        <div
          onClick={(prev) => {
            setIsMobile(true);
            document.body.classList.add("no-scroll");
          }}
        >
          Menu
        </div>
      </div>
      {isMobile && (
        <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50">
          <div
            className={` bg-[white]  sm:w-[50%] w-[100%] absolute top-0 left-0 h-screen z-50 rounded-tr-3xl rounded-br-3xl `}
          >
            <div
              onClick={() => {
                setIsMobile(false);
                document.body.classList.remove("no-scroll");
              }}
              className="absolute top-[20px] right-[20px]"
            >
              X
            </div>
            <div className="flex  flex-col items-start gap-2 font-medium px-[30px] ">
              <div className=" w-[150px]  mt-[30px] mb-[10px]  ">
                <Image src={logo} alt="" className="" />
              </div>
              <Link
                href={"/"}
                className={`${pathname === "/" && "text-primary"}  py-[5px]  `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Home
              </Link>
              <Link
                href={"/categories"}
                className={`${
                  pathname.includes("categories") && "text-primary"
                } flex items-center justify-center gap-2  py-[5px]   `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div>Categories</div>
                <div></div>
              </Link>
             
              {/* <div className=" py-[5px]   ">My Account</div> */}
              <Link
                href={"/cart"}
                className={`${
                  pathname.includes("cart") && "text-primary"
                } flex items-center justify-center gap-2  py-[5px]   `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div>Cart</div>
                <div></div>
              </Link>
              <Link
                href={"/login"}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
                className="text-primary  py-[5px]   "
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navmobile;
