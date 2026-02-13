"use client"
import React, { useState } from 'react'
import Slider from "react-slick";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


export default function HomeCustomerReview({ cust_review }) {
  
console.log(cust_review);


let reviews= cust_review?.datas ?? [];
let imgpath = cust_review?.imgPath ?? "";


  
  //   let reviews = [{testName:"John Doe",testDesignation:"CEO, Company",testImage:"/images/testimonial/test-1.jpg",testMessage:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",testRating:4.5,_id:1},
  //   {testName:"Jane Smith",testDesignation:"Marketing Manager",testImage:"/images/testimonial/test-2.jpg",testMessage:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",testRating:5,_id:2},
  //   {testName:"Mike Johnson",testDesignation:"Product Designer",testImage:"/images/testimonial/test-3.jpg",testMessage:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",testRating:3.5,_id:3}
  // ];
  //   let imgpath;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className='text-center'>
        <h1 className='font-bold text-[18px] py-10'>What Our Custumers Say ?</h1>
      </div>


      <section className='overflow-hidden max-w-[1120px] border-1 mx-auto'>
        <Slider {...settings}>

          {
            reviews.length > 0 ?
              reviews.map((item) => {
                return (

                  <div className="py-[40px] max-w-[1120px]  mx-auto" key={item._id}>
                    <p className='text-center'>
                       {item.testMessage}
                    </p>
                    <div className='flex justify-center'>
                      <img src={imgpath+item.testImage} className='rounded-full' width={100} height={100}  alt="" />
                    </div>
                    <h4 className="text-center pt-5">{item.testName}-{item.testDesignation}</h4>
                    {/* <span className="text-center"></span> */}
                    <div className="">
                      < ul className='flex gap-2 justify-center py-3'>

                        <li>
                           <RatingStars rating={item.testRating} />
                        </li>

                        {/* <li><a href="#"><FaStar /></a></li>

                        <li><a href="#"><FaStar /></a></li> */}
                      </ul>
                    </div>
                  </div>

                )
              })
              :
              <div>No Reviews Found</div>
            }
          



        </Slider>

      </section>
    </>
  )
}




  export  function RatingStars({ rating }) {


  const totalStars = 5;

  return (
    <ul className="flex gap-1 justify-center py-3">
      {
        [...Array(totalStars)].map((_, index) => {

          if (rating >= index + 1) {
            // Full star
            return (
              <li key={index} className="text-yellow-500">
                <FaStar />
              </li>
            );
          }

          else if (rating >= index + 0.5) {
            // Half star
            return (
              <li key={index} className="text-yellow-500">
                <FaStarHalfAlt />
              </li>
            );
          }

          else {
            // Empty star
            return (
              <li key={index} className="text-gray-300">
                <FaRegStar />
              </li>
            );
          }
        })
      }
    </ul>
  );
}

