import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const UserChartRole = ({ listUser }) => {
  const adminCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.role === "ADMIN").length
    : 0;

  const userCount = Array.isArray(listUser)
    ? listUser.filter((item) => item.role === "USER").length
    : 0;
  const chartData = {
    labels: ["Admin", "User"],
    datasets: [
      {
        data: [adminCount, userCount],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  return (
    <div>
      <h3 className="text-black/70 dark:text-black/70">Customers Role</h3>
      <p className="text-lg">{listUser.length}</p>
      <Pie data={chartData} />
    </div>
  );
};

export default UserChartRole;
