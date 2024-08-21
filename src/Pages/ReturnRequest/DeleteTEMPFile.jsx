import React from 'react'

const DeleteTEMPFile = () => {
    return (
        <>
            {/*  Return Detail Page Card - 3 Status */}
            <div className="at-return-card ">
                <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                    Status
                </div>
                {data?.status == "REQUESTED" ? (
                    <>
                        <p className="text-[var(--text-color)] text-sm font-medium mb-6">
                            On approval, a return notification will be sent to the
                            customer.
                        </p>
                        <div className="flex gap-5 [&>*]:w-[50%] [&>*]:rounded-lg text-base [&>*]:border-2 [&>*]:border-[var(--dark-light-brown)] [&>*]:px-2 [&>*]:py-4 [&>*]outline-none  max-sm:text-sm font-medium">
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
                        {/* <button className="px-2 py-4 border-[var(--border-color)] border-2 rounded-lg bg-[var(--white-color)] text-base max-sm:text-sm w-full mt-5 text-[var(--dark-light-brown)] font-medium">
                      More Information Needed
                    </button> */}
                    </>
                ) : data.status == "CLOSED" ? (
                    <p className="text-[var(--text-color)] text-base font-medium flex gap-2 items-center uppercase">
                        <span className="flex w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="">Returned</span>
                    </p>
                ) : data.status == "DECLINED" ? (
                    <p className="text-[var(--text-color)] text-base font-medium flex gap-2 items-center uppercase">
                        <span className="flex w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="">Declined</span>
                    </p>
                ) : (
                    <p className="text-[var(--text-color)] text-base font-medium flex gap-2 items-center uppercase">
                        <span className="flex w-3 h-3 bg-orange-300 rounded-full"></span>
                        <span className="">In Progress</span>
                        {/* {data?.refunds?.refundedAt && (
                      <>
                        <span className="flex w-3 h-3 bg-orange-300 rounded-full ml-4"></span>
                        <span className="">Refunded</span>
                      </>
                    )} */}
                    </p>
                )}
                {data?.refunds?.refundedAt && data.status != "CLOSED" && (
                    <div>
                        <button
                            onClick={handleCloseReturn}
                            className="px-2 py-4 border-[var(--border-color)] border-2 rounded-lg bg-[var(--dark-light-brown)] text-base max-sm:text-sm w-full mt-5 text-[var(--white-color)] font-medium"
                        >
                            Close Return
                        </button>
                    </div>
                )}
            </div>
            {/* Card - 3 Status End */}
        </>
    )
}

export default DeleteTEMPFile