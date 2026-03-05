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
    return (
        <div className="w-72 flex-shrink-0 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 mx-2">
            <div className="flex items-center justify-between">
                <StarRating rating={r.rating} />
                <span className="text-[10px] text-gray-400 font-medium">{r.date}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &quot;{r.text}&quot;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
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

export default function Reviews({ initialReviews }: { initialReviews: Review[] }) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", location: "", rating: 0, text: "" });



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.text || form.rating === 0) return;

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
        }
    };

    // Duplicate array enough to prevent disappearing on large screens
    const minCount = 12; // ensure at least 12 items for safe infinite loop
    const row1 = reviews.length > 0 ? Array(Math.ceil(minCount / reviews.length)).fill([...reviews]).flat() : [];
    const mid = Math.ceil(reviews.length / 2);
    const offsetReviews = reviews.length > 0 ? [...reviews.slice(mid), ...reviews.slice(0, mid)] : [];
    const row2 = offsetReviews.length > 0 ? Array(Math.ceil(minCount / offsetReviews.length)).fill([...offsetReviews]).flat() : [];

    return (
        <section id="review" className="py-10 scroll-mt-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-600 mb-3">Testimoni</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        Kata Mereka tentang <span style={{ color: "#008080" }}>MZM Tour</span>
                    </h2>
                    <div className="w-12 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: "#008080" }} />

                    {/* Rating bar */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(s => (
                                <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="font-bold text-gray-900 text-sm">4.9</span>
                        <span className="text-gray-400 text-xs">dari 500+ ulasan jamaah</span>
                    </div>
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
                    <div className="mb-5 max-w-xl mx-auto bg-teal-50 border border-teal-200 text-teal-700 rounded-xl px-5 py-3 text-sm font-medium text-center">
                        ✅ Testimoni kamu berhasil dikirim! Terima kasih 🙏
                    </div>
                )}

                {/* Tombol */}
                <div className="text-center mb-6">
                    <button onClick={() => setShowForm(!showForm)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:brightness-110 hover:scale-105 shadow-md"
                        style={{ backgroundColor: "#008080" }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {showForm ? "Tutup Form" : "Tulis Testimoni Anda"}
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                        <h3 className="text-lg font-extrabold text-gray-900 mb-1">Bagikan Pengalaman Anda</h3>
                        <p className="text-gray-400 text-xs mb-5">Ceritakan perjalanan ibadah Anda bersama MZM Tour</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Rating *</label>
                                <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nama *</label>
                                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Nama Anda" required
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Kota</label>
                                    <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                                        placeholder="Kota asal"
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Testimoni *</label>
                                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                                    placeholder="Ceritakan pengalaman Anda..." rows={3} required
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
                            </div>
                            <button type="submit"
                                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
                                style={{ backgroundColor: "#008080" }}>
                                Kirim Testimoni
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
