
import React from 'react'
import ProductCard from '@/app/common/ProductCard'



export default function ProductListing({ products = [], imgPath }) {

  if (!products.length) {
    return <p>No products found</p>
  }

  return (
    <section>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((item,index)=>{
            return(
              <ProductCard key={index} data={item} imgPath={imgPath}/>
            )
            
          })}
       </div>
      
    </section>

    // <div className="grid grid-cols-3 gap-4 flex-1">
    //   {product.map((p) => (
    //     <div key={p._id} className="border p-3">
    //       <h4 className="font-bold">{p.productName}</h4>
    //       <p>₹ {p.productPrice}</p>
    //       <p className="text-sm text-gray-500">
    //         {p.parentCategory?.categoryName}
    //       </p>
    //     </div>
    //   ))}
    // </div>
    
  )
}



