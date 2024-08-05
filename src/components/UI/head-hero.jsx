import { Button } from "@nextui-org/react";
import { P } from "../Font";
import { useRouter } from "next/navigation";

export default function HeadHero() {
  const router = useRouter();
  return (
    <div className="w-full h-[30rem] flex justify-center items-center flex-col gap-6">
      <h1 className="text-center w-full md:w-2/3 text-2xl md:text-5xl font-extrabold px-4 leading-8">
        Selamat Datang di Aplikasi Reservasi Pasien
      </h1>
      <P className="text-center w-full md:w-2/3 px-12">
        Akses mudah untuk merencanakan perawatan kesehatan Anda. Temukan dokter, buat janji, dan kelola reservasi dengan nyaman
        dimana saja dan kapan saja.
      </P>
      <Button color="primary" onClick={() => router.push("/reservasi")}>
        Reservasi Sekarang
      </Button>
    </div>
  );
}
