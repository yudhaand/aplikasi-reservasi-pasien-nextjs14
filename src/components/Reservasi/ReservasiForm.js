import React, { useEffect, useState } from "react";
import { fetchPasienBySearch } from "../../services/pasienService";
import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react";
import { fetchDokter } from "@/services/dokterService";
import { getDayName, isDoctorAvailable } from "@/utils/doctors";
import { createReservasi, fetchReservasiById, updateReservasi } from "@/services/reservasiService";
import statusReservasi from "@/constants/statusReservasi";

export default function ReservasiForm({ onClose, onSuccess, id }) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [pasiens, setPasiens] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [form, setForm] = useState({
    id_pasien: "",
    id_dokter: "",
    email_pasien: "",
    keluhan: "",
    waktu_reservasi: "",
    status: "Dijadwalkan",
  });
  const [search, setSearch] = useState({
    pasien: "",
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const [form, dokter] = await Promise.all([id ? fetchReservasiById(id) : Promise.resolve(null), fetchDokter()]);
          form && setForm(form);
          setDoctors(dokter);
          const selectedDate = new Date(form.waktu_reservasi);
          const selectedDay = getDayName(selectedDate);
          const selectedTime = form.waktu_reservasi.split("T")[1].substring(0, 5); // Get HH:mm format

          const filteredDoctors = dokter.filter((doctor) => isDoctorAvailable(doctor, selectedDay, selectedTime));

          setForm({ ...form, waktu_reservasi: form.waktu_reservasi });
          setAvailableDoctors(filteredDoctors);
        } catch (error) {
          console.error("Error fetching pasien:", error);
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const [form, dokter] = await Promise.all([id ? fetchReservasiById(id) : Promise.resolve(null), fetchDokter()]);
          form && setForm(form);
          setDoctors(dokter);
        } catch (error) {
          console.error("Error fetching pasien:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    setLoadingButton(true);
    if (id) {
      e.preventDefault();
      try {
        await updateReservasi(id, form);
        onClose();
        onSuccess(true);
      } catch (error) {
        console.error("Error updating reservation:", error);
        onSuccess(false);
      } finally {
        setLoadingButton(false);
      }
    } else {
      e.preventDefault();
      try {
        await createReservasi(form);
        onClose();
        onSuccess(true);
      } catch (error) {
        console.error("Error creating reservation:", error);
        onSuccess(false);
      } finally {
        setLoadingButton(false);
      }
    }
  };

  useEffect(() => {
    const fetchPasiens = async () => {
      try {
        const data = await fetchPasienBySearch(search.pasien);
        setPasiens(data);
      } catch (error) {
        console.error("Error fetching pasien:", error);
      }
    };
    fetchPasiens();
  }, [search.pasien]);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const selectedDay = getDayName(selectedDate);
    const selectedTime = e.target.value.split("T")[1].substring(0, 5); // Get HH:mm format

    const filteredDoctors = doctors.filter((doctor) => isDoctorAvailable(doctor, selectedDay, selectedTime));

    setForm({ ...form, waktu_reservasi: e.target.value });
    setAvailableDoctors(filteredDoctors);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
        <Autocomplete
          value={form?.id_pasien}
          defaultItems={pasiens}
          label="Pasien"
          placeholder="Cari pasien"
          selectedKey={form?.id_pasien}
          onInputChange={(e) => setSearch({ ...search, pasien: e })}
          // @ts-ignore
          onSelectionChange={(e) => {
            // @ts-ignore
            setForm({
              ...form,
              id_pasien: pasiens.find((pasien) => pasien.id === e)?.uid,
              email_pasien: pasiens.find((pasien) => pasien.id === e)?.email,
            });
          }}
        >
          {(pasiens) => <AutocompleteItem key={pasiens?.uid}>{pasiens?.nama}</AutocompleteItem>}
        </Autocomplete>
        <Input value={form?.keluhan} onChange={(e) => setForm({ ...form, keluhan: e.target.value })} label="Keluhan" />
        <Input
          value={form?.waktu_reservasi}
          onChange={(e) => handleDateChange(e)}
          label="Tanggal Reservasi"
          type="datetime-local"
        />
        <Autocomplete
          value={form?.id_dokter}
          defaultItems={availableDoctors}
          label="Dokter"
          placeholder="Dokter yang Tersedia"
          selectedKey={form?.id_dokter}
          // @ts-ignore
          onSelectionChange={(e) => setForm({ ...form, id_dokter: e })}
        >
          {(item) => <AutocompleteItem key={item?.id}>{item?.nama}</AutocompleteItem>}
        </Autocomplete>
        {form?.id_dokter && (
          <Input
            isDisabled
            value={availableDoctors.find((doctor) => doctor.id === form?.id_dokter)?.spesialisasi}
            label="Spesialis"
          />
        )}

        <Autocomplete
          value={form?.status}
          defaultItems={statusReservasi}
          label="Status"
          placeholder="Status Reservasi"
          selectedKey={form?.status}
          // @ts-ignore
          onSelectionChange={(e) => setForm({ ...form, status: e })}
        >
          {(item) => <AutocompleteItem key={item?.value}>{item?.label}</AutocompleteItem>}
        </Autocomplete>
        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(availableDoctors, null, 2)}</pre> */}
        <div className="flex justify-end gap-2">
          <Button color="danger" variant="light" type="submit" isLoading={loadingButton}>
            {id ? "Update" : "Simpan"} Reservasi
          </Button>
          <Button color="primary" onPress={onClose}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
