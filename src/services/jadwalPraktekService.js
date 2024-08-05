const API_URL = "/api/jadwal-praktek";

export const fetchJadwalPraktek = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch jadwal praktek");
  return response.json();
};
