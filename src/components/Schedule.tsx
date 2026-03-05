"use client";

export default function Schedule() {
    const whatsappNumber = "6281234567890";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo MZM Tour, saya ingin lihat jadwal keberangkatan umroh terbaru")}`;

    return (
        <section id="jadwal" className="scroll-mt-20" style={{ backgroundColor: "#008080" }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[200px]">

                    {/* Kiri: Teks */}
                    <div className="text-white text-center lg:text-left flex-1">

                        {/* Label kecil */}
                        <span className="inline-block text-white/70 text-xs font-bold tracking-widest uppercase mb-4">
                            Jadwal Keberangkatan
                        </span>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
                            Cek Jadwal <br />
                            Keberangkatan Terbaru
                        </h2>

                        <p className="text-white/80 text-sm sm:text-base max-w-md mb-8 mx-auto lg:mx-0 leading-relaxed">
                            Jangan lewatkan kesempatan untuk berangkat di musim umroh terbaik.
                            Lihat jadwal tersedia dan amankan kursi Anda segera melalui WhatsApp.
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-5">
                            <div className="flex items-center gap-2 text-white text-sm font-semibold">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                Berizin Kemenag RI
                            </div>
                            <div className="flex items-center gap-2 text-white text-sm font-semibold">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Pasti Berangkat
                            </div>
                        </div>
                    </div>

                    {/* Kanan: Tombol prominent */}
                    <div className="flex-shrink-0 w-full lg:w-auto">
                        <a
                            href="/jadwal-keberangkatan"
                            className="flex items-center justify-center gap-3 w-full lg:w-auto px-10 py-5 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
                            style={{ backgroundColor: "#005f5f", color: "#fff" }}
                        >
                            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Lihat Jadwal Keberangkatan
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
