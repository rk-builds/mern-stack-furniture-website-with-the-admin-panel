import React from 'react'
import { NavLink, useParams } from 'react-router'
import Nav from '../../common/Nav'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { MdDriveFolderUpload } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

const pageName = [
  { label: "slider", href: "/slider/add" },
  { label: "Add", href: "/slider/add" }
];

export default function AddSlider() {

  let { id } = useParams()
  let Navigate = useNavigate();
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [formValue, setFormValue] = useState(
    {
      sliderTitle: '',
      sliderOrder: '',

    }
  )
  const [image, setImage] = useState(null);

  //handle change for the edit all data
  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...formValue };
    obj[name] = value;
    setFormValue(obj);
  };

  //this function is check drop file is image or  not ? ,on click file handle 
  let handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setImage(droppedFile); // file object state માં img,setImg.
    } else {
      toast.error('upload images only!');
    }

  };
  //  image remove funvtion on click of cross
  let handleRemove = () => {
    setImage(null); // Image remove
  };

  let saveslider = (e) => {
    e.preventDefault();
    // if there is file in insert,we can't send object from the frontend, this new formdata js class is use here to travel data on route.
    let formData = new FormData();
    formData.append("sliderTitle", formValue.sliderTitle);
    formData.append("sliderOrder", formValue.sliderOrder);
    

    if (image instanceof File) {
      //append image in the formvalue
      formData.append("sliderImage", image);
    }

    if (id) {
      // UPDATE
      axios.post(`${apiBaseUrl}slider/update/${id}`, formData)
        .then(res => res.data)
        .then(finalRes => {
          if (finalRes.status == 1) {
            toast.success(finalRes.msg);
            setTimeout(() => {
              Navigate("/slider/view");
            }, 3000);
          } else {
            toast.error(finalRes.errorMessage);
          }
        });
    } else {
      // INSERT
      axios.post(`${apiBaseUrl}slider/create`, formData)
        .then(res => res.data)
        .then(finalRes => {
          if (finalRes.status == 1) {
            toast.success(finalRes.msg);

            setFormValue({
              sliderTitle: '',
              sliderOrder: '',
             
            });

            setImage(null);

            setTimeout(() => {
              Navigate("/slider/view")
            }, 3000)

          } else {
            toast.error(finalRes.errorMessage);
          }
        });
    }
  };



  useEffect(() => {

    setFormValue({

      sliderTitle: '',
      sliderOrder: '',
      

    })
    setImage(null);


    if (id) {
      axios.get(`${apiBaseUrl}slider/edit-slider/${id}`)

        .then((res) => res.data)
        .then((finalRes) => {
          console.log(finalRes)

          let { sliderTitle, sliderOrder, sliderImage } = finalRes.sliderData
          setFormValue({
            sliderTitle,
            sliderOrder,
            

          })
          setImage(finalRes.staticPath + sliderImage);

        })
    }
  }, [id])

  return (
    <>
    <ToastContainer />
      <Nav navlinks={pageName} />
      <div className='min-h-screen max-w-[1050px] mx-auto p-5 '>
        <div className=''>
          <h3 class="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">Add Slider</h3>
        </div>
        <div className='rounded-b-md border border-slate-400 border-t-0 p-5'>
          <form action="" className='' onSubmit={saveslider}>
            <div className='grid grid-cols-[35%_auto]'>
              <div className=''>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-gray-400 border-dashed w-64 h-64 flex items-center justify-center relative rounded-xl cursor-pointer"
                >
                  {image ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt="preview"
                        className="max-h-full"
                      />
                      <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-center text-gray-500">
                        <div className='flex justify-center'>
                          <MdDriveFolderUpload className='text-[40px]' />
                        </div>
                        <p className="mb-2">Drag & Drop file here</p>
                        <p className="text-sm">or click to upload</p>
                      </div>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        name="sliderImage"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </>
                  )}

                </div>
              </div>

              <div>
                <div className='mb-5 mx-auto'>
                  <label className='block  text-md font-medium  text-gray-900'>Tile</label>
                  <input type="text" value={formValue.sliderTitle} onChange={handleChange} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="sliderTitle" placeholder="Title" />
                </div>

                <div className='mb-5 mx-auto'>
                  <label className='block  text-md font-medium  text-gray-900'>Order</label>
                  <input type="text" value={formValue.sliderOrder} onChange={handleChange} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="sliderOrder" placeholder="Order" />
                </div>

              </div>
            </div>
            <button type="submit" class="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
              {id ? "Update" : "Add"} Slider
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
