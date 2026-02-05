import React, { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import Nav from '../../common/Nav'
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const pageName = [
  { label: "testimonial", href: "testimonial/add" },
  { label: "Add", href: "testimonial/add" }
];

export default function AddFaq() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let { id } = useParams();
  console.log(id)

  let navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    faqQue: "",
    faqAns: "",
    faqOrder: ""
  });


  //this function for controled component
  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...formValue };
    obj[name] = value;
    setFormValue(obj);
  };

  let saveFaq = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`${apiBaseUrl}faq/update/${id}`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            toast.success(finalRes.msg)

            setFormValue(
              {
                faqQue: "",
                faqAns: "",
                faqOrder: "",
                faqStatus: ""
              }
            )

            setTimeout(() => {
              navigate("/faq/view")
            }, 3000)
          }
          else {
            toast.error(finalRes.errorMessage)
          }
        })


    }
    else {
      //insert
      // console.log(formValue);
      axios.post(`${apiBaseUrl}faq/create`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            toast.success(finalRes.msg)
            setFormValue(
              {
                faqQue: "",
                faqAns: "",
                faqOrder: ""
                

              }
            )

            setTimeout(() => {
              navigate("/faq/view")
            }, 3000)
          }
          else {
            toast.error(finalRes.errorMessage)
          }
        })

    }

  }


  useEffect(() => {

    setFormValue(
      {
        faqQue: "",
        faqAns: "",
        faqOrder: ""
        
      }
    )
    if (id) {
      axios.get(`${apiBaseUrl}faq/edit-faq/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          console.log(finalRes)
          setFormValue(
            {
              faqQue: finalRes.faqData.faqQue,
              faqAns: finalRes.faqData.faqAns,
              faqOrder: finalRes.faqData.faqOrder,

            }
          )
        })
    }

  }, [id])


  return (
    <>
    <ToastContainer/>
      <Nav navlinks={pageName} />
      <div className='min-h-screen max-w-[1050px] mx-auto p-5 '>
        <div className=''>
          <h3 class="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">Add Faq</h3>
        </div>
        <form action="" className='rounded-b-md border border-slate-400 border-t-0 p-5' onSubmit={saveFaq}>
          <div className='mb-5 mx-auto'>
            <label className='block  text-md font-medium  text-gray-900'>Question</label>
            <input type="text" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="faqQue" value={formValue.faqQue} onChange={handleChange} placeholder="write question " />
          </div>

          <div className='mb-5'>
            <label className='block  text-md font-medium  text-gray-900'>Answer</label>
            <textarea rows="4" className='border-2 shadow-sm border-gray-300 rounded w-full ' name='faqAns' placeholder="write answer..." value={formValue.faqAns} onChange={handleChange}></textarea>
          </div>

          <div className='mb-5 mx-auto'>
            <label className='block  text-md font-medium  text-gray-900'>Order</label>
            <input type="Number" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="faqOrder" value={formValue.faqOrder} onChange={handleChange} min={1} placeholder="Enter Order" />
          </div>
          <button type="submit" class="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
            {id ? "Update" : "Add"} Faq
          </button>
        </form>
      </div>
    </>
  )
}
