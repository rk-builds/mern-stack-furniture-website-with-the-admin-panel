import React from 'react'

export default function HomeNewTrendBanner() {
  return (
    // <div className='max-w-full overflow-hidden'>
    //   <div className="bg-[url('https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg')] bg-no-repeat bg-center bg-cover h-[450px]  w-[100%] py-[50px]">
    //     <div className=" max-w-[1170px] p-[50px] mx-auto hover:scale-105">
    //       <h2 className='text-[50px] font-bold'>New Trending Collection</h2>
    //       <span className='text-[16px] py-3'>We Believe That Good Design is Always in Season</span>
    //       <div className='mt-[60px]'>
    //         <a href="#" className='p-2 border-1'>shopping Now</a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full overflow-hidden">
  <div className="bg-[url('https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg')] 
                  bg-no-repeat bg-center bg-cover 
                  h-[300px] sm:h-[350px] md:h-[450px] 
                  flex items-center">
    
    <div className="max-w-[1170px] w-full px-4 sm:px-8 md:px-12 mx-auto transition-transform duration-300 hover:scale-105">
      
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
        New Trending Collection
      </h2>
      
      <span className="block text-sm sm:text-base py-3">
        We Believe That Good Design is Always in Season
      </span>
      
      <div className="mt-6 sm:mt-10">
        <a href="#" className="inline-block px-4 py-2 border border-black text-sm sm:text-base hover:bg-black hover:text-white transition">
          Shopping Now
        </a>
      </div>

    </div>
  </div>
</div>
  )
}
