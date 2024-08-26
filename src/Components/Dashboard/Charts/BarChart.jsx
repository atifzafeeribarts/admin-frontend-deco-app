import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Deco Tv Frame", "Frame My Tv", "Amazon", "Way Fair", "Best Buy"],
    datasets: [
      {
        label: "Weekly return requests",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "#00589C",
        borderColor: "#FBF1E2",
        borderWidth: 1,
      },
      {
        label: "Montly return requests",
        data: [75, 69, 90, 91, 66],
        backgroundColor: "#1891C3",
        borderColor: "#FBF1E2",
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
        text: "Return request analysis",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="md:w-[50%] h-[442px] border-2 border-[var(--dark-light-brown)] rounded flex justify-center items-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
