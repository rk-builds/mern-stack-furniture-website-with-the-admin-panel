
'use client'

// import { useEffect, useState } from 'react'
// import { getProducts } from '@/app/apiServices/productServices'
// import ProductCat from './ProductCat'
// import ProductListing from './ProductListing'

// export default function ProductWrapper({ parents }) {
//   const [filters, setFilters] = useState({})
//   const [products, setProducts] = useState([])
//   const [staticPath, setStaticPath] = useState('')

//   useEffect(() => {
//     fetchProducts()
//   }, [filters])

//   const fetchProducts = async () => {
//     const res = await getProducts(filters)
//     setProducts(res.productData)
//     setStaticPath(res.staticPath)
//   }

//   return (
//     <div className='max-w-[1320px] mt-[50px] mx-auto grid grid-cols-[20%_auto] gap-5'>
//       <ProductCat parents={parents} setFilters={setFilters} />
//       <ProductListing
//         products={products}
//         imgPath={staticPath}
//       />
//     </div>
//   )
// }



import { useEffect, useState } from 'react'
import { getProducts } from '@/app/apiServices/productServices'
import ProductCat from './ProductCat'
import ProductListing from './ProductListing'

export default function ProductWrapper({ parents }) {
  const [filters, setFilters] = useState({})
  const [products, setProducts] = useState([])
  const [staticPath, setStaticPath] = useState('')

  console.log("Products in Wrapper:", products)

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    const res = await getProducts(filters)
    setProducts(res.productData)
    setStaticPath(res.staticPath)
  }

  return (
    // <div className='max-w-[1320px] mt-[50px] mx-auto grid grid-cols-[20%_auto] gap-5'>
    //   <ProductCat parents={parents} setFilters={setFilters} />
    //   <ProductListing
    //     products={products}
    //     imgPath={staticPath}
    //   />
    // </div>

   
    <div className="max-w-[1320px] mt-[50px] mx-auto px-4 sm:px-6 md:px-8">

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Sidebar */}
        <div className="w-full lg:w-[20%]">
          <ProductCat parents={parents} setFilters={setFilters} />
        </div>

        {/* Product Listing */}
        <div className="w-full lg:w-[80%]">
          <ProductListing
            products={products}
            imgPath={staticPath}
          />
        </div>

      </div>
    </div>
  )

 
}
