'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function CheckContent() {

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

  let token = useSelector((myStore) => myStore.user.token)

  let cartData = useSelector((myStore) => myStore.myCart.cartItems)

  let discount = useSelector((myStore) => myStore.myCart.discount);

  let [paymenttype, setPaymentType] = useState(0);

  let [shippingAdress, setShippingAddres] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    orderNote: "",
    postalCode: "",
    payment: paymenttype,

  });

  let cartObj = cartData.map((obj) => {
    return {
      productImg: obj.productImage,
      productPrice: obj.productPrice,
      title: obj.title,
      userId: obj.userId,
      productQty: obj.productQty,
    };
  });

  let orderAmount = cartData.reduce(
    (t, obj) => (t += obj.productPrice * obj.productQty),
    0
  );

  

  let finalAmount = orderAmount - discount;

  console.log(discount,finalAmount)

  let totQty = cartData.reduce((t, obj) => (t += obj.productQty), 0);

  let getValueSetvalue = (e) => {
    let obj = { ...shippingAdress };
    obj[e.target.name] = e.target.value;
    setShippingAddres(obj);
  };

  let saveOrder = (e) => {
    e.preventDefault()
    console.log(shippingAdress);
    console.log(cartObj);
    console.log(paymenttype);
    console.log(orderAmount);
    console.log(finalAmount);
    console.log(totQty);

    let orderObj = {
      orderItems: cartObj,
      shippingAddress: shippingAdress,
      paymentMethod: paymenttype,
      orderAmount: orderAmount,
      discount:discount,
      finalAmount:finalAmount,
      orderQty: totQty,
    };
    axios
      .post(`${apiBaseUrl}order/order-save`, orderObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((apiRes) => apiRes.data)
      .then((finaldata) => {
        console.log(finaldata)
      })

  }





  return (
    <>

      <div className="max-w-[1170px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-10 px-5">
        <form id="checkout_address" autoComplete="off" onSubmit={saveOrder}>
          {/* Billing Details */}
          <div>

            <h3 className="text-xl font-semibold mb-6">Billing Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-1 font-xs font-semibold">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border  border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                  onChange={getValueSetvalue}
                />
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile_number" className="block mb-1 font-sm font-semibold">Mobile Number*</label>
                <input
                  type="text"
                  id="mobile_number"
                  name="phone"
                  maxLength="15"
                  onChange={getValueSetvalue}
                  className="w-full border  border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                />
              </div>




              {/* Billing Email */}
              <div>
                <label htmlFor="billing_email" className="block mb-1 font-sm font-semibold">Billing Email*</label>
                <input
                  type="email"
                  id="billing_email"
                  name="email"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                />
              </div>




              {/* Billing Address */}
              <div className="md:col-span-2">
                <label htmlFor="billing_address" className="block mb-1 font-sm font-semibold">Billing Address*</label>
                <input
                  type="text"
                  id="billing_address"
                  name="address"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                />
              </div>

              {/* Billing Country */}
              <div className="md:col-span-2">
                <label htmlFor="billing_country_id" className="block mb-1 font-sm font-semibold">Country*</label>
                <select
                  id="billing_country_id"
                  name="country"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                >
                  <option value="">Select Country</option>
                  <option value="1">Afghanistan</option>
                  <option value="2">Albania</option>
                  <option value="3">Algeria</option>
                  <option value="4">American Samoa</option>
                  <option value="5">Andorra</option>
                  <option value="6">India</option>
                  <option value="7">china</option>
                  <option value="7">usa</option>
                </select>
              </div>

              {/* Shipping other address */}
              {/* <div className="md:col-span-2 flex gap-3">
                <input id="address" type="checkbox"/>
                  <label className="p-2 bg-black text-white text-[14px]" htmlFor="address">Ship to a different address?</label>
              </div> */}

              {/* State */}
              <div>
                <label htmlFor="shipping_state" className="block mb-1 font-sm font-semibold">State*</label>
                <input
                  type="text"
                  id="shipping_state"
                  name="state"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="shipping_city" className="block mb-1 font-sm font-semibold">City*</label>
                <input
                  type="text"
                  id="shipping_city"
                  name="city"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                />
              </div>
              <div>
                <label htmlFor="postalcode" className="block mb-1 font-sm font-semibold">pincode*</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="p-2 border rounded"
                  onChange={getValueSetvalue}
                />

              </div>


              {/* Notes */}
              <div className="md:col-span-2">
                <label htmlFor="order_note" className="block mb-1 font-sm font-semibold">Order Notes</label>
                <textarea
                  id="order_note"
                  rows="5"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none   focus:ring-none"
                  name='orderNote'
                  onChange={getValueSetvalue}
                ></textarea>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      className="mr-2"
                      onChange={() => setPaymentType(1)}
                    />
                    COD
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      className="mr-2"
                      onChange={() => setPaymentType(2)}
                    />
                    Online
                  </label>
                </div>
              </div>



            </div>

          </div>





          {/* Your Order */}
          <div>
            <h3 className="text-xl font-semibold mb-8">Your Order</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 border">Product</th>
                    <th className="text-left px-4 py-2 border">Total</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    cartData.map((item, index) => {
                      <tr key={index}>
                        <td className="px-4 py-2 border">{item.title} × {item.productQty}</td>
                        <td className="px-4 py-2 border">Rs.{item.productPrice} × {item.productQty} </td>
                      </tr>
                    })
                  }
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border text-left">Cart Subtotal</th>
                    <td className="px-4 py-2 border">Rs.{orderAmount}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border text-left">Discount (-)</th>
                    <td className="px-4 py-2 border font-semibold">Rs.{discount}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border text-left">Order Total</th>
                    <td className="px-4 py-2 border font-bold">Rs. {orderAmount-discount}</td>
                  </tr>
                </tfoot>
              </table>

            </div>
            <div className="mt-6">
              <button
                type="submit"
                id="placeOrder"
                className="w-full bg-black text-white font-semibold py-3 rounded transition"
              >
                Place Order
              </button>
            </div>



            {/* <div className="mt-3 text-red-500 placeOrderError hidden">Error placing order!</div> */}

          </div>
        </form>
      </div >

    </>
  )
}

