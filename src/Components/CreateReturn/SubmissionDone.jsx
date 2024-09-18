import React, { useContext } from 'react'
import ContextProvider from '../../Context/ContextProvider';
import { IoIosDoneAll } from "react-icons/io";
import { Link } from 'react-router-dom';
const SubmissionDone = () => {
    // ----> Using Context States
    const { returnIdOnSubmission } = useContext(ContextProvider);
    // END Using Context States
    return (
        <div className='w-full text-center'>
            <div className='border-2 border-[var(--dark-light-brown)] text-[var(--dark-light-brown)] p-4 rounded-full w-fit m-auto mb-4'>
                <IoIosDoneAll size={50} />
            </div>
            <h1 className="text-xl font-semibold mb-2 max-sm:text-lg ">Return has been created</h1>
            <p>Please go to the Return Details page to proceed further</p>
            <Link to={`/return-request/deco-tv-frames/${returnIdOnSubmission}`} className='py-2 px-10 bg-[var(--white-color)] border-2 border-[var(--dark-light-brown)] text-[var(--dark-light-brown)] rounded-md hover:bg-[var(--dark-light-brown)] hover:border-[var(--dark-light-brown)] hover:text-[var(--white-color)] transition inline-block mt-8 m-auto uppercase text-sm hover:scale-[1.03]'>Return Details</Link>
        </div>

    )
}

export default SubmissionDone