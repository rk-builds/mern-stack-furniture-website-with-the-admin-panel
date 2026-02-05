import React from 'react'

export default function Nav({navlinks=[]}) {
  return (
    <nav className='border-b border-gray-200 p-3 space-x-2'>
      <li className="inline-flex items-center">
        <a className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" href="/Dashboard">Home</a>
      </li>
       {
        navlinks.map((linkItem,index)=>{
          return(
            
            <li className="inline-flex items-center gap-2" key={index}>
                /
                <a className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600" href={`${linkItem.href}`}>{linkItem.label}</a>
            </li> 
               
          )
        })
        } 
    </nav>
  )
}
