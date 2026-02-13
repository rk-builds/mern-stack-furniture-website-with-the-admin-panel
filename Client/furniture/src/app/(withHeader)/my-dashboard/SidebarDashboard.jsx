"use client"
import React, { useState } from 'react'
import Dashboard from './Dashboard';
import ChangePassword from './ChangePassword';
import Orders from './Orders';
import Adress from './Adress';
import Profile from './Profile';


export default function SidebarDashboard() {

  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "address":
        return <Adress />;
      case "profile":
        return <Profile />;
      case "password":
        return <ChangePassword />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
     
     

       
        <div className="w-[1170px] mx-auto flex bg-white shadow-2xl rounded-xl my-5">

          
          <div className="w-64  text-white flex flex-col p-6 space-y-2">

            {/* <h2 className="text-xl font-bold text-[#C09578] mb-4">
              My Dashboard
            </h2> */}

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-md text-left transition-all
                ${activeTab === "dashboard"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-md text-left transition-all
                ${activeTab === "orders"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              My Orders
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`px-4 py-2 rounded-md text-left transition-all
                ${activeTab === "address"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              My Address
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-md text-left transition-all
                ${activeTab === "profile"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              My Profile
            </button>

            <button
              onClick={() => setActiveTab("password")}
              className={`px-4 py-2 rounded-md text-left transition-all
                ${activeTab === "password"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              Change Password
            </button>

          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 p-6 bg-gray-50 min-h-[400px]">
            {renderContent()}
          </div>

       </div>
    </>
  );
}

          

