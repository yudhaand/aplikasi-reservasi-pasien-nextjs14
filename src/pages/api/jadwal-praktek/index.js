// src/pages/api/jadwal-praktek/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const firestore = getFirestore(firebaseApp);
      const dokterRef = collection(firestore, "dokter");

      // Create a query to filter only active doctors (status: 1)
      const activeDokterQuery = query(dokterRef, where("status", "==", 1));

      // Get all documents from the filtered query
      const snapshot = await getDocs(activeDokterQuery);
      const dokterList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Process data to get jadwal praktek
      const jadwalPraktek = {
        senin: [],
        selasa: [],
        rabu: [],
        kamis: [],
        jumat: [],
        sabtu: [],
        minggu: [],
      };

      dokterList.forEach((dokter) => {
        // @ts-ignore
        const { nama, spesialisasi, jadwal } = dokter;

        // Iterate over the jadwal object
        Object.keys(jadwal).forEach((hari) => {
          const { jam_mulai, jam_selesai } = jadwal[hari];

          // Only push if both jam_mulai and jam_selesai are defined
          if (jam_mulai && jam_selesai) {
            jadwalPraktek[hari].push({
              dokter: nama,
              spesialisasi,
              jam_mulai,
              jam_selesai,
            });
          }
        });
      });

      res.status(200).json(jadwalPraktek);
    } catch (error) {
      console.error("Error fetching jadwal praktek:", error);
      res.status(500).json({ message: "Failed to fetch jadwal praktek" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
