const { default: Image } = require("next/image");

const content = [
  {
    title: "Registrasi Pasien",
    description:
      "Daftarkan pasien baru dengan proses registrasi yang intuitif. Dapatkan detail penting dan optimalkan pengalaman onboarding pasien.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://i.imgflip.com/8asa6.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="224ha8"
        />
      </div>
    ),
  },
  {
    title: "Penjadwalan Janji Temu",
    description:
      "Jadwalkan janji temu dengan mudah untuk pasien. Kelola ketersediaan, lihat janji temu yang akan datang, dan kirim pengingat untuk menjaga operasional klinik lancar.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://i.imgflip.com/224ha8.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="8asa6"
        />
      </div>
    ),
  },
  {
    title: "Manajemen Rekam Medis",
    description:
      "Kelola rekam medis pasien dengan efisien. Simpan dan akses riwayat medis, hasil tes, dan rencana pengobatan secara aman untuk memberikan perawatan optimal.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://i.imgflip.com/60170r.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="60170r"
        />
      </div>
    ),
  },
  {
    title: "Manajemen Data Klinik",
    description:
      "Pantau seluruh operasional klinik dengan mudah melalui dashboard terpusat. Dapatkan informasi terkini tentang jumlah pasien, janji temu, dan status pembayaran dalam satu tampilan. Serta Kelola informasi dokter dengan detail. Simpan data spesialisasi, jadwal praktek, dan kontak dokter untuk memastikan pasien mendapatkan perawatan yang tepat",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Manajemen Data Klinik
      </div>
    ),
  },
];

export { content };
