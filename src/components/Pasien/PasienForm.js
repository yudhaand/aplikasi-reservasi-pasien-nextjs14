import React, { useEffect, useState } from "react";
import { createPasien, fetchPasienById, updatePasien } from "../../services/pasienService";
import { Button, Input } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function PasienForm({ onClose, onSuccess, id }) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    tanggal_lahir: "",
    alamat: "",
    nomor_kontak: "",
    email: "",
    password: "",
    created_at: new Date(),
    updated_at: id ? new Date() : null,
    riwayat_medis: {
      diagnosis_terakhir: "",
      riwayat_alergi: [],
    },
  });

  useEffect(() => {
    if (id) {
      const fetchPasien = async () => {
        try {
          const data = await fetchPasienById(id);
          setForm(data);
        } catch (error) {
          console.error("Error fetching pasien:", error);
        }
      };
      fetchPasien();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoadingButton(true);
    if (id) {
      e.preventDefault();
      try {
        await updatePasien(id, form);
        onClose();
        onSuccess(true);
      } catch (error) {
        console.error("Error updating pasien:", error);
        onSuccess(false);
      } finally {
        setLoadingButton(false);
      }
    } else {
      e.preventDefault();
      try {
        await createPasien(form);
        onClose();
        onSuccess(true);
      } catch (error) {
        console.error("Error creating pasien:", error);
        onSuccess(false);
      } finally {
        setLoadingButton(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
        <Input name="nama" label="Nama" type="text" value={form?.nama} onChange={handleChange} />

        <Input
          name="tanggal_lahir"
          label="Tanggal Lahir"
          placeholder="isi tanggal lahir"
          type="date"
          value={form.tanggal_lahir}
          onChange={handleChange}
        />

        <Input name="alamat" label="Alamat" type="text" value={form?.alamat} onChange={handleChange} />
        <Input name="email" label="Email" type="text" value={form?.email} onChange={handleChange} />
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="bordered"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form?.password}
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <Input
          name="nomor_telepon"
          label="Nomor Telepon"
          placeholder="08..."
          type="text"
          value={form?.nomor_telepon}
          onChange={handleChange}
        />

        <Input
          name="diagnosis_terakhir"
          label="Diagnosis Terakhir"
          type="text"
          value={form?.diagnosis_terakhir}
          onChange={handleChange}
        />

        <Input name="riwayat_alergi" label="Riwayat Alergi" type="text" value={form?.riwayat_alergi} onChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button color="danger" variant="light" type="submit" isLoading={loadingButton}>
            {id ? "Update" : "Simpan"} Pasien
          </Button>
          <Button color="primary" onPress={onClose}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
