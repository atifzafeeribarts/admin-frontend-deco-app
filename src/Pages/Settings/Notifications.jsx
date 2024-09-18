import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Notifications = () => {
    const [Loading, setLoading] = useState(true);
    // Data from API all Notifications
    const [allNotificationData, setAllNotificationData] = useState([
        {
            "id": 1,
            "title": "Gift return request received",
            "description": "Sent to the customer and merchant after the customer completes the gift return form.",
            "url": "/gift-return-request-received"
        },
        {
            "id": 2,
            "title": "Return Confirmation with QR Code for in store drop off",
            "description": "Sent with a QR code when the customer's return is completed online to be dropped off in store so they can proceed in Loop POS.",
            "url": "/return-confirmation-qr-code-in-store-drop-off"
        },
        {
            "id": 3,
            "title": "Return confirmation",
            "description": "Sent after each return request is submitted through the customer portal.",
            "url": "/return-confirmation"
        },
        {
            "id": 4,
            "title": "Happy Returns: return confirmation",
            "description": "Sent when a return made that uses Happy Returns.",
            "url": "/happy-returns-return-confirmation"
        },
        {
            "id": 5,
            "title": "Instant Exchange: return confirmation",
            "description": "Sent after each return request is submitted through the customer portal when the consumer has opted-in to instant exchange.",
            "url": "/instant-exchange-return-confirmation"
        },
        {
            "id": 6,
            "title": "Keep item: return confirmation",
            "description": "No description provided.",
            "url": "/keep-item-return-confirmation"
        }
    ]
    );

    return (
        <>
            <div className='h-full bg-[var(--light-cream-background)] rounded-xl border-2 border-[var(--border-color)] overflow-y-auto p-3 text-[var(--text-color)] relative'>
                <h1 className='text-2xl font-medium text-center mb-7 max-sm:text-xl'>Customer Notifications</h1>
                <div className='flex flex-wrap gap-4 max-w-4xl mx-auto'>
                    {allNotificationData.map((data, index) => (
                        <Link to={`/settings/notifications/${data.id}`} key={index} className='w-[48%] bg-[var(--white-color)] p-3 rounded-xl border-2 border-[var(--border-color)] relative overflow-hidden group block max-md:w-full'>
                            <h3 className="mb-3 font-medium">{data.title}</h3>
                            <p className="text-sm">{data.description}</p>
                            <div className='opacity-0 group-[:hover]:opacity-100 absolute inset-0 size-full bg-[#ffffffb5] flex justify-center items-center'>
                                <p className='px-3 py-2 translate-y-7 opacity-0 text-[var(--white-color)] bg-[var(--dark-light-brown)] w-[100px] text-sm rounded-md text-center transition-all group-[:hover]:translate-y-0 group-[:hover]:opacity-100'>Edit</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='absolute inset-0 size-full bg-[#fef2f2ab] text-3xl flex items-center justify-center'>Coming Soon</div>
            </div>
        </>
    );
}

export default Notifications