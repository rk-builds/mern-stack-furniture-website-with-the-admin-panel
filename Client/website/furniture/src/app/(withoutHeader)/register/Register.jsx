"use client"
import Link from "next/link";
import React, { useState } from "react";
import Login from "../login/Login";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";


export default function Register() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  console.log(apiBaseUrl)

  const [step, setStep] = useState("register"); // register | otp
  // const [loading, setLoading] = useState(false);

  let [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
    phone: '',
    password: '',
    otp: ''
  })

  console.log(userData)
  let getValSetVal = (e) => {
    let obj = { ...userData }
    obj[e.target.name] = e.target.value
    setUserData(obj)
  }

  let saveUser = (e) => {
    e.preventDefault()
    //  setLoading(true)
    //  console.log(userData)
    axios.post(`${apiBaseUrl}user/send-otp`, userData)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
        // e.target.reset()
        setStep("otp")



      }).catch((err)=>{
          console.log(err)
      })
         
      
  }


   let createUser = (e) => {
    
    axios.post(`${apiBaseUrl}user/create`,userData)
    .then((res)=>res.data)
    .then((finalRes)=>{
          console.log(finalRes);

          
          

       if(finalRes.status){
        toast.success('user account created successfully')
        redirect('/login')

       }else{
          toast.error(finalRes.msg)
       }
          

    }).catch((err)=>{

    })
  }



  return (
    <>
      {step === "register" && (
        <div className="container mx-auto">
          <ToastContainer/>
          <div className="flex justify-center items-center h-screen px-6">
            {/* Row */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg rounded-lg overflow-hidden">
              {/* Left Side Image */}
              <div
                className="hidden lg:block lg:w-5/12 bg-cover"
                style={{
                  backgroundImage: "url('/img/imgi_10_1620077669499Erica Bookshelfs_brown.jpg')",
                }}
              ></div>

              {/* Right Side Form */}
              <div className="w-full lg:w-7/12 bg-white p-8">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                  {step === "register" ? "Create an Account" : "Verify OTP"}
                </h3>

                <form className="bg-white rounded" onSubmit={saveUser}>
                  {/* Username */}
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700"
                      htmlFor="userName"
                    >
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="userName"
                      type="text"
                      placeholder="Enter your username"
                      value={userData.userName}
                      onChange={getValSetVal}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700"
                      htmlFor="userEmail"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="email"
                      name="userEmail"
                      placeholder="Enter your email"
                      onChange={getValSetVal}
                      value={userData.userEmail}
                    />
                  </div>

                  {/* Password + Confirm Password */}
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0 w-full">
                      <label
                        className="block mb-2 text-sm font-semibold text-gray-700"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        onChange={getValSetVal}
                        value={userData.phone}
                      />
                    </div>

                    <div className="md:ml-2 w-full">
                      <label
                        className="block mb-2 text-sm font-semibold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="password"
                        type="password"
                        placeholder="********"
                        onChange={getValSetVal}
                        value={userData.password}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      type="submit"

                    >
                      Register Account
                    </button>
                  </div>

                  <hr className="mb-6 border-t" />

                  {/* Links */}
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 hover:text-blue-700"
                      href="#"
                    >
                      {/* Forgot Password? */}
                    </a>
                  </div>



                  <div className="text-center mt-2">

                    Already have an account? <Link href={'/login'} className="text-blue-700"> Login! </Link>

                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "otp" && (
        <div className="flex justify-center mt-10 animate-slideDown">

          <div className="w-full max-w-[520px] bg-white p-8 rounded-2xl shadow-xl border">

            <h4 className="text-2xl font-semibold text-gray-800 text-center mb-2">
              OTP Verification
            </h4>

            <p className="text-sm text-gray-500 text-center mb-6">
              We’ve sent a 6-digit verification code to your registered email / phone.
            </p>

            <input
              type="text"
              name="otp"
              maxLength={6}
              placeholder="Enter OTP"
              value={userData.otp}
              onChange={getValSetVal}
              className="w-full text-center tracking-widest text-xl px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              className="w-full mt-6 py-3 text-white font-semibold rounded-full bg-blue-600 hover:bg-blue-700 transition"
              onClick={createUser}
            >
              Verify & Continue
            </button>

            <div className="text-center mt-4">
              <p className="text-xs text-gray-400">
                Didn’t receive the code?
              </p>
              <button className="text-sm text-blue-600 hover:underline mt-1">
                Resend OTP
              </button>
            </div>

          </div>
        </div>
      )}

    </>



  );
}
