"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"



export default function AddressForm() {

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let token = useSelector((store) => store.user.token)
  let userId = useSelector((store) => store.user.user.id)
  let [billingFormVal, setBillingFormVal] = useState({
    billingName: "",
    billingEmail: "",
    billingMobile: "",
    billingAddress: "",
    country: "",
    state: "",
    city: "",
  })

  let [shippingFormVal, setShippingFormVal] = useState({
    shippingName: "",
    shippingEmail: "",
    shippingMobile: "",
    shippingAddress: "",
    shippingCountry: "",
    shippingState: "",
    shippingCity: ""
  })

   let getValAndSetValBilling = (e) => {
        let obj = { ...billingFormVal }
        let inputName = e.target.name
        let inputVal = e.target.value
        obj[inputName] = inputVal
        setBillingFormVal(obj)
    }

    let getValAndSetValShipping = (e) => {
        let obj = { ...shippingFormVal }
        let inputName = e.target.name
        let inputVal = e.target.value
        obj[inputName] = inputVal
        setShippingFormVal(obj)
    }

  let saveBillingAddress = (e) => {
    e.preventDefault()
    axios.post(`${apiBaseUrl}user/save-Profile-billing`, billingFormVal, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((resApi) => resApi.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 1) {
          toast.success(finalData.msg)
        }
      })
  }

  let saveShippingAddress = (e) => {
    e.preventDefault()
    axios.post(`${apiBaseUrl}user/save-Profile-shipping`, shippingFormVal, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((resApi) => resApi.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 1) {
          toast.success(finalData.msg)
        }
      })
  }

   useEffect(() => {
        if (userId) {
            axios.post(`${apiBaseUrl}user/profile-view`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    let { billingAddrerss, shippingAddress } = finalData.data;
                    setBillingFormVal(billingAddrerss)
                    setShippingFormVal(shippingAddress)
                })
        }

    }, [userId])

 console.log(userId)

  return (
    <div className="p-4">
      <ToastContainer/>
      <h3 className="text-xl font-semibold mb-4">
        Address Details
      </h3>

      <div className="bg-white border rounded-lg p-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* BILLING ADDRESS */}
          <div>
            <h4 className="text-md font-semibold mb-4 border-b pb-2">
              Billing Address
            </h4>

            <form className="space-y-4" onSubmit={saveBillingAddress}>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Billing Name
                </label>
                <input
                  type="text"
                  placeholder="Enter billing name"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='billingName'
                  value={billingFormVal.billingName}
                  onChange={getValAndSetValBilling}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Billing Email
                </label>
                <input
                  type="email"
                  placeholder="Enter billing email"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='billingEmail'
                  value={billingFormVal.billingEmail}
                  onChange={getValAndSetValBilling}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Billing Mobile
                </label>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='billingMobile'
                  value={billingFormVal.billingMobile}
                  onChange={getValAndSetValBilling}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Billing Address
                </label>
                <input
                  type="text"
                  placeholder="House no, street, area"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='billingAddress'
                  onChange={getValAndSetValBilling}
                  value={billingFormVal.billingAddress}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type='text'
                  placeholder="Enter country"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none max-h-40 overflow-y-auto"
                  name='country'
                  value={billingFormVal.country}
                  onChange={getValAndSetValBilling}
                />
                 
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter state"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='state'
                  value={billingFormVal.state}
                  onChange={getValAndSetValBilling}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='city'
                  value={billingFormVal.city}
                  onChange={getValAndSetValBilling}
                />
              </div>

              <div className="mt-6 text-right">
                <button className="bg-[#C09578] text-black px-6 py-2 rounded-md font-medium hover:opacity-90">
                  Update Address
                </button>
              </div>

            </form>
          </div>

          {/* SHIPPING ADDRESS */}
          <div>
            <h4 className="text-md font-semibold mb-4 border-b pb-2">
              Shipping Address
            </h4>

            <form className="space-y-4" onSubmit={saveShippingAddress}>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Shipping Name
                </label>
                <input
                  type="text"
                  placeholder="Enter shipping name"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='shippingName'
                  value={shippingFormVal.shippingName}
                  onChange={getValAndSetValShipping}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Shipping Email
                </label>
                <input
                  type="email"
                  placeholder="Enter shipping email"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='shippingEmail'
                  value={shippingFormVal.shippingEmail}
                  onChange={getValAndSetValShipping}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Shipping Mobile
                </label>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='shippingMobile'
                  value={shippingFormVal.shippingMobile}
                  onChange={getValAndSetValShipping}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  placeholder="House no, street, area"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='shippingAddress'
                  value={shippingFormVal.shippingAddress}
                  onChange={getValAndSetValShipping}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  placeholder="Enter country"
                  type='text'
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none max-h-40 overflow-y-auto"
                  name='shippingCountry'
                  value={shippingFormVal.shippingCountry}
                  onChange={getValAndSetValShipping}
                />
                 
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter state"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='shippingState'
                  value={shippingFormVal.shippingState}
                  onChange={getValAndSetValShipping}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#C09578] outline-none"
                  name='shippingCity'
                  value={shippingFormVal.shippingCity}
                  onChange={getValAndSetValShipping}
                />
              </div>

              <div className="mt-6 text-right">
                <button className="bg-[#C09578] text-black px-6 py-2 rounded-md font-medium hover:opacity-90">
                  Update Address
                </button>
              </div>

            </form>
          </div>

        </div>




      </div>
    </div>
  );
}



