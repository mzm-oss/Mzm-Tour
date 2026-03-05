"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
    {
        id: "haji",
        badge: "PREMIUM",
        badgeColor: "#c97d20",
        title: "Layanan Haji",
        description:
            "Bersama kami perjalanan Haji Anda akan lebih nyaman dan bermakna dengan pembimbing berpengalaman.",
        image: "/img/haji-card.png",
        objectPosition: "center",
        href: "/paket-haji",
    },
    {
        id: "umroh",
        badge: "PAKET UMROH",
        badgeColor: "#008080",
        title: "Layanan Umroh",
        description:
            "Paket umroh terlengkap mulai dari Umroh Plus Turki hingga Umroh Reguler dengan fasilitas hotel bintang 5.",
        image: "/img/umroh-card.png",
        objectPosition: "center top",
        href: "/paket-umroh",
    },
    {
        id: "wisata",
        badge: "DESTINASI POPULER",
        badgeColor: "#1a6fb0",
        title: "Wisata Islam",
        description:
            "Nikmati keindahan destinasi wisata Islami di berbagai penjuru dunia, Turki, Mesir, Jordania & banyak lagi.",
        image: "/img/wisata-islam-card.png",
        objectPosition: "center",
        href: "/paket-wisata",
    },
];

export default function Services() {
    const whatsappNumber = "6281234567890";

    return (
        <section id="layanan" className="py-10 scroll-mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header — konsisten dengan section lain */}
                <div className="text-center mb-6">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-600 mb-3">
                        Layanan Kami
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                        Pilihan <span style={{ color: "#008080" }}>Paket Perjalanan</span> Kami
                    </h2>
                    <div className="w-12 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: "#008080" }} />
                    <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
                        Kami memahami kebutuhan spiritual Anda. Pilih paket yang dirancang khusus
                        untuk kenyamanan dan kekhusyukan ibadah Anda.
                    </p>
                </div>

                {/* 3 Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((svc) => {
                        const waMsg = encodeURIComponent(`Halo MZM Tour, saya ingin tahu lebih lanjut tentang ${svc.title}`);
                        const waUrl = `https://wa.me/${whatsappNumber}?text=${waMsg}`;

                        return (
                            <Link
                                href={svc.href}
                                key={svc.id}
                                prefetch={true}
                                className="relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block cursor-pointer"
                            >
                                {/* Background Image */}
                                <div className="relative h-[300px] sm:h-[400px] lg:h-[480px]">
                                    <Image
                                        src={svc.image}
                                        alt={svc.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        style={{ objectPosition: svc.objectPosition ?? "center" }}
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                </div>

                                {/* Badge */}
                                <div className="absolute top-4 left-4">
                                    <span
                                        className="text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                                        style={{ backgroundColor: svc.badgeColor }}
                                    >
                                        {svc.badge}
                                    </span>
                                </div>

                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white text-xl font-bold mb-1">{svc.title}</h3>
                                    <p className="text-white/75 text-xs leading-relaxed mb-4 line-clamp-2">
                                        {svc.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1 text-white text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                                        Lihat Paket
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
