import { getSingleProduct } from '@/app/apiServices/productServices'
import Breadcrumb from '@/app/common/Breadcrumb'
import React from 'react'
import ProductDetail from './ProductDetail'

export const metadata = {
  title: "Product Details",
  description: "Detailed view of a single product",
};

export default async function SingleProductDetails(data) {

 

   let {id} =await data.params
   let spData = await getSingleProduct(id)
   console.log(spData)
  //  sp=single product
  return (
  
       spData &&  <>
        
        <Breadcrumb pageName={spData.product.productName} />
        <ProductDetail data={spData}/>
        <div class="fa fa-drivers-license">

        </div>
        </>
      
    
  )
}
