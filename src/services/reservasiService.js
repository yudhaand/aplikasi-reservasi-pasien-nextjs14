const API_URL = "/api/reservasi";

export const fetchReservasi = async ({ pasien = "", dokter = "" }) => {
  const response = await fetch(`${API_URL}?pasien=${pasien}&dokter=${dokter}`);
  if (!response.ok) throw new Error("Failed to fetch reservasi");
  return response.json();
};

export const fetchReservasiById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch reservasi by id");
  return response.json();
};

export const createReservasi = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create reservasi");
  return response.json();
};

export const updateReservasi = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update reservasi");
  return response.json();
};

export const deleteReservasi = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete reservasi");
  return response.json();
};

export const exportToExcelReservasi = async () => {
  const response = await fetch(`${API_URL}?exportToExcel=true`);
  if (!response.ok) throw new Error("Failed to export reservasi to Excel");
  // Convert response to blob
  const blob = await response.blob();
  // Create blob link to download
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "reservasi.xlsx");
  // Append to html link element page
  document.body.appendChild(link);
  // Start download
  link.click();
  // Clean up and remove the link
  link.parentNode.removeChild(link);
  return;
};
