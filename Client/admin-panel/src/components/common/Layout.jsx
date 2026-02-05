import React from 'react'
import SideBar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { useContext } from 'react'
import { LoginContext} from '../../context/mainContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Layout() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    
    let {id,setId}=useContext(LoginContext)

    let navigate= useNavigate()

//    console.log(id);
    useEffect(()=>{
        if (id == '' || id == null || id == undefined) {
           navigate('/');
         }else {
            axios.get(`${apiBaseUrl}admin-auth/check-id/${id}`)
                .then((apiRes) => apiRes.data)
                .then((finalRes) => {
                    if (finalRes.status == 0) {
                         setId('')
                    } 
                })
        }
    },[id])

    return (
        <section className='grid grid-cols-[18%_auto] scroll-y-auto'>
            <aside>
                <SideBar />
            </aside>
            <div className='overflow-y-scroll h-screen'>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </section>
    )
}