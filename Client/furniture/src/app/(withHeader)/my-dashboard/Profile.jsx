"use client";
import React, { useState } from 'react'
import { useSelector } from 'react-redux';



export default function Profile() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let token = useSelector((store) => store.user.token)
  let userId = useSelector((store) => store.user.user.id)

  let[profileData,setProfileData]=useState({
    name:'',
    email:'',
    mobile_number:'',
    address:'',
    title:''
  })

  let saveProfile=(e)=>{
     e.preventDefault()
  }

  return (
    <div className="w-full p-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white border rounded-lg shadow-sm p-6">

        <h3 className="text-xl font-semibold mb-4">
          My Profile
        </h3>

        <div className="profileError"></div>

        <form
          id="personal_information"
          autoComplete="off"
          noValidate
          className="space-y-4"
          onSubmit={saveProfile}
        >

          {/* TITLE RADIO */}
          <div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="title"
                  value="Mr."
                  defaultChecked
                  className="accent-[#C09578]"
                />
                Mr.
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="title"
                  value="Mrs."
                  className="accent-[#C09578]"
                />
                Mrs.
              </label>
            </div>
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded-md px-3 py-2 text-sm
                         focus:ring-1 focus:ring-[#C09578] outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email*
            </label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue=""
              readOnly
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100
                         focus:ring-1 focus:ring-[#C09578] outline-none"
            />
          </div>

          {/* MOBILE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number*
            </label>
            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              maxLength={15}
              placeholder="Enter mobile number"
              className="w-full border rounded-md px-3 py-2 text-sm
                         focus:ring-1 focus:ring-[#C09578] outline-none"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address*
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className="w-full border rounded-md px-3 py-2 text-sm
                         focus:ring-1 focus:ring-[#C09578] outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              id="updateInfo"
              className="w-full bg-[#C09578] text-black py-2 rounded-md
                         font-medium hover:opacity-90 transition"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

