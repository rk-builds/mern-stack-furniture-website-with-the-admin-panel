import React, { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import Nav from '../../common/Nav'
import { SketchPicker } from "react-color";
import { useState } from 'react';
import { meta } from '@eslint/js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const pageName = [
  { label: "Color", href: "/Addcolor" },
  { label: "Add", href: "/Addcolor" }
];



export default function Addcolor() {

  let { id } = useParams();

  let navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    colorName: "",
    colorCode: "#ffffff",
    colorOrder: ""
  });
  //this name must match with the field Name of the form.

  //handleChange is for handlling the edit in input.
  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...formValue };
    obj[name] = value;
    setFormValue(obj);
  };

  const handleColorChange = (updatedColor) => {
    let obj = { ...formValue };
    obj["colorCode"] = updatedColor.hex;
    setFormValue(obj);
  };

  


  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let colorSave = (e) => {
    e.preventDefault();

    if(id){
       axios.put(`${apiBaseUrl}color/update/${id}`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status == 1) {
          toast.success(finalRes.msg)
          setFormValue(
            {
              colorName: "",
              colorCode: "#ffffff",
              colorOrder: "",
              colorStatus: "true"
            }
          )

          setTimeout(() => {
            navigate("/Viewcolor")
          }, 3000)
        }
        else {
          toast.error(finalRes.errorMessage)
        }
      })


    }
    else{
       //insert
      // console.log(formValue);
    axios.post(`${apiBaseUrl}color/create`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status == 1) {
          toast.success(finalRes.msg)
          setFormValue(
            {
              colorName: "",
              colorCode: "#ffffff",
              colorOrder: "",
              colorStatus: "true"
            }
          )

          setTimeout(() => {
            navigate("/Viewcolor")
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
        colorName: "",
        colorCode: "#ffffff",
        colorOrder: "",
      }
    )
    if (id) {
      axios.get(`${apiBaseUrl}color/edit-color/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          console.log(finalRes)
          setFormValue(
            {
              colorName: finalRes.colorData.colorName,
              colorCode: finalRes.colorData.colorCode,
              colorOrder: finalRes.colorData.colorOrder,

            }
          )
        })
    }

  }, [id])

  let color;
  return (
    <>
      <ToastContainer />
      <Nav navlinks={pageName} />
      <div className='min-h-screen max-w-[850px] mx-auto p-5 '>
        <div className=''>
          <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">{id ? "Edit Color" : "Add Color"}</h3>
        </div>
        <form action="" className='rounded-b-md border border-slate-400 border-t-0 p-5' onSubmit={colorSave}>
          <div className='mb-5 mx-auto'>
            <label className='block  text-md font-medium  text-gray-900'>Color Name</label>
            <input type="text" value={formValue.colorName} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="colorName" placeholder="Enter Color Name" onChange={handleChange} />
          </div>
          <div className='mb-5 mx-auto'>
            <label className='block  text-md font-medium  text-gray-900'>Color Picker</label>
            <div className='flex justify-start gap-3 items-center pt-3'>
              <SketchPicker
                color={formValue.colorCode}
                onChangeComplete={handleColorChange}

              />
              <div className='w-10 h-10 border border-gray-400 rounded-md' style={{ backgroundColor: formValue.colorCode }} >
              </div>
            </div>



            {/* <input type="text" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="Color_Picker" placeholder="Enter Color Name" /> */}
          </div>
          <div className='mb-5 mx-auto'>
            <label className='block  text-md font-medium  text-gray-900'>Order</label>
            <input type="Number" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="colorOrder"
              value={formValue.colorOrder} min={1} placeholder="Enter Order" onChange={handleChange} />
          </div>
          <button type="submit" className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
            {id ? "Update" : "Add"} Color
          </button>
        </form>
      </div>
    </>

  )
}
