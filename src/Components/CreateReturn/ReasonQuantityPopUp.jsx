import React, { useContext, useRef, useState } from 'react'
import { MdError } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import ContextProvider from '../../Context/ContextProvider';
const ReasonQuantityPopUp = ({ reasonAndQuantityPopup, setreasonAndQuantityPopup, indexSelectedData }) => {
    // ----> Using Context States
    const {
        orderDetailData, setChoosenItems
    } = useContext(ContextProvider);
    // END Using Context States
    const [reasonError, setreasonError] = useState('');
    const reasonRefs = useRef([]);
    const reasonNoteRefs = useRef([]);
    const quantityNoteRefs = useRef([]);

    const handleReasonInput = () => {
        const returnReason = reasonRefs.current[indexSelectedData].value;
        const returnReasonNote = reasonNoteRefs.current[indexSelectedData].value.trim();
        const quantity = quantityNoteRefs.current[indexSelectedData]?.value || 1;

        if (returnReason !== 'Select Reason' && returnReasonNote.length && quantityNoteRefs?.current[indexSelectedData]?.value != "Quantity") {
            // Update the state with the selected returnReason, note, and quantity
            setChoosenItems(prev => ([
                // ...prev,
                {
                    returnReason,
                    returnReasonNote,
                    quantity,
                    fulfillmentLineItemId: orderDetailData?.lineitems[indexSelectedData]?.id
                }
            ]));
            setreasonAndQuantityPopup(false);
            setreasonError('');
        } else if (returnReason === 'Select Reason') {
            setreasonError('Please select a reason');
        } else if (!returnReasonNote.length) {
            setreasonError('Please specify the reason');
        } else {
            setreasonError('Please select the quantity');
        }
    }
    const handleBackToSelectProduct = () => {
        setreasonAndQuantityPopup(false);
    };


    return (
        <div className={`w-full text-sm ${reasonAndQuantityPopup ? 'block' : 'hidden'}`}>
            <div onClick={() => handleBackToSelectProduct()} className='text-sm flex items-center gap-2 font-medium cursor-pointer hover:translate-x-[-4px] transition-all mb-2 uppercase w-fit m-auto'><FaArrowLeft size={18} /> <span>Back</span></div>
            <h1 className="text-xl font-semibold mb-2 text-center max-sm:text-base">Reason for initiating a return for this item</h1>
            {orderDetailData?.lineitems?.map((item, index) => (
                <div key={item.id} className={`${indexSelectedData === index ? 'block' : 'hidden'}`}>
                    <div className='size-[140px] m-auto'><img src={item.lineItem.image.url} className='size-full object-contain' /></div>
                    {reasonError ? <div className="text-red-500 flex gap-2 items-center mt-1 m-auto"><MdError /><span>{reasonError}</span></div> : null}
                    <div className='mt-3'>
                        <select ref={(el) => reasonRefs.current[index] = el} className=' w-full px-3 py-2 border-2 border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border-color)] cursor-pointer' >
                            <option defaultValue>Select Reason</option>
                            <option value="COLOR">Color</option>
                            <option value="SIZE_TOO_LARGE">Size too large</option>
                            <option value="SIZE_TOO_SMALL">Size too small</option>
                            <option value="STYLE">Style</option>
                            <option value="DEFECTIVE">Defective</option>
                            <option value="NOT_AS_DESCRIBED">Not as described</option>
                            <option value="UNKNOWN">Unknown</option>
                            <option value="UNWANTED">Unwanted</option>
                            <option value="WRONG_ITEM">Wrong item</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div className='mt-3'>
                        <textarea ref={(el) => reasonNoteRefs.current[index] = el} className=' w-full px-3 py-2 border-2 border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border-color)]' placeholder='Please specify the Reason' />
                    </div>
                    {item.lineItem.quantity > 1 && (
                        <div className='mt-2'>
                            <select ref={(el) => quantityNoteRefs.current[index] = el} className=' w-full px-3 py-2 border-2 border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border-color)] cursor-pointer'>
                                <option defaultValue>Quantity</option>
                                {[...Array(item.lineItem.quantity).keys()].map((i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button className='text-sm hover:scale-[1.03] py-2 px-10 m-auto mt-4 block bg-[var(--dark-light-brown)] border-2 border-transparent text-[var(--white-color)] rounded-md hover:bg-[var(--light-cream-background)] hover:border-[var(--dark-light-brown)] hover:text-[var(--dark-light-brown)] transition uppercase' onClick={() => handleReasonInput()}>
                        Done
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ReasonQuantityPopUp