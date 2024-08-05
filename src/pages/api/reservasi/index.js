// src/pages/api/reservasi/index.js
import firebaseApp from "../../../firebase/config";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, where, query } from "firebase/firestore";
import transporter from "../../../utils/nodemailer";
import XLSX from "xlsx";

export default async function handler(req, res) {
  const { method, body, query: queryParams } = req;
  const firestore = getFirestore(firebaseApp);
  const reservasiRef = collection(firestore, "reservasi");

  if (method === "POST") {
    const { id_pasien, id_dokter, email_pasien } = body;

    try {
      // Validasi id_pasien dan id_dokter
      const pasienDocRef = doc(firestore, "pasien", id_pasien);
      const pasienDoc = await getDoc(pasienDocRef);
      const dokterDocRef = doc(firestore, "dokter", id_dokter);
      const dokterDoc = await getDoc(dokterDocRef);

      if (!pasienDoc.exists()) {
        return res.status(400).json({ message: "Invalid id_pasien" });
      }

      if (!dokterDoc.exists()) {
        return res.status(400).json({ message: "Invalid id_dokter" });
      }

      // Tambahkan dokumen baru ke koleksi "reservasi"
      const docRef = await addDoc(reservasiRef, body);
      const newReservasi = { id: docRef.id, ...body };

      // Kirim email notifikasi
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email_pasien, // Email pasien yang dikirim dalam body request
        subject: "Konfirmasi Reservasi",
        text: `Reservasi Anda telah berhasil. Berikut detailnya:\n\nPasien: ${pasienDoc.data().nama}\nDokter: ${
          dokterDoc.data().nama
        }\nTanggal & Waktu: ${new Date(body.tanggal_waktu).toLocaleString()}\n\nTerima kasih telah menggunakan layanan kami.`,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json(newReservasi);
    } catch (error) {
      console.error("Error adding reservasi:", error);
      res.status(500).json({ message: "Failed to add reservasi" });
    }
  } else if (method === "GET") {
    try {
      let reservasiQuery = reservasiRef;

      // Check for query params pasien and filter by uid_pasien
      if (req.query.pasien) {
        reservasiQuery = query(reservasiRef, where("id_pasien", "==", req.query.pasien));
      }

      // Check for query params dokter and filter by uid_dokter
      if (req.query.dokter) {
        reservasiQuery = query(reservasiRef, where("id_dokter", "==", req.query.dokter));
      }

      const snapshot = await getDocs(reservasiQuery);
      const reservasiList = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const reservasiData = { id: docSnapshot.id, ...docSnapshot.data() };

          // Get detail pasien
          const pasienDocRef = doc(firestore, "pasien", reservasiData?.id_pasien);
          const pasienDoc = await getDoc(pasienDocRef);
          if (pasienDoc.exists()) {
            reservasiData.pasien = pasienDoc.data();
          } else {
            reservasiData.pasien = null;
          }

          // Get detail dokter
          const dokterDocRef = doc(firestore, "dokter", reservasiData.id_dokter);
          const dokterDoc = await getDoc(dokterDocRef);
          if (dokterDoc.exists()) {
            reservasiData.dokter = dokterDoc.data();
          } else {
            reservasiData.dokter = null;
          }

          return reservasiData;
        })
      );

      const { exportToExcel } = queryParams;

      if (exportToExcel === "true") {
        // Process data to include relevant details
        const reservasiData = reservasiList.map((reservasi) => {
          return {
            id: reservasi.id,
            nama_pasien: reservasi?.pasien?.nama || "",
            keluhan: reservasi?.keluhan || "",
            nama_dokter: reservasi?.dokter?.nama || "",
            spesialisasi: reservasi?.dokter?.spesialisasi || "",
            waktu_reservasi: reservasi?.waktu_reservasi,
            status: reservasi?.status,
          };
        });

        // Convert data to Excel format
        const ws = XLSX.utils.json_to_sheet(reservasiData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reservasi");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

        // Set headers for file download
        res.setHeader("Content-Disposition", "attachment; filename=reservasi.xlsx");
        res.setHeader("Content-Type", "application/octet-stream");
        res.status(200).send(excelBuffer);
      } else {
        res.status(200).json(reservasiList);
      }
    } catch (error) {
      console.error("Error fetching reservasi list:", error);
      res.status(500).json({ message: "Failed to fetch reservasi list" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
