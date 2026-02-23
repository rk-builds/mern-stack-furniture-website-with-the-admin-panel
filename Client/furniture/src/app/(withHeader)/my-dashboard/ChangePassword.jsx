"use client"
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"



export default function ChangePassword() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let token = useSelector((store) => store.user.token)

  let changePwd = (e) => {
    e.preventDefault()
    let obj = {
      cur_password: e.target.currentPassword.value,
      new_password: e.target.newPassword.value,
      cnf_password: e.target.confirmPassword.value,
    }

    axios.post(`${apiBaseUrl}user/change-password`, obj,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 0) {
          toast.error(finalData.msg)
        } else {
          toast.success(finalData.msg)
          e.target.reset()
        }
      })

  }
  return (


    <div className="w-full px-4 sm:px-6 py-6">
      <ToastContainer />

      <div className="max-w-md w-full mx-auto bg-white border rounded-lg shadow-sm p-5 sm:p-6">

        <h3 className="text-xl font-semibold mb-6 text-center sm:text-left">
          Change Password
        </h3>

        <div className="changePasswordError"></div>

        <form
          id="change_password"
          autoComplete="off"
          noValidate
          className="space-y-4"
          onSubmit={changePwd}
        >

          {/* CURRENT PASSWORD */}
          <div>
            <label
              htmlFor="current_password"
              className="block text-sm font-medium mb-1"
            >
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              id="currentpassword"
              placeholder="Enter current password"
              className="w-full border rounded-md px-3 py-2 text-sm
                     focus:ring-1 focus:ring-[#C09578] outline-none"
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newpassword"
              placeholder="Enter new password"
              className="w-full border rounded-md px-3 py-2 text-sm
                     focus:ring-1 focus:ring-[#C09578] outline-none"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-enter new password"
              className="w-full border rounded-md px-3 py-2 text-sm
                     focus:ring-1 focus:ring-[#C09578] outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              id="passwordUpdate"
              className="w-full bg-[#C09578] text-black py-2.5 rounded-md
                     font-medium hover:opacity-90 transition"
            >
              Change Password
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

