import Breadcrumb from "@/app/common/Breadcrumb"
import FaqElement from "./Faq"

export const metadata = {
  title: "Faq",
  description: "faq page",
};



export default function FaqPage() {

   let pageName="Faq"
  return (
    <>
       
       <Breadcrumb pageName={pageName}/>
       <FaqElement/>
       
       
    </>
    
  )
}