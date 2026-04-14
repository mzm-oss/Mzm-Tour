import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="text-white pt-14 pb-8"
      style={{ backgroundColor: "#014E4E" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Grid: 4 kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="flex flex-col">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="MZM Tour"
                width={110}
                height={55}
                className="object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-6">
              Penyelenggara resmi perjalanan ibadah Umroh dan Haji yang
              mengutamakan pelayanan sesuai sunnah dan kenyamanan jamaah sejak
              2025.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-auto">
              <a
                href="https://wa.me/6282311000853?text=Halo%20MZM%20Tour%2C%20saya%20tertarik%20dan%20ingin%20konsultasi%20lebih%20lanjut%20mengenai%20layanan%20yang%20tersedia."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-teal-600"
                style={{ backgroundColor: "#003b3b" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mzmtour?igsh=ZWowcGFmcTZoa2xo"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-teal-600"
                style={{ backgroundColor: "#003b3b" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@mzmtour?_r=1&_t=ZS-95Udfai70wp"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-teal-600"
                style={{ backgroundColor: "#003b3b" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Langsung */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white border-b border-white/10 pb-3">
              Tautan Langsung
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#layanan"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Layanan Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#tentang"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Tentang MZM Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/jadwal-keberangkatan"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Cek Jadwal
                </Link>
              </li>
              <li>
                <Link
                  href="#review"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Testimoni
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white border-b border-white/10 pb-3">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/75 text-sm">
                <svg
                  className="w-4 h-4 flex-shrink-0 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="https://wa.me/6282311000853?text=Halo%20MZM%20Tour%2C%20saya%20tertarik%20dan%20ingin%20konsultasi%20lebih%20lanjut%20mengenai%20layanan%20yang%20tersedia."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +62 823-1100-0853
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/75 text-sm">
                <svg
                  className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="break-all leading-relaxed">
                  mzmsahabatmenujubaitullah@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/75 text-sm">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <a
                  href="https://maps.app.goo.gl/2u7RPCPTKbFQHrVp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:text-white transition-colors cursor-pointer"
                >
                  Jl. Kalibata Selatan II B No.23 A, RT.2/RW.4, Kalibata, Kec.
                  Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                  12740
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/75 text-sm pt-1">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-white font-semibold mb-1">
                    Jam Operasional
                  </p>
                  <p>Senin – Jumat: 08.00 – 17.00 WIB</p>
                  <p>Sabtu: 08.00 – 13.00 WIB</p>
                  <p className="text-white/45 text-xs mt-0.5">
                    Minggu & Hari Libur: Tutup
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kantor Kami + Maps */}
          <div>
            <h4 className="text-base font-bold mb-5 text-white border-b border-white/10 pb-3">
              Kantor Kami
            </h4>
            <div
              className="rounded-xl overflow-hidden border border-white/10 w-full"
              style={{ height: "200px" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9922287547024!2d106.83980037409685!3d-6.264751293723884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3005e92c9c3%3A0x89ec3ef7dc3f63b9!2sMZM%20TOUR%20TRAVEL%20%26%20LAW%20OFFICE%20(PERKARAKU)!5e0!3m2!1sen!2sus!4v1773816142675!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor MZM Travel"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/2u7RPCPTKbFQHrVp9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-xs mt-3 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Buka di Google Maps
            </a>
          </div>
        </div>

        {/* Garis & Copyright */}
        <div className="border-t border-white/10 pt-6 text-center text-white/40 text-xs">
          <p>
            &copy; 2026 MZM Travel. All Rights Reserved. &nbsp;·&nbsp; Izin
            Resmi PPIU No. 123/2021 – Kemenag RI
          </p>
        </div>
      </div>
    </footer>
  );
}