"use client";
import { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import Reservasi from "../../components/Reservasi/Reservasi";
import Pasien from "../../components/Pasien/Pasien";
import Dokter from "../../components/Dokter/Dokter";
import JadwalPraktek from "../../components/JadwalPraktek/JadwalPraktek";
import { H5, P } from "@/components/Font";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import LoginAdmin from "./components/LoginAdmin";
import { AuthContext } from "@/context/AuthContext";
import MainModal from "@/components/MainModal";

export default function AdminPage() {
  const [clickMenu, setClickMenu] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = ["Dashboard", "Reservasi", "Pasien", "Dokter", "Jadwal Praktek"];
  const navigation = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const menu = localStorage.getItem("menu") || "Dashboard";
    setClickMenu(menu);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <nav
        className={`fixed inset-0 bg-gray-800 text-white p-4 z-50 transform flex flex-col justify-between ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:flex-shrink-0`}
      >
        <div>
          <div className="mb-4">
            <H5>Selamat Datang</H5>
            <P>Admin</P>
          </div>
          <ul>
            {menu.map((item, index) => (
              <li
                key={index}
                className={`mb-2 ${clickMenu === item ? "bg-gray-700" : "hover:bg-gray-700"} p-2 cursor-pointer rounded`}
                onClick={() => {
                  setClickMenu(item);
                  localStorage.setItem("menu", item);
                  setMenuOpen(false); // Close the menu after selecting an item
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Button variant="solid" color="primary" size="sm" onClick={() => navigation.push("/")}>
            Beranda
          </Button>
          <Button variant="solid" color="warning" size="sm" onClick={() => navigation.push("/logout")}>
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-0">
        {/* Burger Menu Button */}
        <div className="md:hidden p-4">
          <button className="text-black flex gap-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </main>
      {user === null ? (
        <LoginAdmin />
      ) : (
        <>
          {user?.login !== "admin" ? (
            <MainModal
              size="md"
              onOpen={true}
              onClose={() => navigation.push("/")}
              onTrue={() => navigation.push("/logout")}
              title={"Unauthorized!"}
              content={"Anda bukan admin. Silahkan logout lalu login sebagai admin."}
              showFooter={true}
              textTrue="Logout"
              textFalse="Kembali"
            />
          ) : (
            <>
              {user === null ? null : (
                <>
                  {clickMenu === "Dashboard" ? <Dashboard /> : null}
                  {clickMenu === "Reservasi" ? <Reservasi /> : null}
                  {clickMenu === "Pasien" ? <Pasien /> : null}
                  {clickMenu === "Dokter" ? <Dokter /> : null}
                  {clickMenu === "Jadwal Praktek" ? <JadwalPraktek /> : null}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
