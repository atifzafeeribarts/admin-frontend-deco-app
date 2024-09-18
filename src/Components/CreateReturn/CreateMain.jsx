import React, { useContext } from "react";

import GetOrderDetailsForm from "./GetOrderDetailsForm";
import GetProductDetails from "./GetProductDetails";
import DecoTVFrameLogo from "../../assets/DecoTVLogo.png";
import FrameMyTVLogo from "../../assets/FMTVlogo.png";
import ContextProvider from "../../Context/ContextProvider";
import UploadPhotos from "./UploadPhotos";
import ReviewSubmission from './ReviewSubmission';
import SubmissionDone from "./SubmissionDone";
const CreateMain = () => {
  // ----> Using Context States
  const { requestpage } = useContext(ContextProvider);
  // END Using Context States

  return (
    <>
      <section className="ibat-scroll-width p-4 h-full flex justify-center bg-[var(--light-cream-background)] rounded-xl border-2 border-[var(--border-color)] overflow-y-auto">
        <div className={`w-full ${requestpage == 3 ? 'max-w-[800px]' : 'max-w-[550px]'} bg-[var(--white-color)] text-[var(--text-color-dark)] p-6 rounded-lg flex flex-col items-center border-2 border-[var(--border-color)] px-4 shadow-lg justify-between transition-[max-width] overflow-auto`}>
          {(() => {
            switch (requestpage) {
              case 0:
                return <GetOrderDetailsForm />
              case 1:
                return <GetProductDetails />
              // case 2:
              //   return <UploadPhotos />
              case 3:
                return <ReviewSubmission />
              case 4:
                return <SubmissionDone />
              default:
                return null
            }
          })()}
          <div className="flex gap-4 w-[200px] mt-6">
            <a href="https://decotvframes.com/" target="_blank" rel="noopener noreferrer" className="block w-[50%]">
              <img src={DecoTVFrameLogo} className="object-contain " />
            </a>
            <a href="https://framemytv.com/" target="_blank" rel="noopener noreferrer" className="block w-[50%]">
              <img src={FrameMyTVLogo} className="object-contain" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateMain;
