import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const UserChartGender = ({ listUser }) => {
  const maleCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.gender === true).length
    : 0;

  const femaleCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.gender === false).length
    : 0;

  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [maleCount, femaleCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  return (
    <div>
      <h3 className="text-black/70 dark:text-black/70">Customers Gender</h3>
      <p className="text-lg">{listUser.length}</p>
      <Pie data={chartData} />
    </div>
  );
};

export default UserChartGender;
