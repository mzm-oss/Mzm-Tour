import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <section id="tentang" className="py-10 scroll-mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header — centered */}
                <div className="text-center mb-6">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-600 mb-3">
                        Tentang Kami
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                        Mengenal <span style={{ color: "#008080" }}>MZM Tour</span>
                    </h2>
                    <div className="w-12 h-1 rounded-full mx-auto mt-4" style={{ backgroundColor: "#008080" }} />
                </div>

                {/* Content: Gambar kiri + Teks kanan */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Gambar */}
                    <div className="w-full lg:w-1/2 flex-shrink-0">
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                            <Image
                                src="/img/tentang-kami.png"
                                alt="Tentang MZM Tour"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Teks */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">

                        <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-7">
                            <p>
                                Bermula dari sebuah niat suci untuk memfasilitasi perjalanan spiritual umat Muslim ke Tanah Suci, <strong className="text-gray-800 font-semibold">MZM TOUR</strong> tumbuh menjadi sahabat perjalanan terpercaya bagi ratusan jamaah.
                            </p>
                            <p>
                                Selama lebih dari 3 tahun, kami tidak hanya menyediakan paket perjalanan — namun menghadirkan pengalaman ibadah yang khusyuk dan berkesan, mulai dari akomodasi yang nyaman, transportasi yang aman, hingga bimbingan ibadah yang berkualitas.
                            </p>
                            <p>
                                Mendengarkan kebutuhan dan aspirasi jamaah menjadi prioritas utama kami, sehingga setiap perjalanan umroh bersama MZM TOUR terasa bermakna dan tak terlupakan.
                            </p>
                        </div>

                        {/* Stats mini */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    value: "3+", label: "Tahun Berdiri",
                                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                },
                                {
                                    value: "500+", label: "Jamaah Puas",
                                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                },
                                {
                                    value: "100%", label: "Berizin Resmi",
                                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                },
                            ].map((item, i) => (
                                <div key={i} className="text-center bg-white border border-gray-100 rounded-xl py-4 px-2 shadow-sm">
                                    <div className="flex justify-center mb-2" style={{ color: "#008080" }}>{item.icon}</div>
                                    <p className="text-xl sm:text-2xl font-extrabold" style={{ color: "#008080" }}>{item.value}</p>
                                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mt-1 leading-tight">{item.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div>
                            <Link
                                href="/tentang-kami"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white transition-all duration-300 hover:brightness-110 hover:scale-105 shadow-md"
                                style={{ backgroundColor: "#008080" }}
                            >
                                Pelajari Selengkapnya
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
