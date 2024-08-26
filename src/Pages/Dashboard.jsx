import React, { useState } from "react";
import Card from "../Components/Dashboard/Card";
import BarChart from "../Components/Dashboard/Charts/BarChart";
import PieChart from "../Components/Dashboard/Charts/PieChart";
const Dashboard = () => {
  // const [sideMenuOpen, setSideMenuOpen] = useState(false);
  // const toggleSideMenu = () => {
  //   setSideMenuOpen(!sideMenuOpen);
  // };
  const CardsData = {
    totalRequests: {
      icon: "MdOutlineShoppingBag ",
      name: "Total Requests",
      value: "100",
    },
    pending: {
      icon: "MdOutlineShoppingBag",
      name: "Requests Pending",
      value: "30",
    },
    processing: {
      icon: "MdOutlineShoppingBag ",
      name: "Requests Processing",
      value: "50",
    },
    returned: {
      icon: "MdOutlineShoppingBag ",
      name: "Requests Returned",
      value: "20",
    },
  };
  return (
    <div>
      <div className="gap-4 flex flex-col md:flex-row md:justify-between pt-6 max-lg:flex-wrap">
        <Card data={CardsData.totalRequests} />
        <Card data={CardsData.pending} />
        <Card data={CardsData.processing} />
        <Card data={CardsData.returned} />
      </div>
      <div className="flex gap-4 flex-col md:flex-row justify-between items-center md:h-[442px] mt-10">
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
