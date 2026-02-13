

import React from 'react'
import { CiFaceSmile } from "react-icons/ci"
import { IoHomeOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <>
      <section className='py-[40px] max-w-[full] bg-[#F8F9F9] my-[40px]' >
        <h2 className='text-[20px] font-bold text-center py-5'>Why chose us?</h2>
        <div className='max-w-[1120px] grid grid-cols-3 mx-auto'>
          <div className='p-4 flex flex-col items-center'>
            <div className='h-[50px] w-[50px] p-2 border-gray-500  rounded-full border-1 flex items-center justify-center  hover:border-[#C09578] text-[25px]'><CiFaceSmile className='text-[#C09578]' /></div>
            <h3 className='py-3 text-[18px] font-bold'>Creative Design</h3>
            <p className='py-3 text-[13px] text-gray-500 text-center'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
          </div>
          <div className='p-4 flex flex-col items-center'>
            <div className='h-[50px] w-[50px] p-2 border-gray-500  rounded-full border-1 flex items-center justify-center  hover:border-[#C09578] text-[25px]'><IoHomeOutline  className='text-[#C09578]' /></div>
            <h3 className='py-3 text-[18px] font-bold'>100% Money Back Guarantee</h3>
            <p className='py-3 text-[13px] text-gray-500 text-center'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
          </div>
          <div className='p-4 flex flex-col items-center'>
            <div className='h-[50px] w-[50px] p-2 border-gray-500  rounded-full border-1 flex items-center justify-center  hover:border-[#C09578] text-[25px]'><IoHomeOutline  className=' text-[#C09578]' /></div>
            <h3 className='py-3 text-[18px] font-bold'>Online Support 24/7</h3>
            <p className='py-3 text-[13px] text-gray-500 text-center'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
          </div>
        </div>
      </section>




    </>
  )
}




