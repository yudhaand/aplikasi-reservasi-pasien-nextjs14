const getDayName = (date) => {
  const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
  return days[date.getDay()];
};

const isDoctorAvailable = (doctor, day, time) => {
  const schedule = doctor.jadwal[day];
  if (!schedule) return false;

  const startTime = schedule.jam_mulai;
  const endTime = schedule.jam_selesai;

  if (!startTime || !endTime) return false;

  return time >= startTime && time <= endTime;
};

export { getDayName, isDoctorAvailable };
