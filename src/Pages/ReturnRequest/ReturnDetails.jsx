import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { FaAngleRight, FaPlus } from "react-icons/fa6";
import { TbCirclePlus } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { ImNewTab } from "react-icons/im";
import { MdError } from "react-icons/md";
import { useLocation } from "react-router-dom";
import ReturnDetailSkeleton from "./ReturnDetailSkeleton";
import {
  returnDetailsAPI,
  approveRequestApi,
  refundRequestApi,
  declineRequestApi,
  closeReturnApi,
  returnOrderTagsUpdate,
  returnAdditionalInformationUpdate,
} from "../../Services/api";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalImage from "react-modal-image";
import attached_images_1 from "../../assets/attached-image-1.jpg";
import attached_images_2 from "../../assets/attached-image-2.jpg";
import attached_images_3 from "../../assets/attached-image-3.jpg";
import { debounce, sliceURL } from "../../Services/helper";
const ReturnDetails = () => {
  const [file, setFile] = useState(null);
  const [option, setOption] = useState("upload");
  const [isLoading, setIsLoading] = useState(true);

  const [
    generate_shipping_label_id_store,
    setGenerate_shipping_label_id_store,
  ] = useState("");
  const location = useLocation();
  const { pathname } = location;
  const [data, setData] = useState();
  // Info: State for Refund Input value autofill
  const [refundInputValue, setrefundInputValue] = useState(null);
  // Info: State for Updation of Data After any Changes
  const [dataUpdated, setdataUpdated] = useState(true);
  // Info: State for Updation of Order Tags After Data Fetch
  const [order_tags, setorder_tags] = useState([]);

  // Info: Fetching Return Details Data
  const [shopify_store_name, setshopify_store_name] = useState(null);
  useEffect(() => {
    const { storeName, orderId } = sliceURL(pathname);
    // Important: Change this When Doing Live
    if (storeName == "deco-tv-frames") {
      setshopify_store_name("framemytvapp");
    } else if (storeName == "frame-my-tv") {
      setshopify_store_name("checkout-ui-mani");
    }
    // If Condition to overcome the two API calls
    if (dataUpdated) {
      returnDetailsAPI(storeName, orderId)
        .then((obj) => {
          setData(obj);
          console.log(obj);
          // Info: Setting the Order Tags after fetching the Data
          if (!obj?.tags) {
            setorder_tags([]);
          } else {
            setorder_tags(obj?.tags);
          }
          setIsLoading(false);
          setdataUpdated(false);
          // Setting Refund Input Value By default
          setrefundInputValue((parseFloat(obj.returnItem?.price) + parseFloat(obj.tax)).toFixed(2));
          setGenerate_shipping_label_id_store(storeName + "/shipping-label/" + obj?.shopifyReturnId);
        }).catch((err) => console.log(err));
    }
  }, [dataUpdated]);

  // Info: Order History Timeline
  const historyEntries = [
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
  const removeTag = async (tag) => {
    setorder_tags((prevTags) => {
      const updatedTags = prevTags.filter((t) => t !== tag);

      // Call the API to update the tags
      saveTags(updatedTags, "removed");

      return updatedTags; // Return the updated state
    });
  };
  const addTag = async (tag) => {
    if (tag) {
      setorder_tags((prevTags) => {
        const updatedTags = [...prevTags, tag];
        // Call the API to save the updated tags
        saveTags(updatedTags, "added");
        return updatedTags; // Return the updated state
      });
    }
  };
  const saveTags = async (updatedTags, removedORAdded) => {
    try {
      const { storeName, returnId } = sliceURL(pathname);
      const resp = await returnOrderTagsUpdate(storeName, data?.shopifyReturnId, updatedTags);
      if (resp) {
        toast.success(`Tags ${removedORAdded == "removed" ? "removed" : "added"} successfully`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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

  // Attached Images Download Functions and Functions
  const imageUrls = [attached_images_1, attached_images_2, attached_images_3];

  // Info: Fetching ApproveRequest API Data
  const handleApproveRequest = () => {
    const { storeName, orderId } = sliceURL(pathname);
    approveRequestApi(storeName, data?.shopifyReturnId)
      .then((obj) => {
        toast.success("Request approved successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setdataUpdated(true);
      })
      .catch((err) => {
        toast.error("Something error has been occurerd.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };
  // Info: Fetching DeclineRequest API Data
  const decline_reason = useRef(null);
  const declineDropdown_option = useRef(null);
  const admin_decline_reason = useRef(null);
  const [declinePopUp, setDeclinePopUp] = useState(false);
  const [declineErrorMessage, setDeclineErrorMessage] = useState("");
  const openDecline_pop_up = () => {
    setDeclinePopUp(!declinePopUp);
  };
  const handleDeclineRequest = async () => {
    // console.log(decline_reason.current.value == "", declineDropdown_option.current.value == "Choose Your Reason"); 
    if (decline_reason.current.value == "" || declineDropdown_option.current.value == "Decline Reason") {
      setDeclineErrorMessage("Please Enter Decline Reason");
    } else {
      try {
        const { storeName, orderId } = sliceURL(pathname);
        setDeclineErrorMessage("");
        const res = await declineRequestApi(
          storeName,
          data?.shopifyReturnId,
          decline_reason.current.value,
          declineDropdown_option.current.value,
          admin_decline_reason.current.value
        );
        if (res) {
          openDecline_pop_up();
          toast.success("Decline Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setdataUpdated(true);
        }
      } catch (error) {
        toast.error("Something error has been occurerd.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setDeclineErrorMessage(error.response.data.message);
      }
    }
  };

  // Info: Closing the Return
  const handleCloseReturn = async () => {
    const { storeName, returnId } = sliceURL(pathname);
    const resp = await closeReturnApi(storeName, data?.shopifyReturnId);
    try {
      if (resp) {
        toast.success("Return Closed Successfully",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        setdataUpdated(true);
      } 
    } catch (error) {
      toast.error("Something error has been occurerd.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // Info: Fetching RefundRequest API Data
  const refund_amount_input = useRef(null);
  const [refundError, setRefundError] = useState("");
  const handleRefundRequest = async () => {
    if (refund_amount_input.current.value == "") {
      setRefundError("Please Enter Refund Amount");
    } else {
      try {
        setRefundError("");
        const { storeName, orderId } = sliceURL(pathname);
        const resp = await refundRequestApi(
          storeName,
          data?.shopifyReturnId,
          data?.returnReason,
          data?.returnLineItemId,
          refund_amount_input.current.value
        );
        if (resp?.returnRefund?.refund?.totalRefundedSet?.shopMoney?.amount) {
          toast.success(
            "Refunded amount of $" +
            resp?.returnRefund?.refund?.totalRefundedSet?.shopMoney?.amount +
            " Successfully",
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }
          );
          setdataUpdated(true);
        }
      } catch (error) {
        toast.error("Something error has been occurerd.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setRefundError(error?.response?.data?.error?.data[0]?.message);
      }
    }
  };
  // Info: Updating Additional Information Data
  const handleAdditionalInformation = async (e) => {
    console.log("object");
    try {
      const { storeName, returnId } = sliceURL(pathname);
      const resp = await returnAdditionalInformationUpdate(storeName, data?.shopifyReturnId, e.target.value);
      if (resp) {
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const debouncedHandleAdditionalInformation = debounce(handleAdditionalInformation, 1000);

  // -------------------------   Return JSX DATA -------------------------
  if (isLoading) {
    return <ReturnDetailSkeleton />;
  } else {
    return (
      <>
        <section>
          <div className="flex items-center gap-x-7 gap-y-3 justify-between items-center text-sm text-[var(--text-color)] py-5 max-lg:flex-col">
            <div className="w-[50%] flex items-center gap-x-8 gap-y-2 flex-wrap max-lg:w-[70%] max-sm:w-full max-lg:justify-center max-sm:justify-start">
              <div className="flex items-center gap-2">
                <span>Return Request</span>
                <span>
                  <FaAngleRight
                    size={12}
                    className="text-[var(--dark-light-brown)] group-disabled:text-[var(--data-gray-color)]"
                  />{" "}
                </span>{" "}
                <span><a href={`https://admin.shopify.com/store/${shopify_store_name}/orders/${data.shopifyOrderId}`} target="_blank" className="hover:underline underline-offset-2">Order {data.orderName}</a></span>
              </div>
              <div>
                {data.status == "CLOSED" ? (
                  <p className="text-[var(--text-color)] text-base font-medium flex gap-2 items-center uppercase">
                    <span className="flex w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="">Returned</span>
                  </p>
                ) : data.status == "DECLINED" ? (
                  <p className="text-[var(--text-color)] text-base font-medium flex gap-2 items-center uppercase">
                    <span className="flex w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="">Declined</span>
                  </p>
                ) : data.status == "OPEN" ? (
                  <p className="text-[var(--text-color)] text-base font-medium flex gap-2 items-center uppercase">
                    <span className="flex w-3 h-3 bg-orange-300 rounded-full"></span>
                    <span className="">In Progress</span>
                  </p>
                ) : null}
              </div>
            </div>
            <div className="w-[50%] flex flex-col items-end max-lg:w-[70%] max-sm:w-full max-lg:items-center">
              {/* Status and Button */}
              {data?.status == "REQUESTED" ? (
                <>
                  <div className="flex gap-5 w-full [&>*]:w-[200px] [&>*]:rounded-lg  [&>*]:border-2 [&>*]:border-[var(--dark-light-brown)] [&>*]:px-2 [&>*]:py-3 [&>*]outline-none font-medium justify-end  max-lg:items-center">
                    <button
                      className="bg-[var(--light-cream-background)] text-[var(--dark-light-brown)]"
                      onClick={openDecline_pop_up}
                    >
                      Decline
                    </button>
                    <button
                      className="bg-[var(--dark-light-brown)] text-[var(--white-color)]"
                      onClick={handleApproveRequest}
                    >
                      Approve
                    </button>
                  </div>
                </>
              ) : data?.status == "OPEN" ? (
                <button
                  onClick={handleCloseReturn}
                  className="px-2 py-3 border-[var(--dark-light-brown)] border-2 rounded-lg bg-[var(--dark-light-brown)] text-[var(--white-color)] font-medium w-[200px] block"
                >
                  Close Return
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex gap-7 [&>*]:w-[50%] max-lg:flex-col max-lg:[&>*]:w-full">
            <div className="flex flex-col gap-7">
              {/* card - 1 */}
              <div className="at-return-card ">
                <div className="text-[var(--text-color)] text-lg font-semibold">
                  <a href={`https://admin.shopify.com/store/${shopify_store_name}/orders/${data.shopifyOrderId}`} target="_blank" className="hover:underline underline-offset-2">ORDER {data.orderName}</a>
                </div>
                <div className="text-[var(--dark-light-brown)] justify-between font-medium text-sm mb-5">
                  <div className="flex gap-2 justify-between mb-1">
                    <span className="shrink-0">Return Requested on:</span>{" "}
                    <span>{data.requestedAt}</span>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <span className="shrink-0">Ordered on:</span>{" "}
                    <span>{data.purchasedAt}</span>
                  </div>
                </div>
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Items to be Returned
                </div>
                <div className="p-3 border-[var(--dark-light-brown)] border-[1px] rounded-2xl  text-base">
                  <div className="flex gap-4 items-center">
                    <div className="size-[90px] shrink-0 max-sm:w-[60px] max-sm:h-[60px]">
                      <img
                        src={data.returnItem?.imageUrl}
                        className="object-contain w-full h-full border-2 rounded-xl border-[var(--dark-light-brown)] bg-[var(--white-color)]"
                      />
                    </div>
                    <div>
                      <div>
                        <span className="text-base font-semibold text-[var(--text-color)]  max-sm:text-sm">
                          <a href={`https://admin.shopify.com/store/${shopify_store_name}/products/${data?.returnItem?.productId}`} target="_blank" className="hover:underline hover:underline-offset-2">{data.returnItem?.productName}</a>
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[var(--text-color)] max-sm:text-sm">
                          {data.returnItem?.variantTitle == "Default Title"
                            ? null
                            : data.returnItem?.variantTitle}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-[var(--dark-light-brown)]">
                          ${data?.returnItem?.price}
                          <span className="text-[var(--text-color)]"> x {data.returnItem?.qty}
                          </span>
                        </span>
                      </div>

                    </div>
                  </div>
                  <div className="text-base max-sm:text-sm text-[var(--text-color)] mt-4">
                    <div>
                      <span className="font-medium text-[var(--dark-light-brown)]">
                        Return Reason: </span> <span>{data.returnReason}</span>
                    </div>
                    {data.customerNote && (
                      <div>
                        <span className="font-medium text-[var(--dark-light-brown)]">
                          Customer Note:
                        </span> <span>{data.customerNote}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Card -1 End */}

              {/* Card - 2 Refund Information */}
              <div className="at-return-card ">
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Refund
                </div>
                <div>
                  <table className="text-left border-collapse [&>tbody>tr>th]:text-[var(--text-color)]  [&>tbody>tr>th]:w-full [&>tbody>tr>*]:font-medium [&>tbody>tr>td]:text-[var(--dark-light-brown)] [&>tbody>tr>td]:text-right [&>tbody>tr>*]:p-1 max-sm:[&>tbody>tr>*]:px-0 max-sm:[&>tbody>tr>*]:py-2 max-sm:[&>tbody>tr>*]:text-sm [&>tbody>tr:nth-last-child(1)]:border-t-2 [&>tbody>tr:nth-last-child(1)>*]:pt-[10px] [&>tbody>tr:nth-last-child(2)>*]:pb-[10px] [&>tbody>tr:nth-last-child(1)]:border-[var(--border-color)]">
                    <tbody>
                      <tr>
                        <th>Return item</th>
                        <td>${data.returnItem?.price}</td>
                      </tr>
                      <tr>
                        <th>Return shipping</th>
                        <td>---</td>
                      </tr>
                      <tr>
                        <th>Restocking fee</th>
                        <td>---</td>
                      </tr>
                      <tr>
                        <th>Taxes</th>
                        <td>${data.tax}</td>
                      </tr>
                      <tr>
                        <th>Total Refund</th>
                        <td>
                          $
                          {(
                            parseFloat(data.returnItem?.price) +
                            parseFloat(data.tax)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {data?.status != "REQUESTED" &&
                  data?.status != "CLOSED" &&
                  data?.status != "DECLINED" ? (
                  <div>
                    {/* Refund History and Payment Info  */}
                    {data?.refunds?.refundedAt ? (
                      <div>
                        <h4 className="p-1 text-[var(--dark-light-brown)] font-medium uppercase mt-2">
                          Paid
                        </h4>
                        <div className="flex justify-between p-1 gap-2 text-[var(--text-color)] font-medium">
                          <p>Refunded Amount</p>
                          <p className="text-[var(--dark-light-brown)] ">
                            $
                            {Number(data?.refunds?.totalAmountRefunded).toFixed(
                              2
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between p-1 gap-2 text-[var(--text-color)] font-medium">
                          <p>Refunded at</p>
                          <p className="text-[var(--dark-light-brown)] text-sm">
                            {data?.refunds?.refundedAt}
                          </p>
                        </div>
                        {/* <p className="p-1 font-medium">Reason: <span className="font-normal">{data?.refunds?.refundReason} Color is not much precious ahdf sdln</span></p> */}
                        {data?.refunds?.paymentDetails && (
                          <div className="px-1">
                            <h4 className="text-[var(--dark-light-brown)] font-medium uppercase mt-2">
                              Payment Details
                            </h4>
                            <div className="mt-2">
                              <span className="font-medium">Name:</span>{" "}
                              {data?.refunds?.paymentDetails?.name} <br />
                              <span className="font-medium">Company:</span>{" "}
                              {data?.refunds?.paymentDetails?.company} <br />
                              <span className="font-medium">
                                Card Number:
                              </span>{" "}
                              {data?.refunds?.paymentDetails?.number} <br />
                              <span className="font-medium">
                                Payment Method:
                              </span>{" "}
                              <span className="uppercase">
                                {
                                  data?.refunds?.paymentDetails
                                    ?.paymentMethodName
                                }
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                    {/* Refund History and Payment Info - END */}
                    {/* Setting the Refund Button only if Refund is not Done Previously */}
                    {data?.refunds?.refundedAt == null ? (
                      <>
                        <div className="flex justify-between p-1 mt-3">
                          <div className="font-medium">Refund Amount</div>
                          <div>
                            <div className="flex items-center gap-3 max-sm:gap-2">
                              <label htmlFor="refund-amount">$</label>
                              <input
                                ref={refund_amount_input}
                                type="number"
                                className="w-[90px] p-2 text-[var(--text-color)] text-sm indent-1 rounded"
                                id="refund-amount"
                                value={refundInputValue}
                                onChange={(e) =>
                                  setrefundInputValue(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {refundError ? (
                          <p className="text-red-500 text-base p-1 mt-2 flex gap-1 items-center">
                            <MdError />
                            {refundError}
                          </p>
                        ) : null}
                        <button
                          onClick={handleRefundRequest}
                          className="ml-auto block bg-[var(--dark-light-brown)] uppercase text-sm mt-4 py-3 px-5 text-[var(--white-color)] rounded leading-none"
                        >
                          Refund
                        </button>
                      </>
                    ) : null}
                    {/* Setting the Refund Button only if Refund is not Done Previously - END */}
                  </div>
                ) : null}
              </div>
              {/* Card - 2 Refund Information  End */}

              {/* Card - 3 Return Shipping Options */}
              {data?.status == "OPEN" ? (
                <div className="at-return-card ">
                  <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                    Return Shipping Options
                  </div>
                  <div className="flex gap-1 items-center pb-3">
                    <input
                      type="radio"
                      id="uploadLabel"
                      name="shippingOption"
                      value="upload"
                      checked={option === "upload"}
                      onChange={() => setOption("upload")}
                      className="rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] border-4 hidden"
                    />
                    <label
                      htmlFor="uploadLabel"
                      className="flex gap-1 cursor-pointer"
                    >
                      <span
                        htmlFor="uploadLabel"
                        className={`rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] block ${option === "upload" ? "border-4" : "border-2"
                          }`}
                      />
                      <span className="text-sm text-[var(--text-color)] font-medium ml-2">
                        Upload a return label
                      </span>
                    </label>
                  </div>
                  {option === "upload" && (
                    <div>
                      <Dropzone
                        onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
                        accept={{
                          "image/png": [],
                          "image/gif": [],
                          "image/jpg": [],
                        }}
                        multiple={false}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="border-dashed border-2 border-[var(--dark-light-brown)] rounded-xl h-[100px] items-center justify-center cursor-pointer [&>div]:h-full [&>div]:flex">
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <TbCirclePlus
                                className="m-auto"
                                color="var(--dark-light-brown)"
                                size={25}
                              />
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      {file && (
                        <div className="mt-4 text-sm text-[var(--text-color)] bg-[var(--white-color)] p-2 rounded-md flex items-center justify-between">
                          <div>
                            <p>
                              <span className="font-medium">File:</span>{" "}
                              {file.name}
                            </p>
                            <p>
                              <span className="font-medium">Size:</span>{" "}
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <div
                            className="shrink-0 cursor-pointer"
                            onClick={() => setFile(null)}
                          >
                            <RxCross1 size={20} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-1 items-center pb-3 mt-4">
                    <input
                      type="radio"
                      id="enterLink"
                      name="shippingOption"
                      value="link"
                      checked={option === "link"}
                      onChange={() => setOption("link")}
                      className="rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] border-4 hidden"
                    />
                    <label
                      htmlFor="enterLink"
                      className="flex gap-1 cursor-pointer"
                    >
                      <span
                        className={`rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] block ${option === "link" ? "border-4" : "border-2"
                          }`}
                      />
                      <span className="text-sm text-[var(--text-color)] font-medium ml-2">
                        Return label URL
                      </span>
                    </label>
                  </div>
                  {option === "link" && (
                    <div>
                      <div className="flex gap-5 text-[var(--text-color)] text-sm max-sm:flex-col max-sm:[&>*]:w-full ">
                        <div className="w-full">
                          <input
                            type="url"
                            className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-1 items-center pb-3 mt-4">
                    <input
                      type="radio"
                      id="generateLabel"
                      name="shippingOption"
                      value="upload"
                      checked={option === "generate"}
                      onChange={() => setOption("generate")}
                      className="rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] border-4 hidden"
                    />
                    <label
                      htmlFor="generateLabel"
                      className="flex gap-1 cursor-pointer"
                    >
                      <span
                        htmlFor="generateLabel"
                        className={`rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] block ${option === "generate" ? "border-4" : "border-2"
                          }`}
                      />
                      <span className="text-sm text-[var(--text-color)] font-medium ml-2">
                        Generate a Shipping Label
                      </span>
                    </label>
                  </div>
                  {option === "generate" && (
                    <div>
                      <a
                        href={`/return-request/${generate_shipping_label_id_store}`}
                        target="_blank"
                        className="bg-[var(--dark-light-brown)] text-sm text-[var(--white-color)] px-6 py-2 rounded mt-2 uppercase flex items-center gap-2 inline-block w-fit"
                      >
                        <span>Generate</span> <ImNewTab />
                      </a>
                    </div>
                  )}
                  <hr className="bg-[var(--dark-light-brown)] rounded-lg h-1 w-full my-8" />
                  <div>
                    <div className="flex [&>*]:w-[50%] gap-5 text-[var(--text-color)] text-sm mt-5 max-sm:flex-col max-sm:[&>*]:w-full">
                      <div>
                        <p className="font-medium mb-2">Tracking Number</p>
                        <input className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2" />
                      </div>
                      <div>
                        <p className="font-medium mb-2">Shipping Carrier</p>
                        <input className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2" />
                      </div>
                    </div>
                    <div className="flex gap-5 text-[var(--text-color)] text-sm mt-5 max-sm:flex-col max-sm:[&>*]:w-full">
                      <div className="w-full">
                        <p className="font-medium mb-2">Tracking Link</p>
                        <input
                          type="url"
                          className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : data?.status == "CLOSED" ? (
                <div className="at-return-card ">
                  <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                    Return Method Information
                  </div>
                  <div className="text-[var(--text-color)]">
                    {/* <div><span className="font-medium">Shipment Status: </span><span>In Progress</span>
                    </div> */}
                    <div>
                      <span className="font-medium">Updated: </span>
                      <span>Friday at 9:48 PM</span>
                    </div>
                    <div>
                      <span className="font-medium">
                        USPS tracking number:{" "}
                      </span>
                      <span>9400136106023571104142</span>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* Card - 3 Return Shipping Options End */}

              {/* For Card - 4 Images Card */}
              <div className="at-return-card  text-[var(--text-color)]">
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Attached images
                </div>
                <div className="flex justify-between gap-4 place-items-start max-sm:flex-col-reverse">
                  <div className="flex flex-wrap gap-4 w-full">
                    {imageUrls.map((imageUrl, index) => (
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
                  </div>
                  {/* <button onClick={downloadImages} className="text-[var(--dark-light-brown)] underline uppercase shrink-0 text-sm">Download Images</button> */}
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
                          {data.contactInformation.phone ? (
                            data.contactInformation.phone
                          ) : (
                            <span className="text-red-500">
                              No Phone Number
                            </span>
                          )}
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
                          {data.shippingAddress.address1 +
                            data.shippingAddress.address2 +
                            data.shippingAddress.city +
                            data.shippingAddress.country +
                            data.shippingAddress.zip ===
                            data.billingAddress.address1 +
                            data.billingAddress.address2 +
                            data.billingAddress.city +
                            data.billingAddress.country +
                            data.billingAddress.zip
                            ? "same as shipping address"
                            : `${data.billingAddress.address1}, ${data.billingAddress.address2
                            }${data.billingAddress.address2 ? `,` : null} ${data.billingAddress.city
                            }, ${data.billingAddress.country}, ${data.billingAddress.zip
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
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Tags
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
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                  Additional Note
                </div>
                <textarea className="w-full outline-none border-2 border-[var(--border-color)] rounded-lg p-2 text-sm min-h-20" onChange={debouncedHandleAdditionalInformation}>
                  {data?.additionalInformation ? `${data?.additionalInformation}` : null}
                </textarea>
              </div>
              {/* Card - 3 End */}
            </div>
            {/* Column - 2 END */}
          </div>
        </section>
        {/*------------------- Return History ---------------------------- */}
        <section className="py-12">
          <div className="text-[var(--text-color)] text-lg font-semibold mb-4 uppercase">
            Return History
          </div>
          <div className="at-return-card ">
            <div className="mb-6">
              <textarea
                className="w-full border-2 border-[var(--border-color)] rounded-lg p-2 text-sm"
                placeholder="Leave a note"
              />
              <button className="bg-[var(--dark-light-brown)] text-sm text-[var(--white-color)] px-6 py-2 rounded mt-2 uppercase">
                Post
              </button>
            </div>
            {historyEntries.map((entry, index) => (
              <div key={index} className="mb-5 flex flex-col gap-3">
                <div className="text-[var(--dark-light-brown)] font-medium mb-2">
                  {entry.date}
                </div>
                {entry.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 justify-between items-start text-sm"
                  >
                    <p className="text-[var(--text-color)] w-[75%]">
                      {event.description}
                    </p>
                    <span className="text-[var(--dark-light-brown)]">
                      {event.time}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
        {/*------------------- Return History END ---------------------------- */}
        {/*------------------- Decline Popup ---------------------------- */}
        <section>
          <div
            id="decline-popup"
            className={`${declinePopUp ? "block" : "hidden"
              } fixed w-screen top-0 left-0 z-50 w-full h-modal h-screen flex items-center justify-center before:bg-[var(--text-color)] before:opacity-50 before:w-full before:h-full before:absolute`}
          >
            <div className="relative p-4 w-full max-w-lg ">
              <div className="relative max-sm:px-4 p-8 bg-[var(--light-cream-background)] rounded-lg shadow ">
                <div className="mb-6 text-sm text-[var(--text-color)] ">
                  <h3 className="mb-3 text-2xl font-bold">Decline Request</h3>
                  <p className="mb-3">
                    Please enter a reason for declining this request.
                  </p>
                  {declineErrorMessage ? (
                    <p className="text-red-500 text-base p-1 mt-2 flex gap-1 items-center">
                      <MdError />
                      {declineErrorMessage}
                    </p>
                  ) : null}
                  <select ref={declineDropdown_option} className="p-2 w-full rounded border-2 border-[var(--border-color)] ">
                    <option defaultValue>Decline Reason</option>
                    <option value="RETURN_PERIOD_ENDED">Return Period Ended</option>
                    <option value="FINAL_SALE">Final Sale</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <p className="my-3 font-medium">Client Note</p>
                  <textarea
                    ref={decline_reason}
                    className="w-full outline-none border-2 border-[var(--border-color)] rounded-lg p-2 text-sm "
                  ></textarea>
                  <p className="my-3 font-medium">Admin Note</p>
                  <textarea
                    ref={admin_decline_reason}
                    className="w-full outline-none border-2 border-[var(--border-color)] rounded-lg p-2 text-sm "
                  ></textarea>
                </div>
                <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                  <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                    <button
                      onClick={openDecline_pop_up}
                      type="button"
                      className="bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)] py-2 px-4 w-full rounded-md border-2 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeclineRequest}
                      id="confirm-button"
                      type="button"
                      className="bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)] py-2 px-4 w-full rounded-md border-2 text-sm font-medium"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*------------------- Decline Popup END ---------------------------- */}
      </>
    );
  }
};

export default ReturnDetails;
