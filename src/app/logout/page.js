"use client";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);
  return (
    <div className="flex p-4 justify-center items-center h-screen">
      <h1>Anda telah logout</h1>
    </div>
  );
}
