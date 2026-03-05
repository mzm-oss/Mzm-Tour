// Tipe data paket
export type Paket = {
    id: string;
    kategori: "umroh" | "haji" | "wisata";
    tipeUmroh?: "reguler" | "plus"; // Khusus Umroh
    nama: string;
    harga: string;           // harga dasar/mulai dari
    durasi: string;
    jadwal?: string;
    badge: string;
    badgeColor: string;
    fasilitas: string[];
    deskripsi: string;
    image?: string;
    // Hotel info
    hotelMekkahBintang?: number;
    // Info tambahan
    maskapai?: string;         // cth: "Garuda Indonesia"
    kotaAsal?: string;         // cth: "Jakarta (CGK)"
    tanggalBerangkat?: { tanggal: string; status: "tersedia" | "terbatas" | "full" | "berangkat" }[];
    statusPublish?: "Tersedia" | "Sudah Berangkat";
};

// Fallback image per kategori
export const FALLBACK_IMAGES: Record<Paket["kategori"], string> = {
    umroh: "/img/umroh-card.png",
    haji: "/img/haji-card.png",
    wisata: "/img/wisata-islam-card.png",
};

// Data paket default (dipakai untuk seed Supabase)
export const defaultPakets: Paket[] = [
    // UMROH
    {
        id: "umr-001",
        kategori: "umroh",
        tipeUmroh: "reguler",
        nama: "Umroh Reguler 9 Hari",
        harga: "Rp 25.000.000",
        durasi: "9 Hari",
        jadwal: "Setiap Bulan",
        tanggalBerangkat: [
            { tanggal: "2024-10-12", status: "berangkat" },
            { tanggal: "2024-11-09", status: "berangkat" },
            { tanggal: "2024-12-14", status: "berangkat" },
            { tanggal: "2025-01-11", status: "full" },
            { tanggal: "2025-02-08", status: "full" },
            { tanggal: "2025-03-15", status: "berangkat" },
            { tanggal: "2025-04-12", status: "terbatas" },
            { tanggal: "2025-05-10", status: "tersedia" },
            { tanggal: "2025-06-14", status: "tersedia" },
            { tanggal: "2025-07-12", status: "tersedia" },
        ],
        badge: "TERLARIS",
        badgeColor: "#008080",
        image: "/img/umroh-reguler.png",
        maskapai: "Garuda Indonesia",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 4,
        fasilitas: ["Hotel Bintang 4", "Penerbangan Direct", "Muthawif Berpengalaman", "Visa Umroh", "Makan 3x/hari"],
        deskripsi: "Paket umroh reguler dengan fasilitas lengkap dan pembimbing berpengalaman untuk ibadah yang khusyuk dan nyaman bersama MZM Travel.",
        statusPublish: "Tersedia",
    },
    {
        id: "umr-002",
        kategori: "umroh",
        tipeUmroh: "plus",
        nama: "Umroh Plus Turki",
        harga: "Rp 38.000.000",
        durasi: "14 Hari",
        jadwal: "April & Oktober 2025",
        tanggalBerangkat: [
            { tanggal: "2024-10-10", status: "berangkat" },
            { tanggal: "2025-04-15", status: "terbatas" },
            { tanggal: "2025-10-08", status: "tersedia" },
        ],
        badge: "POPULER",
        badgeColor: "#6366f1",
        image: "/img/umroh-turki.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 5,
        fasilitas: ["Hotel Bintang 5", "Wisata Turki 3 Hari", "Penerbangan Direct", "Visa Umroh + Turki", "Makan 3x/hari"],
        deskripsi: "Umroh sekalian wisata ke Istanbul, Cappadocia, dan kota-kota bersejarah indah di Turki.",
        statusPublish: "Tersedia",
    },
    {
        id: "umr-003",
        kategori: "umroh",
        tipeUmroh: "reguler",
        nama: "Umroh Premium Ramadhan",
        harga: "Rp 45.000.000",
        durasi: "12 Hari",
        jadwal: "Ramadhan 1446 H",
        tanggalBerangkat: [
            { tanggal: "2025-03-01", status: "full" },
        ],
        badge: "EKSKLUSIF",
        badgeColor: "#c97d20",
        image: "/img/umroh-ramadhan.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 5,
        fasilitas: ["Hotel Bintang 5 Adjacent Masjidil Haram", "Penerbangan Business", "Muthawif Khusus", "Sahur & Buka Puasa", "City Tour Madinah"],
        deskripsi: "Rasakan keistimewaan beribadah di Mekkah pada bulan Ramadhan dengan fasilitas eksklusif premium.",
        statusPublish: "Tersedia",
    },
    {
        id: "umr-004",
        kategori: "umroh",
        tipeUmroh: "reguler",
        nama: "Umroh Hemat Keluarga",
        harga: "Rp 22.500.000",
        durasi: "9 Hari",
        jadwal: "Setiap Bulan",
        tanggalBerangkat: [
            { tanggal: "2024-11-15", status: "berangkat" },
            { tanggal: "2024-12-20", status: "berangkat" },
            { tanggal: "2025-01-17", status: "berangkat" },
            { tanggal: "2025-02-14", status: "full" },
            { tanggal: "2025-03-21", status: "full" },
            { tanggal: "2025-04-18", status: "tersedia" },
            { tanggal: "2025-05-16", status: "tersedia" },
            { tanggal: "2025-06-20", status: "tersedia" },
        ],
        badge: "HEMAT",
        badgeColor: "#16a34a",
        image: "/img/umroh-card.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 3,
        fasilitas: ["Hotel Bintang 3", "Penerbangan Transit", "Muthawif Berpengalaman", "Visa Umroh", "Makan 2x/hari"],
        deskripsi: "Paket umroh terjangkau untuk keluarga dengan pelayanan terbaik dan harga yang bersahabat.",
        statusPublish: "Tersedia",
    },
    // HAJI
    {
        id: "haj-001",
        kategori: "haji",
        nama: "Haji Furoda 2025",
        harga: "Rp 250.000.000",
        durasi: "40 Hari",
        jadwal: "Dzulhijjah 1446 H / 2025 M",
        tanggalBerangkat: [
            { tanggal: "2024-06-15", status: "berangkat" },
            { tanggal: "2025-06-05", status: "terbatas" },
        ],
        badge: "TANPA ANTRI",
        badgeColor: "#c97d20",
        image: "/img/haji-furoda.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 5,
        fasilitas: ["Visa Furoda Resmi", "Hotel Bintang 5 Mekkah & Madinah", "Transportasi VIP", "Pembimbing Pribadi", "Makan 3x/hari"],
        deskripsi: "Berangkat haji tahun ini tanpa antrian panjang dengan visa furoda (mujamalah) yang resmi dan legal.",
        statusPublish: "Tersedia",
    },
    {
        id: "haj-002",
        kategori: "haji",
        nama: "Haji Plus ONH+",
        harga: "Rp 180.000.000",
        durasi: "26 Hari",
        jadwal: "Dzulhijjah 1446 H / 2025 M",
        tanggalBerangkat: [
            { tanggal: "2024-06-13", status: "berangkat" },
            { tanggal: "2025-06-03", status: "tersedia" },
        ],
        badge: "REKOMENDASI",
        badgeColor: "#008080",
        image: "/img/haji-card.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 5,
        fasilitas: ["Hotel Bintang 5", "Penerbangan First Class", "Muthawif Berpengalaman", "Ziarah Lengkap", "Makan 3x/hari"],
        deskripsi: "Haji plus dengan fasilitas mewah dan layanan VIP untuk pengalaman ibadah yang tak terlupakan.",
        statusPublish: "Tersedia",
    },
    {
        id: "haj-003",
        kategori: "haji",
        nama: "Haji Reguler Khusus",
        harga: "Rp 95.000.000",
        durasi: "40 Hari",
        jadwal: "Antrian Reguler Kemenag",
        tanggalBerangkat: [],
        badge: "RESMI KEMENAG",
        badgeColor: "#1a6fb0",
        image: "/img/haji-card.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 3,
        fasilitas: ["Hotel Bintang 3", "Penerbangan Kelas Ekonomi", "Muthawif Berpengalaman", "Bimbingan Manasik", "Makan 2x/hari"],
        deskripsi: "Haji reguler resmi melalui Kementerian Agama RI dengan antrean prioritas jamaah terdaftar.",
        statusPublish: "Tersedia",
    },
    // WISATA
    {
        id: "wis-001",
        kategori: "wisata",
        nama: "Wisata Islam Turki 10 Hari",
        harga: "Rp 28.000.000",
        durasi: "10 Hari",
        jadwal: "Setiap Bulan",
        tanggalBerangkat: [
            { tanggal: "2024-12-22", status: "berangkat" },
            { tanggal: "2025-01-19", status: "berangkat" },
            { tanggal: "2025-04-20", status: "tersedia" },
            { tanggal: "2025-05-18", status: "tersedia" },
            { tanggal: "2025-06-22", status: "tersedia" },
        ],
        badge: "TERLARIS",
        badgeColor: "#008080",
        image: "/img/umroh-turki.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 0,
        fasilitas: ["Hotel Bintang 4", "Full AC Bus", "Tour Leader Berpengalaman", "Visa Turki", "Tiket Landmark"],
        deskripsi: "Jelajahi Istanbul, Hagia Sophia, Topkapi Palace, Cappadocia dan kota-kota bersejarah indah Turki.",
        statusPublish: "Tersedia",
    },
    {
        id: "wis-002",
        kategori: "wisata",
        nama: "Wisata Islam Mesir 8 Hari",
        harga: "Rp 24.000.000",
        durasi: "8 Hari",
        jadwal: "Setiap 2 Bulan",
        tanggalBerangkat: [
            { tanggal: "2024-08-23", status: "berangkat" },
            { tanggal: "2024-10-25", status: "berangkat" },
            { tanggal: "2025-04-25", status: "tersedia" },
            { tanggal: "2025-06-27", status: "tersedia" },
        ],
        badge: "POPULER",
        badgeColor: "#6366f1",
        image: "/img/wisata-mesir.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 0,
        fasilitas: ["Hotel Bintang 4", "Panduan Lokal", "Tour Leader", "Visa Mesir", "Tiket Piramida & Museum"],
        deskripsi: "Kunjungi Kairo, Piramida Giza, Museum Peradaban, Masjid Al-Azhar, dan Sungai Nil yang bersejarah.",
        statusPublish: "Tersedia",
    },
    {
        id: "wis-003",
        kategori: "wisata",
        nama: "Wisata Islam Maroko 12 Hari",
        harga: "Rp 35.000.000",
        durasi: "12 Hari",
        jadwal: "Triwulan 2025",
        tanggalBerangkat: [
            { tanggal: "2025-01-05", status: "berangkat" },
            { tanggal: "2025-04-01", status: "terbatas" },
            { tanggal: "2025-07-01", status: "tersedia" },
            { tanggal: "2025-10-01", status: "tersedia" },
        ],
        badge: "EKSKLUSIF",
        badgeColor: "#c97d20",
        image: "/img/wisata-maroko.png",
        kotaAsal: "Jakarta (CGK)",
        hotelMekkahBintang: 0,
        fasilitas: ["Hotel Bintang 4-5", "Private Tour", "Tour Leader", "Visa Maroko", "Semua Wahana Wisata"],
        deskripsi: "Eksplorasi pesona Casablanca, Fez, Marrakech, Sahara dan kota-kota bersejarah Maroko.",
        statusPublish: "Tersedia",
    },
];

