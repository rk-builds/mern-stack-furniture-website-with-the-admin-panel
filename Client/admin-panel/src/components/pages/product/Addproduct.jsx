import React, { useEffect } from 'react'
import Nav from '../../common/Nav';
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { MdDriveFolderUpload } from "react-icons/md";
import axios from 'axios';
import Select from "react-select";
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';


const pageName = [
   { label: "Products", href: "/Addproducts" },
   { label: "Product Details", href: "/Addproducts" }
];


export default function Addproduct() {

   let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

   let { id } = useParams();

   let navigate = useNavigate();



   let [description, setDescription] = useState('');
   let [parentData, setParentData] = useState([])
   let [subCatData, setSubCatData] = useState([])
   let [subSubcatData, setsubSubcatData] = useState([])
   let [color, setColor] = useState([])
   let [material, setMaterial] = useState([])

   let [selectedColor, setSelectedColor] = useState([]);
   let [selectedMaterial, setSelectedMaterial] = useState([]);

   const [image, setImage] = useState(null);
   const [backimage, setBackImage] = useState(null);
   const [images, setImages] = useState([]);


   let [formValue, setFormValue] = useState({
      productName: '',
      subCategory: '',
      productMeterial: '',
      productType: '',
      topRated: '',
      actualPrice: '',
      inStocks: '',
      parentCategory: '',
      subsubCategory: '',
      productColor: '',
      bestSelling: '',
      upSell: '',
      salePrice: '',
      productOrder: '',
      productDesc: '',
   })

   //product image
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
   // back image
   let BackImgHandleDrop = (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type.startsWith('image/')) {
         setBackImage(droppedFile); // file object state માં img,setImg.
      } else {
         toast.error('upload images only!');
      }

   };

   let BackImgHandleRemove = () => {
      setBackImage(null); //back Image remove
   };

   //gallery images
   const GalleryImgHandleDrop = (e) => {
      e.preventDefault();

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validImages = droppedFiles.filter(file =>
         file.type.startsWith('image/')
      );

      if (validImages.length === 0) {
         toast.error('Upload images only!');
         return;
      }

      setImages((prev) => [...prev, ...validImages]);
   };

   const GalleryImgHandle = (e) => {
      const selectedFiles = Array.from(e.target.files);
      const validImages = selectedFiles.filter(file =>
         file.type.startsWith('image/')
      );

      setImages((prev) => [...prev, ...validImages]);
   };

   //remove single img
   const GalleryImgHandleRemove = (index) => {

      setImages((prev) => prev.filter((_, i) => i !== index));
   };


   // for select multiple options 
   const handleChangeMultiselect = (selectedOption, setStateFn) => {
      setStateFn(selectedOption);

      const ids = selectedOption.map(item => item.value);
      // console.log("Selected IDs:", ids);
   };

   // for edit onchange
   const handleChange = (e) => {
      const { name, value } = e.target;
      let obj = { ...formValue };
      obj[name] = value;
      setFormValue(obj);
   };



   let getParentCategory = async () => {
      axios.get(`${apiBaseUrl}product/parent-category`)
         .then((res) => res.data)
         .then(finalRes => {
            setParentData(finalRes.CatParentRes)
            // console.log(finalRes.CatParentRes)
         })
   }

   let getSubCategory = async (pid) => {
      console.log("SUB CATEGORY ID =>", pid)
      axios.get(`${apiBaseUrl}product/sub-category/${pid}`)
         .then((res) => res.data)
         .then(finalRes => {
            // console.log(finalRes.subCatParentRes)
            setSubCatData(finalRes.subCatParentRes)
         })
   }

   let getColors = () => {
      axios.get(`${apiBaseUrl}product/colors`)
         .then((res) => res.data)
         .then((finalres) => {

            let options = finalres.colorData.map((item) => {
               return {
                  value: item._id,
                  label: item.colorName
               }
            })

            setColor(options);

         })
   }


   let getMaterial = () => {
      axios.get(`${apiBaseUrl}product/material`)
         .then((res) => res.data)
         .then((finalres) => {
            // console.log(finalres.materialData)
            let options = finalres.materialData.map((item) => {
               return {
                  value: item._id,
                  label: item.materialName
               }
            })

            setMaterial(options);



         })
   }

   // { console.log(color) }

   let getsubsubCategoryData = (pid) => {
      // console.log("SUB sub CATEGORY ID =>", pid)
      axios.get(`${apiBaseUrl}product/sub-sub-category/${pid}`)
         .then((res) => res.data)
         .then((finalres) => {
            setsubSubcatData(finalres.subsubcatRes);
            console.log(finalres.subsubcatRes)
         })
   }

   useEffect(() => {
      getParentCategory()
      getColors()
      getMaterial()

   }, [])


   //insert product



   let productSave = (e) => {
      e.preventDefault();

      let formValue = new FormData(e.target);

      // images
      if (image instanceof File) formValue.append("productImage", image);
      if (backimage instanceof File) formValue.append("backImage", backimage);
      images.forEach((img) => {
         if (img instanceof File) {
            formValue.append("productGallery", img);
         }
      });

      // multiple fields
      selectedMaterial.forEach((option) => {
         formValue.append('productMeterial', option.value);
      });
      selectedColor.forEach((option) => {
         formValue.append('productColor', option.value);
      });

        formValue.append('productDesc', description);

      if (id) {
         // UPDATE
         axios.post(`${apiBaseUrl}product/update/${id}`, formValue)
            .then(res => res.data)
            .then(finalRes => {
               if (finalRes.status === 1) {
                  toast(finalRes.msg);
                  console.log(formValue)
                  setTimeout(() => {
                     navigate("/products/view")
                  }, 2000)

               } else {
                  toast.error(finalRes.errorMessage);
               }
            });

      } else {
         // INSERT
         axios.post(`${apiBaseUrl}product/create`, formValue)
            .then(res => res.data)
            .then(finalRes => {
               if (finalRes.status === 1) {
                  toast(finalRes.msg);
                  e.target.reset();
                  setFormValue(
                     {

                        productName: '',
                        subCategory: '',
                        productType: '',
                        topRated: '',
                        actualPrice: '',
                        inStocks: '',
                        parentCategory: '',
                        subsubCategory: '',
                        bestSelling: '',
                        upSell: '',
                        salePrice: '',
                        productOrder: '',
                        productDesc: '',
                     }
                  )

                  console.log(formValue)

                  setImage(null);
                  setBackImage(null);
                  setImages([]);
                  setSelectedMaterial([]);
                  setSelectedColor([]);

                  setTimeout(() => {
                     navigate("/products/view")
                  }, 2000)

               } else {
                  toast.error(finalRes.errorMessage);
               }
            });
      }
   }

   useEffect(() => {

      // null because we come through the addproduct page
      setFormValue(
         {

            productName: '',
            subCategory: '',
            productType: '',
            topRated: '',
            actualPrice: '',
            inStocks: '',
            parentCategory: '',
            subsubCategory: '',
            bestSelling: '',
            upSell: '',
            salePrice: '',
            productOrder: '',
           
         }
      )

      setImage(null);
      setBackImage(null);
      setImages([]);
      setSelectedMaterial([]);
      setSelectedColor([]);



      if (id) {
         axios.get(`${apiBaseUrl}product/edit-product/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
               console.log(finalRes)

               const {
                  productName,subCategory, productType, topRated, actualPrice,inStocks, parentCategory,
                  subsubCategory,bestSelling,upSell,salePrice,productOrder,productDesc,productImage,
                  backImage,productGallery,productMeterial,productColor} = finalRes.productData;

               setFormValue({
                  productName,
                  subCategory,
                  productType,
                  topRated,
                  actualPrice,
                  inStocks,
                  parentCategory,
                  subsubCategory,
                  bestSelling,
                  upSell,
                  salePrice,
                  productOrder,
                  productDesc,

               })

               setImage(finalRes.staticPath + productImage);
               setBackImage(finalRes.staticPath + backImage);
               setImages(productGallery.map(img => finalRes.staticPath + img));
               setSelectedMaterial(finalRes.productMeterial || []);
               setSelectedColor(finalRes.productColor || []);


            })
      }
   }, [id])

   return (
      <div>
         <ToastContainer />
         <Nav navlinks={pageName} />
         <div className="w-full px-6 py-6">

            <form onSubmit={productSave}>

               <div className="grid grid-cols-3 gap-[10px]">

                  <div className='gap-[20px]'>

                     <div>
                        <label>Product Image</label>
                        <div className="p-5"></div>



                        <div>
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
                                       // name="productImage"
                                       onChange={(e) => setImage(e.target.files[0])}
                                    />
                                 </>
                              )}

                           </div>
                        </div>




                        <div>
                           <label>Back Image</label>
                           <div
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={BackImgHandleDrop}
                              className="border-2 border-gray-400 border-dashed w-64 h-64 flex items-center justify-center relative rounded-xl cursor-pointer"
                           >
                              {backimage ? (
                                 <div className="relative w-full h-full flex items-center justify-center">
                                    <img
                                       src={typeof backimage === "string" ? backimage : URL.createObjectURL(backimage)}
                                       alt="preview"
                                       className="max-h-full"
                                    />
                                    <button
                                       type="button"
                                       onClick={BackImgHandleRemove}
                                       className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                       X
                                    </button>
                                 </div>
                              ) : (
                                 <>
                                    <div className="text-center text-gray-500">
                                       <div className="flex justify-center">
                                          <MdDriveFolderUpload className="text-[40px]" />
                                       </div>
                                       <p className="mb-2">Drag & Drop file here</p>
                                       <p className="text-sm">or click to upload</p>
                                    </div>
                                    <input
                                       type="file"
                                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                       // name="backImage"
                                       onChange={(e) => setBackImage(e.target.files[0])}
                                    />
                                 </>
                              )}
                           </div>
                        </div>


                        <div>
                           <div>
                              <label className="block mb-1">Gallery Image</label>

                              <label
                                 className="border-2 border-dashed border-gray-400 p-4 rounded relative block cursor-pointer"
                                 onDrop={GalleryImgHandleDrop}
                                 onDragOver={(e) => e.preventDefault()}
                              >
                                 {images.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-4">
                                       {images.map((img, index) => (
                                          <div key={index} className="relative">
                                             <img
                                                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                                className="h-32 w-full object-cover rounded"
                                             />

                                             <button
                                                type="button"
                                                onClick={(e) => {
                                                   e.preventDefault();
                                                   e.stopPropagation(); // VERY IMPORTANT
                                                   GalleryImgHandleRemove(index);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded z-10"
                                             >
                                                X
                                             </button>
                                          </div>
                                       ))}
                                    </div>
                                 ) : (
                                    <div className="text-center text-gray-500">
                                       <MdDriveFolderUpload className="text-[40px] mx-auto" />
                                       <p className="mb-2">Drag & Drop images here</p>
                                       <p className="text-sm">or click to upload</p>
                                    </div>
                                 )}

                                 {/* NO OVERLAY */}
                                 <input
                                    type="file"
                                    multiple
                                    hidden
                                    onChange={GalleryImgHandle}
                                 // name='productGallery'
                                 />
                              </label>
                           </div>


                        </div>
                     </div>

                  </div>


                  <div className="middle">
                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Product Name</label>
                        <input type="text" onChange={handleChange} value={formValue.productName} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2' name="productName" placeholder="Product Name" />
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Select Sub Category</label>
                        <select onChange={(e) => getsubsubCategoryData(e.target.value)} name='subCategory' className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'>
                           <option selected disabled hidden value="">Select Category</option>
                           {
                              subCatData.map((obj, index) => {
                                 return (

                                    <option selected={obj._id == formValue.subCategory} value={obj._id} key={index}>{obj.subCategoryName}</option>

                                 )

                              })
                           }
                        </select>
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Select Material</label>

                        {
                           <Select
                              options={material}
                              value={selectedMaterial}
                              onChange={(option) => handleChangeMultiselect(option, setSelectedMaterial)}
                              placeholder="Select Material"
                              isMulti={true}
                              className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'
                              // name='productMeterial'
                           />

                        }

                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Select Product Type</label>
                        <select name='productType' onChange={handleChange} value={formValue.productType} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'>
                           <option selected disabled hidden value="">Nothing Selected</option>
                           <option value="Featured">Featured</option>
                           <option value="New Arrivals">New Arrivals</option>
                           <option value="Onsale">Onsale</option>
                        </select>
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Is Top Rated</label>
                        <select name='topRated' value={formValue.topRated} onChange={handleChange} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'>
                           <option selected disabled hidden value="">Nothing Selected</option>
                           <option value={1}>Yes</option>
                           <option value={0}>No</option>
                        </select>
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Actual Price</label>
                        <input name='actualPrice' onChange={handleChange} value={formValue.actualPrice} type="text" placeholder="Actual Price" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2' />
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Total In Stocks</label>
                        <input name='inStocks' onChange={handleChange} value={formValue.inStocks} type="text" placeholder="Total In Stocks" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2' />
                     </div>
                  </div>


                  <div className="right-items">
                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Select Parent Category</label>
                        <select onChange={(e) => getSubCategory(e.target.value)} name='parentCategory' className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'>
                           <option selected disabled hidden value="">Selecte ParentCategory</option>
                           {
                              parentData.map((obj, index) => {
                                 return (

                                    <option selected={obj._id == formValue.parentCategory} value={obj._id} key={index}>{obj.categoryName}</option>

                                 )

                              })
                           }
                        </select>
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Select Sub Sub Category</label>
                        <select name='subsubCategory' className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'>
                           <option selected disabled hidden value="">Select SubsubCatagory</option>
                           {
                              subSubcatData.map((obj, index) => {
                                 return (
                                    <option selected={obj._id == formValue.subsubCategory} value={obj._id} key={index}> {obj.subSubCategoryName} </option>
                                 )
                              })
                           }
                        </select>
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Select Color</label>


                        {
                           <Select
                              options={color}
                              value={selectedColor}
                              onChange={(option) => handleChangeMultiselect(option, setSelectedColor)}
                              placeholder="Select Color"
                              isMulti={true}
                              className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'
                              // name='productColor'
                              
                           />

                        }






                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Is Best Selling</label>
                        <select name='bestSelling' value={formValue.bestSelling} onChange={handleChange} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'>
                           <option selected disabled hidden value="">Nothing Selected</option>
                           <option value={1}>Yes</option>
                           <option value={0}>No</option>
                        </select>
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Is Upsell</label>
                        <select  name='upSell' value={formValue.upSell} onChange={handleChange} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2'>
                           <option selected disabled hidden value="">Nothing Selected</option>
                           <option value={1}>Yes</option>
                           <option value={0}>No</option>
                        </select>
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900' >Sale Price</label>
                        <input name='salePrice' onChange={handleChange} value={formValue.salePrice} type="text" placeholder="Sale Price" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2' />
                     </div>

                     <div className='mb-5'>
                        <label className='block  text-md font-medium  text-gray-900'>Order</label>
                        <input name='productOrder' onChange={handleChange} value={formValue.productOrder} type="text" placeholder="Order" className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-[90%] py-2 px-2' />
                     </div>
                  </div>



               </div>

               <div className='mb-5'>
                  <label className='block  text-md font-medium  text-gray-900'>Description</label>
                  {/* <textarea rows="5" className='border-1 border-gray-100 rounded w-full' placeholder=""></textarea> 
        */}
                  < ReactQuill name='productDesc' theme="snow" value={description} onChange={setDescription} className='h-[130px] py-3' />
               </div>


               <button type="submit" className=' mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 '>
                  {id ? "Update" : "Create"} Product
               </button>

            </form >

         </div >

      </div >
   )
}
