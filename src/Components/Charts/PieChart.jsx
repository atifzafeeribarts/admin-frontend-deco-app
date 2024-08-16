import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components for ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["DecoTV", "Frame My Tv", "Amazon", "Way Fair", "Best Buy", ],
    datasets: [
      {
        label: "# of Returns",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "#016FC4",
          "#1891C3",
          "#3AC0DA",
          "#3DC6C3",
          "#50E3C2",
          "#00589C",
        ],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of Returns",
      },
    },
  };

  return (
    <div className="md:w-[50%] h-[442px] border-2 border-[var(--dark-light-brown)] rounded flex justify-center items-center py-4">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
