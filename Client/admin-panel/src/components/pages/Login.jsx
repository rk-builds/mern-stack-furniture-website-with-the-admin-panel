import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { LoginContext } from '../../context/mainContext'


export default function Login() {

  let { id, setId } = useContext(LoginContext)

  const [error, seterror] = useState('')

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let navigate = useNavigate()
  let login = (e) => {
    e.preventDefault()
    let formValue = new FormData(e.target)
    axios.post(`${apiBaseUrl}admin-auth/login`, formValue)
      .then((apiRes) => apiRes.data)
      .then((finalRes) => {
        if (finalRes.status == 0) {
          seterror(finalRes.msg)
          e.target.reset()
        } else {
          console.log(finalRes);
          toast.success(finalRes.msg)
          setId(finalRes.admin._id)

        }
      })
  }

  useEffect(()=>{
   if(id && id !== ''){
    navigate('/Dashboard')
   }
  },[id])
  return (


    <section className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="mb-3">
          <img className="w-50 h-30 mr-2" src="/images/logo.svg" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow-lg dark:border lg:max-w-[580px] md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

            {error != '' && <span className='text-red-600'>{error}</span>}

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-3 md:space-y-4" action="#" onSubmit={login}>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-[#E8F0FE] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-[#E8F0FE] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

              <button type="submit" className="w-full text-white bg-[blue] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}
