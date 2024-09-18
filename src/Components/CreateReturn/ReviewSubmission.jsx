import React, { useContext, useRef, useState } from 'react'
import { MdError } from "react-icons/md";
import ContextProvider from '../../Context/ContextProvider';
import ButtonLoadingSpinner from './ButtonLoadingSpinner';
import { submitReturnRequest } from '../../Services/api';

const ReviewSubmission = () => {
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
  // ----> Using Context States
  const { orderDetailData, choosenItems, setrequestpage, file, storeName, setreturnIdOnSubmission } = useContext(ContextProvider);
  // END Using Context States
  const [requestButtonLoading, setrequestButtonLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const otherRef = useRef(null);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmitReturn = async () => {
    setSubmitError(null);
    if (!selectedOption) {
      setSubmitError('Please select an option');
    } else if (selectedOption == 'Other' && !otherRef.current.value.trim().length) {
      setSubmitError('Please enter the text');
    }
    else {
      setrequestButtonLoading(true);
      try {
        const dataAPI = {
          orderId: orderDetailData.id,
          returnLineItems: choosenItems,
          typeofReturn: selectedOption == 'Other' ? otherRef.current.value : selectedOption,
          // images: file
        }
        const resp = await submitReturnRequest(dataAPI, storeName)
        if (resp) {
          setreturnIdOnSubmission(resp?.data?.returnId);
          setrequestpage(4);
        }
        setrequestButtonLoading(false);
      } catch (error) {
        // Remove this
        console.log(error);
        setSubmitError('Something went wrong');
        setrequestButtonLoading(false);
      }
    }
  }
  return (
    <div className='w-full h-full flex gap-3 text-sm max-md:flex-col max-md:h-auto'>
      <div className='flex flex-col gap-3 w-2/3 max-md:w-full'>
        <h1 className="text-xl font-semibold mb-2 max-sm:text-lg ">Review return before creating</h1>
        <div className='bg-[var(--light-cream-background)] p-3 rounded border-2 border-[var(--border-color)]'>
          <h2 className='text-lg max-sm:text-base mb-3'>
            Customer Information
          </h2>
          <h3 className='mb-2'><span className='font-medium'>Name: </span>{orderDetailData.customer?.firstName + " " + orderDetailData.customer?.lastName}</h3>
          <h3 className='mb-2'><span className='font-medium'>Email: </span>{orderDetailData.customer?.email}</h3>
          <h3 className='mb-2'><span className='font-medium'>Phone: </span>
          {/* INFO: if Customer Number is there then it will fetch the customer number and if it is not present then it will fetch the shipping address number and if it is not present then it will fetch the billing address number */}
            {(!orderDetailData.customer?.phone ?
              (!orderDetailData.shippingAddress?.phone ?
                (!orderDetailData.billingAddress?.phone ?
                  (<span className="text-red-500">No Phone Number</span>):
                  orderDetailData.billingAddress?.phone
                ) :
                orderDetailData.shippingAddress?.phone) :
              orderDetailData.customer.phone)}
          </h3>
          <h3 className='mb-2'><span className='font-medium'>Shipping Address: </span>
            {orderDetailData.shippingAddress.address1},{" "}
            {orderDetailData.shippingAddress.address2}
            {orderDetailData.shippingAddress.address2 ? `,` : null}{" "}
            {orderDetailData.shippingAddress.city},{" "}
            {orderDetailData.shippingAddress.country},{" "}
            {orderDetailData.shippingAddress.zip}
          </h3>
          <h3><span className='font-medium'>Billing Address: </span>
            {orderDetailData.shippingAddress?.address1 +
              orderDetailData.shippingAddress?.address2 +
              orderDetailData.shippingAddress?.city +
              orderDetailData.shippingAddress?.country +
              orderDetailData.shippingAddress?.zip ===
              orderDetailData.billingAddress?.address1 +
              orderDetailData.billingAddress?.address2 +
              orderDetailData.billingAddress?.city +
              orderDetailData.billingAddress?.country +
              orderDetailData.billingAddress?.zip
              ? "same as shipping address"
              : `${orderDetailData.billingAddress?.address1}, ${orderDetailData.billingAddress?.address2
              }${orderDetailData.billingAddress?.address2 ? `,` : null} ${orderDetailData.billingAddress?.city
              }, ${orderDetailData.billingAddress?.country}, ${orderDetailData.billingAddress?.zip
              }`}
          </h3>
        </div>

      </div>
      <div className='bg-[var(--light-cream-background)] flex flex-col gap-4 justify-between w-1/2 p-3 rounded border-2 border-[var(--border-color)] max-md:w-full'>
        <div>
          <h2 className='text-lg max-sm:text-base mb-3'>
            Products Info
          </h2>
          <div className='flex flex-col gap-3'>
            {orderDetailData.lineitems?.map((item, index) => {
              if (choosenItems.find(val => val.fulfillmentLineItemId == item.id)) {
                return (
                  <div key={index} className='bg-[var(--white-color)]  p-2 rounded-lg border-2 border-[var(--border-color)]'>
                    <div className='flex gap-2 items-center justify-between mb-2'>
                      <div className='size-[70px] shrink-0 rounded-lg border-2 border-[var(--border-color)] overflow-hidden'><img src={item.lineItem.image.url} className='object-contain size-full' /></div>
                      <div className='w-full'>
                        <h3>{item.lineItem.title}</h3>
                        <h3 className='font-medium'>{item.lineItem.variantTitle}</h3>
                        <h3>${item.lineItem.originalUnitPriceSet.shopMoney.amount} x {choosenItems.find(val => val.fulfillmentLineItemId == item.id).quantity}</h3>
                      </div>
                    </div>
                    <h4><span className='font-medium'>Reason: </span>{reasonMap[choosenItems.find(val => val.fulfillmentLineItemId == item.id).returnReason]}</h4>
                    <h4><span className='font-medium'>Note: </span>{choosenItems.find(val => val.fulfillmentLineItemId == item.id).returnReasonNote}</h4>
                  </div>
                )
              }
            })}
          </div>
        </div>
        {/* Buttons */}
        <div>
          {submitError ? (
            <div className="sm:w-10/12 text-red-500 flex gap-2 text-xs items-center mb-2">
              <MdError />
              <span>{submitError}</span>
            </div>
          ) : null}
          <h2 className='font-medium mb-2'>Outcome Requested</h2>
          <div className='flex flex-col gap-1 text-xs mb-3'>
            <div>
              <label className="flex gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="shippingOption"
                  className="w-[16px] h-[16px] accent-[var(--dark-light-brown)]"
                  value="Exchange"
                  checked={selectedOption === "Exchange"}
                  onChange={handleOptionChange}
                />
                <span>Exchange</span>
              </label>
            </div>
            <div>
              <label className="flex gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="shippingOption"
                  className="w-[16px] h-[16px] accent-[var(--dark-light-brown)]"
                  value="Partial Refund"
                  checked={selectedOption === "Partial Refund"}
                  onChange={handleOptionChange}
                />
                <span>Partial Refund</span>
              </label>
            </div>
            <div>
              <label className="flex gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="shippingOption"
                  className="w-[16px] h-[16px] accent-[var(--dark-light-brown)]"
                  value="Full Refund"
                  checked={selectedOption === "Full Refund"}
                  onChange={handleOptionChange}
                />
                <span>Full Refund</span>
              </label>
            </div>
            <div>
              <label className="flex gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="shippingOption"
                  className="w-[16px] h-[16px] accent-[var(--dark-light-brown)]"
                  value="Other"
                  checked={selectedOption === "Other"}
                  onChange={handleOptionChange}
                />
                <span>Other</span>
              </label>
            </div>
            {selectedOption === "Other" ? (
              <input type='text' placeholder='Missing Parts and Other' className='p-2 border border-[var(--dark-light-brown)] outline-[var(--dark-light-brown)] rounded-md block w-full' ref={otherRef} />
            ) : null}
          </div>
          <button className='w-full py-2 px-8 bg-[var(--white-color)] border-2 border-[var(--dark-light-brown)] text-[var(--dark-light-brown)] rounded-md hover:bg-[var(--dark-light-brown)] hover:border-[var(--dark-light-brown)] hover:text-[var(--white-color)] transition block ml-auto uppercase text-sm hover:scale-[1.03]' onClick={() => setrequestpage(1)}>Reselect</button>
          <button className='w-full mt-3 py-2 px-8 bg-[var(--dark-light-brown)] border-2 border-transparent text-[var(--white-color)] rounded-md hover:bg-[var(--white-color)] hover:border-[var(--dark-light-brown)] hover:text-[var(--dark-light-brown)] transition block ml-auto uppercase text-sm hover:scale-[1.03]'
            onClick={() => requestButtonLoading ? null : handleSubmitReturn()}
          >
            {requestButtonLoading ? <ButtonLoadingSpinner sizeClass={"size-[20px]"} /> : "Submit return"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewSubmission