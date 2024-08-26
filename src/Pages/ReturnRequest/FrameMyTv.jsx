import React, { useEffect, useState } from "react";
import TablesAndSearch from "../../Components/Returns/TablesAndSearch";
import { fetchAllReturns } from "../../Services/api";
import { useSearchParams } from "react-router-dom";
function FrameMyTv() {
  const [TableData, setTableData] = useState();
  const [TabName, setTabName] = useState("ALL");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("status")) {
      setTabName(searchParams.get("status"));
    }else{
      setTabName("ALL");
    }
  },[searchParams])
  const [istableLoaded, setisTableLoaded] = useState(false);
  useEffect(() => {
    setisTableLoaded(false);
    fetchAllReturns(TabName, "frame-my-tv")
      .then((data) => {
        setTableData(data);
        setisTableLoaded(true);
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
        isTableLoaded={istableLoaded}
      />
    </>
  );
}

export default FrameMyTv;
