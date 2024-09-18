import React, { useContext, useEffect, useState } from 'react'
import { MdError } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ReasonQuantityPopUp from './ReasonQuantityPopUp';
import ContextProvider from '../../Context/ContextProvider';
import { Link } from 'react-router-dom';
const GetProductDetails = () => {
    // ----> Using Context States
    const {
        orderDetailData, setrequestpage,
        choosenItems, setChoosenItems
    } = useContext(ContextProvider);
    // END Using Context States

    const [productSelectError, setproductSelectError] = useState('');
    // State For Reason and Quantity Opening
    const [reasonAndQuantityPopup, setreasonAndQuantityPopup] = useState(false);
    const [indexSelectedData, setindexSelectedData] = useState(null);
    // For Removing Product oBject
    const handleRemoveReasons = (fulfillmentLineItemId) => {
        setChoosenItems(prev => {
            const newReasons = [...prev].filter((val) => {
                return val.fulfillmentLineItemId !== fulfillmentLineItemId;
            });
            return newReasons;
        });
    };
    const checkProductSelected = (fulfillmentLineItemId) => {
        return choosenItems.find((item) => {
            return item.fulfillmentLineItemId == fulfillmentLineItemId
        })
    }
    const onProductSelect = (item_fullfillmentid, index) => {
        setproductSelectError('');
        setindexSelectedData(index);
        if (checkProductSelected(item_fullfillmentid)) {
            // If the item is already in the array, remove it
            handleRemoveReasons(item_fullfillmentid);
        } else {
            // If the item is not in the array, add it
            setreasonAndQuantityPopup(!reasonAndQuantityPopup);
        }
    };
    useEffect(() => {
     console.log(choosenItems);
    }, [choosenItems])
    
    const productSelected = () => {
        if (choosenItems.length) {
            console.log(choosenItems);
            // Info: Send to the Next Page
            setrequestpage(3);
        } else {
            setproductSelectError('Please choose Product');
        }
    }
    return (
        <>
            <div className={`w-full ${reasonAndQuantityPopup ? 'hidden' : 'block'}`}>
                <div onClick={() => setrequestpage(0)} className='text-sm flex items-center gap-2 font-medium cursor-pointer hover:translate-x-[-4px] transition-all mb-2 uppercase w-fit m-auto'><FaArrowLeft size={18} /> <span>Back</span></div>
                <h1 className="text-2xl font-semibold mb-4 max-sm:text-xl text-center">Choose an item to start a Return</h1>
                {productSelectError ? (
                    <div className="text-red-500 flex gap-2 text-sm items-center mb-4 m-auto">
                        <MdError />
                        <span>{productSelectError}</span>
                    </div>
                ) : null}
                <div className='flex flex-col gap-4'>
                    {orderDetailData?.returnedItems?.length ? orderDetailData?.returnedItems?.map((item, index) => (
                        <div key={index} className={`relative shadow p-3 rounded-lg border-2 cursor-not-allowed border-red-500 transition flex  max-md:flex-wrap gap-4 items-center justify-between`}>
                            <div className="flex gap-4 items-center">
                                <div className="size-[100px] overflow-hidden shrink-0 max-sm:size-[70px] border-2 border-[var(--border-color)] rounded-md"><img className="w-full h-full object-contain" src={item.lineItem?.image} alt="" /></div>
                                <div>
                                    <div className="font-medium text-red-500 text-sm">STATUS: {item?.status}</div>
                                    <h2 className="font-medium text-sm">{item.lineItem?.title}</h2>
                                    <p>{item.lineItem?.variantTitle}</p>
                                    <p><span className='font-medium text-[var(--dark-light-brown)]'>${item.lineItem.price}</span> <span>x {item.lineItem.quantity}</span></p>
                                </div>
                            </div>
                            <div className='shrink-0'>
                                <Link to={`/return-request/deco-tv-frames/${item.returnId}`} className="py-1 px-3 bg-[var(--dark-light-brown)] border-2 border-transparent text-[var(--white-color)] rounded-md hover:bg-[var(--light-cream-background)] hover:border-[var(--dark-light-brown)] hover:text-[var(--dark-light-brown)] transition text-xs outline-none">View Details</Link>
                            </div>
                        </div>
                    )): null}
                    {orderDetailData?.lineitems?.map((item, index) => (
                        <div key={index}>
                            {orderDetailData?.returnedFulfillmentItemId.includes(item.id) ? null : (
                                <div key={item.id} className={`relative shadow p-3 rounded-lg border-2 cursor-pointer hover:scale-[1.03] transition flex gap-4 items-center justify-between ${checkProductSelected(item.id)
                                    ? 'border-[var(--dark-light-brown)] bg-[var(--light-cream-background)]'
                                    : 'border-[var(--border-color)]'
                                    }`} onClick={() => onProductSelect(item.id, index)}>
                                    <div className="flex gap-4 items-center">
                                        <div className="size-[100px] overflow-hidden shrink-0 max-sm:size-[70px] border-2 border-[var(--border-color)] rounded-md"><img className="w-full h-full object-contain" src={item.lineItem.image.url} alt="" /></div>
                                        <div>
                                            <h2 className="font-medium">{item.lineItem.title}</h2>
                                            <p>{item.lineItem.variantTitle}</p>
                                            <p><span className='font-medium text-[var(--dark-light-brown)]'>${item.lineItem.originalUnitPriceSet.shopMoney.amount}</span> <span>x {item.lineItem.quantity}</span></p>
                                        </div>
                                    </div>
                                    <div className='shrink-0'>
                                        <FaArrowRight color='var(--dark-light-brown)' />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    {orderDetailData?.returnedFulfillmentItemId?.length === orderDetailData?.lineitems?.length ? null : (
                        <button className='py-2 px-10 bg-[var(--dark-light-brown)] border-2 border-transparent text-[var(--white-color)] rounded-md hover:bg-[var(--light-cream-background)] hover:border-[var(--dark-light-brown)] hover:text-[var(--dark-light-brown)] transition block ml-auto mt-8 uppercase text-sm hover:scale-[1.03]' onClick={() => productSelected()}>Next</button>
                    )}
                </div>
            </div>
            {/* Reason and Quantity */}
            <ReasonQuantityPopUp reasonAndQuantityPopup={reasonAndQuantityPopup} setreasonAndQuantityPopup={setreasonAndQuantityPopup} indexSelectedData={indexSelectedData} />
        </>
    )
}

export default GetProductDetails