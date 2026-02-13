export const dynamic = "force-dynamic";

// import { fetchParents, getProducts } from '@/app/apiServices/productServices'
// import React from 'react'
// // import ProductCat from './ProductCat'
// // import ProductListing from './ProductListing'
// // import { FaProductHunt } from 'react-icons/fa6'
// import Breadcrumb from '@/app/common/Breadcrumb'
// import ProductWrapper from './ProductWrapper'

// export const metadata = {
//   title: "Products",
//   description: "About our products",
// };

// export default async function Product() {


//   let parent= await fetchParents()
//   console.log(parent)

//   let pageName="Products"
//   return (
//     <>
//       <Breadcrumb pageName={pageName}/>

//          <div className='max-w-[1320px} mt-[50px] mx-auto'>
//             {/* <ProductCat product={parent}/> */}
//             <ProductWrapper parents={parent} />
//             {/* <ProductListing /> */}
//          </div>
    

//     </>
//   )
// }
import { fetchParents } from '@/app/apiServices/productServices'
import Breadcrumb from '@/app/common/Breadcrumb'
import ProductWrapper from './ProductWrapper'

export const metadata = {
  title: "Products",
  description: "About our products",
};



export default async function Product() {
  let parent = await fetchParents();

  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="max-w-[1320px] mt-[50px] mx-auto">
        <ProductWrapper parents={parent} />
      </div>
    </>
  );
}
