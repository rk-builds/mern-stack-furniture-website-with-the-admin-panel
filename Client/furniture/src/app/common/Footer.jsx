import React from 'react'
import { FaFacebook } from "react-icons/fa"
import { AiFillInstagram } from "react-icons/ai"
import { TiSocialTwitterCircular } from "react-icons/ti"
import { TiSocialLinkedin } from "react-icons/ti"
import { SlSocialYoutube } from "react-icons/sl"
import { FaTelegram } from "react-icons/fa"
import Link from 'next/link'

export default function Footer() {
  return (
    <div>
      <footer className="w-full bg-white pt-12 pb-6">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">

          {/* TOP GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* CONTACT US */}
            <div>
              <h3 className="mb-6 font-bold text-[18px]">Contact Us</h3>

              <div className="space-y-3 text-[15px] text-gray-500">
                <p>Address: Claritas est etiam processus dynamicus</p>
                <p>Phone: <a href="tel:98745612330" className="hover:text-[#C09578]">98745612330</a></p>
                <p>Email: furnitureinfo@gmail.com</p>
              </div>

              <ul className="flex flex-wrap gap-4 mt-6 text-[20px] text-gray-500">
                <li><a href="https://facebook.com" target="_blank" className="hover:text-[#C09578]"><FaFacebook /></a></li>
                <li><a href="https://instagram.com" target="_blank" className="hover:text-[#C09578]"><AiFillInstagram /></a></li>
                <li><a href="https://twitter.com" target="_blank" className="hover:text-[#C09578]"><TiSocialTwitterCircular /></a></li>
                <li><a href="https://linkedin.com" target="_blank" className="hover:text-[#C09578]"><TiSocialLinkedin /></a></li>
                <li><a href="https://youtube.com" target="_blank" className="hover:text-[#C09578]"><SlSocialYoutube /></a></li>
                <li><a href="https://telegram.com" target="_blank" className="hover:text-[#C09578]"><FaTelegram /></a></li>
              </ul>
            </div>

            {/* INFORMATION */}
            <div>
              <h3 className="mb-6 font-bold text-[18px]">Information</h3>
              <ul className="space-y-3 text-[15px] text-gray-500">
                <li><Link href="/about-us" className="hover:text-[#C09578]">About Us</Link></li>
                <li><Link href="/contact-us" className="hover:text-[#C09578]">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-[#C09578]">Frequently Questions</Link></li>
              </ul>
            </div>

            {/* MY ACCOUNT */}
            <div>
              <h3 className="mb-6 font-bold text-[18px]">My Account</h3>
              <ul className="space-y-3 text-[15px] text-gray-500">
                <li><Link href="/my-dashboard" className="hover:text-[#C09578]">My Dashboard</Link></li>
                <li><Link href="#" className="hover:text-[#C09578]">Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-[#C09578]">Cart</Link></li>
                <li><Link href="/checkout" className="hover:text-[#C09578]">Checkout</Link></li>
              </ul>
            </div>

            {/* TOP PRODUCTS */}
            <div>
              <h3 className="mb-6 font-bold text-[18px]">Top Rated Products</h3>

              <div className="space-y-6">

                {/* PRODUCT 1 */}
                <div className="flex gap-4 items-start border-b pb-4">
                  <img
                    src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1663411513681Group%201.jpg"
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-[12px] text-gray-500">1 Seater Sofa</p>
                    <h3 className="text-[14px] text-blue-800">
                      <a href="#">Yuvi sheesham wood sofa set</a>
                    </h3>
                    <div className="text-[12px] mt-1">
                      <span className="line-through text-gray-400">Rs. 10,000</span>
                      <span className="ml-2 text-[#C09578]">Rs. 7,600</span>
                    </div>
                  </div>
                </div>

                {/* PRODUCT 2 */}
                <div className="flex gap-4 items-start">
                  <img
                    src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg"
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-[12px] text-gray-500">Cabinets and Sideboard</p>
                    <h3 className="text-[14px] text-blue-800">
                      <a href="#">Louise Cabinet</a>
                    </h3>
                    <div className="text-[12px] mt-1">
                      <span className="line-through text-gray-400">Rs. 28,000</span>
                      <span className="ml-2 text-[#C09578]">Rs. 23,000</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* MIDDLE LINKS */}
          <div className="mt-12 border-t border-b py-4">
            <ul className="flex flex-wrap justify-center gap-6 text-[13px] text-gray-500">
              <li><a href="#" className="hover:text-[#C09578]">Home</a></li>
              <li><a href="#" className="hover:text-[#C09578]">Online Store</a></li>
              <li><a href="#" className="hover:text-[#C09578]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#C09578]">Terms Of Use</a></li>
            </ul>
          </div>

          {/* BOTTOM */}
          <div className="text-center mt-6">
            <p className="text-[14px] text-gray-400">
              All Rights Reserved By Furniture | © 2025
            </p>
            <div className="flex justify-center mt-4">
              <img
                src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png"
                alt=""
                className="h-6 object-contain"
              />
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}
