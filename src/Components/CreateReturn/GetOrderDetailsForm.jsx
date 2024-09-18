import React, { useContext, useRef, useState } from "react";
import { MdError } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { orderDetails } from "../../Services/api";
import ChooseStore from "./ChooseStore";
import ContextProvider from "../../Context/ContextProvider";
import Loading from "./Loading";
import { filterOrderFetchData } from "../../Services/helper";
const GetOrderDetailsForm = () => {
  // ----> Using Context States
  const {
    loading, setLoading,
    setrequestpage, setorderDetailData,
    setstoreName, setChoosenItems
  } = useContext(ContextProvider);
  // END Using Context States

  const [formerror, setformerror] = useState("");
  const ordernumber = useRef(null);
  const email = useRef(null);
  const storename = useRef(null);
  const orderdetailedrequested = async (e) => {
    e.preventDefault();
    setformerror("");
    if (ordernumber.current.value.trim().startsWith("#")) {
      setformerror("Please Enter Order Number without '#'");
    }
    else {
      if (storename.current.value != "Choose Your Store" && ordernumber.current.value.trim().length) {
        setLoading(true);
        try {
          setstoreName(storename.current.value);
          const orderdata = await orderDetails(
            ordernumber.current.value,
            email.current.value,
            storename.current.value
          );
          if (orderdata?.message == "Order Details fetched successfully") {
            const filterOrderData = filterOrderFetchData(orderdata?.data);
            setorderDetailData(filterOrderData);
            setChoosenItems([]);
            setrequestpage(1);
          } else {
            setformerror(orderdata?.message);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error While Fetching Order Details:", error);
          console.log(error);
          setformerror("Something went wrong");
          setLoading(false);
        }
      } else if (storename.current.value == "Choose Your Store") {
        setformerror("Please Choose your Store");
      } else {
        setformerror("Please Enter Order Number");
      }
    }
  };
  // Info: State for the Choose Store Popup -- Policy and Contact Us
  const [chooseStorePopup, setchooseStorePopup] = useState(false);
  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <>
            <div className={`${chooseStorePopup ? 'hidden' : 'block '}`}>
              <div className="text-center">
                <h1 className="text-3xl font-semibold mb-6 max-sm:text-2xl">Create Return</h1>
                {formerror ? (
                  <div className="text-red-500 flex gap-2 text-sm items-center mb-4 max-w-[400px] m-auto">
                    <MdError className="shrink-0" />
                    <span className="text-left">{formerror}</span>
                  </div>
                ) : null}

                <form className="w-full max-w-[400px] m-auto" onSubmit={orderdetailedrequested}>
                  <div className="mb-6">
                    <input
                      type="text"
                      name="ordernumber"
                      placeholder="Order Number (ex. 12345)"
                      className="text-sm w-full p-3 border-2 border-[var(--border-color)] rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[var(--border-color)]"
                      ref={ordernumber}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      className="text-sm w-full p-3 border-2 border-[var(--border-color)] rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[var(--border-color)]"
                      ref={email}
                      required
                    />
                    <select
                      name="shopifystore"
                      placeholder="Enter Your Email"
                      className="text-sm w-full p-3 border-2 border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border-color)] cursor-pointer"
                      ref={storename}
                      required
                    >
                      <option defaultValue>Choose Your Store</option>
                      <option value="framemytvapp">Developer ENV</option>
                      <option value="decotvframes-sandbox">Sandbox</option>
                      <option value="decotvframes">Deco TV Frames</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-8 hover:scale-[1.03] flex items-center gap-2 m-auto bg-[var(--dark-light-brown)] border-2 border-transparent text-[var(--white-color)] rounded-md hover:bg-[var(--light-cream-background)] hover:border-[var(--dark-light-brown)] hover:text-[var(--dark-light-brown)] transition-all uppercase text-sm"
                  >
                    Start Here <span><FaArrowRight /></span>
                  </button>
                </form>
              </div>
            </div>
            {/* PopUP */}
            <ChooseStore chooseStorePopup={chooseStorePopup} setchooseStorePopup={setchooseStorePopup} />
          </>
        )
      }
    </>
  );
};

export default GetOrderDetailsForm;
