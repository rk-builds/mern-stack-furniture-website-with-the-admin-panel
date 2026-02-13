import React from 'react'
import AboutContent from './AboutContent'
import Breadcrumb from '@/app/common/Breadcrumb'
import HomeCustomerReview from '@/app/components/home/HomeCustomerReview'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhyChooseUs from './WhyChooseUs';
import { getTestimonials } from '@/app/apiServices/homeServices';

export const metadata = {
  title: "About us",
  description: "About us page description",
};

export default async function  AboutUs() {
   let Reviews= await getTestimonials()
   let pageName="About Us"
  return (
    <>
       
       <Breadcrumb pageName={pageName}/>
       <AboutContent/>
       <WhyChooseUs/>
       <HomeCustomerReview cust_review={Reviews}/>
       
       
    </>
    
  )
}

