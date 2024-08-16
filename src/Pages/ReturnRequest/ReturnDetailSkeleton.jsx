import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ReturnDetailSkeleton = () => {
  return (
    <section>
        <div className="flex items-center gap-2 text-sm text-[var(--text-color)] my-5">
          <Skeleton width={150} height={20} />
        </div>
        <div className="flex gap-7 [&>*]:w-[50%] max-lg:flex-col max-lg:[&>*]:w-full">
          <div className="flex flex-col gap-7">
            <div className="rounded-md bg-[var(--light-cream-background)] p-5 border-[var(--border-color)] border-2">
              <Skeleton width={100} height={20} />
              <div className="flex justify-between font-medium text-sm mb-5 gap-2 max-md:flex-col">
                <Skeleton width={100} height={20} />
                <Skeleton width={100} height={20} />
              </div>
              <Skeleton width={150} height={20} />
              <div className="p-3 border-[var(--dark-light-brown)]x border-[1px] rounded-2xl flex gap-4 items-center text-base">
                <Skeleton circle width={80} height={80} />
                <div>
                  <Skeleton width={200} height={20} />
                  <Skeleton width={100} height={20} />
                </div>
              </div>
            </div>
            <div className="rounded-md bg-[var(--light-cream-background)] p-5 border-[var(--border-color)] border-2">
              <Skeleton width={150} height={20} />
              <div>
                <Skeleton count={5} height={20} style={{ marginBottom: '10px' }} />
              </div>
            </div>
            <div className="rounded-md bg-[var(--light-cream-background)] p-5 border-[var(--border-color)] border-2">
              <Skeleton width={200} height={20} />
              <div className="flex gap-1 items-center pb-3">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={150} height={20} />
              </div>
              <Skeleton width="100%" height={100} />
              <div className="flex gap-5 text-[var(--text-color)] text-sm mt-5 max-sm:flex-col">
                <Skeleton width="100%" height={40} />
                <Skeleton width="100%" height={40} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div className="rounded-md bg-[var(--light-cream-background)] p-5 border-[var(--border-color)] border-2">
              <Skeleton width={200} height={20} />
              <Skeleton count={5} height={20} style={{ marginBottom: '10px' }} />
            </div>
            <div className="rounded-md bg-[var(--light-cream-background)] p-5 border-[var(--border-color)] border-2">
              <Skeleton width={200} height={20} />
              <Skeleton count={2} height={20} style={{ marginBottom: '10px' }} />
            </div>
            <div className="rounded-md bg-[var(--light-cream-background)] p-5 border-[var(--border-color)] border-2">
              <Skeleton width={200} height={20} />
              <Skeleton count={3} height={20} style={{ marginBottom: '10px' }} />
              <div className="flex gap-5 text-base max-sm:text-sm font-medium">
                <Skeleton width="100%" height={50} />
                <Skeleton width="100%" height={50} />
              </div>
              <Skeleton width="100%" height={50} style={{ marginTop: '10px' }} />
            </div>
            <div className="rounded-md bg-[var(--light-cream-background)] p-5 border-[var(--border-color)] border-2">
              <Skeleton width={200} height={20} />
              <Skeleton width="100%" height={100} />
            </div>
          </div>
        </div>
      </section>
  )
}

export default ReturnDetailSkeleton