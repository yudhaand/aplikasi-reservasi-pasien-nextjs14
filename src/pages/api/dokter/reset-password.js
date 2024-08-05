// pages/api/auth/reset-password.js
import firebaseApp from "../../../firebase/config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    const { email } = body;

    try {
      const auth = getAuth(firebaseApp);
      await sendPasswordResetEmail(auth, email);

      res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      res.status(500).json({ message: "Failed to send password reset email" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
