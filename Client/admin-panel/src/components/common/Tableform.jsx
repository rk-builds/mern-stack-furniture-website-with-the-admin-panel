import React, { useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaFilterCircleXmark } from "react-icons/fa6";


export default function Tableform({ heading, onMultiDelete, onStatusUpdate, onSearch }) {

  let [showFilter, setShowFilter] = useState(false);

  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <>
      {showFilter &&
        <div className="bg-gray-50 px-2 py-5 max-w-[1100px] duration-[1s] mx-auto mt-5 block">
          <form className="flex max-w-sm" onSubmit={handleSubmit}>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 
                focus:outline-none"
                placeholder="Search name..."
                required
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border 
              border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <span className="sr-only">Search</span>
              <IoSearch />
            </button>
          </form>
        </div>
      }

      {/* form */}
      <div className='border border-slate-400 rounded-t-lg'>
        <form action="" >
          <div className='flex justify-between items-center p-3'>
            <h2 className='font-bold text-[22px]'>{heading}</h2>
            <div className='flex gap-5'>
              <button type="button" className='bg-[#1D4ED8] p-2 text-[20px] text-white rounded-xl' onClick={() => setShowFilter(!showFilter)}>
                {showFilter ? <FaFilterCircleXmark /> : <FaFilter />}
              </button>
              <button type="button" className='bg-[#15803D] px-4 py-2 text-white rounded-xl font-bold'
                onClick={onStatusUpdate}>
                Change Status
              </button>
              <button type="button" className='bg-[#B91C1C] px-4 py-2 text-white rounded-xl font-bold'
                onClick={onMultiDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>


    </>
  )
}
