import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 fixed top-0 w-full">
        <Navbar toggleSideMenu={toggleSideMenu} />
      </div>
      <div className="mt-[66px]">
        <Sidebar sideMenuOpen={sideMenuOpen} />
        <main className="sm:ml-64 h-[calc(100vh-66px)] overflow-auto p-4"> 
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
