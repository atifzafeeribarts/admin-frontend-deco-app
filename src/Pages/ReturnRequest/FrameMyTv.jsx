import React, { useEffect, useState } from "react";
import TablesAndSearch from "./../../Components/TablesAndSearch";
import { fetchAllReturns } from "../../Services/api";
function FrameMyTv() {
  const [TableData, setTableData] = useState();
  const [TabName, setTabName] = useState("all");
  useEffect(() => {
    fetchAllReturns(TabName, "frame-my-tv")
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => {
        setTableData("error-fetch")
        console.log(error);
      });
  }, [TabName]);
  return (
    <>
      <TablesAndSearch
        TableData={TableData}
        TabName={TabName}
        setTabName={setTabName}
      />
    </>
  );
}

export default FrameMyTv;
