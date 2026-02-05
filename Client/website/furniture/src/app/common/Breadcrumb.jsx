import Link from 'next/link'
import React from 'react'

export default function Breadcrumb({pageName}) {
  return (
    <div className='py-5 border-b-1 border-gray-300'>
        <h1 className='text-center font-bold text-[30px]'>{pageName}</h1>
        <div className='text-center text-[#C09578]'> <Link href={'/'}>  home </Link> {">"} {pageName} </div>
 
    </div>
  )
}
