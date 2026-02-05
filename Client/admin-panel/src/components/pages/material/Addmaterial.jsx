import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import Nav from '../../common/Nav'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const pageName = [
  { label: "Material", href: "/add/material" },
  { label: "Add", href: "/add/material" }
];

export default function Addmaterial() {

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let { id } = useParams();

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...formValue };
    obj[name] = value;
    setFormValue(obj);
  };

 

  const [formValue, setFormValue] = useState({
    materialName: "",
    materialOrder: "",

  });

  let saveMaterial = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`${apiBaseUrl}material/update/${id}`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            toast.success(finalRes.msg)
            setFormValue(
              {
                materialName: "",
                materialOrder: "",
                materialStatus: "true"
              }
            )

            setTimeout(() => {
              navigate("/view/material")
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
      axios.post(`${apiBaseUrl}material/create`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            toast.success(finalRes.msg)
            setFormValue(
              {
                materialName: "",
                materialOrder: ""
                
              }
            )

            setTimeout(() => {
              navigate("/view/material")
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
      materialName: "",
      materialOrder: "",
    }
  )
  if (id) {
    axios.get(`${apiBaseUrl}material/edit-material/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)
        setFormValue(
          {
            materialName: finalRes.materialData.materialName,

            materialOrder: finalRes.materialData.materialOrder,

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
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">{id ? "Edit" : "Add"} Material</h3>
      </div>
      <form action="" className='rounded-b-md border border-slate-400 border-t-0 p-5' onSubmit={saveMaterial}>
        <div className='mb-5 mx-auto'>
          <label className='block  text-md font-medium  text-gray-900'>Category Name</label>
          <input type="text" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="materialName" placeholder="Material Name" value={formValue.materialName} onChange={handleChange}/>
        </div>

        <div className='mb-5 mx-auto'>
          <label className='block  text-md font-medium  text-gray-900'>Order</label>
          <input type="Number" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="materialOrder" min={1} placeholder="Enter Order" value={formValue.materialOrder} onChange={handleChange}/>
        </div>
        <button type="submit" className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
          {id ? "Update" : "Add"} Material
        </button>
      </form>
    </div>
  </>
)
}

