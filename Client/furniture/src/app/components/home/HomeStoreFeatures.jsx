import React from 'react'
import { BiWorld } from "react-icons/bi"

export default function HomeStoreFeatures() {
  return (
    <>

      <section className='py-[40px] max-w-[full] bg-[#F8F9F9] my-[40px]' >
            <div className='max-w-[1120px] grid lg:grid-cols-3 md:grid-cols-1 mx-auto'>
              <div className='p-4 flex flex-col items-center'>
                <div className='h-[50px] w-[50px] p-2 border-gray-500  rounded-full border-1 flex items-center justify-center  hover:border-[#C09578] text-[25px]'><BiWorld className='text-gray-500 hover:text-[#C09578]' /></div>
                <h3 className='py-3 text-[18px] font-bold'>Free Shipping</h3>
                <p className='py-3 text-[13px] text-gray-500'>Free shipping on all order</p>
              </div>
              <div className='p-4 flex flex-col items-center'>
                <div className='h-[50px] w-[50px] p-2 border-gray-500  rounded-full border-1 flex items-center justify-center  hover:border-[#C09578] text-[25px]'><BiWorld className='text-gray-500 hover:text-[#C09578]' /></div>
                <h3 className='py-3 text-[18px] font-bold'>Free Shipping</h3>
                <p className='py-3 text-[13px] text-gray-500'>Free shipping on all order</p>
              </div>
              <div className='p-4 flex flex-col items-center'>
                <div className='h-[50px] w-[50px] p-2 border-gray-500  rounded-full border-1 flex items-center justify-center  hover:border-[#C09578] text-[25px]'><BiWorld className='text-gray-500 hover:text-[#C09578]' /></div>
                <h3 className='py-3 text-[18px] font-bold'>Free Shipping</h3>
                <p className='py-3 text-[13px] text-gray-500'>Free shipping on all order</p>
              </div>
            </div>
    
          </section>

    </>

  )
}
