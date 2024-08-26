import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ReturnDetailSkeleton = () => {
  return (
    <>
      <section>
        <div className="mt-4 mb-2 w-fit">
        <Skeleton width={85}   height={24}/>
        </div>
        <div className="flex gap-x-7 gap-y-3 justify-between items-center text-sm text-[var(--text-color)] pb-6 max-lg:flex-col">
          <div className="w-[50%] flex items-center gap-x-8 gap-y-2 flex-wrap max-lg:w-[70%] max-sm:w-full max-lg:justify-center max-sm:justify-start">
            <div className="flex items-center gap-2">
              <Skeleton width={150} />
            </div>
            <div>
              <Skeleton width={100} height={20} />
            </div>
          </div>
          <div className="w-[50%] flex flex-col items-end max-lg:w-[70%] max-sm:w-full max-lg:items-center">
            <Skeleton width={200} height={40} />
          </div>
        </div>
        <div className="flex gap-7 [&>*]:w-[50%] max-lg:flex-col max-lg:[&>*]:w-full">
          <div className="flex flex-col gap-7">
            {/* card - 1 */}
            <div className="at-return-card">
              <Skeleton width={150} height={25} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="100%" height={150} />
            </div>

            {/* Card - 2 Refund Information */}
            <div className="at-return-card">
              <Skeleton width={100} height={25} />
              <Skeleton width="100%" height={100} />
            </div>

            {/* Card - 3 Return Shipping Options */}
            <div className="at-return-card">
              <Skeleton width={150} height={25} />
              <Skeleton width="100%" height={150} />
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {/* card - 1 Contact Information */}
            <div className="at-return-card">
              <Skeleton width={150} height={25} />
              <Skeleton width="100%" height={100} />
            </div>

            {/* Card - 2 Tags */}
            <div className="at-return-card">
              <Skeleton width={100} height={25} />
              <Skeleton width="100%" height={40} />
            </div>

            {/* Card - 3 Additional Note */}
            <div className="at-return-card">
              <Skeleton width={150} height={25} />
              <Skeleton width="100%" height={100} />
            </div>
            {/* Card - 4 Additional Note */}
            <div className="at-return-card">
              <Skeleton width={150} height={25} />
              <Skeleton width="100%" height={100} />
            </div>
          </div>
        </div>
      </section>

      {/* Return History */}
      <section className="py-12">
        <Skeleton width={150} height={25} />
        <div className="at-return-card">
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={20} />
        </div>
      </section>
    </>
  )
}

export default ReturnDetailSkeleton