// src/pages/api/chart/jumlah-pasien.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const firestore = getFirestore(firebaseApp);
  const pasienRef = collection(firestore, "pasien");

  try {
    const snapshot = await getDocs(pasienRef);
    const pasienData = snapshot.docs.map((doc) => doc.data());

    const currentYear = new Date().getFullYear();
    const monthlyCounts = Array(12).fill(0); // Initialize an array of 12 zeros for each month

    pasienData.forEach((pasien) => {
      const createdAt = new Date(pasien.created_at);
      if (createdAt.getFullYear() === currentYear) {
        const month = createdAt.getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
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
    console.error("Error fetching pasien data:", error);
    res.status(500).json({ message: "Failed to fetch pasien data", error: error.message });
  }
}
