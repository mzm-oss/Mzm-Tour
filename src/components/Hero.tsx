"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const whatsappNumber = "6282311000853";
  const whatsappMessage = encodeURIComponent(
    "Halo MZM Tour, saya tertarik dan ingin konsultasi lebih lanjut mengenai layanan yang tersedia.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setStatsVisible(true);
      } else {
        setStatsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLayananKami = () => {
    const el = document.getElementById("layanan");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { value: "10k+", label: "Jamaah Puas" },
    { value: "3+", label: "Tahun Pengalaman" },
    { value: "99%", label: "Tingkat Keberhasilan" },
    { value: "B+", label: "Akreditasi PPIU" },
  ];

  return (
    <section id="beranda" className="flex flex-col">
      {/* === Hero Full Screen + Stats Overlay === */}
      <div className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/heroes.png"
            alt="MZM Tour Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-16 pt-20 pb-36 translate-y-16">
          {/* Badge */}
          <div className="flex justify-center sm:justify-start mb-4 sm:mb-3">
            <span className="inline-block bg-teal-700/70 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm border border-teal-400/30">
              Travel Umroh &amp; Haji Berizin Resmi
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 text-center sm:text-left">
            Wujudkan Perjalanan{" "}
            <span style={{ color: "#008080" }}>Ibadah Suci</span> Anda yang
            Bermakna
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/85 max-w-xl mb-7 leading-relaxed text-center sm:text-left mx-auto sm:mx-0">
            Nikmati kenyamanan beribadah dengan pelayanan profesional,
            pembimbing sesuai sunnah, dan fasilitas terbaik. Kami siap melayani
            langkah suci Anda menuju Baitullah.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleLayananKami}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:brightness-110 hover:scale-105 shadow-lg"
              style={{ backgroundColor: "#008080" }}
            >
              Layanan Kami
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <svg
                className="w-4 h-4 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Tanya via WhatsApp
            </a>
          </div>
        </div>

        {/* === Stats Card — muncul saat scroll (popup animated) === */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-4 sm:px-8 transition-all duration-700 ease-out
                        ${
                          statsVisible
                            ? "opacity-100 translate-y-1/2 pointer-events-auto"
                            : "opacity-0 translate-y-full pointer-events-none"
                        }`}
        >
          <div
            className="max-w-5xl mx-auto bg-white rounded-2xl px-10 sm:px-16 py-5 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-8"
            style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.15)" }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center ${i < stats.length - 1 ? "md:border-r md:border-gray-200" : ""}`}
              >
                <p
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
                  style={{ color: "#008080" }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer agar konten berikutnya tidak tertimpa stats card */}
      <div className="h-16 sm:h-20" />
    </section>
  );
}
