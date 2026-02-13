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
      <footer className="max-w-[100%] bg-white py-[50px]">
        <div className="max-w-[1170px] mx-auto">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
            
              <div className="px-3">
                <h3 className='py-6 font-bold text-[18px]'>Contact Us</h3>
                <div className="footer_contact">
                  <p className="text-gray-500 hover:text-blue-600 text-[15px]">Address: Claritas est etiam processus dynamicus</p>
                  <p className="text-gray-500 hover:text-blue-600 text-[15px]">Phone: <a href="tel:98745612330">98745612330</a></p>
                  <p className="text-gray-500 hover:text-blue-600 text-[15px]">Email: furnitureinfo@gmail.com</p>
                  <ul className='flex justify-start items-center gap-5 py-10'>
                    <li><a href="https://facebook.com" target="_blank" className='text-gray-500 text-[20px]'><FaFacebook /></a></li>
                    <li><a href="https://instagram.com" target="_blank" className='text-gray-500 text-[20px]'><AiFillInstagram /></a></li>
                    <li><a href="https://twitter.com" target="_blank" className='text-gray-500 text-[20px]'><TiSocialTwitterCircular /></a></li>
                    <li><a href="https://linkedin.com" target="_blank" className='text-gray-500 text-[20px]'><TiSocialLinkedin /></a></li>
                    <li><a href="https://youtube.com" target="_blank" className='text-gray-500 text-[20px]'><SlSocialYoutube /></a></li>
                    <li><a href="https://telegram.com" target="_blank" className='text-gray-500 text-[20px]'><FaTelegram /></a></li>
                  </ul>
                </div>
              </div>
            
            <div className="px-3">
              <div className="">
                <h3 className='py-6 font-bold text-[18px]'>Information</h3>
                <div className="footer_menu">
                  <ul>
                    <li><Link href={'/about-us'} className="text-gray-500 hover:text-blue-600 text-[15px]">About Us </Link></li>
                    <li><Link href={'/contact-us'} className="text-gray-500 hover:text-blue-600 text-[15px]">Contact Us</Link></li>
                    <li><Link href={'/faq'} className="text-gray-500 hover:text-blue-600 text-[15px]">Frequently Questions</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="widgets_container widget_menu">
                <h3 className='py-6 font-bold text-[18px]'>My Account</h3>
                <div className="footer_menu">
                  <ul>
                    <li><Link href={'/my-dashboard'} className="text-gray-500 hover:text-blue-600 text-[15px]">My Dashboard</Link></li>
                    <li><Link href={'#'} className="text-gray-500 hover:text-blue-600 text-[15px]">Wishlist</Link></li>
                    <li><Link href={'/cart'} className="text-gray-500 hover:text-blue-600 text-[15px]">Cart</Link></li>
                    <li><Link href={'/chekout'} className="text-gray-500 hover:text-blue-600 text-[15px]">Checkout</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="">
                <h3 className='py-6 font-bold text-[18px]'>Top Rated Products</h3>
                <div className="simple_product">
                  <div className="flex justyfy-center gap-5 items-start border-b border-gray-500">
                    <div className="simple_product_thumb">
                      <a href="#">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1663411513681Group%201.jpg" alt="" height="130px" width="130px" />
                      </a>
                    </div>
                    <div className="">
                      <div className="">
                        <a className='text-[12px]'>1 Seater Sofa</a>
                      </div>
                      <div className="product_name">
                        <h3 className='text-[14px] text-blue-800 py-3'><a href="#">Yuvi sheesham wood sofa set</a></h3>
                      </div>
                      <div className="py-1">
                        <span className="text-[11px] line-through">Rs. 10,000&nbsp;</span>
                        <span className="text-[11px] text-[c09578]">&nbsp;Rs. 7,600</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justyfy-center gap-5 items-start border-b border-gray-500 pt-5">
                    <div className="simple_product_thumb">
                      <a href="#">
                        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253167208651620078433247Louise%20Cabinet_.jpg" alt="" height="80px" width="80px" />
                      </a>
                    </div>
                    <div >
                      <div className='text-[12px]'>
                        <a>Cabinets and Sideboard</a>
                      </div>
                      <div >
                        <h3 className='text-[14px] text-blue-800 py-3'><a href="https://wscubetech.co/Assignments/furniture/product-details/louise-cabinet" height="100px" width="100px">Louise Cabinet</a></h3>
                      </div>
                      <div className="py-1">
                        <span className="text-[11px] line-through">Rs. 28,000</span>
                        <span className="text-[11px] text-[c09578]">Rs. 23,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="footer_middel">
              <div className="">
                
                  <div className="">
                    <ul className='flex justify-center gap-5 items-center border-y-1 border-gray-500 my-[50px] py-2'>
                      <li><a href="https://wscubetech.co/Assignments/furniture" className="text-gray-500 hover:text-blue-600 text-[12px]" >Home</a></li>
                      <li><a href="https://wscubetech.co/Assignments/furniture/online-store" className="text-gray-500 hover:text-blue-600 text-[12px]">Online Store</a></li>
                      <li><a href="https://wscubetech.co/Assignments/furniture/privacy-policy" className="text-gray-500 hover:text-blue-600 text-[12px]">Privacy Policy</a></li>
                      <li><a href="https://wscubetech.co/Assignments/furniture/term-of-use" className="text-gray-500 hover:text-blue-600 text-[12px]">Terms Of Use</a></li>
                    </ul>
                  </div>
                
              </div>
            </div>
            <div className="footer_bottom">
            
                <div className="">
                  <div className="text-center">
                    <p className='py-5 text-[14px] text-gray-400'> All Rights Reserved By Furniture | © 2025 </p>
                    <div className='flex justify-center'>
                       <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" alt="" className='object-center'/>
                    </div>
                    
                  </div>
                </div>
              
            </div>
          </div>
      
      </footer>
    </div>
  )
}
