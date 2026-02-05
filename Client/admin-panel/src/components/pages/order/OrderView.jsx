import React, { useState } from 'react'
import Nav from '../../common/Nav';
import Theadcomponent from '../../common/Theadcomponent';
import OrderDetail from './OrderDetail';



const headings = [
  { label: "", width: "8%" },
  { label: "S. No.", width: "8%" },
  { label: "Order Id", width: "12%" },
  { label: "Name", width: "18%" },
  { label: "Quantity", width: "10%" },
  { label: "Price", width: "12%" },
  { label: "Date", width: "12%" },
  { label: "Status", width: "12%" },
  { label: "View", width: "8%" }
];

const pageName = [
  { label: "View", href: "/order/view" },
];

export default function OrderView() {

  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <>
        <Nav navlinks={pageName} />
        <div className='w-full p-3 min-h-screen '>
          <div className=''>
            <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 mt-10 rounded-t-md border border-slate-400">Orders</h3>
          </div>
          <section className=''>
            <div className='border border-t-0 border-slate-400 rounded-b-lg'>
              <div className="flex justify-between items-center mb-2 p-2">
                <button

                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded">
                  Delete
                </button>
              </div>
              <table className='w-full'>
              <Theadcomponent colums={headings} />
                <tbody>
                  <tr className='hover:bg-gray-50'>
                    <td className='ps-4 py-5'><input type="checkbox" /></td>
                    <td></td>
                    <td className='px-3 py-5'>1</td>
                    <td className='px-3 py-5 text-base'>frank01</td>
                    <td className='px-3 py-5'>Roshan Chaurasia</td>
                    <td className='px-3 py-5'>2</td>
                    <td className='px-3 py-5'>₹ 3500</td>
                    <td className='px-3 py-5'>10/06/2024</td>
                    <td className='px-3 py-5'>Processing...</td>
                    <td className='px-3 py-5'>

                      <button class="text-[14px] text-blue-500 font-semibold hover:text-blue-700 hover:font-semibold"
                        onClick={() => setShowDetails(!showDetails)}>view</button>
                    </td>
                    {showDetails && (
                      <OrderDetail onClose={() => setShowDetails(false)} />
                      

                    )}
                    

                  </tr>

                   
                </tbody>
                 
              </table>
            </div>
          </section>

        </div >
      </>


    </div>
  )
}

