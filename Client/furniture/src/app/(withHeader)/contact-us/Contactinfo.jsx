"use client"
// import React from 'react'
import { FaFax } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa"
import { FaPhone } from "react-icons/fa6"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"



export default function Contactinfo() {

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let [adminData, setAdminData] = useState({})
  let [btnLoading, setBtnLoading] = useState(false)
  let [formVal, setFormVal] = useState(
    {
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: ""
    }
  )

  let saveContact = (e) => {
    e.preventDefault()
    setBtnLoading(true)
    axios.post(`${apiBaseUrl}user/contact-save`, formVal)
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 1) {
          toast.success(finalData.msg)
          setFormVal({
            name: "",
            email: "",
            mobile: "",
            subject: "",
            message: ""
          })
          setBtnLoading(false)
        }
      })

  }

  let getValSetVal = (e) => {
    let obj = { ...formVal }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setFormVal(obj)
  }

  // let getAdminData = () => {
  //   axios.get(`${apiBaseUrl}user/admin-contact-detail`)
  //     .then((apiRes) => apiRes.data)
  //     .then((finalData) => {
  //       setAdminData(finalData.data);
  //     })
  // }

  useEffect(() => {
    // getAdminData()
  }, [])

  return (
    <>
      <section className='grid max-w-[1170px] lg:grid-cols-[45%_auto] mx-auto md:grid-cols-1 py-[50px]'>
        <div className=''>
          <div className="">
            <h3 className='font-bold text-[18px]'>Contact Us</h3>

            <ul>
              <li className='flex gap-5 text-[14px] text-gray-700 py-3'><FaFax /> Address : Claritas est etiam processus dynamicus</li>
              <li className='flex gap-5 text-[14px] text-gray-700 py-3'><FaPhone /> 98745612330</li>
              <li className='flex gap-5 text-[14px] text-gray-700 py-3'><FaEnvelope /> furnitureinfo@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className=''>
          <div className="">
            <h3 className='font-bold text-[18px]'>Tell us your question</h3>
            <form method="" action="" id="contact-form" onSubmit={saveContact}>
              <input name="_token" type="hidden" value="" />
              <div className="py-3">
                <label className='font-bold d-block text-[14px]'> Your Name (required)</label>
                <input name="name" value={formVal.name} onChange={getValSetVal} placeholder="Name *" type="text" className='w-[100%] h-[45px] px-3 focus:outline-none border-gray-500 border-1  placeholder:text-[12px] bg-white' />
              </div>
              <div className="py-3">
                <label className='font-bold d-block text-[14px]'>  Your Email (required)</label>
                <input name="email" value={formVal.email} onChange={getValSetVal} placeholder="Email *" type="email" className='w-[100%] h-[45px] px-3 focus:outline-none border-gray-500 border-1  placeholder:text-[12px] bg-white' />
              </div>

              <div className="py-3">
                <label className='font-bold d-block text-[14px]'>  Your Mobile Number (required)</label>
                <input name="mobile" value={formVal.mobile} onChange={getValSetVal} placeholder="Mobile Number *" type="text" className='w-[100%] h-[45px] px-3 focus:outline-none border-gray-500 border-1  placeholder:text-[12px] bg-white' />
              </div>

              <div className="py-3">
                <label className='font-bold d-block text-[14px]'>  Subject</label>
                <input name="subject" value={formVal.subject} onChange={getValSetVal} placeholder="Subject *" type="text" className='w-[100%] h-[45px] px-3 focus:outline-none border-gray-500 border-1  placeholder:text-[12px] bg-white' />
              </div>

              <div className="">
                <label>  Your Message</label>
                <textarea placeholder="Message *" value={formVal.message} onChange={getValSetVal} name="message" rows={5} className='w-[100%]  px-3 focus:outline-none border-gray-500 border-1  placeholder:text-[12px] bg-white resize-none form-control-2'></textarea>
              </div>

              <button type="submit" id="send_enquiry" className='py-2  mt-3 rounded-3 px-4 text-white bg-black '>
                Send
                {
                  btnLoading &&
                  <div>
                    <svg className="w-4 h-4 my-1 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle className="text-black opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  </div>
                }
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}

