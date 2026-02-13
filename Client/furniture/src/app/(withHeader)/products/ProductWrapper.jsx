
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
 
    console.log("Products in Wrapper:",products)

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    const res = await getProducts(filters)
    setProducts(res.productData)
    setStaticPath(res.staticPath)
  }

  return (
    <div className='max-w-[1320px] mt-[50px] mx-auto grid grid-cols-[20%_auto] gap-5'>
      <ProductCat parents={parents} setFilters={setFilters} />
      <ProductListing
        products={products}
        imgPath={staticPath}
      />
    </div>
  )
}
