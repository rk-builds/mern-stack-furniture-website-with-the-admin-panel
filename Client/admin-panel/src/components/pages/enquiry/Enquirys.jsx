import React from 'react'
import Tableform from '../../common/Tableform'
import { FaPen } from "react-icons/fa";
import Theadcomponent from '../../common/Theadcomponent';
import Nav from '../../common/Nav';

const headings = [
  { label: "Name", width: "40%" },
  { label: "Subject", width: "10%" },
  { label: "Message", width: "20%" },
  { label: "Status", width: "10%" },
  { label: "Action", width: "10%" }
];

const pageName = [
  { label: "Enquiry", href: "/Enquiry" },
  { label: "View", href: "/Enquiry" }
];

export default function Enquirys() {
  return (
    <>
      <Nav navlinks={pageName}/>
      <section className='p-10 min-h-screen '>
        <Tableform heading="Contact Enquiry Management" />
        <div className='border border-t-0 border-slate-400 rounded-b-lg'>
          <table className='w-full'>
            <Theadcomponent colums={headings}/>
            <tbody>
              <tr className='hover:bg-gray-50'>
                <td className='ps-4 py-5'><input type="checkbox" /></td>
                <td className='px-2 py-5 text-base font-semibold'>XYZ</td>
                <td className='px-2 py-5'>xyz@gmail.com</td>
                <td className='px-2 py-5'>9999999999</td>
                <td className='px-2 py-5'><button className='bg-gradient-to-r from-green-400 via-green-500 to bg-green-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>Active</button></td>
                <td className='px-2 py-5'><a><div className=' bg-blue-700 rounded-[50%] w-[40px] h-[40px] text-white flex justify-center items-center'><FaPen /></div></a></td>
              </tr>
              <tr className='hover:bg-gray-50'>
                <td className='ps-4 py-5'><input type="checkbox" /></td>
                <td className='px-2 py-5 text-base font-semibold'>ABC</td>
                <td className='px-2 py-5'>abc@gmail.com</td>
                <td className='px-2 py-5'>99999444444</td>
                <td className='px-2 py-5'><button className='bg-gradient-to-r from-red-400 via-red-500 to bg-red-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>Deactive</button></td>
                <td className='px-2 py-5'><a><div className=' bg-blue-700 rounded-[50%] w-[40px] h-[40px] text-white flex justify-center items-center'><FaPen /></div></a></td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

    </>
  )
}
