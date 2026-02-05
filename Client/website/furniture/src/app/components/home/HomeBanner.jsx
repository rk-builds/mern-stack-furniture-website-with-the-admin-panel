"use client"
import React, { useState } from 'react'
import Slider from "react-slick";

export default function HomeBanner({ sliderData }) {

  let [slider, setSlider] = useState(sliderData.data)
  const imgPath = sliderData.imgPath

  console.log(slider);


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className='overflow-hidden'>
      <Slider {...settings}>

        {
          slider.map((img, index) => {
            return (
              <div className='w-[100%]' key={img._id}>
                <img src={imgPath + img.sliderImage} alt="" className='w-[100%]' />
              </div>
            )

          })
        }

        {/* <div>
          <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/slider/648e23d4-5e5d-4fd0-b0f7-856ee45c6629-1671388137.jpg" alt="" className='w-[100%]' />
        </div> */}


      </Slider>

    </section>
  )
}
