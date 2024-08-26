import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import returnBlack from "../../assets/return-black.png";
import logoutBlack from "../../assets/logout-black.png";
import accountBlack from "../../assets/account-black.png";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { logoutUser, logout } from '../../Redux/Slices/authSlice';
import ButtonLoadingSpinner from "../ButtonLoadingSpinner";
import { onErrorToast, onSuccessToast } from "../../Services/helper";

const Sidebar = ({ sideMenuOpen }) => {
  const navigate = useNavigate();
  // LOGOUT ------------------s
  const dispatch = useDispatch();
  const [loadedLogoutBTN, setloadedLogoutBTN] = useState(false);
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const navigation_object = [
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: "/dashboard.png",
      active_icon: accountBlack,
    },
    {
      text: "Return Requests",
      type: "dropdown",
      icon: "/bag.png",
      active_icon: returnBlack,
      dropdown_items: [
        {
          text: "Deco TV Frames",
          link: "/return-request/deco-tv-frames",
        },
        {
          text: "Frame My TV",
          link: "/return-request/frame-my-tv",
        },
      ],
    },
    {
      text: "Sign Out",
      link: "/login",
      icon: "/signout.png",
      active_icon: logoutBlack,
    },
  ];
  const [openpopup, setopenpopup] = useState(false);
  const logoutpopup = () => {
    setopenpopup(!openpopup);
  }

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
                      className={`w-full flex items-center p-2 text-[var(--dark-light-brown)] border-b-2 border-transparent hover:text-[var(--text-color)] hover:font-semibold group ib-img-blck-hover ${pathname.includes("return-request")
                        ? "font-semibold text-[var(--text-color)] ib-img-blck-active border-b-2 border-[var(--text-color)]"
                        : ""
                        }`}
                      aria-controls={`dropdown-${id}`}
                      onClick={() => setOpenDrawer(!openDrawer)}
                    >
                      <img src={item.icon} className="ib-img-non-active" />
                      <img
                        src={item.active_icon}
                        className="img-black-active"
                      />
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        {item.text}
                      </span>
                      <FaAngleDown />
                    </button>
                    <div
                      id={`dropdown-${id}`}
                      className={`${openDrawer ? "" : "hidden"
                        } py-2 space-y-2 pl-7`}
                    >
                      {item.dropdown_items.map((dropdownItem, dropdownId) => (
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
                            {dropdownItem.text}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              // This is Button for Sign Out
              if (item.text === "Sign Out") {
                return (
                  <div key={id}>
                    <div>
                      <button
                        onClick={logoutpopup}
                        className="w-full flex items-center p-2 text-[var(--dark-light-brown)] border-b-2 border-transparent hover:border-[var(--text-color)] hover:text-[var(--text-color)] hover:font-semibold group ib-img-blck-hover"
                      >
                        <img src={item.icon} className="ib-img-non-active" />
                        <img
                          src={item.active_icon}
                          className="img-black-active"
                        />
                        <span className="ms-3">{item.text}</span>
                      </button>
                    </div>
                    {/*  POPUP */}
                    <div id="info-popup" className={`${openpopup ? "block" : "hidden"} -mt-[50px] fixed w-screen top-0 left-0 z-50 h-modal h-screen flex items-center justify-center before:bg-[var(--text-color)] before:opacity-50 before:w-full before:h-full before:absolute`}>
                      <div className="relative p-4 w-full max-w-lg ">
                        <div className="relative max-sm:px-4 p-8 bg-[var(--light-cream-background)] rounded-lg shadow ">
                          <div className="mb-6 text-sm text-[var(--text-color)] ">
                            <h3 className="mb-3 text-2xl font-bold">Sign Out</h3>
                            <p>
                              Are you sure you want to Sign Out?
                            </p>
                          </div>
                          <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                            <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                              <button onClick={logoutpopup} type="button" className="bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)] py-2 px-4 w-full rounded-md border-2 text-sm font-medium min-w-[100px]">Cancel</button>
                              <button onClick={loadedLogoutBTN ? null : handleLogout} id="confirm-button" type="button" className="bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)] py-2 px-4 min-w-[100px] w-full rounded-md border-2 text-sm font-medium">
                                {loadedLogoutBTN ? (
                                  <ButtonLoadingSpinner sizeClass={"size-5"}/>
                                ) : "Confirm"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* END POPUP */}
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
                    <img src={item.icon} className="ib-img-non-active" />
                    <img src={item.active_icon} className="img-black-active" />
                    <span className="ms-3">{item.text}</span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
