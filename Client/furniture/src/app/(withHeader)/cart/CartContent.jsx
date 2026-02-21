'use client'

import { fetchCartData, setDiscount, updateQtyLocal, clearDiscount } from '@/app/redux/slice/cartSlice';
import axios from 'axios';
import Link from 'next/link';
import React, { useMemo, useState } from 'react'
import { TbTrashXFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';


export let COUPONS = {
    SAVE10: {
        type: "PERCENT",
        value: 10, // 10% off
    },
    FLAT200: {
        type: "FLAT",
        value: 200, // ₹200 off
    },

};




export default function CartContent() {



    // const [couponCode, setCouponCode] = useState("");
    // const [discount, setDiscount] = useState(0);

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);





    let dispatch = useDispatch()
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((myStore) => myStore.user.token)

    let { cartItems, imgPath } = useSelector((state) => state.myCart)



    if (!Array.isArray(cartItems)) {
        return <p className="text-center py-10">Loading cart...</p>;
    }

    // let subtotal = cartItems.reduce((sum, item) => {
    //     return sum + item.productPrice * item.productQty;
    // }, 0);
    const subtotal = useMemo(() => {
        return cartItems.reduce(
            (sum, item) => sum + item.productPrice * item.productQty,
            0
        );
    }, [cartItems]);





    console.log(cartItems);


    const handleQtyChange = (item, qty) => {
        dispatch(updateQtyLocal({
            cartId: item._id,
            productQty: Number(qty)
        }));
    };

    let deleteFromCart = (cartid) => {

        axios.post(`${apiBaseUrl}cart/remove-cart`, { cartId: cartid }, {
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

    // const applyCoupon = (e) => {
    //     e.preventDefault();
    //     const coupon = COUPONS[couponCode];

    //     if (!coupon) {
    //         alert("Invalid coupon");
    //         setDiscount(0);
    //         return;
    //     }

    //     let discountAmount = 0;

    //     if (coupon.type === "PERCENT") {
    //         discountAmount = (subtotal * coupon.value) / 100;
    //     }

    //     if (coupon.type === "FLAT") {
    //         discountAmount = coupon.value;
    //     }

    //     setDiscount(discountAmount);
    // };

    const applyCoupon = (e) => {
        e.preventDefault();

        const coupon = COUPONS[couponCode];

        if (!coupon) {
            alert("Invalid coupon");
            setAppliedCoupon(null);
            return;
        }

        setAppliedCoupon(coupon); // 👈 coupon activated ONCE
    };

    const discount = useMemo(() => {
        if (!appliedCoupon) return 0;

        if (appliedCoupon.type === "PERCENT") {
            return (subtotal * appliedCoupon.value) / 100;
        }

        if (appliedCoupon.type === "FLAT") {
            return Math.min(appliedCoupon.value, subtotal);
        }

        return 0;
    }, [subtotal, appliedCoupon]);

    useEffect(() => {
        dispatch(setDiscount(discount));
    }, [discount, dispatch]);


    useEffect(() => {
        if (cartItems.length === 0) {
            dispatch(clearDiscount());
            setAppliedCoupon(null);
        }
    }, [cartItems, dispatch]);

    const total = subtotal - discount;


    return (
        <>
            <div className="py-12">
                <div className="max-w-[1100px] mx-auto overflow-x-auto">
                    <table className="table-fixed w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-300">
                                <th className="w-[12%] text-center py-3">Delete</th>
                                <th className="w-[20%] text-center py-3">Image</th>
                                <th className="w-[20%] text-center py-3">Product</th>
                                <th className="w-[14%] text-center py-3">Price</th>
                                <th className="w-[20%] text-center py-3">Quantity</th>
                                <th className="w-[14%] text-center py-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.length > 0 ?
                                    cartItems.map((item) => {

                                        return (
                                            <tr className="border" key={item._id}>
                                                <td className="text-center py-3">
                                                    <button onClick={() => deleteFromCart(item._id)}><TbTrashXFilled className="mx-auto" /></button>
                                                </td>
                                                <td className="text-center py-3">
                                                    <div className="flex justify-center">
                                                        <img src={imgPath + item.productImg} alt="" className="h-20 w-20 object-cover" />
                                                    </div>
                                                </td>
                                                <td className="text-center py-3">{item.title}</td>
                                                <td className="text-center py-3">Rs.{item.productPrice}</td>
                                                <td className="text-center py-3">
                                                    <input type="number" className="w-16 border px-2 py-1" min="1" max="10" value={item.productQty} onChange={(e) => handleQtyChange(item, e.target.value)} />

                                                </td>
                                                <td className="text-center py-3">Rs.{item.productPrice * item.productQty}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className='text-center'>

                                        <td colSpan={6}>
                                            no data found
                                        </td>


                                    </tr>
                            }

                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <button type="submit" className="px-4 py-2 text-white rounded bg-black text-[14px] uppercase">Update Cart</button>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">


                    <div className="bg-white rounded-lg shadow">
                        <h3 className="text-sm font-semibold mb-4 bg-black text-white uppercase p-3 text-center">Coupon</h3>
                        <div className='p-6'>
                            <p className="mb-3 text-gray-600">Enter your coupon code if you have one.</p>
                            <form id="discountform" noValidate className="flex items-center gap-3">
                                <input type="text" name="entercode" id="entercode" placeholder="Coupon code"
                                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                />
                                <button type="submit"
                                    onClick={applyCoupon}
                                    className="bg-black hover:bg-[#C09578] text-white px-4 py-2 rounded transition">
                                    Apply Coupon
                                </button>
                            </form>
                            <small className="text-red-500 hidden mt-2" id="error-msg">Enter code is required</small>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <h3 className="text-sm font-semibold mb-4 bg-black text-white uppercase p-3 text-center">Cart  Totals</h3>
                        <div className="space-y-4 p-6">
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="font-medium">Rs.{subtotal}</p>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-700">Discount (-)</p>
                                <p className="font-medium text-red-500">Rs. {discount}</p>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-700 font-semibold">Total</p>
                                <p className="font-semibold text-lg">Rs. {total}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link href={'/checkout'}
                                className="block text-center bg-[#C09578] text-white font-semibold py-3 rounded transition">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}
