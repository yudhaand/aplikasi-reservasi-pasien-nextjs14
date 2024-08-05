import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DokterPieChart({ dokters }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Menghitung jumlah dokter per spesialisasi
    const spesialisasiCount = dokters.reduce((acc, dokter) => {
      acc[dokter.spesialisasi] = (acc[dokter.spesialisasi] || 0) + 1;
      return acc;
    }, {});

    const data = {
      labels: Object.keys(spesialisasiCount),
      datasets: [
        {
          label: "Jumlah Dokter",
          data: Object.values(spesialisasiCount),
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Distribusi Spesialisasi Dokter",
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
      <canvas id="dokterChart" ref={chartRef} />
    </div>
  );
}
