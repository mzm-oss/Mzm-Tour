export type Review = {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    image: string;
    date: string;
};

// ─── Async Supabase Functions ────────────────────────────────────────────────

export async function getAllReviewsAsync(): Promise<Review[]> {
    const res = await fetch("/api/reviews", { cache: "no-store" });
    if (!res.ok) return getAllReviews();
    return res.json();
}

export async function updateReviewAsync(id: string, data: Partial<Review>): Promise<void> {
    await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
    });
}

export async function deleteReviewAsync(id: string): Promise<void> {
    await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
}

// ─── Legacy in-memory (deprecated — used as fallback only) ──────────────────
let reviewsData: Review[] = [
    { id: "rev-1", name: "Ahmad Hidayat", location: "Jakarta", rating: 5, text: "Alhamdulillah, pengalaman umroh bersama MZM Tour sangat memuaskan. Pelayanan ramah dan pembimbing sangat membantu!", image: "https://i.pravatar.cc/150?img=12", date: "Jan 2026" },
    { id: "rev-2", name: "Siti Nurhaliza", location: "Bandung", rating: 5, text: "Perjalanan yang sangat berkesan! Semua sudah diatur dengan baik. Sangat recommended untuk yang ingin umroh bersama keluarga.", image: "https://i.pravatar.cc/150?img=45", date: "Des 2025" },
    { id: "rev-3", name: "Rizki Ramadhan", location: "Surabaya", rating: 5, text: "MZM Tour pilihan terbaik! Harga transparan, pelayanan maksimal, bimbingan ibadah sangat membantu selama di Tanah Suci.", image: "https://i.pravatar.cc/150?img=33", date: "Nov 2025" },
    { id: "rev-4", name: "Fatimah Zahra", location: "Yogyakarta", rating: 5, text: "Terima kasih MZM Tour sudah membantu mewujudkan impian saya untuk beribadah di tanah suci. Semua fasilitas sangat baik!", image: "https://i.pravatar.cc/150?img=27", date: "Okt 2025" },
    { id: "rev-5", name: "Hendra Wijaya", location: "Medan", rating: 5, text: "Pelayanan profesional dari awal hingga akhir. Tim MZM Tour sangat responsif. Pasti akan merekomendasikan ke keluarga!", image: "https://i.pravatar.cc/150?img=51", date: "Sep 2025" },
    { id: "rev-6", name: "Dewi Lestari", location: "Semarang", rating: 5, text: "Pengalaman tak terlupakan! Hotel dekat Masjidil Haram, makanan enak, guide berpengalaman. Jazakallah MZM Tour!", image: "https://i.pravatar.cc/150?img=20", date: "Agu 2025" },
    { id: "rev-7", name: "Budi Santoso", location: "Makassar", rating: 5, text: "MZM Tour luar biasa! Dari pendaftaran hingga kepulangan semuanya terorganisir dengan sangat baik. Recommended!", image: "https://i.pravatar.cc/150?img=60", date: "Jul 2025" },
    { id: "rev-8", name: "Rina Kartika", location: "Palembang", rating: 5, text: "Alhamdulillah ibadah umroh kami berjalan lancar. Terima kasih MZM Tour atas pelayanan dan bimbingannya yang tulus.", image: "https://i.pravatar.cc/150?img=35", date: "Jun 2025" },
];

export function getAllReviews(): Review[] { return reviewsData; }
export function saveReviews(newReviews: Review[]) { reviewsData = newReviews; }
export function addReview(review: Omit<Review, "id">) {
    const newReview = { ...review, id: `rev-${Date.now()}` };
    reviewsData = [newReview, ...reviewsData];
    return newReview;
}
export function deleteReview(id: string) { reviewsData = reviewsData.filter(r => r.id !== id); }
export function updateReview(id: string, updatedData: Partial<Review>) {
    reviewsData = reviewsData.map(r => r.id === id ? { ...r, ...updatedData } : r);
}
