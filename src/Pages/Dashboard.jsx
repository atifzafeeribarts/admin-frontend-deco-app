import React, { useEffect, useState } from "react";
import Card from "../Components/Dashboard/Card";
import BarChart from "../Components/Dashboard/Charts/BarChart";
import PieChart from "../Components/Dashboard/Charts/PieChart";
import { SiVirustotal } from "react-icons/si";
import { MdPending } from "react-icons/md";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { countReturns } from "../Services/api";
const Dashboard = () => {
  const CardsData = {
    totalRequests: {
      icon: <SiVirustotal  size={20}/>,
      name: "Total Requests",
    },
    pending: {
      icon: <MdPending  size={20}/>,
      name: "Requests Pending",
    },
    processing: {
      icon: <MdOutlineIncompleteCircle  size={20}/>,
      name: "Requests Processing",
    },
    returned: {
      icon: <GrCompliance  size={20}/>,
      name: "Requests Returned",
    },
  };
  const [countData, setcountData] = useState(null);
  useEffect(() => {
    const countTimeout = setTimeout(() => {
      countReturns().then((data) => {
        setcountData(data)
      })
    }, 700);
    return () => {
      clearTimeout(countTimeout);
    }
  }, [])
  return (
    <div>
      <div className="gap-4 flex flex-col md:flex-row md:justify-between pt-6 max-lg:flex-wrap">
        <Card data={CardsData.totalRequests} countData={countData?.ALL} icon={CardsData.totalRequests.icon} />
        <Card data={CardsData.pending} countData={countData?.REQUESTED} icon={CardsData.pending.icon} />
        <Card data={CardsData.processing} countData={countData?.OPEN} icon={CardsData.processing.icon} />
        <Card data={CardsData.returned} countData={countData?.CLOSED} icon={CardsData.returned.icon} />
      </div>
      <div className="flex gap-4 flex-col md:flex-row justify-between items-center md:h-[442px] mt-10">
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
