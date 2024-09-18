import React, { useRef, useState } from 'react'
import { onErrorToast, onSuccessToast, sliceURL } from '../../../Services/helper';
import { declineRequestApi } from '../../../Services/api';
import { MdError } from "react-icons/md";
import ButtonLoadingSpinner from '../../ButtonLoadingSpinner';
import { useLocation } from 'react-router-dom';

const DeclinePopUp = ({ data, declinePopUp, openDecline_pop_up, setdataUpdated }) => {
    const decline_reason = useRef(null);
    const declineDropdown_option = useRef(null);
    const admin_decline_reason = useRef(null);
    const [loadingDecline, setloadingDecline] = useState(false);
    const [declineErrorMessage, setDeclineErrorMessage] = useState("");
    const location = useLocation();
    const { pathname } = location;
    const handleDeclineRequest = async () => {
        if (decline_reason.current.value == "" || declineDropdown_option.current.value == "Decline Reason") {
            setDeclineErrorMessage("Please Enter Decline Reason");
        } else {
            setloadingDecline(true);
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
                    onSuccessToast("Decline Successfully");
                    setdataUpdated(true);
                    setloadingDecline(false);
                }
            } catch (error) {
                onErrorToast("Something error has been occurerd.");
                setDeclineErrorMessage(error?.response?.data?.message);
                setloadingDecline(false);
            }
        }
    };
    return (
        <section>
            <div className={`${declinePopUp ? "block" : "hidden"
                } fixed w-screen top-0 left-0 z-50 h-modal h-screen flex items-center justify-center before:bg-[var(--text-color)] before:opacity-50 before:w-full before:h-full before:absolute`}
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
                                    <MdError className="shrink-0" />
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
                                    className="bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)] py-2 px-4 w-full rounded-md border-2 text-sm font-medium min-w-[90px]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={loadingDecline ? null : handleDeclineRequest}
                                    id="confirm-button"
                                    type="button"
                                    className="bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)] py-2 px-4 w-full rounded-md border-2 text-sm font-medium min-w-[90px]"
                                >
                                    {loadingDecline ? <ButtonLoadingSpinner sizeClass={"size-5"} /> : "Decline"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DeclinePopUp