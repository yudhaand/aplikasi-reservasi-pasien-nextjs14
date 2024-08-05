import React from "react";
import DokterPieChart from "./Dashboard/DokterPieChart";
import PasienAgeChart from "./Dashboard/PasienAgeChart";
import PasienChart from "./Dashboard/PasienChart";
import ReservasiChart from "./Dashboard/ReservasiChart";
import { H4 } from "./Font";
import { fetchDokter } from "@/services/dokterService";
import {
  fetchPasienBerdasarkanJumlah,
  fetchPasienBerdasarkanUsia,
  fetchReservasiBerdasarkanBulan,
} from "@/services/chartService";
import { Spinner } from "@nextui-org/react";

export default function Dashboard() {
  const [dokters, setDokters] = React.useState([]);
  const [pasiensUsia, setPasiensUsia] = React.useState();
  const [jumlahPasien, setJumlahPasien] = React.useState();
  const [reservasi, setReservasi] = React.useState();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [dokterData, pasienUsiaData, pasienData, reservasiData] = await Promise.all([
          fetchDokter(),
          fetchPasienBerdasarkanUsia(),
          fetchPasienBerdasarkanJumlah(),
          fetchReservasiBerdasarkanBulan(),
        ]);
        setDokters(dokterData);
        setPasiensUsia(pasienUsiaData);
        setJumlahPasien(pasienData);
        setReservasi(reservasiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4 overflow-y-auto h-screen gap-4">
      <H4>Dashboard</H4>
      <div className="w-full flex flex-col md:flex-row gap-4 md:justify-around">
        {dokters.length > 0 ? <DokterPieChart dokters={dokters} /> : <Spinner size="xl" label="Loading Data Dokter..." />}
        {pasiensUsia ? (
          <PasienAgeChart pasiensUsia={pasiensUsia} />
        ) : (
          <Spinner size="xl" label="Loading Pasien Berdasarkan Usia..." />
        )}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 md:justify-around">
        {jumlahPasien ? <PasienChart jumlahPasien={jumlahPasien} /> : <Spinner size="xl" label="Loading Jumlah Pasien..." />}
        {reservasi ? <ReservasiChart reservasi={reservasi} /> : <Spinner size="xl" label="Loading Reservasi..." />}
      </div>
    </div>
  );
}
