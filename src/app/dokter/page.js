"use client";
import { useContext, useEffect, useState } from "react";
import JadwalPraktek from "../../components/JadwalPraktek/JadwalPraktek";
import { H5, P } from "@/components/Font";
import LoginPasien from "@/components/Pasien/LoginPasien";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import PasienReservasi from "./components/Pasien";
import LoginDokter from "./components/LoginDokter";
import MainModal from "@/components/MainModal";

export default function DokterPage() {
  const [clickMenu, setClickMenu] = useState("Pasien");
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = ["Pasien"];
  const { user } = useContext(AuthContext);
  const navigation = useRouter();

  useEffect(() => {
    const menu = localStorage.getItem("menu") || "Pasien";
    setClickMenu(menu);
  }, []);

  useEffect(() => {
    if (user) {
      setClickMenu("Pasien");
    }
  }, [user]);

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
            <P>{user?.email}</P>
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
            Menu
          </button>
        </div>
      </main>
      {user === null ? (
        <LoginDokter />
      ) : (
        <>
          {user?.login !== "dokter" ? (
            <MainModal
              size="md"
              onOpen={true}
              onClose={() => navigation.push("/")}
              onTrue={() => navigation.push("/logout")}
              title={"Unauthorized!"}
              content={"Anda bukan dokter. Silahkan logout lalu login sebagai dokter."}
              showFooter={true}
              textTrue="Logout"
              textFalse="Kembali"
            />
          ) : (
            <>{user === null ? null : <> {clickMenu === "Pasien" ? <PasienReservasi dokter={user} /> : null}</>}</>
          )}
        </>
      )}
    </div>
  );
}
