import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableSkeleton = () => {
  return (
    <div className="bg-[var(--light-cream-background)] py-6 px-8 max-sm:py-2 max-sm:px-4 border-2 border-[var(--border-color)] rounded">
        <div className="overflow-auto  xl:max-h-[calc(100dvh-330px)]">
        <table className="border-collapse w-full relative">
          <thead className="border-b sticky top-0">
            <tr className="border-b-2 border-[var(--row-bottom-border-color)] bg-[var(--light-cream-background)]">
              {['Order id', 'Date of purchase', 'Date of request', 'Customer name', 'Reason', 'Amount', 'Return Status'].map((header, idx) => (
                <th className="text-left p-4 text-base text-[var(--text-color)] max-sm:p-2 font-medium" key={idx}>
                  <Skeleton width={100} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, rowIdx) => (
              <tr className="[&:not(:last-child)]:border-b-2 border-[var(--row-bottom-border-color)]" key={rowIdx}>
                {[...Array(7)].map((_, cellIdx) => (
                  <td className="p-4 text-[var(--data-gray-color)] text-base max-sm:p-2 " key={cellIdx}>
                    <Skeleton width={100} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ); 
};

export default TableSkeleton;
