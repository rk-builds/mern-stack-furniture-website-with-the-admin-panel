import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-responsive-pagination/themes/classic-light-dark.css'; // pagination css call here because use in all pages
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './components/pages/Login.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import Layout from './components/common/Layout.jsx'
import User from './components/pages/user/User.jsx'
import Enquirys from './components/pages/enquiry/Enquirys.jsx'
import Newsletters from './components/pages/enquiry/Newsletters.jsx'
import Addproduct from './components/pages/product/Addproduct.jsx'
import Addcolor from './components/pages/color/Addcolor.jsx'
import Viewcolor from './components/pages/color/Viewcolor.jsx'
import Addmaterial from './components/pages/material/Addmaterial.jsx'
import Viewmaterial from './components/pages/material/Viewmaterial.jsx'
import Addcat from './components/pages/category/Addcat.jsx'
import Viewcat from './components/pages/category/Viewcat.jsx'
import Addsubcat from './components/pages/subCat/Addsubcat.jsx'
import Viewproducts from './components/pages/product/Viewproducts.jsx'
import WhyChooseUs from './components/pages/whyChoose/WhyChooseUs.jsx'
import WhyChooseUsView from './components/pages//whyChoose/WhyChooseUsView.jsx'
import AddSlider from './components/pages/slider/AddSlider.jsx'
import ViewSlider from './components/pages/slider/ViewSlider.jsx'
import AddCountry from './components/pages/country/AddCountry.jsx'
import ViewCountry from './components/pages/country/ViewCountry.jsx'
import AddTestimonials from './components/pages/testimonials/AddTestimonials.jsx'
import ViewTestimonials from './components/pages/testimonials/ViewTestimonials.jsx'
import AddFaq from './components/pages/faq/AddFaq.jsx'
import ViewFaq from './components/pages/faq/ViewFaq.jsx'
import OrderView from './components/pages/order/orderView.jsx'
import Viewsubcat from './components/pages/subCat/Viewsubcat.jsx';
import Viewsubsubcat from './components/pages/subSubCat/Viewsubsubcat.jsx';
import Adminprofile from './components/pages/profile/adminprofile.jsx';
import Addsubsubcat from './components/pages/subSubCat/Addsubsubcat.jsx';
import CompanyProfile from './components/pages/profile/companyProfile.jsx';

import MainContext from './context/mainContext.jsx';



createRoot(document.getElementById('root')).render(
  
 <MainContext>
     <BrowserRouter>
      <Routes>
           <Route element={<Layout />}>
               <Route path='/Dashboard' element={<Dashboard />} />  
               <Route path='/user'  element={<User/>} />

               <Route path='/Enquiry'  element={<Enquirys/>} /> 
               <Route path='/Newsletters'  element={<Newsletters/>} /> 

               <Route path='/Addcolor'  element={<Addcolor/>} />
               <Route path='/edit-color/:id'  element={<Addcolor/>} />
               <Route path='/Viewcolor'  element={<Viewcolor/>} /> 

               <Route path='/add/material'   element={<Addmaterial/>}/>
               <Route path='/edit-material/:id'   element={<Addmaterial/>}/>
               <Route path='/view/material'   element={<Viewmaterial/>} />

               <Route path='/category/add'   element={<Addcat/>}/>
               <Route path='/edit-category/:id'   element={<Addcat/>}/>
               <Route path='/category/view'   element={<Viewcat/>} />

               <Route path='/sub-category/add'   element={<Addsubcat/>}/>
               <Route path='/edit-subcategory/:id'   element={<Addsubcat/>}/>
               <Route path='sub-category/view'   element={<Viewsubcat/>} />

               <Route path='sub-sub-category/add'   element={<Addsubsubcat/>}/>
                <Route path='/edit-subSubcategory/:id'   element={<Addsubsubcat/>}/>
               <Route path='sub-sub-category/view'   element={<Viewsubsubcat/>} /> 

               <Route path='/Addproducts'  element={<Addproduct/>} />
               <Route path='/edit-product/:id'   element={<Addproduct/>}/>
               <Route path='/products/view'  element={<Viewproducts/>}/>

               <Route path='/why-choose-us/add'  element={<WhyChooseUs/>} />
               <Route path='/edit-whyChoose/:id'   element={<WhyChooseUs/>}/>
               <Route path='why-choose-us/view'  element={<WhyChooseUsView/>}/>

               <Route path='/slider/add'  element={<AddSlider/>} />
               <Route path='/edit-slider/:id'   element={<AddSlider/>}/>
               <Route path='/slider/view'  element={<ViewSlider/>}/>

               <Route path='/country/add'  element={<AddCountry/>} />
               <Route path='/edit-country/:id'   element={<AddCountry/>}/>
               <Route path='/country/view'  element={<ViewCountry/>}/>

               <Route path='testimonial/add'  element={<AddTestimonials/>} />
               <Route path='/edit-test/:id'   element={<AddTestimonials/>}/>
               <Route path='testimonial/view'  element={<ViewTestimonials/>}/>

               <Route path='/faq/add'  element={<AddFaq/>} />
               <Route path='/edit-faq/:id'   element={<AddFaq/>}/>
               <Route path='/faq/view'  element={<ViewFaq/>}/>

               <Route path='/order/view'  element={<OrderView/>}/>

               <Route path='/admin-profile' element={<Adminprofile/>}/>
               <Route path='/company-profile' element={<CompanyProfile/>}/>
               
               
           </Route>
           <Route path='/' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>

 </MainContext>
    
  
)

