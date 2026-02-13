import Breadcrumb from '@/app/common/Breadcrumb'
import React from 'react'
import ContactMap from './ContactMap'
import Contactinfo from './Contactinfo'

export const metadata = {
  title: "contact us",
  description: "this is contact us page",
};

export default function ContactUs() {
  let pageName="Contact Us"
  return (

   <>
    <Breadcrumb pageName={pageName}/>
    <ContactMap/>
    <Contactinfo/>
   </>
  )
}
