// src/pages/api/chart/distribusi-pasien-berdasarkan-usia.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDifference = now.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export default async function handler(req, res) {
  const firestore = getFirestore(firebaseApp);
  const pasienRef = collection(firestore, "pasien");

  try {
    const snapshot = await getDocs(pasienRef);
    const pasienList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const usiaRanges = [
      { label: "0-10", min: 0, max: 10 },
      { label: "11-20", min: 11, max: 20 },
      { label: "21-30", min: 21, max: 30 },
      { label: "31-40", min: 31, max: 40 },
      { label: "41-50", min: 41, max: 50 },
      { label: "51-60", min: 51, max: 60 },
      { label: "61-70", min: 61, max: 70 },
      { label: "71-80", min: 71, max: 80 },
    ];

    const usiaDistribusi = usiaRanges.map((range) => ({
      label: range.label,
      count: pasienList.filter((pasien) => {
        const age = calculateAge(pasien.tanggal_lahir);
        return age >= range.min && age <= range.max;
      }).length,
    }));

    const response = {
      labels: usiaDistribusi.map((item) => item.label),
      data: usiaDistribusi.map((item) => item.count),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching pasien data:", error);
    res.status(500).json({ message: "Failed to fetch pasien data" });
  }
}
