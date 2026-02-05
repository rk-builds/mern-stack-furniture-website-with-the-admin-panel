import React from 'react'
import { BiMenu, BiUser } from 'react-icons/bi';
import { FcMenu } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { RiProfileFill } from 'react-icons/ri';
import { LuLogOut } from 'react-icons/lu';
import { Link } from 'react-router';
import { useContext } from 'react';
import { LoginContext } from '../../context/mainContext';

export default function Header() {
  let {id,setId}=useContext(LoginContext)
  return (
    <div className='p-2 border-b-2 border-gray-200'>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center">
          <span className='text-[25px]'><FcMenu /></span>
          <span className=" text-xl ms-5 text-slate-500 font-semibold">
            Dashboard
          </span>
        </div>
        <div className='flex justify-between items-center gap-1'>
          <figure className='w-12 h-12 rounded-full cursor-pointer group relative'>
            <img className="w-12 h-12 rounded-full object-cover" src="/images/user.jpg" alt="" />
            <div className='absolute bg-white right-0 top-[35px] m-2  border-1 border-gray-200 rounded-lg hidden group-hover:block'>
              <ul className="w-48 z-50 shadow-lg p-1 ">
                <li>
                  <Link to={'/admin-profile'} className='flex justify-start items-center gap-2 p-2 border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700'>
                     <span className='text-[20px]'><FaUserCircle /></span>
                     <span className='text-[14px] '>profile</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/company-profile'} className='flex justify-start items-center gap-2 p-2 border-b hover:bg-gray-100 hover:text-blue-700'>
                     <span className='text-[20px]'><RiProfileFill /></span>
                     <span className='text-[14px]'> company profile</span> 
                  </Link>
                </li>
                
                  <li className='flex justify-start items-center gap-2 p-2 hover:bg-gray-100 hover:text-blue-700'>
                     <span className='text-[20px]'><LuLogOut /></span>
                     <span onClick={()=>setId('')}   className='text-[14px]'>Logout</span>
                </li>
              </ul>
            </div>
          </figure>
          <div className='text-[20px] md:hidden sm:block'>
              <a href=""><BiMenu/></a>
          </div>
        </div>
      </div>

    </div>
  )
}
