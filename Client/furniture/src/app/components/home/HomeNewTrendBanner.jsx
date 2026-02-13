import React from 'react'

export default function HomeNewTrendBanner() {
  return (
    <div className='max-w-full overflow-hidden'>
      <div className="bg-[url('https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg')] bg-no-repeat bg-center bg-cover h-[450px] w-[100%] py-[50px]">
        <div className=" max-w-[1170px] p-[50px] mx-auto hover:scale-105">
          <h2 className='text-[50px] font-bold'>New Trending Collection</h2>
          <span className='text-[16px] py-3'>We Believe That Good Design is Always in Season</span>
          <div className='mt-[60px]'>
            <a href="#" className='p-2 border-1'>shopping Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
