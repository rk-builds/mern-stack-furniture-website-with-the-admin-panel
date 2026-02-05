import React from 'react'

export default function Orders() {
  return (
    <div className="p-2">

      <div>
        <h3 className="text-xl font-semibold mb-4">
          Orders
        </h3>

        {/* Table Responsive Wrapper */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px border border-gray-200 text-sm md:overflow-x-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Order</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Total</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">May 10, 2018</td>
                <td className="border px-4 py-2">
                  <span className="text-green-600 font-medium">
                    Completed
                  </span>
                </td>
                <td className="border px-4 py-2">
                  Rs. 25.00 for 1 item
                </td>
                <td className="border px-4 py-2">
                  <a
                    href="#"
                    className="text-[#C09578] font-medium hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border px-4 py-2">2</td>
                <td className="border px-4 py-2">May 10, 2018</td>
                <td className="border px-4 py-2">
                  <span className="text-orange-500 font-medium">
                    Processing
                  </span>
                </td>
                <td className="border px-4 py-2">
                  Rs. 17.00 for 1 item
                </td>
                <td className="border px-4 py-2">
                  <a
                    href="#"
                    className="text-[#C09578] font-medium hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
