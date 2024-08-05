// src/pages/api/pasien/[id].js
import firebaseApp from "../../../firebase/config";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  const firestore = getFirestore(firebaseApp);
  const pasienDoc = doc(firestore, "pasien", id);

  switch (method) {
    case "GET":
      try {
        const pasienSnap = await getDoc(pasienDoc);
        if (pasienSnap.exists()) {
          const pasienData = { id: pasienSnap.id, ...pasienSnap.data() };
          res.status(200).json(pasienData);
        } else {
          res.status(404).json({ message: "Pasien not found" });
        }
      } catch (error) {
        console.error("Error fetching pasien:", error);
        res.status(500).json({ message: "Failed to fetch pasien" });
      }
      break;

    case "PUT":
      try {
        await updateDoc(pasienDoc, body);
        const updatedPasien = { id, ...body };
        res.status(200).json(updatedPasien);
      } catch (error) {
        console.error("Error updating pasien:", error);
        res.status(500).json({ message: "Failed to update pasien" });
      }
      break;

    case "DELETE":
      try {
        await deleteDoc(pasienDoc);
        res.status(200).json({ message: "Pasien deleted successfully" });
      } catch (error) {
        console.error("Error deleting pasien:", error);
        res.status(500).json({ message: "Failed to delete pasien" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
