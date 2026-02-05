import React, { useEffect, useState } from 'react'
import Tableform from '../../common/Tableform'
import { FaPen } from "react-icons/fa";
import Theadcomponent from '../../common/Theadcomponent';
import Nav from '../../common/Nav';
import axios from 'axios';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const headings = [
  { label: "sr no", width: "10%" },
  { label: "Parent Category Name", width: "30%" },
  { label: "Sub Category Name", width: "20%" },
  { label: "Image", width: "20%" },
  { label: "Order", width: "10%" },
  { label: "Status", width: "10%" },
  { label: "Action", width: "10%" }
];
const pageName = [
  { label: "Sub Category", href: "/sub-category/add" },
  { label: "View", href: "/sub-category/add" }
];

export default function Viewsubcat() {
  const [currentPage, setCurrentPage] = useState(1); //pages
    
    let [totalPages, setTotalPages] = useState(0)
  
    let [limit, setLimit] = useState(5)
  
    let [ids, setIds] = useState([]) // status change
  
    let [allcheck, setAllCheck] = useState(false)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [subCategoryData, setSubCategoryData] = useState([])

  let [staticPath, setStaticPath] = useState([])

  let getSubCategoryView = () => {
    axios.get(`${apiBaseUrl}subCategory/view`,{
      params: {
        page: currentPage, limit
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes)

        setSubCategoryData(finalRes.subCategoryRes)
         setTotalPages(finalRes.totpages)
        // console.log(finalRes.subCategoryRes)
        setStaticPath(finalRes.staticPath)
      })
      .catch((err) => {
        console.error(err);
      });


  }

  useEffect(() => {
    getSubCategoryView()
  }, [currentPage,limit])

  

  // 

  let getChecked = (e) => {
    if (e.target.checked) {
      
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value])
      }

    } else {
      let filterData = ids.filter((v) => v != e.target.value)
      setIds(filterData)
    }

  }

  useEffect(() => {
    // console.log(ids)
  }, [ids])

  let getAllChecked = (e) => {
    if (e.target.checked) {
      let finalRes = subCategoryData.map((v) => v._id)
      setIds(finalRes)
    }
    else {
      setIds([])
    }
    setAllCheck(!allcheck)
  }

  useEffect(() => {
    if (ids.length == subCategoryData.length && subCategoryData.length >= 1) {
      setAllCheck(true)
    }
    else {
      setAllCheck(false)
    }
  }, [ids])


  //multidelete

  let multiDelete = async () => {
    try {

      if (ids.length === 0) {
        toast.error("Please select at least one checkbox");
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {

        if (ids.length >= 1) {
          await axios.post(`${apiBaseUrl}subCategory/multi-delete`, { ids });
          getSubCategoryView()

          Swal.fire("Deleted!", "Your selected colors have been deleted.", "success");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the color.",
        icon: "error"
      });
      console.error(error);
    }
  }

  // status-update
  let statusUpdate = () => {
    // console.log(ids.length)
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}subCategory/status-update`,
        {
          ids
        }
      )
        .then((res) => res.data)
        .then((finalRes) => {
          getSubCategoryView()
          setIds([])
        })
    }
    else {
      toast.error("Please select one checkbox")
    }

  }

  return (
    <>
    <ToastContainer />
      <Nav navlinks={pageName} />
      <section className='p-10 min-h-screen '>
        <Tableform heading="View Sub Category" onMultiDelete={multiDelete} onStatusUpdate={statusUpdate} />
        <div className='border border-t-0 border-slate-400 rounded-b-lg'>
          <table className='w-full'>
            <Theadcomponent colums={headings} onAllDelete={getAllChecked} allDataChecked={allcheck} />
            <tbody>
               {console.log(subCategoryData)}
              {
               
                subCategoryData.length > 0 ?
                  subCategoryData.map((obj, index) => {
                    return (

                      <tr className='hover:bg-gray-50' key={obj._id}>
                        <td className='ps-4 py-5'><input type="checkbox" value={obj._id} onChange={getChecked} checked={ids.includes(obj._id)}/></td>
                        <td>{(currentPage-1)*limit+index+1}</td>
                        <td className='px-2 py-5 text-base font-semibold'>{obj.parentCategory.categoryName}</td>
                        <td className='px-2 py-5 text-base font-semibold'>{obj.subCategoryName}</td>
                        <td className='px-2 py-5'>
                          <img src={staticPath + obj.subCategoryImage} alt=""  width={50} />
                        </td>
                        <td className='px-2 py-5'>{obj.subCategoryOrder}</td>
                        <td className='px-2 py-5'>
                          {obj.subCategoryStatus ?

                            <button className='bg-gradient-to-r from-green-400 via-green-500 to bg-green-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>
                              Active
                            </button>
                            :
                            <button className='bg-gradient-to-r from-red-400 via-red-500 to bg-red-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>
                              deActive
                            </button>
                          }
                        </td>

                        <td className='px-2 py-5'><div className=' bg-blue-700 rounded-[50%] w-[40px] h-[40px] text-white flex justify-center items-center'>
                          <Link to={`/edit-subcategory/${obj._id}`}>
                            <FaPen />
                          </Link>
                        </div>
                        </td>

                      </tr>

                    )


                  })
                  :
                  <tr>
                    <td colSpan={6} className='text-center p-4'>No data found</td>
                  </tr>
              }

            </tbody>
          </table>

           <div className='py-3'>

            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />

          </div>
        </div>
      </section>

    </>
  )
}
