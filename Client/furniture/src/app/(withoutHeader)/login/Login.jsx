"use client"
import { userData } from '@/app/redux/slice/userSlice'
import axios from 'axios'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '@/config/fireBaseConfig'





export default function Login() {

  const provider = new GoogleAuthProvider();//google login firebase

  const auth = getAuth(app); // google auth ,app is exported by fireBaseConfig

  const router = useRouter();

  let loginuser = useSelector((store) => store.user.user)
  console.log(loginuser);

  let dispatch = useDispatch()
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

  let [formValue, setFormValue] = useState({
    userEmail: '',
    password: '',
  })

  let getValSetVal = (e) => {
    let obj = { ...formValue }
    obj[e.target.name] = e.target.value
    setFormValue(obj)
  }

  let userLogin = (e) => {

    e.preventDefault()

    axios.post(`${apiBaseUrl}user/login`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        let userObj = {
          id: finalRes.user._id,
          userName: finalRes.user.userName
        }
        console.log(userObj);
        dispatch(userData({ user: userObj }))





      }).catch((err) => {
        console.log(err)
      })


  }

  useEffect(() => {
    if (loginuser) {
      router.push("/my-dashboard");
    }
  }, [loginuser])

  let googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)

        // ...

        let obj = {
          userEmail: user.email,
          userName: user.displayName,
          userPhone: "",
          userPassword: ""
        }

        axios.post(`${apiBaseUrl}user/google-login`, obj)
          .then((apiRes) => apiRes.data)
          .then((finalData) => {
            console.log(finalData);
            let { _id, userName } = (finalData.data);
            let userObj = {
              id: _id,
              username: userName
            }
            dispatch(userData({ user: userObj, token: finalData.token }))
          })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to continue shopping furniture
        </p>

        {/* Form */}
        <form onSubmit={userLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              onChange={getValSetVal}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={getValSetVal}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <a href="#" className="text-amber-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 border rounded-lg hover:bg-gray-100 transition"
          onClick={googleLogin}
        >
          <img
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
            alt="Google"
            className="h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-amber-600 font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

//   return (
//     <>
//       <div>
//         <div className="flex items-center justify-center w-full lg:p-12h-screen  max-w-[full] border-1 bg-body bg-success">
//           <div className="flex items-center xl:p-10 bg-success">
//             <form className="flex flex-col w-full h-full pb-6 p-5 text-center bg-white rounded-3xl form-control shadow-xl" action='' onSubmit={userLogin} >
//               <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
//               <p className="mb-4 text-grey-700">Enter your email and password</p>
//               <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-gray-300 border-1 hover:bg-gray-400 focus:ring-4 focus:ring-grey-300">
//                 <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="" />
//                 Sign in with Google
//               </a>
//               <div className="flex items-center mb-3">
//                 <hr className="h-0 border-b border-solid border-grey-500 grow" />
//                 <p className="mx-4 text-grey-600">or</p>
//                 <hr className="h-0 border-b border-solid border-grey-500 grow" />
//               </div>
//               <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
//               <input  onChange={getValSetVal}  name='userEmail' type="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-1" />
//               <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
//               <input  onChange={getValSetVal} name="password" type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-1" />
//               <div className="flex flex-row justify-between mb-8">
//                 <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
//                   <input type="checkbox" value="" className="" />
//                   <div
//                     className="w-5 h-5 bg-white rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
//                     <img className="" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png" alt="tick" />
//                   </div>
//                   <span className="ml-3 text-sm font-normal text-grey-900">Keep me logged in</span>
//                 </label>
//                 <a href="javascript:void(0)" className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</a>
//               </div>
//               <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-black transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Sign In</button>
//               <p className="text-sm leading-relaxed text-grey-900">Not registered yet? <Link href={'/register'} className="font-bold text-grey-700">Create an Account</Link></p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
