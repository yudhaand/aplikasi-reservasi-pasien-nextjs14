import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PasienAgeChart({ pasiensUsia }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Data pasien berdasarkan usia
    const pasienData = {
      labels: ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80"],
      datasets: [
        {
          label: "Jumlah Pasien",
          data: pasiensUsia?.data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "polarArea",
      data: pasienData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Distribusi Pasien Berdasarkan Usia",
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="w-full max-h-[30rem] flex justify-center">
      <canvas id="pasienAgeChart" ref={chartRef} />
    </div>
  );
}
