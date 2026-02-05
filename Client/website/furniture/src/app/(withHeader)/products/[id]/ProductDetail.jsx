"use client"

import { fetchCartData } from "@/app/redux/slice/cartSlice"
import axios from "axios"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function ProductDetail({ data }) {


 let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  const imgPath = data.imgPath

  // 👉 ફક્ત image name રાખો
  const [mainImage, setMainImage] = useState(data.product.productImage)

  let token = useSelector((myStore) => myStore.user.token)
  
    let dispatch = useDispatch()
  
  
  
    const cartItems = useSelector(
      (state) => state.myCart.cartItems
    );
  
    const isInCart = cartItems.find(
      (item) => item.productId === data._id
    );
  
  
  
    // console.log(imgpath,'productcard=>',data.productImage)
    let addCart = () => {
      let cartObject = {
        pid: data._id,
        name: data.productName,
        salePrice: data.salePrice,
        productImage: data.productImage,
        quantity: 1
      }
      // console.log('cart object=>',cartObject)
  
      axios.post(`${apiBaseUrl}cart/add-to-cart`, cartObject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((apiRes) => apiRes.data)
        .then((finalRes) => {
          // console.log('add to cart response=>',finalRes)
          dispatch(fetchCartData())
        })
  
  
      // dispatch(addToCart(cartObject))
  
    }
  
    let removeCart = () => {
  
  
      axios.post(`${apiBaseUrl}cart/remove-cart`, { cartId: isInCart._id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
  
      })
        .then((apiRes) => apiRes.data)
        .then((finaldata) => {
          console.log(finaldata);
          dispatch(fetchCartData())
  
  
        })
    }
  

  return (
    <div className="max-w-[1120px] mx-auto grid grid-cols-[40%_auto] gap-8 my-10">

      {/* LEFT : Images */}
      <div>
        <div className="border rounded-lg shadow bg-white p-3">
          <img
            src={imgPath + mainImage}
            alt={data.product.productName}
            className="w-full h-[420px] object-contain rounded"
          />
        </div>

        {/* Gallery Images */}
        <div className="flex gap-3 mt-4">
          {data.product.productGallery?.map((img, index) => (
            <img
              key={index}
              src={imgPath + img}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover border rounded cursor-pointer 
                ${mainImage === img ? "border-black" : "border-gray-300"}`}
              alt=""
            />
          ))}
        </div>
      </div>

      {/* RIGHT : Product Info */}
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {data.product.productName}
          </h1>
          <p className="text-gray-500">{data.product.productType}</p>
        </div>

        <div>
          <span className="text-2xl font-bold text-black">
            ₹ {data.product.salePrice}
          </span>
          <span className="line-through text-gray-400 ml-3">
            ₹ {data.product.actualPrice}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Product Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {data.product.productDesc || "No description available"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Stock Available: <span className="font-semibold">{data.product.inStocks}</span>
          </p>
        </div>
        

        <button className="w-full bg-black text-white py-3 rounded-full hover:bg-[#C09578] transition" onClick={addCart}>
          Add to Cart
        </button>
        <button className="w-full bg-red-800 text-white py-3 rounded-full hover:bg-[#C09578] transition" onClick={removeCart}>
          Remove from Cart
        </button>

      </div>
    </div>
  )
}


