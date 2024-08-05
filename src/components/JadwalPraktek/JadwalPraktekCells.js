import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";

export default function JadwalPraktekCells({ jadwal }) {
  const jadwalPraktek = Object.keys(jadwal).map((hari) => ({
    hari,
    data: jadwal[hari],
  }));

  const renderCardContent = (dokter) => {
    return (
      <CardBody key={`${dokter.dokter}-${dokter.spesialisasi}`}>
        <p>
          <strong>{dokter.dokter}</strong>
        </p>
        <p className="text-sm">Spesialisasi: {dokter.spesialisasi}</p>
        <div className="flex gap-1">
          <p className="text-sm">waktu:</p>
          {dokter.jam_mulai && <p className="text-sm">{dokter.jam_mulai}</p>}
          <p className="text-sm">-</p>
          {dokter.jam_selesai && <p className="text-sm">{dokter.jam_selesai}</p>}
        </div>
      </CardBody>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {jadwalPraktek.map((item) => (
        <div key={item.hari} className="w-full flex flex-col gap-4 justify-center">
          <div className="w-full mt-4">
            <Chip color="default" variant="bordered">
              {item.hari.charAt(0).toUpperCase() + item.hari.slice(1)}
            </Chip>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {item?.data?.length > 0 ? (
              <>
                {item.data.map((dokter) => (
                  <Card key={`${item.hari}-${dokter.dokter}`}>{renderCardContent(dokter)}</Card>
                ))}
              </>
            ) : (
              <p className="text-small tracking-tight text-default-400">Tidak ada jadwal parktek di hari {item.hari}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
