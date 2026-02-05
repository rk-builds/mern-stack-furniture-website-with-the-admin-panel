import React from 'react'
import { FaFilter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

export default function User() {
    return (
        <>
            <nav className='border-b border-gray-200 p-3 space-x-2'>
                <li class="inline-flex items-center">
                    <a class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" href="/Dashboard">Home</a>
                </li>
                <li class="inline-flex items-center gap-2">
                    /
                    <a class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" href="/user">User</a>
                </li>
                <li class="inline-flex items-center gap-2">
                    /
                    <a class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" href="/user">View</a>
                </li>
            </nav>
            <section className='p-10 min-h-screen '>
                <div>
                    <div className='border border-slate-400 rounded-t-lg'>
                         <form action="">
                           <div className='flex justify-between items-center p-3'>
                               <h2 className='font-bold text-[22px]'>View User</h2>
                               <div className='flex gap-5'>
                                   <button type="button" className='bg-[#1D4ED8] p-2 text-[20px] text-white rounded-xl'>
                                       <FaFilter />
                                   </button>
                                   <button type="submit" className='bg-[#15803D] px-4 py-2 text-white rounded-xl font-bold'>
                                       Change Status
                                   </button>
                                   <button type="submit" className='bg-[#B91C1C] px-4 py-2 text-white rounded-xl font-bold'>
                                       Delete
                                   </button>
                               </div>
                            </div>
                         </form> 
                    </div>
                    
                    <div className='border border-t-0 border-slate-400 rounded-b-lg'>
                        <table className='w-full'>
                            <thead className='bg-gray-100  text-gray-700 uppercase text-[13px]'>
                                <tr>
                                    <th scope="col" className='ps-4 py-3 text-left'><input type="checkbox" /></th>
                                    <th scope="col" className='px-2 py-3 text-left w-[40%]'>Name</th>
                                    <th scope="col" className='px-4 py-3 text-left w-[20%]'>Email</th>
                                    <th scope="col" className='px-4 py-3 text-left w-[15%]'>Mobile No</th>
                                    <th scope="col" className='px-4 py-3 text-left w-[11%]'>Status</th>
                                    <th scope="col" className='px-4 py-3 text-left w-[12%]'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='hover:bg-gray-50'>
                                    <td className='ps-4 py-5'><input type="checkbox" /></td>
                                    <td className='px-4 py-5 text-base font-semibold'>XYZ</td>
                                    <td className='px-4 py-5'>xyz@gmail.com</td>
                                    <td className='px-4 py-5'>9999999999</td>
                                    <td className='px-4 py-5'><button className='bg-gradient-to-r from-green-400 via-green-500 to bg-green-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>Active</button></td>
                                    <td className='px-4 py-5'><a><div className=' bg-blue-700 rounded-[50%] w-[40px] h-[40px] text-white flex justify-center items-center'><FaPen /></div></a></td>
                                </tr>
                                <tr className='hover:bg-gray-50'>
                                    <td className='ps-4 py-5'><input type="checkbox" /></td>
                                    <td className='px-4 py-5 text-base font-semibold'>ABC</td>
                                    <td className='px-4 py-5'>abc@gmail.com</td>
                                    <td className='px-4 py-5'>99999444444</td>
                                    <td className='px-4 py-5'><button className='bg-gradient-to-r from-red-400 via-red-500 to bg-red-700 text-white px-3 p-2 rounded-lg font-medium hover:bg-gradient-to-br'>Deactive</button></td>
                                    <td className='px-4 py-5'><a><div className=' bg-blue-700 rounded-[50%] w-[40px] h-[40px] text-white flex justify-center items-center'><FaPen /></div></a></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>


        </>
    )
}
