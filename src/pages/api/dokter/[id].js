// src/pages/api/dokter/[id].js
import firebaseApp from "../../../firebase/config";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  const firestore = getFirestore(firebaseApp);
  const dokterDoc = doc(firestore, "dokter", id);

  switch (method) {
    case "GET":
      try {
        const dokterSnap = await getDoc(dokterDoc);
        if (dokterSnap.exists()) {
          const dokterData = { id: dokterSnap.id, ...dokterSnap.data() };
          res.status(200).json(dokterData);
        } else {
          res.status(404).json({ message: "Dokter not found" });
        }
      } catch (error) {
        console.error("Error fetching dokter:", error);
        res.status(500).json({ message: "Failed to fetch dokter" });
      }
      break;

    case "PUT":
      try {
        await updateDoc(dokterDoc, body);
        const updatedDokter = { id, ...body };
        res.status(200).json(updatedDokter);
      } catch (error) {
        console.error("Error updating dokter:", error);
        res.status(500).json({ message: "Failed to update dokter" });
      }
      break;

    case "DELETE":
      try {
        await deleteDoc(dokterDoc);
        res.status(200).json({ message: "Dokter deleted successfully" });
      } catch (error) {
        console.error("Error deleting dokter:", error);
        res.status(500).json({ message: "Failed to delete dokter" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
