// src/app/page.js
"use client";

import FooterHero from "@/components/UI/footer-hero";
import HeadHero from "@/components/UI/head-hero";
import JadwalPraktekGrid from "@/components/UI/jadwal-praktek-grid";
import { StickyScroll } from "@/components/UI/sticky-scroll-reveal";
import { content } from "@/constants/contents";
import { fetchJadwalPraktek } from "@/services/jadwalPraktekService";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJadwalPraktek();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching pasiens:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeadHero />
      <StickyScroll content={content} />
      <JadwalPraktekGrid jadwal={users} />
      <FooterHero />
    </div>
  );
}
