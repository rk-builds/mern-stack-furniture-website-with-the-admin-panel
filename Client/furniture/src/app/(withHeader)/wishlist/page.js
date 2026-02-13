import Breadcrumb from '@/app/common/Breadcrumb'
import React from 'react'
import Wishlist from './Wishlistt'

export const metadata = {
  title: "Wishlist",
  description: "this is wishlist page",
};

export default function WishlistPage() {
  let pageName="Wishlist"
  return (
    <div>
      <Breadcrumb pageName={pageName}/>
      <Wishlist/>
    </div>
  )
}