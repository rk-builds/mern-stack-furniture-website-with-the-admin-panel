import React from 'react'
import Tableform from '../../common/Tableform'
import { FaPen } from "react-icons/fa";
import Theadcomponent from '../../common/Theadcomponent';
import Nav from '../../common/Nav';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const headings = [
  { label: "sr no", width: "10%" },
  { label: "Title", width: "30%" },
  { label: "Image", width: "15%" },
  { label: "Description", width: "20%" },
  { label: "Order", width: "12%" },
  { label: "Status", width: "10%" },
  { label: "Action", width: "10%" }
];
const pageName = [
  { label: "why choose us", href: "/why-choose-us/view" },
  { label: "View", href: "/why-choose-us/view" }
];

export default function WhyChooseUsView() {
  const [currentPage, setCurrentPage] = useState(1); //pages
    
    let [totalPages, setTotalPages] = useState(0)
  
    let [limit, setLimit] = useState(5)
  
    let [ids, setIds] = useState([]) // status change
  
    let [allcheck, setAllCheck] = useState(false)
  
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  
    let [whyData, setWhyData] = useState([])
  
    let [staticPath, setStaticPath] = useState([])
  
    let getwhyChooseView = () => {
      axios.get(`${apiBaseUrl}whyChoose/view`,{
        params: {
          page: currentPage, limit
        }
      })
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes)
  
          setWhyData(finalRes.whyChooseRes)
          setTotalPages(finalRes.totpages)
          // console.log(whyData)
          setStaticPath(finalRes.staticPath)
          console.log(staticPath)
        })
        .catch((err) => {
          console.error(err);
        });
  
  
    }
  
    useEffect(() => {
      getwhyChooseView()
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
        let finalRes = whyChooseData.map((v) => v._id)
        setIds(finalRes)
      }
      else {
        setIds([])
      }
      setAllCheck(!allcheck)
    }
  
    useEffect(() => {
      if (ids.length == whyData.length && whyData.length >= 1) {
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
            await axios.post(`${apiBaseUrl}whyChoose/multi-delete`, { ids });
            getwhyChooseView();
  
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
        axios.post(`${apiBaseUrl}whyChoose/status-update`,
          {
            ids
          }
        )
          .then((res) => res.data)
          .then((finalRes) => {
            getwhyChooseView()
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
        <Tableform heading="View Why Choose Us" onMultiDelete={multiDelete} onStatusUpdate={statusUpdate} />
        <div className='border border-t-0 border-slate-400 rounded-b-lg'>
          <table className='w-full'>
            <Theadcomponent colums={headings} onAllDelete={getAllChecked} allDataChecked={allcheck}/>
            <tbody>
              {
                whyData.length >= 1 ?
                  whyData.map((whyobj, index) => {
                    return (
                      <tr className='hover:bg-gray-50' key={whyobj._id}>
                         {/* {console.log(ids)} */}
                        <td className='ps-4 py-5'><input type="checkbox" value={whyobj._id} onChange={getChecked} checked={ids.includes(whyobj._id)}/></td>
                        <td>{(currentPage-1)*limit+index+1}</td>
                        <td className='px-2 py-5 text-base font-semibold'>{whyobj.whyChooseTitle}</td>
                        <td className='px-2 py-5'>
                          <img src={staticPath + whyobj.whyChooseImage} width={50} alt="" />
                        </td>
                        <td className='px-2 py-5'>{whyobj.whyChooseDes}</td>
                        <td className='px-2 py-5'>{whyobj.whyChooseOrder}</td>
                        <td className='px-2 py-5'>
                          {whyobj.whyChooseStatus ?

                            <button className='bg-gradient-to-r from-green-400 via-green-500 to bg-green-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>
                              Active
                            </button>
                            :
                            <button className='bg-gradient-to-r from-red-400 via-red-500 to bg-red-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>
                              deActive
                            </button>
                          }
                        </td>
                        <td className='px-2 py-5'>
                          <Link to={`/edit-whyChoose/${whyobj._id}`}>
                            <div className=' bg-blue-700 rounded-[50%] w-[40px] h-[40px] text-white flex justify-center items-center'>
                              <FaPen />
                            </div>
                          </Link>
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
