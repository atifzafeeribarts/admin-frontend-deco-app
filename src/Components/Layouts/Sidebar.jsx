import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { MdDashboard,MdLogout } from "react-icons/md";
import { FaCirclePlus, FaAngleDown, FaDev } from "react-icons/fa6";
import { FiCodesandbox } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { logoutUser, logout } from '../../Redux/Slices/authSlice';
import ButtonLoadingSpinner from "../ButtonLoadingSpinner";
import { onErrorToast, onSuccessToast } from "../../Services/helper";
import DecoTVLOGO from "../../assets/Favicon_DecoTV.png";

const Sidebar = ({ sideMenuOpen }) => {
  const navigate = useNavigate();
  // LOGOUT ------------------
  const dispatch = useDispatch();
  const [loadedLogoutBTN, setloadedLogoutBTN] = useState(false);
  const [openpopup, setopenpopup] = useState(false);
  const logoutpopup = () => {
    setopenpopup(!openpopup);
  }
  const handleLogout = async () => {
    setloadedLogoutBTN(true);
    try {
      let response_loggedout = await dispatch(logoutUser());
      if (response_loggedout.meta.requestStatus == "fulfilled") {
        await dispatch(logout());
        onSuccessToast('Logout Successfull');
        navigate("/login");
      }
    } catch (error) {
      onErrorToast('Logout failed');
    }
    setloadedLogoutBTN(false);
  };
  // LOGOUT END ------------------
  const location = useLocation();
  const { pathname } = location;
  const [openDropdowns, setOpenDropdowns] = useState({});
  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  // For the Dropdown Text and URL Must be matched so that it will work ex. Return Request(Text) -> return-request(URL)
  const navigation_object = [
    {
      text: "Create Return",
      link: "/create-return",
      icon: <FaCirclePlus size={20} />
    },
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: <MdDashboard size={20} />
    },
    {
      text: "Return Request",
      type: "dropdown",
      icon: <FiShoppingBag size={20} />,
      dropdown_items: [
        {
          text: "Developer ENV",
          link: "/return-request/framemytvapp",
          icon: <FaDev size={18} />
        },
        {
          text: "Sandbox",
          link: "/return-request/decotvframes-sandbox",
          icon: <FiCodesandbox size={18} />
        },
        {
          text: "Deco TV Frames",
          link: "/return-request/decotvframes",
          img: DecoTVLOGO
        }
      ],
    },
    {
      text: "Settings",
      type: "dropdown",
      icon: <IoIosSettings size={20} />,
      dropdown_items: [
        {
          text: "Notifications",
          link: "/settings/notifications",
          icon: <MdOutlineNotificationsActive size={18} />
        }
      ],
    },
    {
      text: "Log Out",
      type: "button",
      clickfunc: logoutpopup,
      icon: <MdLogout size={20} />
    },
  ];


  return (
    <div>
      <aside
        className={`fixed left-0 z-40 w-64 h-screen transition-transform transform ${sideMenuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 border-r-2 border-[var(--dark-light-brown)] bg-[#FBF1E2]`}
        aria-label="Sidebar"
      >
        <nav className="h-full px-3 py-4 overflow-y-auto">
          <div className="font-medium flex flex-col gap-4">
            {navigation_object.map((item, id) => {
              if (item.type === "dropdown") {
                return (
                  <div key={id}>
                    <button
                      type="button"
                      className={`w-full flex items-center p-2 text-[var(--dark-light-brown)] border-b-2 border-transparent hover:text-[var(--text-color)] hover:font-semibold group ib-img-blck-hover ${pathname.includes(item.text.replace(" ", "-").toLowerCase())
                        ? "font-semibold text-[var(--text-color)] ib-img-blck-active border-b-2 border-[var(--text-color)]" : null}`}
                        onClick={() => toggleDropdown(id)}
                    >
                      {item.icon}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        {item.text}
                      </span>
                      <FaAngleDown />
                    </button>
                    <div className={`${openDropdowns[id] ? "" : "hidden"} py-2 space-y-2 pl-7`}>
                      {item.dropdown_items?.map((dropdownItem, dropdownId) => (
                        <div key={dropdownId}>
                          <NavLink
                            to={dropdownItem.link}
                            className={({ isActive }) =>
                              `text-sm flex items-center p-2 text-[var(--dark-light-brown)] border-b-2 border-transparent hover:border-[var(--text-color)] hover:text-[var(--text-color)] hover:font-semibold group ib-img-blck-hover group ${isActive
                                ? "ib-sidebar-border-btm font-semibold text-[var(--text-color)] ib-img-blck-active border-b-2 border-[var(--text-color)]"
                                : ""
                              }`
                            }
                          >
                            {dropdownItem.icon && (
                              <span className="mr-2">
                                {dropdownItem.icon}
                              </span>
                            )}{dropdownItem.img && <img src={dropdownItem.img} width={16} className="mr-2"/>} {dropdownItem.text}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              // This is Button for Functionality
              if (item.type === "button") {
                return (
                  <div key={id}>
                    <button
                      onClick={item.clickfunc}
                      className="w-full flex items-center p-2 text-[var(--dark-light-brown)] border-b-2 border-transparent hover:border-[var(--text-color)] hover:text-[var(--text-color)] hover:font-semibold group ib-img-blck-hover"
                    >
                      {item.icon}
                      <span className="ms-3">{item.text}</span>
                    </button>
                  </div>
                );
              }
              return (
                <div key={id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-[var(--dark-light-brown)] border-b-2 border-transparent hover:border-[var(--text-color)] hover:text-[var(--text-color)] hover:font-semibold group ib-img-blck-hover ${isActive
                        ? "ib-sidebar-border-btm font-semibold text-[var(--text-color)] ib-img-blck-active border-b-2 border-[var(--text-color)]"
                        : ""
                      }`
                    }
                  >
                    {item.icon}
                    <span className="ms-3">{item.text}</span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </nav>
      </aside>
      {/*  POPUP */}
      <div id="info-popup" className={`${openpopup ? "block" : "hidden"}  fixed w-screen top-0 left-0 z-50 h-modal h-screen flex items-center justify-center before:bg-[var(--text-color)] before:opacity-50 before:w-full before:h-full before:absolute`}>
        <div className="relative p-4 w-full max-w-sm">
          <div className="relative max-sm:px-4 p-8 bg-[var(--light-cream-background)] rounded-lg shadow ">
            <div className="mb-10 text-sm text-[var(--text-color)] ">
              <h3 className="mb-3 text-2xl font-bold">Confirm logout</h3>
              <hr className="mb-3 h-[2px]" />
              <p>
                Are you sure you want to log out?
              </p>
            </div>
            <div className="justify-end pt-0 space-y-4 sm:flex sm:space-y-0">
              <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                <button onClick={logoutpopup} type="button" className="at-light-btn py-2 px-4 w-full text-sm font-medium min-w-[100px]">Cancel</button>
                <button onClick={loadedLogoutBTN ? null : handleLogout} id="confirm-button" type="button" className="at-dark-btn py-2 px-4 min-w-[100px] w-full text-sm font-medium">
                  {loadedLogoutBTN ? (
                    <ButtonLoadingSpinner sizeClass={"size-5"} />
                  ) : "OK"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END POPUP */}
    </div>
  );
};

export default Sidebar;
