import React from 'react'

export default function Theadcomponent({ colums,onAllDelete,allDataChecked }) {
  return (
    <thead className='bg-gray-100  text-gray-700 uppercase text-[13px]'>
      <tr>
        <th scope="col" className='px-4 py-3 text-left'><input type="checkbox" onChange={onAllDelete} 
         checked={allDataChecked}/></th>
        {
          colums.map((colHead, index) => (
            <th key={index} className={`w-[${colHead.width}] px-2 py-3 text-left`}>
              {colHead.label}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}
