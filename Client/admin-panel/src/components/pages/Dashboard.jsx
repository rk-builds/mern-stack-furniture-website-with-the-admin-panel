import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Dashboard() {
    return (
        <>
            <nav className='border-b border-gray-200 p-3 space-x-2'>
                <li class="inline-flex items-center">
                    <a class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" href="/home">Home</a>
                </li>
                <li class="inline-flex items-center gap-2">
                    /
                    <a class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" href="/Dashboard">Dashboard</a>
                </li>
            </nav>
            <section className='p-10 max-w-[1200px]'>
                <div className='grid grid-cols-3 gap-3'>
                    <div className='h-48 rounded-md shadow-lg p-5 bg-fuchsia-700'>
                        <div class="flex justify-between items-center">
                            <h3 class="text-[25px] text-white font-bold">26K <span class="text-[18px]">(-12.4% ↓)</span></h3>
                            <span className='text-white text-[25px] font-bold'><BsThreeDotsVertical /></span>
                        </div>
                        <h3 class="text-[22px] font-semibold text-white">Users</h3>
                    </div>
                    <div className='h-48 rounded-md shadow-lg p-5 bg-[#2998FE]'>
                        <div class="flex justify-between items-center">
                            <h3 class="text-[25px] text-white font-bold">$6,200 <span class="text-[18px]">(40.9% ↑)</span></h3>
                            <span className='text-white text-[25px] font-bold'><BsThreeDotsVertical /></span>
                        </div>
                        <h3 class="text-[22px] font-semibold text-white">Product</h3>
                    </div>
                    <div className='h-48 rounded-md shadow-lg p-5 bg-[#FCB01E]'>
                        <div class="flex justify-between items-center">
                            <h3 class="text-[25px] text-white font-bold">2.49% <span class="text-[18px]">(84.7% ↑)</span></h3>
                            <span className='text-white text-[25px] font-bold'><BsThreeDotsVertical /></span>
                        </div>
                        <h3 class="text-[22px] font-semibold text-white">Category</h3>
                    </div>
                    <div className='h-48 rounded-md shadow-lg p-5 bg-[#E95353]'>
                        <div class="flex justify-between items-center">
                            <h3 class="text-[25px] text-white font-bold">44K <span class="text-[18px]">(-23.6% ↓)</span></h3>
                            <span className='text-white text-[25px] font-bold'><BsThreeDotsVertical /></span>
                        </div>
                        <h3 class="text-[22px] font-semibold text-white">Orders</h3>
                    </div>
                </div>
            </section>
        </>

    )
}
