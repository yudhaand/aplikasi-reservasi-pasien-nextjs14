import React, { useState, useEffect } from "react";
import { fetchPasien } from "../../services/pasienService";
import PasienCells from "./PasienCells";
import { H4 } from "../Font";

export default function Pasien() {
  const [users, setUsers] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  useEffect(() => {
    const loadPasiens = async () => {
      try {
        const data = await fetchPasien();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching pasiens:", error);
      }
    };
    loadPasiens();
  }, [onUpdate]);

  const columns = [
    { name: "NAMA", uid: "name" },
    { name: "KONTAK", uid: "contact" },
    { name: "DIAGNOSA TERAKHIR", uid: "last_diagnosis" },
    { name: "AKSI", uid: "actions" },
  ];

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen">
      <H4>Daftar Pasien</H4>
      <PasienCells columns={columns} users={users} onUpdate={() => setOnUpdate(!onUpdate)} />
    </div>
  );
}
