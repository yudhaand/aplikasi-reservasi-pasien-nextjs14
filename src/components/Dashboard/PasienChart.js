import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PasienChart({ jumlahPasien }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: jumlahPasien?.labels,
      datasets: [
        {
          label: "Jumlah Pasien",
          data: jumlahPasien?.data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="w-full md:w-1/2">
      <canvas id="pasienChart" ref={chartRef} />
    </div>
  );
}
