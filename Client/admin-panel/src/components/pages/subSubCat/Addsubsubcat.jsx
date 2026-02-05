import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import Nav from '../../common/Nav'
import axios from 'axios';
import { MdDriveFolderUpload } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const pageName = [
  { label: "sub sub category", href: "/sub-sub-category/add" },
  { label: "Add", href: "/sub-sub-category/add" }
];

export default function Addsubsubcat() {

  let { id } = useParams();

  let navigate = useNavigate();

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;


  const [image, setImage] = useState(null);
  let [parentData, setParentData] = useState([])
  let [subCatData, setSubCatData] = useState([])
  // let [subSubCatData, setsubSubcatData] = useState([])

  let [formValue, setFormValue] = useState({
    parentCategory: '',
    subCategory: '',
    subSubCategoryName: '',
    subSubCategoryOrder: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...formValue };
    obj[name] = value;
    setFormValue(obj);
  };

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


  let getParentCategory = async () => {
    axios.get(`${apiBaseUrl}subSubCategory/parent-category`)
      .then((res) => res.data)
      .then(finalRes => {
        setParentData(finalRes.CatParentRes)
        console.log(finalRes.CatParentRes)
      })
  }

  let getSubCategory = async (pid) => {
    // console.log("SUB CATEGORY ID =>",)
    axios.get(`${apiBaseUrl}subSubCategory/sub-category/${pid}`)
      .then((res) => res.data)
      .then(finalRes => {
        console.log(finalRes.subCatParentRes)
        setSubCatData(finalRes.subCatParentRes)
      })
  }



  let savesubSubCategory = (e) => {

    e.preventDefault()
    let formValue = new FormData(e.target)
    if (image instanceof File) {
      //append image in the formvalue
      formValue.append('subSubCategoryImage', image);
    }

   

    console.log(formValue)

    if (id) {
      // UPDATE
      axios.post(`${apiBaseUrl}subSubCategory/update/${id}`, formValue)
        .then(res => res.data)
        .then(finalRes => {
          if (finalRes.status == 1) {
            toast.success(finalRes.msg);
            setTimeout(() => {
              navigate("/sub-sub-category/view");
            }, 2000);
          } else {
            toast.error(finalRes.errorMessage);
          }
        });
    } else {
      // INSERT
      axios.post(`${apiBaseUrl}subSubCategory/create`, formValue)
        .then(res => res.data)
        .then(finalRes => {
          if (finalRes.status) {
            toast.success(finalRes.msg);
            setFormValue(
              {
                parentCategory: '',
                subCategory: '',
                subSubCategoryName: '',
                subSubCategoryOrder: '',
              }
            )
            setImage(null);

            setTimeout(() => {
              navigate("/sub-sub-category/view")
            }, 2000)

          } else {
            toast.error(finalRes.errorMessage);
          }
        });
    }
  };

  useEffect(() => {

    setFormValue({
      parentCategory: '',
      subCategory: '',
      subSubCategoryName: '',
      subSubCategoryOrder: '',

    })
    setImage(null);


    if (id) {
      axios.get(`${apiBaseUrl}subSubCategory/edit-subSubcategory/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          console.log(finalRes)

          let { parentCategory, subSubCategoryName, subSubCategoryOrder, subCategory, subSubCategoryImage } = finalRes.subSubCategoryData
          setFormValue({
            parentCategory,
            subCategory,
            subSubCategoryName,
            subSubCategoryOrder,

          })
          // setImage(subSubCategoryImage.startsWith('http') ? subSubCategoryImage : finalRes.staticPath + subSubCategoryImage);
          setImage(finalRes.staticPath + subSubCategoryImage);

        })
    }
  }, [id])


  useEffect(() => {
    getParentCategory()
    
  }, [])

  useEffect(() => {
  if (formValue.parentCategory) {
    getSubCategory(formValue.parentCategory);
   }
    // else {
  //   setSubCatData([]);  // જો parentCategory ન હોય તો subCatData ખાલી કરો
  // }
}, [formValue.parentCategory]);

  return (
    <>
      <ToastContainer />
      <Nav navlinks={pageName} />
      <div className='min-h-screen max-w-[1050px] mx-auto p-5 '>
        <div className=''>
          <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">Add Sub Sub Category</h3>
        </div>
        <div className='rounded-b-md border border-slate-400 border-t-0 p-5'>
          <form action="" className='' onSubmit={savesubSubCategory}>
            <div className='grid grid-cols-[35%_auto]'>
              <div className=''>
                <div>
                  <label>Image</label>

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
                          name="subSubCategoryImage"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </>
                    )}

                  </div>
                </div>
              </div>

              <div>
                {/* {parentCategory} */}
                <div className='mb-5 mx-auto'>
                  <label className='block  text-md font-medium  text-gray-900'>Parent Category Name</label>
                  <select onChange={(e) => getSubCategory(e.target.value)} name='parentCategory' className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2'>
                    <option value="">Nothing Selected</option>
                    {
                      parentData.map((obj, index) => {
                        return (

                          <option selected={obj._id == formValue.parentCategory} value={obj._id} key={index}>{obj.categoryName}</option>

                        )

                      })
                    }
                  </select>

                </div>

                <div className='mb-5 mx-auto'>
                  <label className='block  text-md font-medium  text-gray-900'>Sub Category Name</label>
                  {/* {subCategoryName} */}
                  <select name='subCategory' onChange={handleChange}  className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2'>
                    <option value="">Selecte category</option>
                    {
                      subCatData.map((obj, index) => {
                        return (


                          <option selected={obj._id == formValue.subCategory} value={obj._id} key={index}>{obj.subCategoryName}</option>


                        )

                      })
                    }
                  </select>
                </div>

                <div className='mb-5 mx-auto'>
                  <label className='block  text-md font-medium  text-gray-900'>Category Name</label>
                  <input type="text" value={formValue.subSubCategoryName} onChange={handleChange} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="subSubCategoryName" placeholder="Parent category Name" />
                </div>

                <div className='mb-5 mx-auto'>
                  <label className='block  text-md font-medium  text-gray-900'>Order</label>
                  <input type="Number" value={formValue.subSubCategoryOrder} onChange={handleChange} className='text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2 px-2' name="subSubCategoryOrder" min={1} placeholder="Enter Order" />
                </div>

              </div>



            </div>
            <button type="submit" className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
              {id ? "Update" : "Add"} Sub Sub Category
            </button>
          </form>


        </div>

      </div>
    </>
  )
}
