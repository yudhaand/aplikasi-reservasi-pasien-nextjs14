"use client";
import React, { useState, useEffect } from "react";
import { fetchReservasi } from "@/services/reservasiService";
import { H4 } from "../Font";
import PasienReservasiCells from "./PasienReservasiCells";

export default function PasienReservasi({ user }) {
  const [reservations, serReservations] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservasi({ pasien: user?.id });
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
  ];

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen">
      <H4>Reservasi</H4>
      <PasienReservasiCells users={reservations} columns={columns} onUpdate={() => setOnUpdate(!onUpdate)} />
    </div>
  );
}
