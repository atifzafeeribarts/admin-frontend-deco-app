import React from "react";
import returImg from "./../assets/return.png";
import adminImg from "./../assets/admin.png";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = ({ toggleSideMenu }) => {
  return (
    <>
      <nav className="bg-[var(--light-cream-background)] border-b-2 border-[var(--dark-light-brown)] h-[66px] flex">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 max-sm:py-2 w-full">
          <button
            type="button"
            className="inline-flex items-center p-2  text-sm text-[var(--black-color)] rounded-lg sm:hidden bg-[var(--dark-light-brown)] focus:outline-none focus:shadow-none"
            onClick={toggleSideMenu}
          >
            <span className="sr-only">Open sidebar</span>
            <HiMenuAlt2 size={20} color="var(--white-color)"/>
          </button>
          <a
            // href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={returImg} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[var(--text-color)] max-sm:text-lg">
              Return Ranger
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={adminImg}
                alt="user photo"
              />
            </button>
            {/* <p>Admin</p> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
