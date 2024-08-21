import React, { useEffect } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
} from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { columns_header as data_header_memo } from "./columns";
import { Link } from "react-router-dom";
const ReturnTable = ({ TableData }) => {
  // Info: ALL Table Functionalties
  const query = useSelector((state) => state.query.query);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setGlobalFilter,
    pageCount,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns: data_header_memo,
      data: TableData,
      // initialState: { globalFilter: query }, // Initialize globalFilter with query
      initialState: {
        sortBy: [
          {
            id: 'orderName',
            desc: true
          }
        ]
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  useEffect(() => {
    setGlobalFilter(query.query);
  }, [query, setGlobalFilter]);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <FaAngleUp />
      ) : (
        <FaAngleDown />
      )
    ) : (
      <IoFilter />
    );
  };
  return (
    <section className="pt-4">
      <div className="bg-[var(--light-cream-background)] py-6 px-8 max-sm:py-2 max-sm:px-4 border-2 border-[var(--border-color)] rounded">
        <div className="overflow-auto  xl:max-h-[calc(100dvh-330px)]">
          <table
            className="border-collapse w-full relative"
            {...getTableProps()}
          >
            <thead className="border-b sticky top-0">
              {headerGroups.map((headerGroup, id) => (
                <tr
                  className="border-b-2 border-[var(--row-bottom-border-color)] bg-[var(--light-cream-background)]"
                  {...headerGroup.getHeaderGroupProps()}
                  key={id}
                >
                  {headerGroup.headers.map((column, idx) => (
                    <th
                      className="text-left p-4 text-base text-[var(--text-color)] max-sm:p-2 font-medium first:hidden [&:nth-child(2)]:hidden [&:nth-child(3)]:hidden"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={"coulums" + idx}
                    >
                      <span className="flex gap-2 items-center ">
                        <span>{column.render("Header")}</span>{" "}
                        <span className="w-[16px]">
                          {generateSortingIndicator(column)}
                        </span>{" "}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="overflow-y-auto" {...getTableBodyProps()}>
              {page.map((row, idx) => {
                prepareRow(row);
                return (
                  <tr className="[&:not(:last-child)]:border-b-2 border-[var(--row-bottom-border-color)]" {...row.getRowProps()} key={"row" + idx}>
                    {
                      row.cells.map((cell, id) => (
                        <td className="p-4 text-[var(--data-gray-color)] text-base max-sm:p-2 first:hidden [&:nth-child(2)]:hidden [&:nth-child(3)]:hidden hover:underline hover:font-medium" {...cell.getCellProps()} key={"cell" + id}>
                          <Link to={`${row.original.shopifyReturnId}`}> {cell.render("Cell")}</Link>
                          {/* {row.original.variantPrice} */}
                        </td>
                      )
                      )
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Button */}
      <div className={`flex text-sm gap-2.5 justify-center py-7 font-medium ${pageCount > 1 ? '' : 'hidden'}`}>
        <button className="flex items-center group" disabled={!canPreviousPage} onClick={previousPage}>
          <FaAngleLeft className="text-[var(--dark-light-brown)] group-disabled:text-[var(--data-gray-color)]" /> <span className="group-disabled:text-[var(--data-gray-color)]">Prev</span>
        </button>
        <div className="text-center rounded-[50%] leading-none bg-[var(--dark-light-brown)] text-[var(--white-color)] w-[24px] h-[24px] flex items-center justify-center">{pageIndex + 1}</div>
        <button className="flex items-center group" disabled={!canNextPage} onClick={nextPage}>
          <span className="group-disabled:text-[var(--data-gray-color)]">Next</span> <FaAngleRight className="text-[var(--dark-light-brown)] group-disabled:text-[var(--data-gray-color)]" />
        </button>
      </div>
    </section>
  );
};

export default ReturnTable;
