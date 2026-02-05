import React from "react";

export default function ProductDetail({ product, onClose,staticPath}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-5xl">
        {/* header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Product Image's & Price
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center"
          >
            ✕
          </button>
        </div>


        <div className="p-4 space-y-4">
          <div className="grid grid-cols-[22%_45%_27%] gap-10">
            {/* main image */}
            <div className="border-2 rounded-md shadow-md p-4">
              <img
                src={staticPath + product.productImage}
                alt=""
              />
            </div>

            {/* sub images */}
            <div className="flex items-start flex-wrap gap-5 border-2 rounded-md shadow-md p-3">

              {product.productGallery?.map((img, index) => (
                <img
                  key={index}
                  className="w-36"
                  src={staticPath + img}
                  alt=""
                />
              )
              )}
              


            </div>

            {/* product details */}
            <div className="border-2 rounded-md shadow-md p-3">
              <h3 className="text-center font-semibold text-[20px]">
                Product Details
              </h3>
              <ul className="space-y-4 mt-8">
                <li className="font-semibold text-[17px]">
                  Price :
                  <span className="font-normal text-[16px] ">&nbsp; ₹ {product.actualPrice}</span>
                </li>
                <li className="font-semibold text-[17px]">
                  MRP :
                  <span className="font-normal text-[16px] ">&nbsp; ₹ {product.salePrice}</span>
                </li>
                <li className="font-semibold text-[17px]">
                  Manage Stock :
                  <span className="font-normal text-[16px] ">&nbsp; {product.inStocks}</span>
                </li>
                <li className="font-semibold text-[17px]">
                  Brand Name:
                  <span className="font-normal text-[16px] ">&nbsp; Lev's</span>
                </li>
                <li className="font-semibold text-[17px]">
                  Size :
                  <span className="font-normal text-[16px] ">&nbsp; XL </span>
                </li>
                <li className="font-semibold text-[17px]">
                  Color :
                  {/* <span className="font-normal text-[16px] ">&nbsp; 
                      
                   </span> */}
                  {product.productColor.map((c, index) => (
                    <div
                      key={index}
                      title={c.colorName}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: c.colorName }}
                    />
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


