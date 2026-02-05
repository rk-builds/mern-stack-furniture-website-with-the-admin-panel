 import React, { useState } from 'react';
  import { BiUser } from 'react-icons/bi';
  import { MdSpaceDashboard } from "react-icons/md";
  import { Link } from 'react-router';
  import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
  import { GrDisc } from "react-icons/gr";
  import { FaCommentAlt } from "react-icons/fa";
  import { GiWaterDrop ,GiDividedSquare} from "react-icons/gi";
  import { RiMenu2Line } from "react-icons/ri";
  import { FaShoppingBag } from "react-icons/fa";
  import { GiBackwardTime } from "react-icons/gi";
  import { FaPenToSquare } from "react-icons/fa6";
  import { FaSliders } from "react-icons/fa6";
  import { FaLocationArrow } from "react-icons/fa";
  import { FcFaq } from "react-icons/fc";
  import { FaFileContract } from "react-icons/fa";

  export default function SideBar() {

    let [dMenu, setDmenu] = useState(0)
    return (
        <div className='bg-gray-100 h-[650px] overflow-y-scroll px-3'>
            <figure className='py-3 mx-auto'>
                <img src="/images/logo.svg" className='mx-auto' alt="" />
            </figure>

            <ul>
        
                <li>
                    <Link to={'/Dashboard'} className='flex items-center gap-2 p-3 font-semibold text-[15px]'>
                        <MdSpaceDashboard />
                        Dashboard
                    </Link>
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 1 ? 0 : 1)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <BiUser className='font-bold'/>  Users
                       </span> 
                       <span>
                          {dMenu == 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 1 ? '' : 'hidden'} `} >
                        <li> <Link to={'/user'} className='flex items-center gap-2 p-2 text-sm'><GrDisc />  View User </Link>   </li>
                    </ul>
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 2 ? 0 : 2)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FaCommentAlt  className='font-bold'/>  Enquirys
                       </span> 
                       <span>
                          {dMenu == 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 2 ? '' : 'hidden'} `} >
                        <li> <Link to={'/Enquiry'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Contact Enquiry </Link>   </li>
                        <li> <Link to={'/Newsletters'} className='flex items-center gap-2 p-2 text-sm'><GrDisc />  Newsletters </Link>   </li>
                    </ul>  
                </li>  

                <li >
                    <Link onClick={() => setDmenu(dMenu == 3 ? 0 : 3)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <GiWaterDrop className='font-bold'/>  Colors
                       </span> 
                       <span>
                          {dMenu == 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 3 ? '' : 'hidden'} `} >
                        <li> <Link to={'/Addcolor'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add color</Link>   </li>
                        <li> <Link to={'/Viewcolor'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View color </Link>   </li>
                    </ul>  
                </li>  

                <li >
                    <Link onClick={() => setDmenu(dMenu == 4 ? 0 : 4)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <GiDividedSquare className='font-bold'/>  Materials
                       </span> 
                       <span>
                          {dMenu == 4 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 4 ? '' : 'hidden'} `} >
                        <li> <Link to={'/add/material'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Material</Link>   </li>
                        <li> <Link to={'/view/material'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Material </Link>   </li>
                    </ul>  
                </li>  

                <li >
                    <Link onClick={() => setDmenu(dMenu == 5 ? 0 : 5)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <RiMenu2Line className='font-bold'/> Parent Categorys
                       </span> 
                       <span>
                          {dMenu == 5 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 5 ? '' : 'hidden'} `} >
                        <li> <Link to={'/category/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Category</Link>   </li>
                        <li> <Link to={'/category/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Category </Link>   </li>
                    </ul>  
                </li>  
                <li >
                    <Link onClick={() => setDmenu(dMenu == 6 ? 0 : 6)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <RiMenu2Line className='font-bold'/>  Sub Categorys
                       </span> 
                       <span>
                          {dMenu == 6 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 6 ? '' : 'hidden'} `} >
                        <li> <Link to={'/sub-category/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Sub Category</Link>   </li>
                        <li> <Link to={'/sub-category/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Sub Category </Link>   </li>
                    </ul>  
                </li>  
                <li >
                    <Link onClick={() => setDmenu(dMenu == 7 ? 0 : 7)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <RiMenu2Line className='font-bold'/>  Sub Sub Categorys
                       </span> 
                       <span>
                          {dMenu == 7 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 7 ? '' : 'hidden'} `} >
                        <li> <Link to={'/sub-sub-category/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Sub Sub Category</Link>   </li>
                        <li> <Link to={'/sub-sub-category/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Sub Sub Category </Link>   </li>
                    </ul>  
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 8 ? 0 : 8)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FaShoppingBag className='font-bold'/>  Products
                       </span> 
                       <span>
                          {dMenu == 8 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 8 ? '' : 'hidden'} `} >
                        <li> <Link to={'/Addproducts'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Products</Link>   </li>
                        <li> <Link to={'/products/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Products </Link>   </li>
                    </ul>  
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 9 ? 0 : 9)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <GiBackwardTime  className='font-bold'/> Why Choose Us
                       </span> 
                       <span>
                          {dMenu == 9 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 9 ? '' : 'hidden'} `} >
                        <li> <Link to={'why-choose-us/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Why Choose Us</Link>   </li>
                        <li> <Link to={'why-choose-us/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Why Choose Us </Link>   </li>
                    </ul>  
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 10 ? 0 : 10)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FaPenToSquare  className='font-bold'/> Orders
                       </span> 
                       <span>
                          {dMenu == 10 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 10 ? '' : 'hidden'} `} >
                        <li> <Link to={'/order/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Orders</Link>   </li>
                        
                    </ul>  
                </li>
                
                <li >
                    <Link onClick={() => setDmenu(dMenu == 11 ? 0 : 11)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FaSliders   className='font-bold'/> Sliders
                       </span> 
                       <span>
                          {dMenu == 11 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 11 ? '' : 'hidden'} `} >
                        <li> <Link to={'/slider/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Slider</Link>   </li>
                        <li> <Link to={'/slider/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Slider </Link>   </li>
                    </ul>  
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 12 ? 0 : 12)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FaLocationArrow  className='font-bold'/> Country
                       </span> 
                       <span>
                          {dMenu == 12 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 12 ? '' : 'hidden'} `} >
                        <li> <Link to={'/country/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Country</Link>   </li>
                        <li> <Link to={'/country/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Country </Link>   </li>
                    </ul>  
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 13 ? 0 : 13)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FaLocationArrow  className='font-bold'/> Testimonials
                       </span> 
                       <span>
                          {dMenu == 13 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 13 ? '' : 'hidden'} `} >
                        <li> <Link to={'testimonial/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Testimonials</Link>   </li>
                        <li> <Link to={'testimonial/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Testimonials </Link>   </li>
                    </ul>  
                </li>

                <li >
                    <Link onClick={() => setDmenu(dMenu == 14 ? 0 : 14)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FcFaq className='font-bold'/> Faqs
                       </span> 
                       <span>
                          {dMenu == 14 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>

                    <ul className={` ${dMenu == 14 ? '' : 'hidden'} `} >
                        <li> <Link to={'/faq/add'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> Add Faqs</Link>   </li>
                        <li> <Link to={'/faq/view'} className='flex items-center gap-2 p-2 text-sm'><GrDisc /> View Faqs </Link>   </li>
                    </ul>  
                </li>
                
                 <li >
                    <Link onClick={() => setDmenu(dMenu == 15 ? 0 : 15)} className='flex justify-between items-center p-3'>  
                       <span className='flex justify-center items-center font-semibold gap-2 text-[15px]'>
                         <FaFileContract className='font-bold'/> Terms & Conditions
                       </span> 
                       <span>
                          {dMenu == 15 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span> 
                    </Link>
                </li>
            </ul>
        </div>
    )
}

