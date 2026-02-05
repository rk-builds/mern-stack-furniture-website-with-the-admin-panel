import Breadcrumb from "@/app/common/Breadcrumb"
import SidebarDashboard from "./SidebarDashboard"

export const metadata = {
  title: "Dashboard",
  description: "my dashboard page",
};


export default function FaqPage() {

   let pageName="My-dashboard"
  return (
    <>
       
       <Breadcrumb pageName={pageName}/>
       <div className="">
           <SidebarDashboard/>
       </div>
       
       
    </>
    
  )
}
