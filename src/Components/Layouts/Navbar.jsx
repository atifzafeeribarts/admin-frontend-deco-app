import React from "react";
import returImg from "../../assets/return.png";
import Avatar from 'react-avatar';
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = ({ toggleSideMenu }) => {
  return (
    <>
      <nav className="bg-[var(--light-cream-background)] border-b-2 h-[50px] border-[var(--dark-light-brown)] flex">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2 max-sm:py-2 w-full">
          <button
            type="button"
            className="inline-flex items-center p-[6px]  text-sm text-[var(--black-color)] rounded-lg sm:hidden bg-[var(--dark-light-brown)] focus:outline-none focus:shadow-none"
            onClick={toggleSideMenu}
          >
            <span className="sr-only">Open sidebar</span>
            <HiMenuAlt2 size={20} color="var(--white-color)"/>
          </button>
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/ReturnRanger.png" className="h-8" />
            {/* <span className="self-center text-xl font-semibold whitespace-nowrap text-[var(--text-color)] max-sm:text-lg">
              Return Ranger
            </span> */}
          </a>
          <div className="">
            <button type="button">
              <Avatar name="Admin" round className="text-sm ibat-avatar" size="30"/>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
