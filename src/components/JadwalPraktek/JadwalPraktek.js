import React, { useState, useEffect } from "react";
import { fetchJadwalPraktek } from "../../services/jadwalPraktekService";
import JadwalPraktekCells from "./JadwalPraktekCells";
import { H4, H5 } from "../Font";

export default function JadwalPraktek() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJadwalPraktek();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching pasiens:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen scrollbar-hide">
      <H4>Jadwal Praktek</H4>
      <JadwalPraktekCells jadwal={users} />
      <H5 className="my-4 text-center">Jadwal Praktek Menyesuaikan Jadwal Dokter</H5>
    </div>
  );
}
