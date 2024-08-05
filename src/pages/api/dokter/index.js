// src/pages/api/dokter/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import transporter from "../../../utils/nodemailer";
import XLSX from "xlsx";

export default async function handler(req, res) {
  const { method, query: queryParams, body } = req;

  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const dokterRef = collection(firestore, "dokter");

  if (method === "POST") {
    try {
      const { email, password, ...otherData } = body;

      // Create a new user in Firebase Authentication
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create a new user document in "dokter" collection with the UID as the document ID
        const newBody = { ...otherData, uid: user.uid, email: user.email };
        const docRef = doc(dokterRef, user.uid); // Create a reference with the UID as the document ID

        await setDoc(docRef, newBody); // Set the document with the newBody data

        const newDokter = { id: user.uid, ...newBody };

        // send email notifikasi
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email, // Email dokter
          subject: "Akun Dokter Berhasil Dibuat",
          text: `Akun Anda telah berhasil dibuat.\n\nNama: ${body.nama}\nEmail: ${email}\n\nAnda dapat login ke sistem dengan email dan password yang telah didaftarkan.\n\nTerima kasih.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json(newDokter);
      } catch (authError) {
        if (authError.code === "auth/email-already-in-use") {
          res.status(400).json({ message: "Email already in use" });
        } else {
          throw authError;
        }
      }
    } catch (error) {
      console.error("Error adding dokter:", error);
      res.status(500).json({ message: "Failed to add dokter", error: error.message });
    }
  } else if (method === "GET") {
    try {
      const firestore = getFirestore(firebaseApp);
      const dokterRef = collection(firestore, "dokter");

      // Ambil semua dokumen dari koleksi "dokter"
      const snapshot = await getDocs(dokterRef);
      const dokterList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const { exportToExcel } = queryParams;

      if (exportToExcel === "true") {
        // Process data to include jadwal
        const dokterData = dokterList.map((dokter) => {
          const jadwalEntries = Object.entries(dokter.jadwal || {}).reduce((acc, [day, times]) => {
            acc[`${day}_mulai`] = times.jam_mulai;
            acc[`${day}_selesai`] = times.jam_selesai;
            return acc;
          }, {});
          return { ...dokter, ...jadwalEntries };
        });

        // Convert data to Excel format
        const ws = XLSX.utils.json_to_sheet(dokterData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Dokter");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

        // Set headers for file download
        res.setHeader("Content-Disposition", "attachment; filename=dokter.xlsx");
        res.setHeader("Content-Type", "application/octet-stream");
        res.status(200).send(excelBuffer);
      } else {
        res.status(200).json(dokterList);
      }
    } catch (error) {
      console.error("Error fetching dokter list:", error);
      res.status(500).json({ message: "Failed to fetch dokter list" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
