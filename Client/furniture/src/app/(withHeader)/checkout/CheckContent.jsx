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

  console.log(discount, finalAmount)

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
      discount: discount,
      finalAmount: finalAmount,
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
        if (paymenttype == 1) {
          console.log(finaldata);
        } else {
          let RazorpayOrderOptions = {
            key: process.env.KEY,
            amount: finaldata.amount, // Amount in paise
            currency: "INR",
            name: "Test Company",
            description: "Test Transaction",
            order_id: finaldata.id, // Generate order_id on server
            handler: (response) => {
              console.log(response);

              axios
                .post(`${apiBaseUrl}order/verify-order`, response
                  , {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }).then((res)=>res.data)
                .then((finaldata)=>{
                   console.log(finaldata)

                   // thank you page redirect
                })

              alert("Payment Successful!");
            },
            prefill: {
              name: "John Doe",
              email: "john.doe@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#F37254",
            },
          };

           console.log(RazorpayOrderOptions);
          
          const razorpayInstance = new Razorpay(RazorpayOrderOptions);
          razorpayInstance.open();
        }
      })


  }





  return (
    <>
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6 md:px-8 py-8">

        <form
          id="checkout_address"
          autoComplete="off"
          onSubmit={saveOrder}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >

          {/* ================= BILLING DETAILS ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Billing Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Mobile Number*
                </label>
                <input
                  type="text"
                  name="phone"
                  maxLength="15"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Billing Email*
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-semibold">
                  Billing Address*
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              {/* Country */}
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-semibold">
                  Country*
                </label>
                <select
                  name="country"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                >
                  <option value="">Select Country</option>
                  <option value="1">Afghanistan</option>
                  <option value="2">Albania</option>
                  <option value="3">Algeria</option>
                  <option value="4">American Samoa</option>
                  <option value="5">Andorra</option>
                  <option value="6">India</option>
                  <option value="7">China</option>
                  <option value="8">USA</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  State*
                </label>
                <input
                  type="text"
                  name="state"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              {/* City */}
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  City*
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Pincode*
                </label>
                <input
                  type="text"
                  name="postalCode"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-semibold">
                  Order Notes
                </label>
                <textarea
                  rows="4"
                  name="orderNote"
                  onChange={getValueSetvalue}
                  className="w-full border border-gray-400 rounded px-3 py-2"
                ></textarea>
              </div>

              {/* Payment */}
              <div className="sm:col-span-2">
                <h3 className="font-semibold mb-2">
                  Payment Method
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
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



          <div>
            <h3 className="text-xl font-semibold mb-6">
              Your Order
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="min-w-[500px] w-full border border-gray-300 border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 border">Product</th>
                    <th className="text-left px-4 py-2 border">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {cartData && cartData.length > 0 ? (
                    cartData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">
                          {item.title} × {item.productQty}
                        </td>
                        <td className="px-4 py-2 border">
                          Rs.{item.productPrice * item.productQty}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 border">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>

                <tfoot className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border text-left">
                      Cart Subtotal
                    </th>
                    <td className="px-4 py-2 border">
                      Rs.{orderAmount}
                    </td>
                  </tr>

                  <tr>
                    <th className="px-4 py-2 border text-left">
                      Discount (-)
                    </th>
                    <td className="px-4 py-2 border">
                      Rs.{discount}
                    </td>
                  </tr>

                  <tr>
                    <th className="px-4 py-2 border text-left">
                      Order Total
                    </th>
                    <td className="px-4 py-2 border font-bold">
                      Rs.{orderAmount - discount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Place Order
              </button>
            </div>
          </div>

        </form>
      </div>

    </>
  )
}

