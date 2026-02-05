import React, { useState } from 'react'
import { MdDriveFolderUpload } from "react-icons/md";

export default function CompanyProfile() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL

  const [CprofileData, setCProfileData] = useState({
    "name": "",
    "email": "",
    "phone": "",
    "address": "",
    "mapUrl": ""
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

  let saveCompanyProfile = (e) => {
    e.preventDefault();
    let formValue = new FormData(e.target)
    if (image instanceof File) formValue.append("logoImage", image);
    axios.post(`${apiBaseUrl}admin-auth/company-profile/create`, formValue)
      .then((apiRes) => apiRes.data)
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.status == 1) {
          toast.success(finalRes.msg)
        }
      })
  }


return (
  <>

    <div className="px-6 bg-[#F1F4F5]">
      {/* Header */}
      <div className="py-5">
        <h2 className="text-[18px] font-medium">Company Profile</h2>
        <ul className="flex text-[14px] text-[#7693BE] gap-1">
          <li className="text-blue-600 cursor-pointer">Dashboard /</li>
          <li>Company Profile</li>
        </ul>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 rounded-[6px] shadow-sm">
        <form autoComplete="off" onSubmit={saveCompanyProfile}>
          {/* Top Section */}
          <div className="flex gap-5 flex-col md:flex-row">
            {/* Image Upload */}
            <div className="md:w-1/3 w-full">
              <label className="block text-md font-medium text-gray-900 mb-2">
                Category Image
              </label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-gray-400 border-dashed w-64 h-64 flex items-center justify-center relative rounded-xl cursor-pointer"
              >
                {image ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(image)}
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
                      name="logoImage"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </>
                )}

              </div>

            </div>

            {/* Right Inputs */}
            <div className="md:w-2/3 w-full space-y-4">
              <div>
                <label className="block text-md font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  className="border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name"
                  name='name'
                />
              </div>

              <div>
                <label className="block text-md font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  className="border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                  name='email'
                />
              </div>

              <div>
                <label className="block text-md font-medium text-gray-900">
                  Mobile Number
                </label>
                <input
                  type="number"
                  className="border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mobile Number"
                  name='phone'
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-900">
              Address
            </label>
            <textarea
              rows="4"
              className="block w-full p-2.5 resize-none rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Address"
              name='address'
            ></textarea>
          </div>

          {/* Google Map URL */}
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-900">
              Google Map URL
            </label>
            <textarea
              rows="4"
              className="block w-full p-2.5 resize-none rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Google Map URL"
              name='mapUrl'
            ></textarea>
          </div>

          {/* Map Preview */}
          <div className="my-4 p-2 border-2 rounded-[6px]">
            <iframe
              className="w-full h-[300px] rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14310.50203363295!2d73.030606!3d26.273815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1dfafdd7%3A0xf992fd41c21a238e!2sLaxmi%20Dairy%20%26%20Provision%20Store!5e0!3m2!1sen!2sin!4v1741676183003!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2.5"
          >
            Update Company Profile
          </button>
        </form>
      </div>
    </div>



  </>
)
}
