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

      const usersRef = collection(firestore, "pasien");
      const querySnapshot = await getDoc(doc(usersRef, user.uid));
      if (querySnapshot.exists()) {
        const userData = querySnapshot.data();
        res.status(200).json({ uid: user.uid, email: user.email, id: querySnapshot.id, login: "pasien", ...userData });
      } else {
        res.status(404).json({ message: "User document not found" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
