// src/pages/api/chart/reservasi.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const firestore = getFirestore(firebaseApp);
  const reservasiRef = collection(firestore, "reservasi");

  try {
    const snapshot = await getDocs(reservasiRef);
    const reservasiData = snapshot.docs.map((doc) => doc.data());

    const currentYear = new Date().getFullYear();
    const monthlyCounts = Array(12).fill(0); // Initialize an array of 12 zeros for each month

    reservasiData.forEach((reservasi) => {
      const reservasiDate = new Date(reservasi.waktu_reservasi);
      if (reservasiDate.getFullYear() === currentYear) {
        const month = reservasiDate.getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
        monthlyCounts[month]++;
      }
    });

    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    res.status(200).json({
      labels: labels.slice(0, new Date().getMonth() + 1), // Return labels up to the current month
      data: monthlyCounts.slice(0, new Date().getMonth() + 1), // Return counts up to the current month
    });
  } catch (error) {
    console.error("Error fetching reservasi data:", error);
    res.status(500).json({ message: "Failed to fetch reservasi data", error: error.message });
  }
}
