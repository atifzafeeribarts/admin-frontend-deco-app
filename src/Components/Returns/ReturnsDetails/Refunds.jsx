import React, { useRef, useState } from 'react'
import { MdError, MdCancel } from "react-icons/md";
import { onErrorToast, onSuccessToast, sliceURL } from '../../../Services/helper';
import { refundRequestApi } from '../../../Services/api';
import ButtonLoadingSpinner from '../../ButtonLoadingSpinner';

const Refunds = ({ refundPOPUP, setrefundPOPUP, reasonMap, storeName, data, setdataUpdated, pathname, refundInputValue, setrefundInputValue }) => {
    // Info: Fetching RefundRequest API Data
    const refund_amount_input = useRef(null);
    const [refundError, setRefundError] = useState("");
    const [loadingRefund, setloadingRefund] = useState(false);
    const handleRefundRequest = async () => {
        if (refund_amount_input.current.value == "") {
            setRefundError("Please Enter Refund Amount");
        } else {
            setloadingRefund(true);
            try {
                setRefundError("");
                const { storeName, orderId } = sliceURL(pathname);
                const resp = await refundRequestApi(
                    storeName,
                    data?.shopifyReturnId,
                    data?.returnReason,
                    data.returnItem[0]?.returnLineItemId,
                    refund_amount_input.current.value
                );
                if (resp?.returnRefund?.refund?.totalRefundedSet?.shopMoney?.amount) {
                    onSuccessToast("Refunded amount of $" + resp?.returnRefund?.refund?.totalRefundedSet?.shopMoney?.amount + " Successfully");
                    setdataUpdated(true);
                    setloadingRefund(false);
                }
            } catch (error) {
                onErrorToast("Something error has been occurerd.");
                setloadingRefund(false);
                setRefundError(error?.response?.data?.error?.data[0]?.message);
            }
        }
    };
    return (
        <div className={`${refundPOPUP ? "block" : "hidden"
            } fixed w-screen top-0 left-0 z-50 h-modal h-screen flex items-center justify-center before:bg-[var(--text-color)] before:opacity-50 before:w-full before:h-full before:absolute`}>
            <div className="relative p-4 w-full max-w-4xl ">
                <div className="relative max-sm:px-4 p-8 bg-[var(--light-cream-background)] rounded-lg shadow overflow-auto max-h-[calc(100vh-32px)]">
                    <div className='flex gap-3 justify-between max-md:flex-col'>
                        <div className='w-2/3 max-md:w-full'>
                            {data?.returnItem?.map((data, index) => (
                                <div key={index} className="p-3 border-[var(--dark-light-brown)] border-[1px] rounded-2xl  text-base bg-[var(--white-color)]">
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
                                </div>
                            ))}
                        </div>
                        <div className='w-1/3 max-md:w-full'>
                            <h2 className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                                Summary
                            </h2>
                            <div>
                                <table className="text-left border-collapse [&>tbody>tr>th]:text-[var(--text-color)]  [&>tbody>tr>th]:w-full [&>tbody>tr>*]:font-medium [&>tbody>tr>td]:text-[var(--dark-light-brown)] [&>tbody>tr>td]:text-right [&>tbody>tr>*]:p-1 max-sm:[&>tbody>tr>*]:px-0 max-sm:[&>tbody>tr>*]:py-2 max-sm:[&>tbody>tr>*]:text-sm [&>tbody>tr:nth-last-child(1)]:border-t-2 [&>tbody>tr:nth-last-child(1)>*]:pt-[10px] [&>tbody>tr:nth-last-child(2)>*]:pb-[10px] [&>tbody>tr:nth-last-child(1)]:border-[var(--border-color)]">
                                    <tbody>
                                        <tr>
                                            <th>Item subtotal</th>
                                            <td>${data.returnItem[0]?.price}</td>
                                        </tr>
                                        <tr>
                                            <th>Order Discount</th>
                                            <td>{data?.returnItem[0]?.discountAllocations ? "-$" + parseFloat(data.returnItem[0]?.discountAllocations).toFixed(2) : "---"}</td>
                                        </tr>
                                        {/* <tr>
                            <th>Shipping</th>
                            <td>---</td>
                        </tr> */}
                                        <tr>
                                            <th>Taxes</th>
                                            <td>${data.returnItem[0].tax}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Refund</th>
                                            <td>
                                                $
                                                {(
                                                    parseFloat(data.returnItem[0]?.price) +
                                                    parseFloat(data.returnItem[0].tax) - parseFloat(data.returnItem[0]?.discountAllocations)
                                                ).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='pb-3'>
                                <div className="px-1 text-sm">
                                    <details>
                                        <summary className="cursor-pointer">
                                            <h4 className="font-medium uppercase mt-2 inline-block">
                                                Order Payment Details
                                            </h4>
                                        </summary>
                                        <div className="mt-2">
                                            <span className="font-medium">Name:</span>{" "}
                                            {data.orderPaymentDetails?.name} <br />
                                            <span className="font-medium">Company:</span>{" "}
                                            {data.orderPaymentDetails?.company} <br />
                                            <span className="font-medium">
                                                Card Number:
                                            </span>{" "}
                                            {data.orderPaymentDetails?.number} <br />
                                            <span className="font-medium">
                                                Payment Method:
                                            </span>{" "}
                                            <span className="uppercase">
                                                {
                                                    data.orderPaymentDetails
                                                        ?.paymentMethodName
                                                }
                                            </span>
                                        </div>
                                    </details>
                                </div>
                            </div>
                            {data?.status != "REQUESTED" &&
                                data?.status != "DECLINED" ? (
                                <div className='border-t-2 border-[var(--border-color)]'>
                                    {/* Refund History and Payment Info  */}
                                    {data?.refunds?.map((refundData, index) => {
                                        return (
                                            <div key={index} className='text-sm'>
                                                <h4 className="p-1 text-[var(--dark-light-brown)] font-medium uppercase mt-2">
                                                    Paid
                                                </h4>
                                                <div className="flex justify-between p-1 gap-2 text-[var(--text-color)] font-medium">
                                                    <p>Refunded Amount</p>
                                                    <p className="text-[var(--dark-light-brown)] ">
                                                        $
                                                        {Number(refundData.totalAmountRefunded).toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between p-1 gap-2 text-[var(--text-color)] font-medium">
                                                    <p>Refunded at</p>
                                                    <p className="text-[var(--dark-light-brown)] text-right">
                                                        {refundData.refundedAt}
                                                    </p>
                                                </div>
                                                {refundData.paymentDetails && (
                                                    <div className="px-1">
                                                        <details>
                                                            <summary className="cursor-pointer text-[var(--dark-light-brown)]">
                                                                <h4 className="text-[var(--dark-light-brown)] font-medium uppercase mt-2 inline-block">
                                                                    Refund Payment Details
                                                                </h4>
                                                            </summary>
                                                            <div className="mt-2">
                                                                <span className="font-medium">Name:</span>{" "}
                                                                {refundData.paymentDetails?.name} <br />
                                                                <span className="font-medium">Company:</span>{" "}
                                                                {refundData.paymentDetails?.company} <br />
                                                                <span className="font-medium">
                                                                    Card Number:
                                                                </span>{" "}
                                                                {refundData.paymentDetails?.number} <br />
                                                                <span className="font-medium">
                                                                    Payment Method:
                                                                </span>{" "}
                                                                <span className="uppercase">
                                                                    {
                                                                        refundData.paymentDetails
                                                                            ?.paymentMethodName
                                                                    }
                                                                </span>
                                                            </div>
                                                        </details>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                    {/* Refund History and Payment Info - END */}
                                    {/* Setting the Refund Button only if Refund is not Done Previously */}
                                    {!data.refunds ? (
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
                                                    <MdError className="shrink-0" />
                                                    {refundError}
                                                </p>
                                            ) : null}
                                            <button
                                                onClick={loadingRefund ? null : handleRefundRequest}
                                                className="ml-auto block uppercase text-sm mt-4 py-3 px-5 at-dark-btn leading-none min-w-[100px]"
                                            >
                                                {loadingRefund ? <ButtonLoadingSpinner sizeClass={"size-4"} /> : "Refund"}
                                            </button>
                                        </>
                                    ) : null}
                                    {/* Setting the Refund Button only if Refund is not Done Previously - END */}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className='absolute top-[5px] right-[5px] size-6 cursor-pointer hover:scale-[1.1] transition'>
                        <MdCancel size={24} onClick={() => setrefundPOPUP(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Refunds