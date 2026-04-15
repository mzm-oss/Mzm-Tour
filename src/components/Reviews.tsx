"use client";

import { useState } from "react";

type Review = {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
};

function StarRating({ rating, onRate }: { rating: number; onRate?: (r: number) => void }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => onRate?.(star)}
                    onMouseEnter={() => onRate && setHovered(star)}
                    onMouseLeave={() => onRate && setHovered(0)}
                    className={onRate ? "cursor-pointer" : "cursor-default"}>
                    <svg className={`w-4 h-4 transition-colors ${star <= (hovered || rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            ))}
        </div>
    );
}

function ReviewCard({ r }: { r: Review }) {
    // Memotong text jika terlalu panjang (maksimal ~100 karakter)
    const MAX_LENGTH = 100;
    const isLongText = r.text.length > MAX_LENGTH;
    const displayText = isLongText ? r.text.substring(0, MAX_LENGTH).trim() + "..." : r.text;

    return (
        <div className="w-72 flex-shrink-0 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 mx-2 h-[200px] overflow-hidden">
            <div className="flex items-center justify-between flex-shrink-0">
                <StarRating rating={r.rating} />
                <span className="text-[10px] text-gray-400 font-medium">{r.date}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1 break-words">
                &quot;{r.text}&quot;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-gray-50 mt-auto">
                <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#e6f4f4" }}>
                    <svg className="w-5 h-5" style={{ color: "#008080" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-gray-900 text-xs">{r.name}</p>
                    <p className="text-gray-400 text-[10px]">{r.location}</p>
                </div>
            </div>
        </div>
    );
}

export default function Reviews({ initialReviews, reviewsEnabled = true }: { initialReviews: Review[], reviewsEnabled?: boolean }) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", location: "", rating: 0, text: "" });
    const [errors, setErrors] = useState({ name: "", location: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = { name: "", location: "" };

        // Validasi Kustom
        if (!/^[A-Za-z\s']+$/.test(form.name)) {
            newErrors.name = "Nama hanya boleh berisi huruf";
            hasError = true;
        }
        if (form.location && !/^[A-Za-z\s]+$/.test(form.location)) {
            newErrors.location = "Kota hanya boleh berisi huruf";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError || !form.name || !form.text || form.rating === 0) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    location: form.location || "Indonesia",
                    rating: form.rating,
                    text: form.text
                })
            });
            const savedReview = await res.json();

            setReviews([savedReview, ...reviews]);
            setForm({ name: "", location: "", rating: 0, text: "" });
            setSubmitted(true);
            setShowForm(false);
            setTimeout(() => setSubmitted(false), 4000);
        } catch (error) {
            console.error("Gagal mengirim testimoni", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Duplicate array enough to prevent disappearing on large screens
    const minCount = 12; // ensure at least 12 items for safe infinite loop
    const row1 = reviews.length > 0 ? Array(Math.ceil(minCount / reviews.length)).fill([...reviews]).flat() : [];
    const mid = Math.ceil(reviews.length / 2);
    const offsetReviews = reviews.length > 0 ? [...reviews.slice(mid), ...reviews.slice(0, mid)] : [];
    const row2 = offsetReviews.length > 0 ? Array(Math.ceil(minCount / offsetReviews.length)).fill([...offsetReviews]).flat() : [];

    return (
        <section id="testimoni" className="py-10 scroll-mt-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-600 mb-3">Testimoni</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        Apa Kata Jamaah Tentang <span style={{ color: "#008080" }}>MZM Tour</span>
                    </h2>
                    <div className="w-12 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: "#008080" }} />


                </div>
            </div>

            {/* Marquee Row 1 — gerak ke kiri */}
            <div className="marquee-track overflow-hidden mb-4">
                <div className="flex animate-marquee-left w-max">
                    {row1.map((r, i) => <ReviewCard key={i} r={r} />)}
                </div>
            </div>

            {/* Marquee Row 2 — gerak ke kanan */}
            <div className="marquee-track overflow-hidden mb-8">
                <div className="flex animate-marquee-right w-max">
                    {row2.map((r, i) => <ReviewCard key={i} r={r} />)}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success alert */}
                {submitted && (
                    <div className="mb-6 max-w-xl mx-auto bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-4 shadow-[0_8px_30px_rgb(0,128,128,0.06)] animate-[fadeIn_0.5s_ease-out]">
                        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-teal-100/80">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-teal-800 text-sm mb-0.5">Testimoni Terkirim!</p>
                            <p className="text-teal-600/90 text-xs sm:text-sm">Alhamdulillah, pengalaman ibadah Anda berhasil dikirim. Jazakumullah Khairan.</p>
                        </div>
                    </div>
                )}

                {/* Tombol */}
                {reviewsEnabled && (
                    <div className="text-center mb-6">
                        <button onClick={() => setShowForm(!showForm)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:brightness-110 hover:scale-105 shadow-md"
                            style={{ backgroundColor: "#008080" }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            {showForm ? "Tutup Form" : "Tulis Pengalaman Ibadah Anda"}
                        </button>
                    </div>
                )}

                {/* Form */}
                {showForm && (
                    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                        <h3 className="text-lg font-extrabold text-gray-900 mb-1">Bagikan Pengalaman Ibadah Anda</h3>
                        <p className="text-gray-400 text-xs mb-5">Ceritakan perjalanan umroh/haji Anda bersama MZM Tour</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Rating *</label>
                                <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nama *</label>
                                    <input type="text" value={form.name} onChange={(e) => {
                                        setForm({ ...form, name: e.target.value });
                                        if (errors.name) setErrors({ ...errors, name: "" });
                                    }}
                                        placeholder="Nama Anda" required maxLength={30}
                                        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-400 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:ring-teal-500'}`} />
                                    {errors.name && (
                                        <p className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 font-medium animate-[fadeIn_0.3s_ease-out]">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Kota</label>
                                    <input type="text" value={form.location} onChange={(e) => {
                                        setForm({ ...form, location: e.target.value });
                                        if (errors.location) setErrors({ ...errors, location: "" });
                                    }}
                                        placeholder="Kota asal" maxLength={25}
                                        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${errors.location ? 'border-red-400 focus:ring-red-500 bg-red-50/50' : 'border-gray-200 focus:ring-teal-500'}`} />
                                    {errors.location && (
                                        <p className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 font-medium animate-[fadeIn_0.3s_ease-out]">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Testimoni *</label>
                                    <span className={`text-[10px] font-medium ${form.text.length >= 100 ? 'text-red-500' : 'text-gray-400'}`}>
                                        {100 - form.text.length} huruf tersisa
                                    </span>
                                </div>
                                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                                    maxLength={100}
                                    placeholder="Ceritakan pengalaman ibadah Anda..." rows={3} required
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
                            </div>
                            <button type="submit" disabled={isSubmitting}
                                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ backgroundColor: "#008080" }}>
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mengirim...
                                    </>
                                ) : (
                                    "Kirim Pengalaman Anda"
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
