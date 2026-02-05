import React, { useEffect, useState } from 'react'
import Tableform from '../../common/Tableform'
import { FaPen } from "react-icons/fa";
import Theadcomponent from '../../common/Theadcomponent';
import Nav from '../../common/Nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';
import { toast, ToastContainer } from 'react-toastify';

const headings = [
  { label: "sr no", width: "10%" },
  { label: "Question", width: "20%" },
  { label: "Answer", width: "35%" },
  { label: "Order", width: "10%" },
  { label: "Status", width: "15%" },
  { label: "Action", width: "10%" }
];
const pageName = [

  { label: "Faq", href: "/faq/view" },
  { label: "View", href: "/faq/view" }
];

export default function ViewFaq() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  const [currentPage, setCurrentPage] = useState(1); //pages

  let [totalPages, setTotalPages] = useState(0)

  let [limit, setLimit] = useState(5)

  let [ids, setIds] = useState([]) // status change

  let [allcheck, setAllCheck] = useState(false)

  let [faqData, setfaqData] = useState([])

  let getfaqView = () => {
    axios.get("http://localhost:8000/admin/faq/view", {
      params: {
        page: currentPage, limit
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)
        setfaqData(finalRes.faqRes)
        setTotalPages(finalRes.totpages)
      })
      .catch((err) => {
        console.error(err);

      });


  }

  useEffect(() => {
    getfaqView()
  }, [currentPage, limit])


  let getChecked = (e) => {
    if (e.target.checked) { //if checkbox cheked
      if (!ids.includes(e.target.value)) { // and value not included in ids array
        setIds([...ids, e.target.value]) // include it
      }

    } else { //otherwise
      let filterData = ids.filter((v) => v != e.target.value) //filter data which not include checked box value
      setIds(filterData) // set it so checkbox is uncheked
    }

  }

  useEffect(() => {
    // console.log(ids)
  }, [ids])

  let getAllChecked = (e) => {
    if (e.target.checked) { //if alldata checkbox is cheked
      let finalRes = faqData.map((v) => v._id) // get all ids in databse
      setIds(finalRes)
    }
    else {
      setIds([])
    }
    setAllCheck(!allcheck)
  }

  useEffect(() => {
    // when faqdata have atleast one record and ids and faqdata length is smae
    if (ids.length == faqData.length && faqData.length >= 1) {
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
          await axios.post(`${apiBaseUrl}faq/multi-delete`, { ids });
          getfaqView();

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
      axios.post(`${apiBaseUrl}faq/status-update`,
        {
          ids
        }
      )
        .then((res) => res.data)
        .then((finalRes) => {
          getfaqView()
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
        <Tableform heading="View Faq" onMultiDelete={multiDelete} onStatusUpdate={statusUpdate} />
        <div className='border border-t-0 border-slate-400 rounded-b-lg'>
          <table className='w-full'>
            <Theadcomponent colums={headings} onAllDelete={getAllChecked} allDataChecked={allcheck} />
            <tbody>
              {faqData.length >= 1 ?
                faqData.map((faqObj, index) => {
                  // console.log(faqObj)
                  return (

                    <tr className='hover:bg-gray-50' key={faqObj._id}>

                      <td className='ps-4 py-5'><input type="checkbox" value={faqObj._id} onChange={getChecked} checked={ids.includes(faqObj._id)} /></td>
                      <td>{(currentPage - 1) * limit + index + 1}</td>
                      <td className='px-2 py-5'>{faqObj.faqQue}</td>
                      <td className='px-2 py-5'>{faqObj.faqAns}</td>
                      <td className='px-2 py-5'>{faqObj.faqOrder}</td>
                      <td className='px-2 py-5'>
                        {/* {console.log(faqObj.faqStatus)} */}
                        {faqObj.faqStatus ?

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
                        <Link to={`/edit-faq/${faqObj._id}`}>
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
      </section >
    </>
  )
}
