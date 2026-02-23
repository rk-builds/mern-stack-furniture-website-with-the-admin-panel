"use client"
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { logout } from '../redux/slice/userSlice';
import { ToastContainer } from 'react-toastify';
import { fetchCartData } from '../redux/slice/cartSlice';


export default function Header() {
    let dispatch = useDispatch()

   

    const cartItems = useSelector(  (state) => state.myCart.cartItems );
       

    console.log(cartItems);
    

    let loginuser = useSelector((myStore) => myStore.user.user)
    // console.log(loginuser);


    let [activeSubMenu, setActiveSubMenu] = useState(0)
    let [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

     useEffect(()=>{
       dispatch(fetchCartData())
    },[dispatch])

    let logOutUser = () => {
        dispatch(logout())
        redirect("/login")

    }


    useEffect(() => {
        setMounted(true);
    }, []);

    return (

        <div>
            {/* offcanvs */}

          <ToastContainer/>


            <div className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden sm:block  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-black">
                    <span className='absolute right-[20px] top-1'>✕</span>
                </button>
                <div className='max-w-[90%] text-[12px] mx-auto'>
                    <div className='text-center'>
                        <p className='py-2'>Contact us 24/7 : +91-98745612330</p>
                        <p className='py-2'>furnitureinfo@gmail.com</p>
                    </div>
                    <div>
                        <nav className="">
                            <div id="mega-menu" className="p-2 border-b border-[#E1E3E1]">
                                <ul className="mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                                    <li>
                                        <Link href={'/'} className="block py-2 px-3 text-[13px] text-[#C09578] border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-#C09578 md:p-0 uppercase " aria-current="page">Home</Link>
                                    </li>
                                    <li>
                                        <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" onClick={() => setActiveSubMenu(activeSubMenu === 1 ? 0 : 1)} className="flex items-center justify-between w-full py-2 px-3 text-[13px] text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#C09578] md:p-0 uppercase">
                                            Living<FaAngleDown />
                                        </button>
                                        <div id="mega-menu-dropdown" className={`absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md  md:grid-cols-3 ${activeSubMenu == 1 ? '' : 'hidden'} `}>
                                            <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                                <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                    <h3 className='font-extralight'>Tables</h3>
                                                    <li><Link href='/products' onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-blue-600 text-[12px]">Side and End Tables</Link></li>
                                                    <li><Link href="/products" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-blue-600 text-[12px]">Nest Of Tables</Link></li>
                                                    <li><Link href="/products" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-blue-600 text-[12px]">Coffee Table Sets</Link></li>
                                                    <li><Link href="/products" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-blue-600 text-[12px]">Coffee Tables</Link></li>

                                                </ul>
                                            </div>
                                            <div className="p-4">
                                                <ul className="space-y-4">
                                                    <h3 className='font-bold'>Living Storage</h3>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]">Prayer Units</Link></li>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]">Display Unit</Link></li>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]">Shoe Racks</Link></li>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]">Chest Of Drawers</Link></li>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]">Cabinets and Sideboard</Link></li>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]">Bookshelves</Link></li>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]">Tv Units</Link></li>
                                                </ul>
                                            </div>
                                            <div className="p-4">
                                                <ul className="space-y-4"><h3 className='font-bold'>Mirror</h3>
                                                    <li><Link href={'/products'} className="text-gray-500 hover:text-blue-600 text-[12px]" >Wooden Mirrors</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" onClick={() => setActiveSubMenu(activeSubMenu === 2 ? 0 : 2)} className="flex items-center justify-between w-full py-2 px-3 text-[13px] text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#C09578] md:p-0 uppercase">
                                            sofa<FaAngleDown />
                                        </button>
                                        <div id="mega-menu-dropdown" className={`absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md  md:grid-cols-3 ${activeSubMenu == 2 ? '' : 'hidden'} `}>
                                            <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                                <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                    <h3 className='font-bold'>Sofa Cum Bed</h3>
                                                    <li><a href="#wooden-sofa-cum-bed" className="text-gray-500 hover:text-blue-600 text-[12px]">Wooden Sofa Cum Bed</a></li>
                                                </ul>
                                            </div>
                                            <div className="p-4">
                                                <ul className="space-y-4">
                                                    <h3 className='font-bold'>Sofa Sets</h3>
                                                    <li><a href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">L Shape Sofa</a></li>
                                                    <li><a className="text-gray-500 hover:text-blue-600 text-[12px]">1 Seater Sofa</a></li>
                                                    <li><a href="#2-seater-sofa" className="text-gray-500 hover:text-blue-600 text-[12px]">2 Seater Sofa</a></li>
                                                    <li><a href="#3-seater-sofa" className="text-gray-500 hover:text-blue-600 text-[12px]">3 Seater Sofa</a></li>
                                                    <li><a href="#wooden-sofa-sets" className="text-gray-500 hover:text-blue-600 text-[12px]">Wooden Sofa Sets</a></li>
                                                    <li><a href="#normal" className="text-gray-500 hover:text-blue-600 text-[12px]">Normal</a></li>
                                                </ul>
                                            </div>
                                            <div className="p-4">
                                                <ul className="space-y-4">
                                                    <h3 className='font-bold'>Swing Jhula</h3>
                                                    <li><a href="#wooden-jhula" className="text-gray-500 hover:text-blue-600 text-[12px]" >Wooden Jhula</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" onClick={() => setActiveSubMenu(activeSubMenu === 3 ? 0 : 3)} className="flex items-center justify-between w-full py-2 px-3 text-[13px] text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#C09578] md:p-0 uppercase">
                                            pages<FaAngleDown />
                                        </button>
                                        <div id="mega-menu-dropdown" className={`absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md  md:grid-cols-1 ${activeSubMenu == 3 ? '' : 'hidden'} `}>
                                            <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                                <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                    <li><Link href={'/about-us'} className="text-gray-500 hover:text-blue-600 text-[12px]">About Us</Link></li>
                                                    <li><Link href={'/cart'} className="text-gray-500 hover:text-blue-600 text-[12px]">Cart</Link></li>
                                                    <li><Link href={'/checkout'} className="text-gray-500 hover:text-blue-600 text-[12px]">Checkout</Link></li>
                                                    <li><Link href={'/faq'} className="text-gray-500 hover:text-blue-600 text-[12px]">Frequently Questions</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>


                                    <li>
                                        <Link href={'/contact-us'} className="block py-2 px-3 text-[13px]  hover:text-[#C09578] border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-#C09578 md:p-0 uppercase " aria-current="page">Contact us</Link>
                                    </li>
                                    <li>

                                        {/* <div >
                                            <Link href={'/login'}> Login   </Link> /

                                            <Link href={'/Register'}>   Register  </Link>
                                        </div> */}
                                    </li>
                                </ul>
                            </div>

                        </nav>
                    </div>

                </div>

            </div>
            {/* over */}

            <header className=''>
                <div className='border-b-1 border-[#E1E3E1] py-2 hidden lg:block'>
                    <div className='max-w-[1120px] text-[12px] mx-auto flex justify-between'>
                        <div>Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com</div>
                        <div >
                            <div>
                                {mounted && (
                                    loginuser ? (
                                        <div>
                                            <span className="cursor-pointer" onClick={logOutUser}>
                                                Logout &nbsp;{loginuser.username}
                                            </span>
                                            
                                        </div>
                                    ) : (
                                        <div>
                                            <Link href="/login">Login</Link> /
                                            <Link href="/register">Register</Link>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* {
                                loginuser ?
                                    <div><span className='cursor-pointer' onClick={logOutUser}>Logout</span> &nbsp;{loginuser.userName}</div>
                                    :
                                    <div><Link href={'/login'}>Login</Link> &nbsp; /<Link href={'/register'}>Register</Link></div>
                            } */}
                            
                        </div>
                    </div>
                </div>

                <div className='border-1 border-[#E1E3E1] p-4'>
                    <div className='max-w-[1120px] text-[13px] mx-auto flex justify-between items-center '>
                        <div className='py-2'>
                            <a href="">
                                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" height="30px" width="110px" alt="Logo image" />
                            </a>
                        </div>

                        <div className='p-4 flex gap-5 items-center'>
                            <form action="" className="border-1 border-[#E1E3E1] p-2 w-[230px] md:flex justify-between hidden ">
                                <input name="search" placeholder="Search product..." type="text" className='focus:outline-none' />
                                <button type="submit"><IoSearch /></button>
                            </form>
                            <div className='p-2 border-1 border-[#E1E3E1] hover:text-[#C09578]'>
                                <a href=""><IoIosHeart className='text-[15px] lg:text-[20px]' /></a>
                            </div>
                            <div className='p-2 flex border-1 border-[#E1E3E1] relative'>
                                <Link href={'/cart'} className='flex gap-2 items-center'><FaShoppingCart className='text-[14px] ms-1 hover:text-[#C09578]' /><span className="hidden md:block">|&nbsp; Rs. 0.00</span> <FaAngleDown className='text-[14px] hidden md:block' /></Link>
                                <span className="bg-[#C09578] py-[0.5] px-2 rounded-full text-white absolute left-[-15px] top-[20%]">{cartItems.length}</span>
                            </div>
                            <div className="flex items-center md:order-2 space-x-1 md:space-x-2">

                                <button data-collapse-toggle="mega-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm hover:text-[#C09578] hover:border-[#C09578] border-1 md:hidden focus:outline-none focus:ring-none" onClick={() => setIsOpen(!isOpen)}>
                                    <span className="" aria-hidden="true">
                                        <LuMenu className='text-[20px]' />
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


                <div>
                    <nav className="bg-white">
                        <div id="mega-menu" className="py-3 items-center justify-center hidden w-full md:flex md:w-auto md:order-1 border-b border-[#E1E3E1]">
                            <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                                <li>
                                    <Link href={'/'} className="block py-2 px-3 text-[13px] text-[#C09578] border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-#C09578 md:p-0 uppercase " aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" onClick={() => setActiveSubMenu(activeSubMenu === 1 ? 0 : 1)} className="flex relative items-center justify-between w-full py-2 px-3 text-[13px] text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#C09578] md:p-0 uppercase">
                                        Living<FaAngleDown />
                                    </button>
                                    <div id="mega-menu-dropdown" className={`absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md  md:grid-cols-3 ${activeSubMenu == 1 ? '' : 'hidden'} top-[184px]`}>
                                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                <h3 className='font-bold'>Tables</h3>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Side and End Tables</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Nest Of Tables</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Coffee Table Sets</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Coffee Tables</Link></li>
                                            </ul>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-4">
                                                <h3 className='font-bold'>Living Storage</h3>
                                                <li>< Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Prayer Units</Link></li>
                                                <li>< Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Display Unit</Link></li>
                                                <li>< Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Shoe Racks</Link></li>
                                                <li>< Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Chest Of Drawers</Link></li>
                                                <li>< Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Cabinets and Sideboard</Link></li>
                                                <li>< Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Bookshelves</Link></li>
                                                <li>< Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Tv Units</Link></li>
                                            </ul>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-4"><h3 className='font-bold'>Mirror</h3>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Wooden Mirrors</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" onClick={() => setActiveSubMenu(activeSubMenu === 2 ? 0 : 2)} className="flex items-center justify-between w-full py-2 px-3 text-[13px] text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#C09578] md:p-0 uppercase">
                                        sofa<FaAngleDown />
                                    </button>
                                    <div id="mega-menu-dropdown" className={`absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md  md:grid-cols-3 ${activeSubMenu == 2 ? '' : 'hidden'} top-[184px]`}>
                                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                <h3 className='font-bold'>Sofa Cum Bed</h3>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Wooden Sofa Cum Bed</Link></li>
                                            </ul>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-4">
                                                <h3 className='font-bold'>Sofa Sets</h3>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">L Shape Sofa</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">1 Seater Sofa</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">2 Seater Sofa</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">3 Seater Sofa</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Wooden Sofa Sets</Link></li>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Normal</Link></li>
                                            </ul>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-4">
                                                <h3 className='font-bold'>Swing Jhula</h3>
                                                <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-[12px]">Wooden Jhula</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" onClick={() => setActiveSubMenu(activeSubMenu === 3 ? 0 : 3)} className="flex items-center justify-between w-full py-2 px-3 text-[13px] text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#C09578] md:p-0 uppercase">
                                        pages<FaAngleDown />
                                    </button>
                                    <div id="mega-menu-dropdown" className={`absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md  md:grid-cols-1 ${activeSubMenu == 3 ? '' : 'hidden'} top-[184px]`}>
                                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                <li><Link href={'/about-us'} className="text-gray-500 hover:text-blue-600 text-[12px]">About Us</Link></li>
                                                <li><Link href={'/cart'} className="text-gray-500 hover:text-blue-600 text-[12px]">Cart</Link></li>
                                                <li><Link href={'/checkout'} className="text-gray-500 hover:text-blue-600 text-[12px]">Checkout</Link></li>
                                                <li><Link href={'/faq'} className="text-gray-500 hover:text-blue-600 text-[12px]">Frequently Questions</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <Link href={'/contact-us'} className="block py-2 px-3 text-[13px]  hover:text-[#C09578] border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-#C09578 md:p-0 uppercase " aria-current="page">Contact us</Link>
                                </li>
                            </ul>
                        </div>

                    </nav>

                </div>




            </header>
        </div>
    )
}
