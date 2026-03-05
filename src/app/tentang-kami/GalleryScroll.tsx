"use client";

import Image from "next/image";
import { useRef } from "react";

const galleryImages = [
    { src: "/img/tentang kami/IMG 1.png", alt: "Momen 1" },
    { src: "/img/tentang kami/IMG 2.png", alt: "Momen 2" },
    { src: "/img/tentang kami/IMG 3.png", alt: "Momen 3" },
    { src: "/img/tentang kami/IMG 4.png", alt: "Momen 4" },
];

export default function GalleryScroll() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: "left" | "right") => {
        scrollRef.current?.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
    };

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-7 pb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-teal-600">Galeri Foto</p>
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                        Momen <span style={{ color: "#008080" }}>Kebahagiaan</span>
                    </h2>
                </div>
                <div className="flex gap-1.5">
                    <button
                        onClick={() => scroll("left")}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-all"
                        aria-label="Sebelumnya"
                    >
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-all"
                        aria-label="Selanjutnya"
                    >
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Scroll container — zigzag portrait layout */}
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto pb-6"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", alignItems: "flex-start" }}
            >
                {galleryImages.map((img, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
                        style={{
                            width: "220px",
                            aspectRatio: "3/4",
                            marginTop: i % 2 === 1 ? "28px" : "0px",
                        }}
                    >
                        <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="220px" />
                    </div>
                ))}
            </div>
        </section>
    );
}
