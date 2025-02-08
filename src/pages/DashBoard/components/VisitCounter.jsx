import { get, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../../../firebase/config";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VisitCounter = () => {
  const [todayVisits, setTodayVisits] = useState(0);
  const [weekVisits, setWeekVisits] = useState([]);
  const [labels, setLabels] = useState([]);

  const getLast7DaysVisits = async () => {
    let total = [];
    let days = [];

    for (let i = 6; i >= 0; i--) {
      const now = new Date();
      const pastDate = new Date(now);
      pastDate.setDate(now.getDate() - i);

      const year = pastDate.getFullYear();
      const month = String(pastDate.getMonth() + 1).padStart(2, "0");
      const day = String(pastDate.getDate()).padStart(2, "0");
      const visitRef = ref(database, `visits/${year}/${month}/${day}`);
      const snapshot = await get(visitRef);
      total.push(snapshot.exists() ? snapshot.val() : 0);
      days.push(`${day}/${month}`);
    }

    setWeekVisits(total);
    setLabels(days);
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const visitRef = ref(database, `visits/${year}/${month}/${day}`);

    get(visitRef).then((snapshot) => {
      let currentVisits = snapshot.exists() ? snapshot.val() : 0;
      set(visitRef, currentVisits + 1);
      setTodayVisits(currentVisits + 1);
    });
    getLast7DaysVisits();
  }, []);

  // 🛠 Fix lỗi: Kiểm tra nếu labels hoặc weekVisits chưa có dữ liệu thì không render Bar chart
  if (labels.length === 0 || weekVisits.length === 0) {
    return <h2>Đang tải dữ liệu...</h2>;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Lượt truy cập",
        data: weekVisits,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Thống kê lượt truy cập</h2>
      <h1>Lượt truy cập hôm nay: {todayVisits}</h1>
      <Bar data={data} />
    </div>
  );
};

export default VisitCounter;
