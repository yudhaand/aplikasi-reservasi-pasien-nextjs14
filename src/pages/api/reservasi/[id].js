// src/pages/api/reservasi/[id].js
import firebaseApp from "../../../firebase/config";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  const firestore = getFirestore(firebaseApp);
  const reservasiDoc = doc(firestore, "reservasi", id);

  switch (method) {
    case "GET":
      try {
        const reservasiSnap = await getDoc(reservasiDoc);
        if (reservasiSnap.exists()) {
          const reservasiData = { id: reservasiSnap.id, ...reservasiSnap.data() };
          res.status(200).json(reservasiData);
        } else {
          res.status(404).json({ message: "Reservasi not found" });
        }
      } catch (error) {
        console.error("Error fetching reservasi:", error);
        res.status(500).json({ message: "Failed to fetch reservasi" });
      }
      break;

    case "PUT":
      try {
        const { id_pasien, id_dokter } = body;

        // Validasi id_pasien dan id_dokter
        const pasienDoc = await getDoc(doc(firestore, "pasien", id_pasien));
        const dokterDoc = await getDoc(doc(firestore, "dokter", id_dokter));

        if (!pasienDoc.exists()) {
          return res.status(400).json({ message: "Invalid id_pasien" });
        }

        if (!dokterDoc.exists()) {
          return res.status(400).json({ message: "Invalid id_dokter" });
        }

        await updateDoc(reservasiDoc, body);
        const updatedReservasi = { id, ...body };
        res.status(200).json(updatedReservasi);
      } catch (error) {
        console.error("Error updating reservasi:", error);
        res.status(500).json({ message: "Failed to update reservasi" });
      }
      break;

    case "DELETE":
      try {
        await deleteDoc(reservasiDoc);
        res.status(204).end();
      } catch (error) {
        console.error("Error deleting reservasi:", error);
        res.status(500).json({ message: "Failed to delete reservasi" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
