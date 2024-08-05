import React, { useState, useEffect } from "react";
import { fetchReservasi } from "@/services/reservasiService";
import ReservasiCells from "./ReservasiCells";
import { H4 } from "../Font";

export default function Reservasi() {
  const [reservations, serReservations] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservasi({ pasien: "", dokter: "" });
        serReservations(data);
      } catch (error) {
        console.error("Error fetching reservasi:", error);
      }
    };
    fetchData();
  }, [onUpdate]);

  const columns = [
    { name: "PASIEN", uid: "pasien" },
    { name: "KELUHAN", uid: "keluhan" },
    { name: "TANGGAL RESERVASI", uid: "tanggal" },
    { name: "DOKTER", uid: "dokter" },
    { name: "STATUS", uid: "status" },
    { name: "AKSI", uid: "actions" },
  ];

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen">
      <H4>Reservasi</H4>
      <ReservasiCells users={reservations} columns={columns} onUpdate={() => setOnUpdate(!onUpdate)} />
    </div>
  );
}
