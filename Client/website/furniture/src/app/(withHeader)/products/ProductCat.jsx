'use client'

import { useState } from 'react'
import axios from 'axios'

export default function ProductCat({ parents, setFilters }) {

  const [activeParent, setActiveParent] = useState(null)
  const [subCats, setSubCats] = useState([])

  // Parent click → fetch sub categories
  const handleParentClick = async (parentId) => {
    setActiveParent(parentId)

    const res = await axios.get(
      `http://localhost:8000/admin/product/sub-category/${parentId}`
    )

    setSubCats(res.data.subCatParentRes || [])
  }

  // Sub-category click → apply filter
  const handleSubCatClick = (subId) => {
    setFilters({ subCat: subId })
  }

  return (
    <div className="bg-white border rounded-lg p-5 sticky top-24">

      {/* CATEGORY TITLE */}
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">
        Categories
      </h3>

      {/* PARENT CATEGORIES */}
      <ul className="space-y-3">
        {parents.map(parent => (
          <li key={parent._id}>
            <button
              onClick={() => handleParentClick(parent._id)}
              className={`w-full text-left font-medium ${
                activeParent === parent._id
                  ? 'text-black'
                  : 'text-gray-600'
              }`}
            >
              {parent.categoryName}
            </button>

            {/* SUB CATEGORIES */}
            {activeParent === parent._id && (
              <ul className="mt-3 ml-4 space-y-2">
                {subCats.map(sub => (
                  <li
                    key={sub._id}
                    onClick={() => handleSubCatClick(sub._id)}
                    className="cursor-pointer text-sm text-gray-600 hover:text-black"
                  >
                    ▸ {sub.subCategoryName}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* PRICE FILTER */}
      <h3 className="text-lg font-semibold mt-8 mb-4 border-b pb-2">
        Price
      </h3>

      <ul className="space-y-3 text-gray-700">
        <li
          className="cursor-pointer hover:text-black"
          onClick={() => setFilters({ maxPrice: 5000 })}
        >
           under ₹5000 
        </li>

        <li
          className="cursor-pointer hover:text-black"
          onClick={() => setFilters({ maxPrice: 10000 })}
        >
          unnder ₹10000 
        </li>

        <li
          className="cursor-pointer hover:text-black"
          onClick={() => setFilters({ minPrice: 25000 })}
        >
          ₹25000 & above
        </li>
      </ul>

      {/* CLEAR FILTER */}
      <button
        onClick={() => setFilters({})}
        className="mt-6 w-full py-2 bg-gray-100 hover:bg-black hover:text-white rounded transition"
      >
        Clear Filters
      </button>
    </div>
  )
}
