import Breadcrumb from '@/app/common/Breadcrumb'
import React from 'react'
import CartContent from './CartContent'

export const metadata = {
  title: "cart page",
  description: "this is cart page",
};

export default function AddToCart() {
   let pageName="Shopping Cart"
  return (

    <>
    <Breadcrumb pageName={pageName}/>
    <CartContent/>
    </>
  )
}
