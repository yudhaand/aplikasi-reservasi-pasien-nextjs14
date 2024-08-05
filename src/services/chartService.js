const API_URL = "/api/chart";

export const fetchPasienBerdasarkanUsia = async () => {
  const response = await fetch(`${API_URL}/distribusi-pasien-berdasarkan-usia`);
  if (!response.ok) throw new Error("Failed to fetch pasien berdasarkan usia");
  return response.json();
};

export const fetchPasienBerdasarkanJumlah = async () => {
  const response = await fetch(`${API_URL}/jumlah-pasien`);
  if (!response.ok) throw new Error("Failed to fetch pasien berdasarkan jumlah");
  return response.json();
};

export const fetchReservasiBerdasarkanBulan = async () => {
  const response = await fetch(`${API_URL}/reservasi`);
  if (!response.ok) throw new Error("Failed to fetch reservasi berdasarkan bulan");
  return response.json();
};
