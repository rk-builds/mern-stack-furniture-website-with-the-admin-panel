import Breadcrumb from '@/app/common/Breadcrumb'
import React from 'react'
import CheckContent from './CheckContent'

export const metadata = {
  title: "checkout page",
  description: "this is checkout page",
};

export default function CheckOut() {
  let pageName="CheckOut"
  return (
    <div>
      <Breadcrumb pageName={pageName}/>
      <CheckContent/>
    </div>
  )
}
