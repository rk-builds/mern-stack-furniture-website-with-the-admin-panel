"use client"

import React from 'react'



export default function Wishlist() {
  return (
    <div className="w-full p-4">
      <div className="max-w-6xl mx-auto bg-white border rounded-lg shadow-sm p-4">

        <h2 className="text-xl font-semibold mb-4">
          My Wishlist
        </h2>

        {/* TABLE WRAPPER FOR MOBILE SCROLL */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Delete</th>
                <th className="border px-4 py-2 text-left">Image</th>
                <th className="border px-4 py-2 text-left">Product</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Stock Status</th>
                <th className="border px-4 py-2 text-left">Add To Cart</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50">
                {/* DELETE */}
                <td className="border px-4 py-2">
                  <button className="text-red-500 font-bold">
                    X
                  </button>
                </td>

                {/* IMAGE */}
                <td className="border px-4 py-2">
                  <img
                    src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg"
                    alt="Hrithvik Stool"
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>

                {/* PRODUCT NAME */}
                <td className="border px-4 py-2 font-medium">
                  Hrithvik Stool
                </td>

                {/* PRICE */}
                <td className="border px-4 py-2">
                  Rs. 6,000
                </td>

                {/* STOCK */}
                <td className="border px-4 py-2 text-red-500">
                  Out of Stock
                </td>

                {/* ADD TO CART */}
                <td className="border px-4 py-2">
                  <button
                    className="px-3 py-1 border rounded-md
                               hover:bg-black hover:text-white transition"
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
