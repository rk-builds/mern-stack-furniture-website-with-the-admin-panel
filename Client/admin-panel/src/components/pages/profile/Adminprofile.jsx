import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { MdDriveFolderUpload } from "react-icons/md";
import { LoginContext } from '../../../context/mainContext';
import { useEffect } from 'react';
import axios from 'axios';

export default function Adminprofile() {


  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  const [ActiveTab, setActiveTab] = useState('profile');

  let { id, setId } = useContext(LoginContext)

  const [profileData, setProfileData] = useState({
    "name": "",
    "email": "",
    "phone": ""
  });

  let getAdminProfileView = () => {
    axios.get(`${apiBaseUrl}admin-auth/view`)
      .then((apiRes) => apiRes.data)
      .then((finalRes) => {
        
    if (finalRes.status === 1 && finalRes.data.length > 0) {

      const adminData = finalRes.data[0]

      setProfileData({
        name: adminData.name || "",
        email: adminData.email || "",
        phone: adminData.phone || "",
        profileImage: finalRes.staticPath + adminData.profileImage
      })

      setImage(finalRes.staticPath + adminData.profileImage)
    }
        console.log(finalRes);
       
      })
  }

  useEffect(() => {
    getAdminProfileView()
  }, [])



  return (
    <>
      <div className="w-full px-6 grid grid-cols-[30%_auto] gap-[10px] py-[20px]">
        <div className="bg-white  self-start  rounded-lg shadow-md">
          <div className="py-[40px] text-center">
            <img className="w-[80px] h-[80px] mx-auto rounded-full" src={profileData.profileImage} alt="Profile" />
            <h5 className="pt-[6px]">{profileData.name}</h5></div>
          <div className="bg-[#F6F9FD] p-[20px]  rounded-lg shadow-md">
            <h4 className="py-[8px] font-bold">Contact Information</h4>
            <p className="flex items-center gap-[8px] py-[6px]">{profileData.phone}</p>
            <p className="flex items-center gap-[8px] py-[6px]"> {profileData.email}</p>
          </div>
        </div>
        <div className="bg-white  p-6 rounded-lg shadow-md">
          <div className="flex border-b border-gray-300 mb-4">
            <button onClick={() => setActiveTab("profile")} className={`px-6 py-2 text-lg font-medium border-b-4 transition-al ${ActiveTab === "profile"
              ? "border-purple-700 text-purple-700"
              : "border-transparent text-gray-600 hover:text-purple-700"
              }`}
            >
              Edit Profile
            </button>

            <button onClick={() => setActiveTab("password")} className={`px-6 py-2 text-lg font-medium border-b-4 transition-al ${ActiveTab === "password"
              ? "border-purple-700 text-purple-700"
              : "border-transparent text-gray-600 hover:text-purple-700"
              }`}
            >
              change Password
            </button>
          </div>
          <div>
            {ActiveTab === "profile" && <EditProfile />}
            {ActiveTab === "password" && <ChangePassword />}
          </div>


        </div>
      </div>
    </>
  )
}

export  function ChangePassword() {

  const { id } = useContext(LoginContext)
  const apiBaseUrl = import.meta.env.VITE_APIBASEURL

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const savePassword = (e) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and Confirm password not match")
      return
    }

    axios.put(`${apiBaseUrl}admin-auth/change-password/${id}`, formData)
      .then(res => res.data)
      .then(finalRes => {
        if (finalRes.status === 1) {
          toast.success(finalRes.msg)
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          })
        } else {
          toast.error(finalRes.msg)
        }
      })
      .catch((err) => {
        toast.error(err)
      })
  }
  return (
    <>
      <form className="p-3" onSubmit={savePassword}>
        <div className="mb-5">
          <label className="block  text-md font-medium text-gray-900">Current Password</label>
          <input type="password" required value={formData.currentPassword} onChange={handleChange} name="currentPassword" className="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Current Password" />
        </div>
        <div className="mb-5">
          <label className="block  text-md font-medium text-gray-900">New Password</label>
          <input type="password" required value={formData.newPassword} onChange={handleChange} name="newPassword" className="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="New Password" />
        </div>
        <div className="mb-5">
          <label className="block  text-md font-medium text-gray-900">Confirm Password</label>
          <input type="password" required value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" className="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Confirm Password" />
        </div>
        <button type="submit" className="my-5 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg px-5 py-2.5">
          Change Password
        </button>
      </form>
    </>
  )
}

export function EditProfile() {

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL

  const [profileData, setProfileData] = useState({
    "name": "",
    "email": "",
    "phone": ""
  });

  const [image, setImage] = useState(null);

  let handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setImage(droppedFile); // file object state માં img,setImg.
    } else {
      toast.error('upload images only!');
    }

  };


  let handleRemove = () => {
    setImage(null); // Image remove
  };

  let saveProfile = (e) => {
    e.preventDefault()
    let formValue = new FormData(e.target)
    if (image instanceof File) formValue.append("profileImage", image);
    axios.post(`${apiBaseUrl}admin-auth/create`, formValue)
      .then((apiRes) => apiRes.data)
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.status == 1) {
          toast.success(finalRes.msg)
        }
      })
  }

  let getAdminProfileView = () => {
    axios.get(`${apiBaseUrl}admin-auth/view`)
      .then((apiRes) => apiRes.data)
      .then((finalRes) => {
        
    if (finalRes.status === 1 && finalRes.data.length > 0) {

      const adminData = finalRes.data[0]

      setProfileData({
        name: adminData.name || "",
        email: adminData.email || "",
        phone: adminData.phone || "",
        profileImage: finalRes.staticPath + adminData.profileImage
      })

      setImage(finalRes.staticPath + adminData.profileImage)
    }
        console.log(finalRes);
       
      })
  }

  useEffect(() => {
    getAdminProfileView()
  }, [])

  return (
    <>
      <form className="p-3" onSubmit={saveProfile}>
        <div className="flex gap-10">
          <div className="w-1/3">
            <label className="block  text-md font-medium text-gray-900">Choose Image</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-gray-400 border-dashed w-64 h-64 flex items-center justify-center relative rounded-xl cursor-pointer"
            >
              {image ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                     src={typeof image === "string" ? image : URL.createObjectURL(image)}
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
                    name="profileImage"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </>
              )}

            </div>
          </div>
          <div className='w-2/3'>
            <div className="mb-5">
              <label className="block  text-md font-medium text-gray-900">Name</label>
              <input type="text" name="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, Name: e.target.value })} className="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Name" />
            </div>
            <div className="mb-5">
              <label className="block  text-md font-medium text-gray-900">Email</label>
              <input type="email" name="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} className="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Email" />
            </div>
            <div className="mb-5"
            ><label className="block  text-md font-medium text-gray-900">Mobile Number</label>
              <input type="tel" name="phone" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} className="border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg w-full py-2.5 px-3" placeholder="Number" />
            </div>
          </div>
        </div>
        <button type="submit" className="my-5 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg px-5 py-2.5">
          Update Profile
        </button>
      </form>
    </>
  )
}