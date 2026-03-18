import Image from "next/image";
import Link from "next/link";
import PackageNavbar from "@/components/PackageNavbar";
import GalleryScroll from "./GalleryScroll";

export default function TentangKamiPage() {

    return (
        <>
            <PackageNavbar />
            <main className="min-h-screen pt-16" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e6f2f2 50%, #f0fdfa 100%)" }}>

                {/* ── Cover Banner: mobile=full photo, desktop=1512×376 crop ── */}
                <div className="relative w-full overflow-hidden aspect-auto sm:aspect-[1512/376]">
                    {/* Mobile: show full image naturally */}
                    <Image
                        src="/img/tentang-kami/sampul-foto.png"
                        alt="Tentang MZM Tour"
                        fill
                        className="hidden sm:block object-cover object-center"
                        priority
                    />
                    <Image
                        src="/img/tentang-kami/sampul-foto.png"
                        alt="Tentang MZM Tour"
                        width={1512}
                        height={1512}
                        className="block sm:hidden w-full h-auto"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-7">
                        <span className="inline-block bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2 w-fit backdrop-blur-sm">
                            Tentang Kami
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                            MZM <span style={{ color: "#5eead4" }}>Tour & Travel</span>
                        </h1>
                        <p className="text-white/75 text-xs sm:text-sm mt-1">Sahabat Perjalanan Menuju Baitullah</p>
                    </div>
                </div>

                {/* ── Kisah Perjalanan — Figma Layout ──────────────── */}
                <section className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
                    <div className="flex flex-col sm:flex-row gap-10 items-start">

                        {/* ── LEFT: Photo with overlay+border (pre-baked from Figma) ── */}
                        <div className="flex-shrink-0 w-full sm:w-80 relative flex items-center justify-center">
                            {/* The exported image already includes teal bg + border + shadow */}
                            <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                                <Image
                                    src="/img/tentang-kami/overlay-border-shadow.png"
                                    alt="MZM Travel"
                                    fill
                                    className="object-contain object-center"
                                    sizes="320px"
                                />
                            </div>

                            {/* 3+ TAHUN MELAYANI badge — centered vertically */}
                            <div
                                className="absolute z-20"
                                style={{
                                    top: "50%",
                                    left: "-16px",
                                    transform: "translateY(-50%)",
                                    width: "110px",
                                    height: "110px",
                                }}
                            >
                                <Image
                                    src="/img/tentang-kami/background-border.png"
                                    alt="3+ Tahun Melayani"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* ── RIGHT: Story text ── */}
                        <div className="flex-1 min-w-0 pt-2">
                            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-teal-600 mb-1">
                                Our Journey Story
                            </span>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                                Kisah <span style={{ color: "#008080" }}>Perjalanan Kami</span>
                            </h2>
                            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                                <p>
                                    Bermula dari sebuah niat suci untuk memfasilitasi perjalanan spiritual umat Muslim ke Tanah Suci, <strong className="text-gray-800">MZM TOUR</strong> tumbuh menjadi sahabat perjalanan terpercaya bagi ratusan jamaah. Selama lebih dari 3 tahun, MZM TOUR tidak hanya sekadar menyediakan paket perjalanan, namun juga menghadirkan pengalaman ibadah yang khusyuk dan berkesan.
                                </p>
                                <p>
                                    Dengan berpegang teguh pada nilai-nilai profesionalisme dan dedikasi, setiap detail perjalanan dirancang dengan cermat, mulai dari akomodasi yang nyaman, transportasi yang aman, hingga bimbingan ibadah yang berkualitas.
                                </p>
                                <p>
                                    Dari tahun ke tahun, MZM TOUR terus berinovasi dan beradaptasi untuk memberikan pelayanan terbaik. Mendengarkan kebutuhan dan aspirasi jamaah menjadi prioritas utama kami, sehingga setiap perjalanan umroh bersama MZM TOUR terasa bermakna.
                                </p>
                            </div>

                            {/* Pelajari Visi & Misi button */}
                            <a
                                href="#visi-misi"
                                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 border"
                                style={{ color: "#008080", borderColor: "#008080", backgroundColor: "transparent" }}
                            >
                                Pelajari Visi &amp; Misi Kami
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Momen Kebahagiaan Gallery ────────────────── */}
                <GalleryScroll />


                {/* ── Visi & Misi ─────────────────────────────── */}
                <section id="visi-misi" className="max-w-5xl mx-auto px-4 sm:px-8 pb-10">
                    <div className="flex flex-col sm:flex-row gap-10 items-center">

                        {/* ── VISI — rounded card (left, vertically centered) ── */}
                        <div className="w-full sm:w-80 flex-shrink-0">
                            <h2 className="text-xl font-extrabold text-center mb-1" style={{ color: "#008080" }}>
                                Visi Kami
                            </h2>
                            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: "#f59e0b" }} />

                            <div className="rounded-2xl px-6 py-7 shadow-sm border border-gray-100 bg-white">
                                <p className="text-gray-700 leading-relaxed italic text-center" style={{ fontSize: "16px" }}>
                                    &ldquo;Menjadi penyelenggara perjalanan umroh yang amanah, profesional, dan meraih mabrur, serta menjadi sahabat menuju baitullah.&rdquo;
                                </p>
                            </div>
                        </div>

                        {/* ── MISI — icon list ── */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-extrabold text-center sm:text-left mb-1" style={{ color: "#008080" }}>
                                Misi Kami
                            </h2>
                            <div className="w-10 h-1 rounded-full mb-4 mx-auto sm:mx-0" style={{ backgroundColor: "#f59e0b" }} />

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Amanah & Terpercaya",
                                        desc: "Menjunjung tinggi kepercayaan jamaah dengan pelayanan yang jujur dan transparan.",
                                        icon: (
                                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        title: "Keamanan Utama",
                                        desc: "Menjamin kenyamanan dan keselamatan jamaah selama proses keberangkatan hingga kepulangan.",
                                        icon: (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        title: "Pembimbing Ibadah Ahli",
                                        desc: "Didampingi oleh muthowif yang berpengalaman sesuai dengan tuntunan sunnah.",
                                        icon: (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        title: "Jejaring Luas",
                                        desc: "Bekerjasama dengan maskapai dan hotel terbaik di tanah suci.",
                                        icon: (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        title: "Inovasi Layanan",
                                        desc: "Terus berinovasi untuk memudahkan pendaftaran dan pengelolaan perjalanan jamaah.",
                                        icon: (
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        ),
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div
                                            className="flex-shrink-0 rounded-full flex items-center justify-center text-white"
                                            style={{ backgroundColor: "#008080", width: "36px", height: "36px" }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="font-bold text-gray-900" style={{ fontSize: "14px" }}>{item.title}</p>
                                            <p className="text-gray-500 leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* ── Komitmen MZM TOUR ───────────────────────── */}
                <section className="py-10 px-4 sm:px-8" style={{ backgroundColor: "#014E4E" }}>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-center text-white font-extrabold text-lg sm:text-xl mb-8 tracking-widest uppercase">
                            Komitmen MZM Tour
                        </h2>

                        {/* Top row — 2 cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                            {/* Sahabat Perjalanan Anda */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-bold text-base mb-2">Sahabat Perjalanan Anda</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Kami bukan sekadar agen travel, melainkan sahabat yang akan membimbing dan menemani setiap langkah Anda menuju Baitullah dengan sepenuh hati.
                                </p>
                            </div>

                            {/* Kepuasan Jamaah */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-bold text-base mb-2">Kepuasan Jamaah</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Fokus utama kami adalah memastikan kepuasan dan kenyamanan jamaah dalam beribadah, sehingga dapat mencapai predikat Umroh yang mabrur.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Legalitas Resmi ─────────────────────────── */}
                <section className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-2" style={{ color: "#008080" }}>
                        Legalitas Resmi
                    </h2>
                    <p className="text-center text-gray-500 text-sm mb-8 max-w-lg mx-auto">
                        MZM Tour beroperasi di bawah legalitas hukum yang sah untuk memberikan rasa aman bagi setiap calon jamaah.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* LEGALITAS 1 */}
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-700 mb-3">SK Pengesahan Pendirian Badan Hukum</p>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white" style={{ aspectRatio: "692/1030" }}>
                                <Image
                                    src="/img/tentang-kami/LEGALITAS/legalitas-1.png"
                                    alt="SK Pengesahan Pendirian Badan Hukum"
                                    fill
                                    className="object-contain"
                                    sizes="500px"
                                />
                            </div>
                        </div>

                        {/* LEGALITAS 2 */}
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-700 mb-3">Lampiran Keputusan Menteri Hukum &amp; HAM</p>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white" style={{ aspectRatio: "692/1030" }}>
                                <Image
                                    src="/img/tentang-kami/LEGALITAS/legalitas-2.png"
                                    alt="Lampiran Keputusan Menteri Hukum & HAM"
                                    fill
                                    className="object-contain"
                                    sizes="500px"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Kantor Pusat ─────────────────────────────── */}
                <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-10">
                    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: "#f0fdfa" }}>
                        <div className="flex flex-col sm:flex-row">
                            {/* Left — Address info */}
                            <div className="flex-1 p-6 sm:p-8">
                                <h2 className="text-xl font-extrabold mb-4" style={{ color: "#008080" }}>
                                    Kantor Pusat
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e6f7f7" }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#008080" }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <a href="https://maps.app.goo.gl/2u7RPCPTKbFQHrVp9" target="_blank" rel="noopener noreferrer" className="text-gray-600 leading-relaxed text-sm hover:text-teal-700 transition-colors">
                                            Jl. Kalibata Selatan II B No.23 A, RT.2/RW.4, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12740
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e6f7f7" }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#008080" }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <a href="https://wa.me/6282311000853" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm font-medium hover:text-teal-700 transition-colors">
                                            +62 823-1100-0853
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right — Google Maps */}
                            <div className="w-full sm:w-96 flex-shrink-0 relative overflow-hidden rounded-xl">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9922287547024!2d106.83980037409685!3d-6.264751293723884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3005e92c9c3%3A0x89ec3ef7dc3f63b9!2sMZM%20TOUR%20TRAVEL%20%26%20LAW%20OFFICE%20(PERKARAKU)!5e0!3m2!1sen!2sus!4v1773816142675!5m2!1sen!2sus" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0, minHeight: "250px" }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Peta Lokasi MZM TOUR"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Back link ─────────────────────────────────── */}
                <div className="text-center pb-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 font-semibold text-sm hover:underline">
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
