import React, { useState } from 'react'
import Theadcomponent from '../../common/Theadcomponent';
import Nav from '../../common/Nav';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import ProductDetail from './ProductDetail';
import { useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router';

const headings = [
  // { label: "Delete", width: "8%" },
  { label: "S. No.", width: "12%" },
  { label: "Product Name", width: "16%" },
  { label: "Description", width: "20%" },
  { label: "Short Description", width: "16%" },
  { label: "Thumbnails", width: "14%" },
  { label: "Action", width: "12%" },
  { label: "Status", width: "10%" }
];
const pageName = [
  { label: "Products", href: "/products/view" },
  { label: "View", href: "/products/view" }
];

export default function Viewproducts() {
  const [currentPage, setCurrentPage] = useState(1); //pages

  let [totalPages, setTotalPages] = useState(1)

  let [limit, setLimit] = useState(5)

  let [ids, setIds] = useState([]) // status change

  let [allcheck, setAllCheck] = useState(false)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [productData, setProductData] = useState([])

  let [staticPath, setStaticPath] = useState([])

  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  let getProductView = () => {
    axios.get(`${apiBaseUrl}product/view`, {
      params: {
        page: currentPage, limit
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)

        setProductData(finalRes.productData)
        setTotalPages(finalRes.totpages)
        setStaticPath(finalRes.staticPath)
      })
      .catch((err) => {
        toast.error(err);
      });


  }

  useEffect(() => {
    getProductView()
  }, [currentPage, limit])


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
      let finalRes = producrtData.map((v) => v._id)
      setIds(finalRes)
    }
    else {
      setIds([])
    }
    setAllCheck(!allcheck)
  }

  useEffect(() => {
    if (ids.length == productData.length && productData.length >= 1) {
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
          await axios.post(`${apiBaseUrl}product/multi-delete`, { ids });
          getProductView()

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
      axios.post(`${apiBaseUrl}product/status-update`,
        {
          ids
        }
      )
        .then((res) => res.data)
        .then((finalRes) => {
          getProductView()
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
      <div className='w-full p-3 min-h-screen '>
        <div className=' bg-slate-100 py-2 px-3 mt-10 rounded-t-md border border-slate-400 flex justify-between'>
          <h3 className="text-[20px] font-semibold ">Product Items</h3>
          <div className='flex gap-2'>
            <button type="button" className='bg-[#15803D] px-4 py-2 text-white rounded-xl font-bold'
              onClick={statusUpdate}>
              Change Status
            </button>
            <button type="button" className='bg-[#B91C1C] px-4 py-2 text-white rounded-xl font-bold'
              onClick={multiDelete}
            >
              Delete
            </button>
          </div>

        </div>
        <section className=''>
          <div className='border border-t-0 border-slate-400 rounded-b-lg'>
            <table className='w-full'>
              <Theadcomponent colums={headings} onAllDelete={getAllChecked} allDataChecked={allcheck} />
              <tbody>
                {console.log(productData)}
                {productData.length >= 1 ?
                  productData.map((obj, index) => {

                    return (

                      <tr className='hover:bg-gray-50' key={obj._id}>
                        <td className='ps-4 py-5'><input type="checkbox" value={obj._id} onChange={getChecked} checked={ids.includes(obj._id)} /></td>
                        <td>{(currentPage - 1) * limit + index + 1}</td>
                        <td className='px-2 py-5 text-base font-semibold'>{obj.productName}</td>
                        <td className='px-2 py-5'>
                          <p className='line-clamp-1 w-[180px]'>
                            {obj.productDesc}
                          </p>
                          <button className="text-[14px] text-blue-500 font-semibold hover:text-blue-700 hover:font-semibold">Read More</button>
                        </td>
                        <td className='px-2 py-5'>
                          <p className='line-clamp-1 w-[180px]'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum excepturi
                          </p>
                          <button className="text-[14px] text-blue-500 font-semibold hover:text-blue-700 hover:font-semibold"
                            onClick={() => {
                              setSelectedProduct(obj);  // obj is the product data
                              setShowDetails(true);
                            }}>Read More</button>
                        </td>




                        <td className='px-2 py-5'>
                          <img className="w-16 h-16 rounded-md object-cover" src={staticPath + obj.productImage} alt=""></img>
                        </td>
                        <td className='px-2 py-5 mt-5 flex gap-3'><RiDeleteBin6Line className='text-red-600 font-bold' /> <span className='font-bold'>|</span><Link to={`/edit-product/${obj._id}`}><FiEdit className='text-orange-400 font-bold' /></Link></td>
                        <td className='px-2 py-5'>
                          {obj.productStatus ?

                            <button className='bg-gradient-to-r from-green-400 via-green-500 to bg-green-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>
                              Active
                            </button>
                            :
                            <button className='bg-gradient-to-r from-red-400 via-red-500 to bg-red-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>
                              deActive
                            </button>
                          }
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



            {showDetails && selectedProduct && (
              <ProductDetail product={selectedProduct} staticPath={staticPath} onClose={() => setShowDetails(false)} />
            )}


            <div className='py-3'>

              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />

              {
                console.log({
                  currentPage,
                  totalPages,
                  limit
                })

              }

            </div>

          </div>
        </section>

      </div >
    </>

  )
}
