"use client";
import React, { useState, useEffect } from "react";
import { fetchReservasi } from "@/services/reservasiService";
import { H4 } from "@/components/Font";
import PasienCells from "./PasienCels";

export default function PasienReservasi({ dokter }) {
  const [reservations, serReservations] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservasi({ dokter: dokter?.id || "" });
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
      <PasienCells users={reservations} columns={columns} onUpdate={() => setOnUpdate(!onUpdate)} />
    </div>
  );
}
