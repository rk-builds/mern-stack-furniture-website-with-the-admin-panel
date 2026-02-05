import React from "react";

export default function OrderDetail({ onClose }) {


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg relative p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          X 
        </button>

        {/* Page Heading */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-lg font-semibold">#ORD-1023</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="text-lg font-semibold">10/06/2024</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="text-lg font-semibold">Roshan Chaurasia</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600 font-semibold">
              Processing
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-700">
            21, Shyam Nagar, Near Bus Stop,
            <br />
            Palanpur, Gujarat - 385001
          </p>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">HP Laptop 15s</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">₹ 35,000</td>
                <td className="px-4 py-3">₹ 70,000</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Dell Mouse Wireless</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">₹ 800</td>
                <td className="px-4 py-3">₹ 800</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="mt-8 flex justify-end">
          <div className="w-1/3 border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹ 70,800</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">₹ 200</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-lg font-bold">
              <span>Total</span>
              <span>₹ 71,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
