"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const galleryImages = [
    { src: "/img/tentang-kami/momen-kebahagiaan/img-1.png", alt: "Momen 1" },
    { src: "/img/tentang-kami/momen-kebahagiaan/img-2.png", alt: "Momen 2" },
    { src: "/img/tentang-kami/momen-kebahagiaan/img-3.png", alt: "Momen 3" },
    { src: "/img/tentang-kami/momen-kebahagiaan/img-4.png", alt: "Momen 4" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-5.jpeg", alt: "Momen 5" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-6.jpeg", alt: "Momen 6" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-7.jpeg", alt: "Momen 7" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-8.jpeg", alt: "Momen 8" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-9.jpeg", alt: "Momen 9" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-10.jpeg", alt: "Momen 10" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-11.jpeg", alt: "Momen 11" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-12.jpeg", alt: "Momen 12" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-13.jpeg", alt: "Momen 13" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-14.jpeg", alt: "Momen 14" },
    { src: "/img/tentang-kami/momen-kebahagiaan/momen-kebahagiaan-15.jpeg", alt: "Momen 15" },
];

const reuniImages = [
    { src: "/img/tentang-kami/reuni/reuni1.jpeg", alt: "Reuni Jamaah 1" },
    { src: "/img/tentang-kami/reuni/reuni2.jpeg", alt: "Reuni Jamaah 2" },
    { src: "/img/tentang-kami/reuni/reuni3.jpeg", alt: "Reuni Jamaah 3" },
    { src: "/img/tentang-kami/reuni/reuni4.jpeg", alt: "Reuni Jamaah 4" },
    { src: "/img/tentang-kami/reuni/reuni5.jpeg", alt: "Reuni Jamaah 5" },

];

/* ─── Auto-scrolling Gallery Strip ─────────────────────────── */
function GalleryStrip() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPaused = useRef(false);
    const animRef = useRef<number | null>(null);
    const posRef = useRef(0);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const SPEED = 0.6; // px per frame

        const tick = () => {
            if (!isPaused.current && el) {
                posRef.current += SPEED;
                // Seamless loop: reset when halfway (since we duplicated items)
                const half = el.scrollWidth / 2;
                if (posRef.current >= half) posRef.current -= half;
                el.scrollLeft = posRef.current;
            }
            animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);
        return () => {
            if (animRef.current !== null) cancelAnimationFrame(animRef.current);
        };
    }, []);

    const scroll = (dir: "left" | "right") => {
        posRef.current += dir === "right" ? 260 : -260;
        if (scrollRef.current) scrollRef.current.scrollLeft = posRef.current;
    };

    // Duplicate for seamless loop
    const loopImages = [...galleryImages, ...galleryImages];

    return (
        <>
            <div className="flex items-center justify-between mb-4 px-4 sm:px-8">
                <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-teal-600">Galeri Foto</p>
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                        Momen <span style={{ color: "#008080" }}>Kebahagiaan</span>
                    </h2>
                </div>
                <div className="flex gap-1.5 pr-4 sm:pr-8">
                    <button
                        onClick={() => scroll("left")}
                        onMouseEnter={() => { isPaused.current = true; }}
                        onMouseLeave={() => { isPaused.current = false; }}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-all"
                        aria-label="Sebelumnya"
                    >
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        onMouseEnter={() => { isPaused.current = true; }}
                        onMouseLeave={() => { isPaused.current = false; }}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-all"
                        aria-label="Selanjutnya"
                    >
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Scroll strip — overflow hidden so no scrollbar */}
            <div
                ref={scrollRef}
                onMouseEnter={() => { isPaused.current = true; }}
                onMouseLeave={() => { isPaused.current = false; }}
                onTouchStart={() => { isPaused.current = true; }}
                onTouchEnd={() => { isPaused.current = false; }}
                className="flex gap-3 overflow-x-hidden pb-2"
                style={{ alignItems: "flex-start", cursor: "grab", userSelect: "none" }}
            >
                {loopImages.map((img, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                        style={{
                            width: "clamp(160px, 22vw, 220px)",
                            aspectRatio: "3/4",
                            marginTop: i % 2 === 1 ? "28px" : "0px",
                        }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="220px"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

/* ─── Reuni Section ─────────────────────────────────────────── */
function ReuniFotoGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {reuniImages.map((img, i) => (
                <div
                    key={i}
                    className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 group"
                    style={{ aspectRatio: "1/1" }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                </div>
            ))}
        </div>
    );
}

/* ─── Tab Navigation ────────────────────────────────────────── */
type Tab = "galeri" | "reuni";

export default function GalleryScroll() {
    const [activeTab, setActiveTab] = useState<Tab>("galeri");

    return (
        <section className="max-w-5xl mx-auto pt-7 pb-8">

            {/* ── Tab Switcher ── */}
            <div className="flex gap-1 mx-4 sm:mx-8 mb-6 bg-gray-100 rounded-2xl p-1 w-fit">
                <button
                    onClick={() => setActiveTab("galeri")}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                        activeTab === "galeri"
                            ? "bg-white text-teal-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Galeri Momen
                </button>
                <button
                    onClick={() => setActiveTab("reuni")}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                        activeTab === "reuni"
                            ? "bg-white text-teal-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Reuni Jamaah
                    {/* badge */}
                    
                </button>
            </div>

            {/* ── Galeri Tab ── */}
            {activeTab === "galeri" && (
                <div className="overflow-hidden">
                    <GalleryStrip />
                </div>
            )}

            {/* ── Reuni Tab ── */}
            {activeTab === "reuni" && (
                <div className="px-4 sm:px-8">
                    {/* Header */}
                    <div className="mb-5">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-teal-600 mb-0.5">
                            Alumni Jamaah
                        </p>
                        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1">
                            Reuni <span style={{ color: "#008080" }}>Jamaah MZM</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                            Kebahagiaan yang tak terlupakan, momen reuni para jamaah yang telah menunaikan ibadah Haji dan Umroh bersama MZM Tour. Satu langkah menuju Baitullah, selamanya menjadi keluarga.
                        </p>
                    </div>

                    {/* Grid */}
                    <ReuniFotoGrid />

                    {/* Stats strip */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        {[
                            { value: "500+", label: "Jamaah Alumni" },
                            { value: "3+", label: "Tahun Melayani" },
                            { value: "100%", label: "Amanah & Terpercaya" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="rounded-2xl text-center py-4 px-2"
                                style={{ backgroundColor: "#e6f7f7" }}
                            >
                                <p className="text-xl font-extrabold" style={{ color: "#008080" }}>{stat.value}</p>
                                <p className="text-gray-500 text-xs mt-0.5 leading-tight">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}