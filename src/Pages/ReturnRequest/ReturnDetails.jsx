import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaPlus, FaCircleExclamation } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdError, MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { CiMoneyCheck1 } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import ReturnDetailSkeleton from "../../Components/Returns/ReturnDetailSkeleton";
import {
  returnDetailsAPI,
  approveRequestApi,
  closeReturnApi,
  returnOrderTagsUpdate,
  returnAdditionalInformationUpdate,
  returnRestockingProduct,
  baseURL,
} from "../../Services/api";
import ModalImage from "react-modal-image";
import { debounce, onErrorToast, onSuccessToast, sliceURL } from "../../Services/helper";
import ButtonLoadingSpinner from '../../Components/ButtonLoadingSpinner';
import Timeline from './../../Components/Returns/ReturnsDetails/Timeline';
import ShippingLabelandTracking from './../../Components/Returns/ReturnsDetails/ShippingLabelandTracking';
import Refunds from './../../Components/Returns/ReturnsDetails/Refunds';
import DeclinePopUp from '../../Components/Returns/ReturnsDetails/DeclinePopUp';
import ApprovePopUp from "../../Components/Returns/ReturnsDetails/ApprovePopUp";
const ReturnDetails = ({ storeName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { pathname } = location;
  const [data, setData] = useState();
  const reasonMap = {
    UNKNOWN: "Unknown",
    SIZE_TOO_SMALL: "Size was too small",
    SIZE_TOO_LARGE: "Size was too large",
    UNWANTED: "Customer changed their mind",
    NOT_AS_DESCRIBED: "Item not as described",
    WRONG_ITEM: "Received the wrong item",
    DEFECTIVE: "Damaged or defective",
    STYLE: "Style",
    COLOR: "Color",
    OTHER: "Other",
  }
  // Info: State for Refund Input value autofill
  const [refundInputValue, setrefundInputValue] = useState(null);
  const [refundPOPUP, setrefundPOPUP] = useState(false);
  // Info: State for Updation of Data After any Changes
  const [dataUpdated, setdataUpdated] = useState(true);
  // Info: State for Updation of Order Tags After Data Fetch
  const [order_tags, setorder_tags] = useState([]);

  // Attached Images Download Functions and Functions
  // const imageUrls = [attached_images_1, attached_images_2, attached_images_3];
  const [imageUrls, setImageUrls] = useState(null);
  // Info: Fetching Return Details Data
  useEffect(() => {
    const { storeName, orderId } = sliceURL(pathname);
    // If Condition to overcome the two API calls
    if (dataUpdated) {
      returnDetailsAPI(storeName, orderId)
        .then((obj) => {
          setData(obj);
          // Info: Setting the Order Tags after fetching the Data
          if (!obj?.tags) {
            setorder_tags([]);
          } else {
            setorder_tags(obj?.tags);
          }
          setIsLoading(false);
          setdataUpdated(false);
          // Setting Refund Input Value By default
          setrefundInputValue((parseFloat(obj.returnItem[0]?.price) + parseFloat(obj.returnItem[0].tax) - parseFloat(obj.returnItem[0]?.discountAllocations)).toFixed(2));

          // setting UP Images URLS in array
          setImageUrls(obj?.additionalImages?.map((url) => baseURL + 'uploads/' + url));
        }).catch((err) => console.log(err));
    }
  }, [dataUpdated]);

  // Info: Order History Timeline
  const timelineEntries = [
    {
      date: "August 3",
      events: [
        {
          time: "Saturday at 1:52 PM",
          description: "Return shipment status updated to pre_transit",
        },
        {
          time: "Saturday at 4:20 AM",
          description:
            "Return confirmation email was sent to Test Name (test@gmail.com)",
        },
      ],
    },
    {
      date: "August 5",
      events: [
        {
          time: "Saturday at 4:19 AM",
          description: "Label rate received for UPS via EasyPost",
        },
        {
          time: "Saturday at 4:19 AM",
          description:
            "Return label rate error received for CanadaPost via EasyPost",
        },
        {
          time: "Saturday at 4:19 AM",
          description: "Return label rate received for USPS via EasyPost",
        },
      ],
    },
  ];
  // Info: For Order Tags
  const [inputValue, setInputValue] = useState("");
  const [tagUpdating, settagUpdating] = useState('notUpdating');
  const removeTag = async (tag) => {
    setorder_tags((prevTags) => {
      const updatedTags = prevTags.filter((t) => t !== tag);

      // Call the API to update the tags
      saveTags(updatedTags, "removed");

      return updatedTags; // Return the updated state
    });
  };
  const addTag = async (tag) => {
    if (tag.trim()) {
      setorder_tags((prevTags) => {
        if (!prevTags.includes(tag)) { // Check if the tag is not already in the array
          const updatedTags = [...prevTags, tag];
          // Call the API to save the updated tags
          saveTags(updatedTags, "added");
          return updatedTags; // Return the updated state
        }
        return prevTags; // Return previous state if tag already exists
      });
    }
  };
  const saveTags = async (updatedTags, removedORAdded) => {
    settagUpdating('Updating');
    try {
      const resp = await returnOrderTagsUpdate(storeName, data?.shopifyReturnId, updatedTags);
      if (resp) {
        settagUpdating('Updated');
        setTimeout(() => {
          settagUpdating('notUpdating');
        }, 2000);
      }
    } catch (error) {
      settagUpdating('UpdatingError');
      setTimeout(() => {
        settagUpdating('notUpdating');
      }, 2000);
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addTag(inputValue.trim());
      setInputValue("");
    }
  };


  // Info: Fetching ApproveRequest API Data

  // const [approvePopUp, setApprovePopUp] = useState(false);
  // const openApprove_pop_up = () => {
  //   setApprovePopUp(!approvePopUp);
  // };
  const [loadingApprove, setloadingApprove] = useState(false);
  const handleApproveRequest = () => {
    setloadingApprove(true);
    approveRequestApi(storeName, data?.shopifyReturnId)
      .then((obj) => {
        onSuccessToast("Request approved successfully");
        setdataUpdated(true);
        setloadingApprove(false);
      }).catch((err) => {
        onErrorToast("Something error has been occurerd.");
        setloadingApprove(false);
      });
  };
  // Info: DeclineRequest Data
  const [declinePopUp, setDeclinePopUp] = useState(false);
  const openDecline_pop_up = () => {
    setDeclinePopUp(!declinePopUp);
  };
  // Info: Closing the Return
  const [loadingCloseReturn, setloadingCloseReturn] = useState(false);
  const handleCloseReturn = async () => {
    setloadingCloseReturn(true);
    try {
      const resp = await closeReturnApi(storeName, data?.shopifyReturnId);
      if (resp) {
        onSuccessToast("Return Closed Successfully");
        setdataUpdated(true);
        setloadingCloseReturn(false);
      }
    } catch (error) {
      onErrorToast("Closing Return Failed");
      setloadingCloseReturn(false);
    }
  };
  // Info: Updating Additional Information Data
  const [noteUpdating, setNoteUpdating] = useState('notUpdating');
  const handleAdditionalInformation = async (e) => {
    setNoteUpdating('Updating');
    try {
      const resp = await returnAdditionalInformationUpdate(storeName, data?.shopifyReturnId, e.target.value);
      if (resp) {
        setNoteUpdating('Updated');
        setTimeout(() => {
          setNoteUpdating('notUpdating');
        }, 2000);
        console.log(resp);
      }
    } catch (error) {
      setNoteUpdating('UpdatingError');
      setTimeout(() => {
        setNoteUpdating('notUpdating');
      }, 2000);
      console.log(error);
    }
  }
  const debouncedHandleAdditionalInformation = debounce(handleAdditionalInformation, 1200);
  // Info: Restocking the Product
  const [loadingRestockItem, setloadingRestockItem] = useState(false);
  const handleRestockItem = async () => {
    setloadingRestockItem(true);
    try {
      const resp = await returnRestockingProduct(storeName, data.returnItem[0]?.reverseFulfillmentOrderLineItemId, data?.shopifyReturnId);
      if (resp) {
        onSuccessToast("Item Restocked Successfully");
        setdataUpdated(true);
        setloadingRestockItem(false);
      }
    } catch (err) {
      console.log(err);
      onErrorToast("Item Restocking Failed");
      setloadingRestockItem(false);
    }
  }
  // -------------------------   Return JSX DATA -------------------------
  if (isLoading) {
    return <ReturnDetailSkeleton />;
  } else {
    return (
      <>
        {/* Imp: Remove mb-10 when adding Timeline */}
        <section className="mb-10">
          <div className="mt-4 mb-2 cursor-pointer hover:-ml-[4px] transition-all flex gap-2 items-center font-medium w-fit"
            onClick={() => navigate(-1)}
          >
            <MdOutlineKeyboardBackspace size={20} /> <span>Returns</span>
          </div>
          <div className="flex items-center gap-x-7 gap-y-3 justify-between text-sm text-[var(--text-color)] max-lg:flex-col">
            <div className="w-[50%] flex items-center gap-x-8 gap-y-2 flex-wrap max-lg:w-[70%] max-sm:w-full max-lg:justify-center max-sm:justify-start">
              <div className="flex items-center gap-2">
                <span>Return Request</span>
                <span>
                  <FaAngleRight
                    size={12}
                    className="text-[var(--dark-light-brown)] group-disabled:text-[var(--data-gray-color)]"
                  />{" "}
                </span>{" "}
                <span><a href={`https://admin.shopify.com/store/${storeName}/orders/${data.shopifyOrderId}`} target="_blank" className="hover:underline underline-offset-2">Order {data.orderName}</a></span>
              </div>
              {/* Status */}
              <div className="text-sm flex gap-2 flex-wrap justify-center max-sm:justify-start">
                {data.status == "CLOSED" ? (
                  <p className="text-[var(--text-color)] font-medium flex gap-2 items-center uppercase">
                    <span className="flex w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="">Returned</span>
                  </p>
                ) : data.status == "DECLINED" ? (
                  <p className="text-[var(--text-color)] font-medium flex gap-2 items-center uppercase">
                    <span className="flex w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="">Declined</span>
                  </p>
                ) : data.status == "REQUESTED" ? (
                  <p className="text-[var(--text-color)] font-medium flex gap-2 items-center uppercase">
                    <span className="flex w-3 h-3 bg-gray-500 rounded-full"></span>
                    <span className="">Requested</span>
                  </p>
                ) : data.status == "OPEN" ? (
                  <p className="text-[var(--text-color)] font-medium flex gap-2 items-center uppercase">
                    <span className="flex w-3 h-3 bg-orange-300 rounded-full"></span>
                    <span className="">In Progress</span>
                  </p>
                ) : null}
                {data?.isRestocked ? (
                  <p className="text-[var(--text-color)] font-medium flex gap-2 items-center uppercase">
                    <AiOutlineStock size={18} />
                    <span>Restocked</span>
                  </p>
                ) : null}
                {data?.refundStatus == "Partially refunded" || data?.refundStatus == "Refunded" ? (
                  <p className="text-[var(--text-color)] font-medium flex gap-2 items-center uppercase">
                    <CiMoneyCheck1 size={22} />
                    {
                      data?.refundStatus == "Refunded" ? (
                        <span>Refunded</span>
                      ) : (
                        <span>Partially refunded</span>
                      )
                    }
                  </p>
                ) : null}
              </div>
            </div>
            <div className="w-[50%] flex gap-5 justify-end max-lg:w-[70%] max-sm:w-full max-lg:justify-center ">
              {/* Approve, Decline, Closed and Restock Buttons */}
              {data?.status == "OPEN" || data?.status == "CLOSED" ? (
                data?.isRestocked ? null : (
                  <button
                    onClick={loadingRestockItem ? null : handleRestockItem}
                    className="px-2 py-2 at-light-btn w-[170px] block"
                  >
                    {loadingRestockItem ? <ButtonLoadingSpinner sizeClass={"size-5"} /> : "Restock Item"}
                  </button>
                )
              ) : null}
              {data?.status == "REQUESTED" ? (
                <>
                  <div className="flex gap-5 w-full [&>*]:w-[170px] [&>*]:px-2 [&>*]:py-2 justify-end  max-lg:justify-center">
                    <button
                      className="at-light-btn"
                      onClick={openDecline_pop_up}
                    >
                      Decline
                    </button>
                    <button
                      className="at-dark-btn"
                      onClick={loadingApprove ? null : handleApproveRequest}
                    >
                      {loadingApprove ? <ButtonLoadingSpinner sizeClass={"size-5"} /> : "Approve"}
                    </button>
                  </div>
                </>
              ) : data?.status == "OPEN" ? (
                <button
                  onClick={loadingCloseReturn ? null : handleCloseReturn}
                  className="px-2 py-2 at-dark-btn w-[170px] block"
                >
                  {loadingCloseReturn ? <ButtonLoadingSpinner sizeClass={"size-5"} /> : "Close Return"}
                </button>
              ) : null}
            </div>
          </div>
          <div className="pb-6">
            {data?.status == "DECLINED" ? (
              <div className="text-sm text-[var(--text-color)] at-return-card mt-3">
                {data?.customerDeclineNote && (
                  <div className="">
                    <span className="font-medium">Admin Declined Note: </span> {data?.adminDeclineNote}
                  </div>
                )}
                {data?.customerDeclineNote && (
                  <div className="">
                    <span className="font-medium">Decline Note for Customer: </span> {data?.customerDeclineNote}
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className="flex gap-7 [&>*]:w-[50%] max-lg:flex-col max-lg:[&>*]:w-full">
            <div className="flex flex-col gap-7">
              {/* card - 1 */}
              <div className="at-return-card ">
                <div className="text-[var(--text-color)] text-lg font-semibold">
                  <a href={`https://admin.shopify.com/store/${storeName}/orders/${data.shopifyOrderId}`} target="_blank" className="hover:underline underline-offset-2">ORDER {data.orderName}</a>
                </div>
                <div className="text-[var(--dark-light-brown)] justify-between font-medium text-sm mb-5">
                  <div className="flex gap-2 justify-between mb-1">
                    <span className="shrink-0 w-1/3 max-sm:w-1/2">Return Requested on:</span>{" "}
                    <span className="text-right w-2/3 max-sm:w-1/2">{data.requestedAt}</span>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <span className="shrink-0 w-1/3 max-sm:w-1/2">Ordered on:</span>{" "}
                    <span className="text-right w-2/3 max-sm:w-1/2">{data.purchasedAt}</span>
                  </div>
                </div>
                <div className="font-medium mb-2 text-sm">
                  <span className="font-semibold">Outcome Requested:</span> {data?.typeofReturn}
                </div>
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Items to be Returned
                </div>
                <div>
                  {data?.returnItem?.map((data, index) => (
                    <div key={index} className="p-3 border-[var(--dark-light-brown)] border-[1px] rounded-2xl  text-base">
                      <div className="flex gap-4 items-center">
                        <div className="size-[90px] shrink-0 max-sm:w-[60px] max-sm:h-[60px]">
                          <img
                            src={data?.imageUrl}
                            className="object-contain w-full h-full border-2 rounded-xl border-[var(--dark-light-brown)] bg-[var(--white-color)]"
                          />
                        </div>
                        <div>
                          <div className="mb-1">
                            <span className="text-base font-semibold text-[var(--text-color)]  max-sm:text-sm">
                              <a href={`https://admin.shopify.com/store/${storeName}/products/${data?.productId}`} target="_blank" className="hover:underline hover:underline-offset-2">{data?.productName}</a>
                            </span>
                          </div>
                          {data?.variantTitle == "Default Title" ? null :
                            <div className="mb-1">
                              <span className="text-sm font-normal text-[var(--text-color)] max-sm:text-sm bg-[var(--white-color)] p-1 rounded border-2 border-[var(--border-color)]">
                                {data?.variantTitle}
                              </span>
                            </div>
                          }
                          {data?.sku ? (
                            <div>
                              <span className="text-xs font-semibold text-[var(--text-color)] max-sm:text-sm">
                                SKU: <span>{data?.sku}</span>
                              </span>
                            </div>
                          ) : null}
                          <div>
                            <span className="font-medium text-[var(--dark-light-brown)]">
                              ${data?.price}
                              <span className="text-[var(--text-color)]"> x {data?.qty}
                              </span>
                            </span>
                          </div>

                        </div>
                      </div>
                      <div className="text-base max-sm:text-sm text-[var(--text-color)] mt-4">
                        <div>
                          <span className="font-medium text-[var(--dark-light-brown)]">
                            Return Reason: </span> <span>{reasonMap[data?.returnReason]}</span>
                        </div>
                        {data.customerNote && (
                          <div>
                            <span className="font-medium text-[var(--dark-light-brown)]">
                              Customer Note:
                            </span> <span>{data.customerNote}</span>
                          </div>
                        )}
                        {data.returnReasonNote && (
                          <div>
                            <span className="font-medium text-[var(--dark-light-brown)]">
                              Reason Note:
                            </span> <span>{data.returnReasonNote}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div><button className="ml-auto block text-sm mt-4 py-3 px-5 at-dark-btn leading-none min-w-[100px]" onClick={() => setrefundPOPUP(true)}>Refund Details</button></div>
              </div>
              {/* Card -1 End */}

              {/* Card - 3 Return Shipping Options */}
              {/* <ShippingLabelandTracking data={data} /> */}
              {/* Card - 3 Return Shipping Options End */}

              {/* For Card - 4 Images Card */}
              <div className="at-return-card  text-[var(--text-color)]">
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Attached images
                </div>
                <div className="flex justify-between gap-4 place-items-start max-sm:flex-col-reverse">
                  <div className="flex flex-wrap gap-4 w-full">
                    {imageUrls?.map((imageUrl, index) => (
                      <div
                        className="rounded-xl border-2 border-[var(--dark-light-brown)] size-[130px] max-sm:size-[100px] [&>div]:w-full [&>div]:h-full overflow-hidden"
                        key={index}
                      >
                        <ModalImage
                          className="w-full h-full object-cover overflow-hidden"
                          small={imageUrl}
                          large={imageUrl}
                        />
                      </div>
                    ))}
                    {imageUrls?.length == 0 || imageUrls == null && (
                      <div className="text-sm text-[var(--text-color)] font-medium">
                        No images attached
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Card - 4 End */}
            {/* Column - 1 END*/}

            {/* Column - 2 */}
            <div className="flex flex-col gap-7">
              {/* card - 1 Contact Information */}
              <div className="at-return-card ">
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Contact Information
                </div>
                <div>
                  <table className="text-left border-collapse [&>tbody>tr>th]:text-[var(--text-color)]  [&>tbody>tr>th]:w-[160px] [&>tbody>tr>*]:font-medium [&>tbody>tr>td]:text-[var(--dark-light-brown)] [&>tbody>tr>*]:p-1 max-sm:[&>tbody>tr>*]:px-0 max-sm:[&>tbody>tr>*]:py-2 max-sm:[&>tbody>tr>*]:text-sm max-sm:[&>tbody>tr>th]:w-[115px]">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>
                          {data.shippingAddress.name
                            ? data.shippingAddress.name
                            : data?.firstName + data?.lastName}
                        </td>
                      </tr>
                      <tr>
                        <th>Phone Number</th>
                        <td>
                          {(!data.contactInformation?.phone ?
                            (!data.shippingAddress?.phone ?
                              (!data.billingAddress?.phone ?
                                (<span className="text-red-500">No Phone Number</span>) :
                                data.billingAddress?.phone
                              ) :
                              data.shippingAddress?.phone) :
                            data.contactInformation?.phone)}
                        </td>
                      </tr>
                      <tr>
                        <th>E-mail id</th>
                        <td>{data.contactInformation.email}</td>
                      </tr>
                      <tr>
                        <th>Shipping Address</th>
                        <td>
                          {data.shippingAddress.address1},{" "}
                          {data.shippingAddress.address2}
                          {data.shippingAddress.address2 ? `,` : null}{" "}
                          {data.shippingAddress.city},{" "}
                          {data.shippingAddress.country},{" "}
                          {data.shippingAddress.zip}
                        </td>
                      </tr>
                      <tr>
                        <th>Billing Address</th>
                        <td>
                          {data.shippingAddress?.address1 +
                            data.shippingAddress?.address2 +
                            data.shippingAddress?.city +
                            data.shippingAddress?.country +
                            data.shippingAddress?.zip ===
                            data.billingAddress?.address1 +
                            data.billingAddress?.address2 +
                            data.billingAddress?.city +
                            data.billingAddress?.country +
                            data.billingAddress?.zip
                            ? "same as shipping address"
                            : `${data.billingAddress?.address1}, ${data.billingAddress?.address2
                            }${data.billingAddress?.address2 ? `,` : null} ${data.billingAddress?.city
                            }, ${data.billingAddress?.country}, ${data.billingAddress?.zip
                            }`}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Card - 1 Contact Information End */}

              {/* Card - 2 Tags ---- */}
              <div className="at-return-card ">
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4 flex gap-2 justify-between">
                  <span>Tags</span>
                  <span>
                    {/* Updating
                  Updated
                  notUpdating */}
                    {tagUpdating != "notUpdating" ? (
                      <>
                        {tagUpdating == "Updated" ? (
                          <IoCheckmarkDoneCircleSharp size={18} className="text-green-500" />
                        ) : null}
                        {tagUpdating == "Updating" ? (
                          <ButtonLoadingSpinner sizeClass={"size-[18px]"} />
                        ) : null}
                        {tagUpdating == "UpdatingError" ? (
                          <FaCircleExclamation size={18} className="text-red-500" />
                        ) : null}
                      </>
                    ) : null}
                  </span>
                </div>
                <input
                  className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2 text-sm"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a tag"
                ></input>
                {inputValue && (
                  <div className="dropdown cursor-pointer">
                    <ul>
                      <li
                        className="flex gap-2 bg-[var(--white-color)] items-center text-sm rounded-md text-[var(--text-color)] p-2 border-[var(--border-color)] border-2"
                        onClick={() => {
                          addTag(inputValue);
                          setInputValue("");
                        }}
                      >
                        <span className="icon">
                          <FaPlus />
                        </span>{" "}
                        Add: {inputValue}
                      </li>
                    </ul>
                  </div>
                )}
                {order_tags.length ? (
                  <ul className="flex flex-wrap gap-2 mt-5">
                    {order_tags.map((tag, index) => (
                      <li
                        key={index}
                        className="flex gap-2 items-center px-2 py-1 bg-[var(--white-color)] text-sm rounded-md text-[var(--text-color)]"
                      >
                        {tag}
                        <span
                          onClick={() => removeTag(tag)}
                          className="shrink-0 cursor-pointer"
                        >
                          <RxCross1 />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {/* Card - 2 Tags END---- */}

              {/* Card - 3 */}
              {/* For Aditional Note Card */}

              <div className="at-return-card ">
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4 flex gap-2 justify-between">
                  <span>Internal Note</span>
                  {noteUpdating != "notUpdating" ? (
                    <>
                      {noteUpdating == "Updated" ? (
                        <IoCheckmarkDoneCircleSharp size={18} className="text-green-500" />
                      ) : null}
                      {noteUpdating == "Updating" ? (
                        <ButtonLoadingSpinner sizeClass={"size-[18px]"} />
                      ) : null}
                      {noteUpdating == "UpdatingError" ? (
                        <FaCircleExclamation size={18} className="text-red-500" />
                      ) : null}
                    </>
                  ) : null}
                </div>
                <textarea className="w-full outline-none border-2 border-[var(--border-color)] rounded-lg p-2 text-sm min-h-20" onChange={debouncedHandleAdditionalInformation} defaultValue={data?.additionalInformation ? `${data?.additionalInformation}` : null}>
                </textarea>
              </div>
              {/* Card - 3 End */}
            </div>
            {/* Column - 2 END */}
          </div>
        </section >
        {/*------------------- Return History ---------------------------- */}
        {/* <Timeline timelineEntries={timelineEntries} /> */}
        {/*------------------- Return History END ---------------------------- */}
        {/*-------------------Approve and  Decline Popup ---------------------------- */}
        <DeclinePopUp data={data} declinePopUp={declinePopUp} openDecline_pop_up={openDecline_pop_up} setdataUpdated={setdataUpdated} />
        {/* <ApprovePopUp declinePopUp={declinePopUp}  openDecline_pop_up={openDecline_pop_up} /> */}
        {/*------------------- Approve and  Decline Popup END ---------------------------- */}
        {/* Card - 2 Refund Popup */}
        <Refunds refundPOPUP={refundPOPUP} setrefundPOPUP={setrefundPOPUP} reasonMap={reasonMap} storeName={storeName} data={data} setdataUpdated={setdataUpdated} pathname={pathname} refundInputValue={refundInputValue} setrefundInputValue={setrefundInputValue} />
        {/* Card - 2 Refund Popup  End */}

      </>
    );
  }
};

export default ReturnDetails;