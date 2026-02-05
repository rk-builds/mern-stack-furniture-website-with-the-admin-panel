"use client";
import React, { useEffect, useState } from 'react'
// import { useState } from "react";
// import { homeBestSellingProduct } from "@/app/apiServices/homeServices";
import ProductCard from "@/app/common/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeBestSelling({ BestSellingData }) {

  const [Bestproducts, setBestProducts] = useState(BestSellingData.datas || []);
  const imgPath =BestSellingData.imgPath;

  function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute top-[45%] -right-6 z-10
      w-10 h-10 flex items-center justify-center
      rounded-full bg-black text-white shadow-md cursor-pointer
      hover:bg-[#C09578] hover:text-white transition"
    >
      ❯
    </div>
  );
}

// console.log('bestsale=>',BestSellingData)
// console.log('bestimg=>',imgPath);


function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute top-[45%] -left-6 z-10
      w-10 h-10 flex items-center justify-center
      rounded-full bg-black text-white shadow-md cursor-pointer
      hover:bg-[#C09578] hover:text-white transition"
    >
      ❮
    </div>
  );
}


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 924,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
  

<section className='max-w-[1170px] mx-auto py-[50px]'>

   <div className="relative px-8 py-10">
      <h2 className="text-[22px] font-semibold mb-6 text-center">
        Best Selling Products
      </h2>

      <Slider {...settings}>
        {Bestproducts.map((item,index) => (
          <div  className="px-2">
            <ProductCard data={item} imgPath={imgPath} key={index} />
          </div>
        ))}
      </Slider>
    </div>
  </section>
  )
}