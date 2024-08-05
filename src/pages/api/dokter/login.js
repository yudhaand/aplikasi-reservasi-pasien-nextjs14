// src/pages/api/dokter/login.js
import firebaseApp from "../../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    const { email, password } = body;

    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get document from 'dokter' collection based on user's UID
      const dokterRef = doc(firestore, "dokter", user.uid);
      const docSnap = await getDoc(dokterRef);

      if (docSnap.exists()) {
        const dokterData = docSnap.data();
        res.status(200).json({ uid: user.uid, email: user.email, login: "dokter", ...dokterData });
      } else {
        res.status(404).json({ message: "Dokter document not found" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
