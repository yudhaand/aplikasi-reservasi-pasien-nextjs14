const API_URL = "/api/dokter";

export const fetchDokter = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch dokter");
  return response.json();
};

export const fetchDokterById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch dokter by id");
  return response.json();
};

export const createDokter = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create dokter");
  return response.json();
};

export const updateDokter = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update dokter");
  return response.json();
};

export const deleteDokter = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete dokter");
  return response.json();
};

export const exportToExcelDokters = async () => {
  const response = await fetch(`${API_URL}?exportToExcel=true`);
  if (!response.ok) throw new Error("Failed to export doctors to Excel");
  // Convert response to blob
  const blob = await response.blob();
  // Create blob link to download
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "dokter.xlsx");
  // Append to html link element page
  document.body.appendChild(link);
  // Start download
  link.click();
  // Clean up and remove the link
  link.parentNode.removeChild(link);
  return;
};

export const loginDokterWithEmailAndPassword = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Failed to login dokter");
  return response.json();
};

export const resetPasswordDokter = async ({ email }) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error("Failed to reset password dokter");
  return response.json();
};
