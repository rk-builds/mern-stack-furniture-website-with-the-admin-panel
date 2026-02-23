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
    <div className="max-w-[1170px] mx-auto bg-white shadow-xl rounded-xl my-5">

      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR */}
        <div className="md:w-64 w-full bg-white md:border-r border-b md:border-b-0 p-4">

          {/* Mobile Horizontal Scroll */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`whitespace-nowrap px-4 py-2 rounded-md transition-all text-sm
              ${activeTab === "dashboard"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`whitespace-nowrap px-4 py-2 rounded-md transition-all text-sm
              ${activeTab === "orders"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              My Orders
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`whitespace-nowrap px-4 py-2 rounded-md transition-all text-sm
              ${activeTab === "address"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              My Address
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`whitespace-nowrap px-4 py-2 rounded-md transition-all text-sm
              ${activeTab === "profile"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              My Profile
            </button>

            <button
              onClick={() => setActiveTab("password")}
              className={`whitespace-nowrap px-4 py-2 rounded-md transition-all text-sm
              ${activeTab === "password"
                  ? "bg-[#C09578] text-black font-semibold"
                  : "bg-black text-white hover:bg-[#C09578] hover:text-black"
                }`}
            >
              Change Password
            </button>

          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-[400px]">
          {renderContent()}
        </div>

      </div>
    </div>
  );
}