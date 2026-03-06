import type { Paket } from "@/lib/packagesData";
import { supabase } from "@/lib/supabase";

function rowToPaket(row: Record<string, unknown>): Paket {
    return {
        id: row.id as string,
        kategori: row.kategori as Paket["kategori"],
        tipeUmroh: row.tipe_umroh as Paket["tipeUmroh"],
        nama: row.nama as string,
        harga: row.harga as string,
        durasi: row.durasi as string,
        jadwal: row.jadwal as string,
        badge: row.badge as string,
        badgeColor: row.badge_color as string,
        fasilitas: (row.fasilitas as string[]) || [],
        deskripsi: row.deskripsi as string,
        image: (row.image as string) ?? null,
        hotelMekkahBintang: row.hotel_mekkah_bintang as number,
        maskapai: row.maskapai as string,
        kotaAsal: row.kota_asal as string,
        statusPublish: row.status_publish as Paket["statusPublish"],
        tanggalBerangkat: (row.tanggal_berangkat as Paket["tanggalBerangkat"]) || [],
    };
}

// Fetch pakets menggunakan native fetch agar bisa memanfaatkan Next.js caching
// Data di-cache dan di-revalidate otomatis setiap 60 detik
export async function fetchPaketsServerSide(): Promise<Paket[]> {
    try {
        const columns = [
            "id", "kategori", "tipe_umroh", "nama", "harga", "durasi",
            "jadwal", "badge", "badge_color", "fasilitas", "deskripsi",
            "image", "hotel_mekkah_bintang", "maskapai", "kota_asal",
            "status_publish", "tanggal_berangkat"
        ].join(",");

        const { data, error } = await supabase
            .from("pakets")
            .select(columns)
            .order("created_at", { ascending: true })
            .limit(100);

        if (error) {
            console.error("Failed to fetch pakets via supabase client:", error.message);
            return [];
        }

        return ((data as unknown) as Record<string, unknown>[]).map(rowToPaket);
    } catch (err: any) {
        console.error("fetchPaketsServerSide error:", err);
        return [];
    }
}
