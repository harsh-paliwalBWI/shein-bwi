// import React from 'react'

// const SideMenuLogin = () => {
//   return (
//     <div>SideMenuLogin</div>
//   )
// }

// export default SideMenuLogin

"use client";
import React, { useState, useEffect, FC } from "react";
import { auth, db } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import logo from "../../images/Frame 34284.svg";
import { useRouter, usePathname } from "next/navigation";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../../redux/slices/loginModalSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import FlatIcon from "../flatIcon/flatIcon";
import { useMediaQuery } from "@mui/material";

function SideMenuLogin({ isOpen, onClose, setShowLogin }) {
  const [email, setEmail] = useState<any>("");
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const queryClient = useQueryClient();
  const [time, setTime] = useState(60);
  const [OTP, setOTP] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [otpSent, setOTPSent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(true);
  const pathName = usePathname();
  const matches = useMediaQuery("(max-width:767px)");
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
  });

  const router = useRouter();

  // useEffect(() => {
  //     document.getElementById("otp1")?.focus();
  //   }, [OTPModal]);

  // const addUserToFirebase = async (user: any) => {
  //   // console.log(
  //   //   {phoneNo: "",createdAt: new Date(),active: true,lastAccessAt: new Date(),role: "user",name: name, email: email,dP: "assets/img/user-pic.gif",setFromUI: true, wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} }
  //   //   }
  //   // );
  //   try {
  //     await setDoc(
  //       doc(db, "users", user.uid),
  //       { phoneNo: phone, createdAt: new Date(), active: true, lastAccessAt: new Date(), role: "user", name: name, email: email, dP: "", setFromUI: true, wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} } }
  //     );
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      if (timerStarted) {
        if (time === 1) {
          setTimerStarted(false);
          confirmOTP();
        }
        setTime((t) => t - 1);
      }
    }, 1000);
  }, [time]);
  const startTimer = () => {
    setTimerStarted(true);
    setTime((t) => t - 1);
  };
  const signInUserWithPhoneNumber = async () => {
    try {
      // console.log("inside try");
      
      if (phoneNumber) {
        // console.log("inside if");
        setLoading(true);
        const recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response: any) => {
              // console.log(response);
            },
          }
        );
        // console.log("after recaptchaVerifier ");
        const formattedPhoneNumber = `+91${phoneNumber}`;
        // console.log(formattedPhoneNumber);
        
        await signInWithPhoneNumber(
          auth,
          formattedPhoneNumber,
          recaptchaVerifier
        )
          .then((confirmationResult) => {
            // console.log("inside then");
            // console.log("confirmationResult::::::::" ,confirmationResult );
            setOTPSent(confirmationResult);

            setLoading(false);
            startTimer();
          })
          .catch((error) => {
            console.log(error + "...please reload");
            setLoading(false);
          });
      } else {
        if (!phoneNumber)
          console.log("Please enter both name and phone number");
        setLoading(false);
      }
    } catch (error) {
      console.log("CATCH ERROR ", error);
    }
  };

  const confirmOTP = () => {
    try {
      // console.log("inside try");
      
      setTimerStarted(false);
      setVerifying(true);
      otpSent
        .confirm(OTP)
        .then(async (res: any) => {
          // console.log(res, "User");
          localStorage.setItem("auth", JSON.stringify(res.user.uid));
          if (res._tokenResponse.isNewUser) {

let newUser={ phoneNo: phoneNumber,
   createdAt: new Date(), 
   active: true,
    lastAccessAt: new Date(),
     role: "user",
      name: "",
       email: email,
        dP: "", 
        setFromUI: true,
         wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} }
         }

            // let user = {
            //   phoneNo: phoneNumber,
            //   createdAt: new Date(),
            //   active: true,
            //   lastAccessAt: new Date(),
            //   role: "user",
            //   name: "",
            //   email: email,
            //   dP: "assets/img/user-pic.gif",
            //   setFromUI: true,
            //   wallet: { balance: 0, cashback: 0, lastTransactions: {} },
            // };
            // console.log(newUser, "user info");
            await setDoc(doc(db, `users/${res.user.uid}`), newUser, {
              merge: true,
            });
          } else {
            // console.log("user already exist");
          }

          await axios.get(`/api/login?uid=${res.user.uid}`);
          setVerifying(false);
          queryClient.invalidateQueries({ queryKey: ["userData"] });
          queryClient.refetchQueries({ queryKey: ["userData"] });
          router.replace(pathName);
          dispatch(closeLoginModal());
          document.body.classList.remove("no-scroll");
          setTime(60);
          setOTP("");
          setTimerStarted(false);
          setOTPSent(null);
          setLoading(false);
        })
        .catch((err: any) => {
          console.log("Incorrect OTP! Sign in failed!");
        });
    } catch (err) {
      console.log("error ", err);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50">
      <div
        className={`fixed  ${matches?"left-0":"right-0"} top-0 h-[100vh] z-30 sm:w-[67vh]  w-full bg-white transform md:rounded-none rounded-tr-md${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform ease-in-out duration-700`}
      >
        <div className="flex items-center justify-end p-4">
          <div
            className="  bg-[#F6F3FA] rounded-full p-3"
            onClick={onClose}
          >
            <FlatIcon className="text-gray-600 cursor-pointer flaticon-close md:text-sm text-xs " />
          </div>
        </div>
        <div className="p-4 flex flex-col items-center justify-center h-[85%] ">
          <Image
            src={logo}
            alt=""
            width={1000}
            height={1000}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            className="md:w-[200px] w-[150px] h-auto"
          />
          {/* <div className="font-bold sm:text-3xl text-xl mb-[30px]">Log In</div> */}
          <div className="text-[#777777] md:text-lg sm:text-base text-sm my-[30px]">
            Login with your Phone Number.
          </div>

          {/* code for login with phone number start  */}
          {showPhoneNumberInput && ( // Conditionally render phone number input and login button
            <div className="mb-[20px] w-[90%] mobile-container">
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full px-[20px] md:py-[15px] py-2  mb-[15px] outline-0 border border-gray-300 "
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  // console.log(e.target.value);
                }}
              />

              <div
                onClick={async () => {
                  await signInUserWithPhoneNumber();
                  setPhoneNumber("");
                  setShowPhoneNumberInput(false); // Hide phone number input and login button
                }}
                className="text-center bg-primary w-full md:py-[15px] py-2 md:text-base text-sm  text-[white] cursor-pointer "
              >
                {loading ? "Sending Otp..." : "Log in"}
              </div>
              <div id="recaptcha-container"></div>
            </div>
          )}

          {!showPhoneNumberInput && ( // Conditionally render OTP input and verify OTP button
            <div className="mb-[20px] w-[90%] otp-container">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-[20px] md:py-[15px] py-2 mb-[15px] outline-0 border border-gray-300 "
                id="otp"
                value={OTP}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setOTP(inputValue);
                }}
              />
              <div
                onClick={() => confirmOTP()}
                className="text-center bg-primary w-full md:py-[15px] py-2 md:text-base text-sm  text-[white] cursor-pointer"
              >
                {verifying ? "Verifying Otp" : "Proceed"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideMenuLogin;
