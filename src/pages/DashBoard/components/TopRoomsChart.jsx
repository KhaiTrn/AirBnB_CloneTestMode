import React, { useEffect, useState } from "react";
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

const TopRoomsChart = ({ bookingData, roomData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const roomCounts = {};
    bookingData.forEach((booking) => {
      roomCounts[booking.maPhong] = (roomCounts[booking.maPhong] || 0) + 1;
    });

    const sortedRooms = Object.entries(roomCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5);

    const labels = sortedRooms.map(([maPhong]) => {
      const room = roomData.find((room) => room.id === parseInt(maPhong));
      return room ? room.tenPhong : `Phòng ${maPhong}`;
    });

    const counts = sortedRooms.map(([, count]) => count);

    setChartData({
      labels: labels.map((label) =>
        label.length > 20 ? label.slice(0, 20) + "..." : label
      ),
      datasets: [
        {
          label: "Số lần đặt phòng",
          data: counts,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [bookingData, roomData]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="text-2xl text-center mb-10">
        Top 5 Phòng Được Đặt Nhiều Nhất
      </h3>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  title: function (tooltipItem) {
                    const room = roomData.find(
                      (room) => room.id === parseInt(tooltipItem[0].label)
                    );
                    return room
                      ? room.tenPhong
                      : `Phòng ${tooltipItem[0].label}`;
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  maxRotation: 90,
                  minRotation: 45,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopRoomsChart;
