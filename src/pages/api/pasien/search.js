// src/pages/api/pasien/search.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, query: queryParams } = req;
  const { name } = queryParams;

  const firestore = getFirestore(firebaseApp);
  const pasienCollection = collection(firestore, "pasien");

  switch (method) {
    case "GET":
      if (!name) {
        res.status(400).json({ message: "Name query parameter is required" });
        return;
      }

      try {
        // Create a query to search patients by name
        const q = query(pasienCollection, where("name", ">=", name), where("name", "<=", name + "\uf8ff"));
        const querySnapshot = await getDocs(q);

        const patients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(patients);
      } catch (error) {
        console.error("Error searching patients:", error);
        res.status(500).json({ message: "Failed to search patients" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
