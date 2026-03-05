import re
import os

haji_path = r"c:\Users\Newt\Desktop\travel umroh\src\app\paket-haji\page.tsx"
wisata_path = r"c:\Users\Newt\Desktop\travel umroh\src\app\paket-wisata\page.tsx"

haji_content = """import Image from "next/image";
import Link from "next/link";
import PackageNavbar from "@/components/PackageNavbar";
import { fetchPaketsServerSide } from "@/lib/fetchPaketsServer";
import HajiClientList from "./HajiClientList";

export const dynamic = 'force-dynamic';

export default async function PaketHajiPage() {
    const allPakets = await fetchPaketsServerSide();
    const hajiPakets = allPakets.filter(p => p.kategori === "haji");

    return (
        <>
            <PackageNavbar />
            <main className="min-h-screen pt-16" style={{ background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fffbeb 100%)" }}>
                <div className="relative text-white pt-16 pb-20 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #78350f 0%, #c97d20 100%)" }}>
                    <div className="absolute inset-0 opacity-10">
                        <Image src="/img/haji-card.png" alt="" fill className="object-cover" />
                    </div>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
                            Program Spesial
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Layanan Haji</h1>
                        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                            Rencanakan ibadah Haji Anda dengan tenang dan nyaman bersama bimbingan muthawif bersertifikat.
                        </p>
                    </div>
                </div>

                <HajiClientList initialPakets={hajiPakets} />

                <div className="text-center pb-12 mt-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-amber-700 font-semibold text-sm hover:underline">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>
            </main>
        </>
    );
}
"""

with open(haji_path, 'w', encoding='utf-8') as f:
    f.write(haji_content)


