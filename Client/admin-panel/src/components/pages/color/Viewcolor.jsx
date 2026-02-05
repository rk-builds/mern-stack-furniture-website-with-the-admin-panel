import React, { useEffect, useState } from 'react'
import Tableform from '../../common/Tableform'
import { FaPen } from "react-icons/fa";
import Theadcomponent from '../../common/Theadcomponent';
import Nav from '../../common/Nav';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';


const headings = [
  { label: "sr no", width: "10%" },
  { label: "color Name", width: "35%" },
  { label: "code", width: "10%" },
  { label: "order", width: "15%" },
  { label: "Status", width: "10%" },
  { label: "Action", width: "10%" }
];

const pageName = [
  { label: "Color", href: "/Viewcolor" },
  { label: "View", href: "/Viewcolor" }
];



export default function Viewcolor() {

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  // console.log(apiBaseUrl)

  let [searchBox, setSearchBox] = useState('')

  const [currentPage, setCurrentPage] = useState(1); //pages

  let [totalPages, setTotalPages] = useState(0)

  let [limit, setLimit] = useState(5)

  let [ids, setIds] = useState([]) // for checkboxes 

  let [colorData, setColorData] = useState([]) // recordes fetch from databse

  let [allcheck, setAllCheck] = useState(false) // for select or unchec all checkboxes

  let getColorView = () => {


    axios.get("http://localhost:8000/admin/color/view", {
      params: {
        page: currentPage, limit,searchBox
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)
        setColorData(finalRes.colorData)
        setTotalPages(finalRes.totpages)
      })
      .catch((err) => {
        // console.error(err);
      });


  }

  useEffect(() => {
    getColorView()
  }, [currentPage, limit,searchBox])

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
    console.log(ids)
  }, [ids])

  let getAllChecked = (e) => {
    if (e.target.checked) {
      let finalRes = colorData.map((v) => v._id)
      setIds(finalRes)
    }
    else {
      setIds([])
    }
    setAllCheck(!allcheck)
  }

  useEffect(() => {
    if (ids.length == colorData.length && colorData.length >= 1) {
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
          await axios.post(`${apiBaseUrl}color/multi-delete`, { ids });
          getColorView();

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
  };

  //status-update
  let statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${apiBaseUrl}color/status-update`,
        {
          ids
        }
      )
        .then((res) => res.data)
        .then((finalRes) => {
          getColorView()
          setIds([])
        })
    }
    else {
      toast.error("Please select one checkbox")
    }

  }

  
  const handleSearch = (keyword) => {
    setSearchBox(keyword);
  };

  return (
    <>
      <ToastContainer />
      <Nav navlinks={pageName} />
      <section className='p-10 min-h-screen '>
        <Tableform heading="View Color" onMultiDelete={multiDelete} onStatusUpdate={statusUpdate} onSearch={handleSearch} />
        <div className='border border-t-0 border-slate-400 rounded-b-lg'>
          <table className='w-full'>
            <Theadcomponent colums={headings} onAllDelete={getAllChecked} allDataChecked={allcheck} />
            <tbody>
              {
                colorData.length >= 1 ?
                  colorData.map((colorObj, index) => {
                    return (

                      <tr className='hover:bg-gray-50' key={index}>

                        <td className='ps-4 py-5'>
                          <input type="checkbox" value={colorObj._id} onChange={getChecked} checked={ids.includes(colorObj._id)} />
                        </td>
                        <td>{(currentPage - 1) * limit + index + 1}</td>
                        <td className='px-2 py-5 text-base font-semibold'>{colorObj.colorName}</td>
                        <td className='px-2 py-5'>{colorObj.colorCode}</td>
                        <td className='px-2 py-5'>{colorObj.colorOrder}</td>
                        <td className='px-2 py-5'>
                          {colorObj.colorStatus ?
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
                          <Link to={`/edit-color/${colorObj._id}`}>
                            <div className='bg-blue-700 rounded-[50%] w-[40px] h-[40px] text-white flex justify-center items-center'>
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
