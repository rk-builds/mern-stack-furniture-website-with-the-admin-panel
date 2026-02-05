import React from 'react'
// import Image from "next/image";

export default function HomeCollection() {
  return (
    <section className='py-[30px] border-b border-[#EBEBEB]'>

      <div className='max-w-[1170px] mx-auto grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-5'>
        <div className='group overflow-hidden relative' >
          {/* <Image
            src={'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp'}
            width={500}
            height={500}
            alt="Picture of the author"
          /> */}
          <img className='group-hover:scale-125 duration-200' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp" alt="" />
          <div className='absolute left-0 top-0 w-[100%] h-[100%] p-[30px]'>
            <h3 className='text-[13px]'> Design Creative </h3>

            <h2 className='text-[18px] font-bold'>Chair Collection </h2>
          </div>
        </div>
        <div className='group overflow-hidden relative' >
          <img className='group-hover:scale-125 duration-200' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp" alt="" />
          <div className='absolute left-0 top-0 w-[100%] h-[100%] p-[30px]'>
            <h3 className='text-[13px]'> Bestselling Products </h3>

            <h2 className='text-[18px] font-bold'>Chair Collection </h2>
          </div>
        </div>
        <div className='group overflow-hidden relative' >
          <img className='group-hover:scale-125 duration-200' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp" alt="" />
          <div className='absolute left-0 top-0 w-[100%] h-[100%] p-[30px]'>
            <h3 className='text-[13px]'> Onsale Products </h3>

            <h2 className='text-[18px] font-bold'>Chair Collection </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
