'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosHeart } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartData, removeFromCart } from '../redux/slice/cartSlice';
import axios from 'axios';

export default function ProductCard({ data, imgPath }) {

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let [imgpath, setImgPath] = useState(imgPath)

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




  // let deleteData=()=>{
  //   dispatch(removeFromCart({id:data._id}))
  // }
  return (



    <div className=" border border-gray-200 rounded-lg shadow-sm">
    
      {/* Product Image */}
      <Link href={`/products/${data.slug}`}>
        <img
          className="rounded-t-lg w-full h-[300px] object-cover"
          src={imgpath + data.productImage}
          alt={data.productName}
        />
       </Link>

      {/* Product Info */}
      <div className="p-3 text-center">

        <h5 className="text-[15px] font-semibold text-gray-800 mb-1">
          {data.productName}
        </h5>

        {/* Price section */}
        <div className="mb-2">
          <span className="text-gray-400 line-through text-sm mr-2">
            ₹{data.actualPrice}
          </span>
          <span className="text-[#C09578] font-semibold text-[16px]">
            ₹{data.salePrice}
          </span>
        </div>
      
     
        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 pt-2">

          <button
            type="button"
            className="p-2 border border-[#E1E3E1] rounded hover:text-[#C09578]"
          >
            <IoIosHeart className="text-[18px] text-[#C09578]" />
          </button>

          {
            isInCart ? (

              <button
                type="button"
                className="p-2 border border-[#C09578] bg-red-800 text-white text-[14px]"
                onClick={removeCart}
              >
                Remove From Cart
              </button>

            ) : (
              <button
                type="button"
                onClick={() => addCart()}
                className="p-2 border border-[#E1E3E1] hover:border-[#C09578] hover:text-[#C09578] text-[14px] text-gray-500"
              >
                Add to Cart
              </button>
            )
          }

        </div>
      </div>
    
    </div >

  )
}

