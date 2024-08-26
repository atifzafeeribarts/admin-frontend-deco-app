import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import ReturnTable from "./ReturnTable";
import SearchBar from "./SearchBar";
import TabButton from "./TabButtons";
import TableSkeleton from "./TableSkeleton";
import { countReturns } from "../../Services/api";
function TablesAndSearch({ TableData, TabName, setTabName, isTableLoaded }) {
  const tabs = [
    { name: "ALL", label: "All" },
    { name: "REQUESTED", label: "Requested" },
    { name: "OPEN", label: "Open" },
    { name: "CLOSED", label: "Closed" },
    { name: "DECLINED", label: "Declined" }
  ];
  const [searchParams, setSearchParams] = useSearchParams();


  /* ----- START - Taking Data from Child Components ---- */
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterFunc, setFilterFunc] = useState(null);
  const handleSetFilterFunc = ({ setGlobalFilter, globalFilter }) => {
    setFilterFunc(() => setGlobalFilter);
    setGlobalFilter(globalFilter);
  };

  useEffect(() => {
    if (filterFunc) {
      filterFunc(globalFilter);
    }
  }, [globalFilter, filterFunc]);
  // Info: Updating Count of Returns Closed, Open, Declined and Requested
  const [countData, setcountData] = useState(null);
  useEffect(() => {
    countReturns().then((data) => {
      setcountData(data)
    })
  }, [TabName])

  /* ----- END - Taking Data from Child Components ----- */
  return (
    <>
      <div className="flex max-md:flex-col max-sm:gap-4 gap-6 mb-6">
        <div className="sm:w-[40%]">
          <SearchBar />
        </div>
        <div className="sm:w-[60%] flex justify-between items-center gap-2 max-lg:[&>*]:w-[48%]  lg:[&>*]:h-[100%] max-lg:flex-wrap">
          {tabs.map((tab) => (
            <TabButton
              key={tab.name}
              onClick={() => {
                setTabName(tab.name);
                setSearchParams({ ["status"]: tab.name })
              }}
              isActive={TabName === tab.name}
            >
              {tab.label} {countData?.[tab.name] ? `(${countData[tab.name]})` : "(0)"}
            </TabButton>
          ))}
        </div>
      </div>
      {isTableLoaded ? (
        TableData === "error-fetch" ? (
          <div className="flex items-center justify-center w-full h-[calc(100dvh-275px)] text-2xl text-[#ef4444] animate-pulse">
            <span>Oops, Something Went Wrong :(</span>
          </div>
        ) : TableData.length ? (
          <ReturnTable
            TableData={TableData}
            onSetFilterFunc={handleSetFilterFunc}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-[calc(100dvh-275px)] text-2xl text-[#ef4444] animate-pulse">
            <span>No Data Available</span>
          </div>
        )
      ) : (
        <TableSkeleton />
      )}
    </>
  );
}

export default TablesAndSearch;
