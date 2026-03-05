import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultPakets } from "@/lib/packagesData";

const defaultReviews = [
    { id: "rev-1", name: "Ahmad Hidayat", location: "Jakarta", rating: 5, text: "Alhamdulillah, pengalaman umroh bersama MZM Tour sangat memuaskan. Pelayanan ramah dan pembimbing sangat membantu!", image: "https://i.pravatar.cc/150?img=12", date: "Jan 2026" },
    { id: "rev-2", name: "Siti Nurhaliza", location: "Bandung", rating: 5, text: "Perjalanan yang sangat berkesan! Semua sudah diatur dengan baik. Sangat recommended untuk yang ingin umroh bersama keluarga.", image: "https://i.pravatar.cc/150?img=45", date: "Des 2025" },
    { id: "rev-3", name: "Rizki Ramadhan", location: "Surabaya", rating: 5, text: "MZM Tour pilihan terbaik! Harga transparan, pelayanan maksimal, bimbingan ibadah sangat membantu selama di Tanah Suci.", image: "https://i.pravatar.cc/150?img=33", date: "Nov 2025" },
    { id: "rev-4", name: "Fatimah Zahra", location: "Yogyakarta", rating: 5, text: "Terima kasih MZM Tour sudah membantu mewujudkan impian saya untuk beribadah di tanah suci. Semua fasilitas sangat baik!", image: "https://i.pravatar.cc/150?img=27", date: "Okt 2025" },
    { id: "rev-5", name: "Hendra Wijaya", location: "Medan", rating: 5, text: "Pelayanan profesional dari awal hingga akhir. Tim MZM Tour sangat responsif. Pasti akan merekomendasikan ke keluarga!", image: "https://i.pravatar.cc/150?img=51", date: "Sep 2025" },
    { id: "rev-6", name: "Dewi Lestari", location: "Semarang", rating: 5, text: "Pengalaman tak terlupakan! Hotel dekat Masjidil Haram, makanan enak, guide berpengalaman. Jazakallah MZM Tour!", image: "https://i.pravatar.cc/150?img=20", date: "Agu 2025" },
    { id: "rev-7", name: "Budi Santoso", location: "Makassar", rating: 5, text: "MZM Tour luar biasa! Dari pendaftaran hingga kepulangan semuanya terorganisir dengan sangat baik. Recommended!", image: "https://i.pravatar.cc/150?img=60", date: "Jul 2025" },
    { id: "rev-8", name: "Rina Kartika", location: "Palembang", rating: 5, text: "Alhamdulillah ibadah umroh kami berjalan lancar. Terima kasih MZM Tour atas pelayanan dan bimbingannya yang tulus.", image: "https://i.pravatar.cc/150?img=35", date: "Jun 2025" },
];

export async function GET() {
    const errors: string[] = [];

    const paketRows = defaultPakets.map(p => ({
        id: p.id,
        kategori: p.kategori,
        tipe_umroh: p.tipeUmroh ?? null,
        nama: p.nama,
        harga: p.harga,
        durasi: p.durasi,
        jadwal: p.jadwal ?? null,
        badge: p.badge,
        badge_color: p.badgeColor,
        fasilitas: p.fasilitas ?? [],
        deskripsi: p.deskripsi,
        image: p.image ?? null,
        hotel_mekkah_bintang: p.hotelMekkahBintang ?? 4,
        maskapai: p.maskapai ?? null,
        kota_asal: p.kotaAsal ?? null,
        status_publish: p.statusPublish ?? "Tersedia",
        tanggal_berangkat: p.tanggalBerangkat ?? [],
    }));

    const { error: pErr } = await supabase
        .from("pakets")
        .upsert(paketRows, { onConflict: "id" });
    if (pErr) errors.push(`Pakets: ${pErr.message}`);

    const { error: rErr } = await supabase
        .from("reviews")
        .upsert(defaultReviews, { onConflict: "id" });
    if (rErr) errors.push(`Reviews: ${rErr.message}`);

    if (errors.length > 0) {
        return NextResponse.json({ ok: false, errors }, { status: 500 });
    }

    return NextResponse.json({
        ok: true,
        message: `Seeded ${defaultPakets.length} pakets + ${defaultReviews.length} reviews ke Supabase!`
    });
}
