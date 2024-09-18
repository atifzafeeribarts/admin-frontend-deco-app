import React from 'react'
import { ImNewTab } from "react-icons/im";
import { FaArrowLeft } from "react-icons/fa6";
const ChooseStore = ({ chooseStorePopup, setchooseStorePopup }) => {
    function handleStoreRedirect() {
        setchooseStorePopup(false);
    }
    return (
        <div className={`w-full flex-col mb-6 items-center ${chooseStorePopup ? 'flex' : 'hidden'}`}>
            <div onClick={() => setchooseStorePopup(false)} className='flex items-center gap-2 font-medium cursor-pointer hover:ml-[-4px] transition-[margin] mb-2 uppercase'><FaArrowLeft size={18}/> <span>Back</span></div>
            <h2 className="text-xl text-center font-semibold mb-10 max-sm:text-lg max-sm:mb-4">Please Select Store</h2>
            {/* FOR Policy */}
            <div className="flex gap-8 items-center justify-between w-[400px] max-sm:flex-col max-sm:w-full max-sm:gap-3">
                <h3 className="text-base text-center font-semibold">Return Policy</h3>
                <ul className="flex flex-col flex-wrap justify-center items-center gap-5 text-[var(--dark-light-brown)] [&>*]:bg-[var(--light-cream-background)] [&>*]:w-[200px] [&_li_a]:px-4 [&_li_a]:py-2 [&_li_a]:max-sm:py-2 [&_li_a]:rounded-md [&_li_a]:border-2 [&_li_a]:border-[var(--border-color)]  [&_li]:transition-all text-sm text-center [&_li_a]:flex [&_li_a]:items-center [&_li_a]:justify-between [&_li_a]:gap-2">
                    <li className="hover:scale-[1.03]"><a onClick={() => handleStoreRedirect()} href="https://decotvframes.com/pages/refund-policy" target="_blank">DecoTV <span><ImNewTab size={18} /></span></a></li>
                    <li className="hover:scale-[1.03]"><a onClick={() => handleStoreRedirect()} href="https://framemytv.com/policies/refund-policy" target="_blank">FramemyTV <span><ImNewTab size={18} /></span></a></li>
                </ul>
            </div>
            <hr className="h-[2px] bg-[var(--dark-light-brown)] rounded-lg w-full max-w-[70%] m-auto my-4 max-sm:max-w-[90%]" />
            {/* FOR Contact Us */}
            <div className="flex gap-8 items-center justify-between w-[400px] max-sm:flex-col max-sm:w-full max-sm:gap-3">
                <h3 className="text-base text-center font-semibold">Contact Us</h3>
                <ul className="flex flex-col flex-wrap justify-center items-center gap-5 text-[var(--dark-light-brown)] [&>*]:bg-[var(--light-cream-background)] [&>*]:w-[200px] [&_li_a]:px-4 [&_li_a]:py-2 [&_li_a]:max-sm:py-2 [&_li_a]:rounded-md [&_li_a]:border-2 [&_li_a]:border-[var(--border-color)]  [&_li]:transition-all text-sm text-center [&_li_a]:flex [&_li_a]:items-center [&_li_a]:justify-between [&_li_a]:gap-2">
                    <li className="hover:scale-[1.03]"><a onClick={() => handleStoreRedirect()} href="https://decotvframes.com/pages/contact-us" target="_blank">DecoTV <span><ImNewTab size={18} /></span></a></li>
                    <li className="hover:scale-[1.03]"><a onClick={() => handleStoreRedirect()} href="https://framemytv.com/pages/copy-of-contact-us-1" target="_blank">FramemyTV <span><ImNewTab size={18} /></span></a></li>
                </ul>
            </div>

        </div>
    )
}

export default ChooseStore