wisata_client_path = r"c:\Users\Newt\Desktop\travel umroh\src\app\paket-wisata\WisataClientList.tsx"
wisata_client_content = """"use client";

import { useState } from "react";
import Image from "next/image";
import type { Paket } from "@/lib/packagesData";
import { FALLBACK_IMAGES } from "@/lib/packagesData";

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90" onClick={onClose}>
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]" onClick={e => e.stopPropagation()}>
                <Image src={src} alt={alt} fill className="object-cover" />
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 z-[101] text-white p-2 bg-white/10 rounded-full">Tutup</button>
        </div>
    );
}

function PaketCard({ paket, onImageClick, isHistory }: { paket: Paket; onImageClick: (src: string, alt: string) => void; isHistory?: boolean }) {
    const wa = `https://wa.me/6282311000853?text=${encodeURIComponent(`Halo MZM Travel, saya tertarik dengan Wisata Islam: "${paket.nama}" - ${paket.harga}. Mohon info.`)}`;
    const imgSrc = paket.image || FALLBACK_IMAGES.wisata;

    return (
        <div className={`bg-white rounded-3xl overflow-hidden flex flex-col border border-gray-100 shadow-sm transition-all duration-300 ${isHistory ? 'opacity-60 grayscale' : 'hover:shadow-2xl hover:-translate-y-1'}`}>
            <div className={`relative w-full aspect-[4/5] overflow-hidden cursor-zoom-in group/img`} onClick={() => onImageClick(imgSrc, paket.nama)}>
                <Image src={imgSrc} alt={paket.nama} fill className="object-cover transition-transform duration-500 group-hover/img:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white shadow" style={{ backgroundColor: isHistory ? "#6b7280" : (paket.badgeColor || "#1a6fb0") }}>
                    {isHistory ? "SUDAH BERANGKAT" : (paket.badge || "DESTINASI POPULER")}
                </span>
                <div className="absolute bottom-3 left-4 right-4"><span className="text-white font-extrabold text-xl leading-none">{paket.harga}</span></div>
            </div>

            <div className="flex flex-col flex-1 p-4 gap-3">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide leading-snug text-center">{paket.nama}</h3>
                <div className="w-8 h-0.5 rounded-full mx-auto" style={{ backgroundColor: "#1a6fb0" }} />
                
                <div className="flex flex-col gap-2.5">
                    <p className="text-xs font-bold text-gray-800">Jadwal: {paket.jadwal || "Tahun 2025/2026"}</p>
                    <p className="text-xs font-bold text-gray-800">Durasi: {paket.durasi}</p>
                    <p className="text-xs font-bold text-gray-800">Hotel: {paket.hotelMekkahBintang} Bintang</p>
                </div>
            </div>

            <div className="border-t border-gray-100 mt-auto pt-3 px-4 pb-4">
                {isHistory ? (
                    <div className="w-full flex justify-center py-2.5 rounded-xl font-bold text-xs text-gray-400 bg-gray-100">Sudah Berangkat</div>
                ) : (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="w-full flex justify-center py-2.5 rounded-xl font-bold text-xs text-white bg-blue-700">Tanya via WhatsApp</a>
                )}
            </div>
        </div>
    );
}

export default function WisataClientList({ initialPakets }: { initialPakets: Paket[] }) {
    const [search, setSearch] = useState("");
    const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
    const [showHistory, setShowHistory] = useState(false);

    const filtered = initialPakets.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()) || p.deskripsi.toLowerCase().includes(search.toLowerCase()));

    const isAllBerangkat = (p: Paket) => {
        if (p.statusPublish === "Sudah Berangkat") return true;
        const dates = p.tanggalBerangkat || [];
        return dates.length > 0 && dates.every(d => d.status === "berangkat");
    };
    const activePackages = filtered.filter(p => !isAllBerangkat(p));
    const historyPackages = filtered.filter(p => isAllBerangkat(p));

    return (
        <>
            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
            
            <div className="relative z-10 -mt-7 max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-3 border border-gray-100">
                    <input type="text" placeholder="Cari destinasi..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 px-3 py-2 outline-none" />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
                {activePackages.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">Destinasi tidak ditemukan</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {activePackages.map(p => <PaketCard key={p.id} paket={p} onImageClick={(_, alt) => setLightbox({ src: p.image || FALLBACK_IMAGES.wisata, alt })} />)}
                    </div>
                )}
            </div>

            {historyPackages.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
                    <button onClick={() => setShowHistory(!showHistory)} className="w-full py-3 font-bold text-gray-400">Riwayat ({historyPackages.length})</button>
                    {showHistory && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-2">
                            {historyPackages.map(p => <PaketCard key={p.id} paket={p} isHistory onImageClick={(_, alt) => setLightbox({ src: p.image || FALLBACK_IMAGES.wisata, alt })} />)}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
"""

with open(wisata_client_path, 'w', encoding='utf-8') as f:
    f.write(wisata_client_content)


wisata_content = """import Image from "next/image";
import Link from "next/link";
import PackageNavbar from "@/components/PackageNavbar";
import { fetchPaketsServerSide } from "@/lib/fetchPaketsServer";
import WisataClientList from "./WisataClientList";

export const dynamic = 'force-dynamic';

export default async function PaketWisataPage() {
    const allPakets = await fetchPaketsServerSide();
    const wisataPakets = allPakets.filter(p => p.kategori === "wisata");

    return (
        <>
            <PackageNavbar />
            <main className="min-h-screen pt-16" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #f0f9ff 100%)" }}>
                <div className="relative text-white pt-16 pb-20 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f3460 0%, #1a6fb0 100%)" }}>
                    <div className="absolute inset-0 opacity-10">
                        <Image src="/img/wisata-islam-card.png" alt="" fill className="object-cover" />
                    </div>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
                            Destinasi Islami
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Wisata Islam</h1>
                        <p className="text-white/80 text-base max-w-xl mx-auto leading-relaxed">
                            Jelajahi destinasi bersejarah dan indah di dunia Islam bersama tour leader berpengalaman MZM Travel.
                        </p>
                    </div>
                </div>

                <WisataClientList initialPakets={wisataPakets} />

                <div className="text-center pb-12 mt-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>
            </main>
        </>
    );
}
"""

with open(wisata_path, 'w', encoding='utf-8') as f:
    f.write(wisata_content)

print("Haji and Wisata pages updated to server components")