// ─── Async Supabase Functions ────────────────────────────────────────────────

export async function getAllPaketsAsync(): Promise<Paket[]> {
    const res = await fetch("/api/pakets", { cache: "no-store" });
    if (!res.ok) return defaultPakets;
    return res.json();
}

export async function getPaketsByKategoriAsync(kategori: Paket["kategori"]): Promise<Paket[]> {
    const all = await getAllPaketsAsync();
    return all.filter(p => p.kategori === kategori);
}

export async function createPaketAsync(paket: Omit<Paket, "id">): Promise<Paket> {
    const res = await fetch("/api/pakets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paket),
    });
    return res.json();
}

export async function updatePaketAsync(id: string, paket: Partial<Paket>): Promise<Paket> {
    const res = await fetch("/api/pakets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...paket }),
    });
    return res.json();
}

export async function deletePaketAsync(id: string): Promise<void> {
    await fetch(`/api/pakets?id=${id}`, { method: "DELETE" });
}

// ─── Legacy sync fallback (deprecated) ──────────────────────────────────────
const STORAGE_KEY = "mzm_pakets";

export function getAllPakets(): Paket[] {
    if (typeof window === "undefined") return defaultPakets;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return defaultPakets;
        return JSON.parse(stored);
    } catch {
        return defaultPakets;
    }
}

export function savePakets(pakets: Paket[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pakets));
}

export function getPaketsByKategori(kategori: Paket["kategori"]): Paket[] {
    return getAllPakets().filter((p) => p.kategori === kategori);
}
