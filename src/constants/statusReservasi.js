const statusReservasi = [
  {
    value: "Dijadwalkan",
    label: "Dijadwalkan",
    description: "Reservasi telah dijadwalkan dan dikonfirmasi",
    color: "default",
  },
  {
    value: "Menunggu Konfirmasi",
    label: "Menunggu Konfirmasi",
    description: "Reservasi telah dibuat tetapi menunggu konfirmasi dari dokter atau klinik",
    color: "secondary",
  },
  {
    value: "Dibatalkan oleh Pasien",
    label: "Dibatalkan oleh Pasien",
    description: "Pasien membatalkan reservasi",
    color: "danger",
  },
  {
    value: "Dibatalkan oleh Klinik",
    label: "Dibatalkan oleh Klinik",
    description: "Klinik atau dokter membatalkan reservasi",
    color: "error",
  },
  {
    value: "Selesai",
    label: "Selesai",
    description: "Janji temu telah selesai dilaksanakan",
    color: "success",
  },
  {
    value: "Tidak Hadir",
    label: "Tidak Hadir",
    description: "Pasien tidak hadir pada waktu yang dijadwalkan",
    color: "warning",
  },
  {
    value: "Dijadwal Ulang",
    label: "Dijadwal Ulang",
    description: "Reservasi telah dijadwal ulang ke waktu yang berbeda",
    color: "primary",
  },
  {
    value: "Dalam Proses",
    label: "Dalam Proses",
    description: "Janji temu sedang berlangsung",
    color: "primary",
  },
  {
    value: "Ditolak",
    label: "Ditolak",
    description: "Reservasi ditolak oleh dokter atau klinik",
    color: "danger",
  },
  {
    value: "Dihapus",
    label: "Dihapus",
    description: "Reservasi telah dihapus dari sistem",
    color: "warning",
  },
];

export default statusReservasi;

// "primary" | "secondary" | "danger" | "success" | "warning" | "default"'.ts(23
