export default function FooterHero() {
  return (
    <footer className="border-t-2 border-gray-200 mt-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex justify-center md:items-center md:justify-between">
        <p className="text-sm text-center">
          © {new Date().getFullYear()}{" "}
          <a href="https://patient-reservation-with-next-js-and-firebase.vercel.app/" className="hover:underline">
            Reservasi Pasien™
          </a>
          . Hak Cipta Dilindungi.
        </p>
        <ul className="flex flex-wrap justify-center items-center mt-3 text-sm  text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Reservasi
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
