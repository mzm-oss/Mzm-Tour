import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";

// Fungsi ringan untuk mencegah XSS tanpa membuat server crash
function escapeHTML(str: string) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

export const dynamic = 'force-dynamic';

// Simple in-memory rate limiting (per serverless instance)
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 menit
    const maxRequests = 3; // maksimal 3 request per menit per IP

    let record = rateLimitMap.get(ip);
    if (!record || record.resetTime < now) {
        record = { count: 1, resetTime: now + windowMs };
        rateLimitMap.set(ip, record);
        return true;
    }

    if (record.count >= maxRequests) {
        return false;
    }

    record.count += 1;
    return true;
}
// Helper untuk mengunggah gambar ke Storage
async function uploadImageToStorage(base64Data: string, reviewId: string): Promise<string | null> {
    try {
        const matches = base64Data.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) return null; // Bukan base64 valid

        const mimeType = matches[1];
        const ext = mimeType.split('/')[1] || 'png';
        const buffer = Buffer.from(matches[2], 'base64');
        const fileName = `rev-${reviewId}-${Date.now()}.${ext}`;

        const { error } = await supabase.storage
            .from('public-images')
            .upload(fileName, buffer, { contentType: mimeType, upsert: true });

        if (error) {
            console.error("Storage upload error:", error);
            return null;
        }

        const { data: publicUrlData } = supabase.storage
            .from('public-images')
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
    } catch (e) {
        console.error("Failed to upload image:", e);
        return null;
    }
}

// GET /api/reviews
export async function GET() {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase Error [Reviews]:", error);
        return NextResponse.json([]); // Return array kosong supaya Homepage tidak crash
    }
    return NextResponse.json(data || []);
}

// POST /api/reviews
export async function POST(req: NextRequest) {
    // 1. Cek Rate Limit berdasarkan IP atau User Agent sebagai fallback
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("user-agent") || 'unknown-ip';
    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
            { status: 429 } // 429 Too Many Requests
        );
    }

    // 2. Cek apakah Review sedang ditutup dari Admin (global_settings)
    // Jika tabel belum dibuat, akan mengembalikan error (dan kita abaikan/anggap true)
    const { data: settings } = await supabase
        .from("global_settings")
        .select("reviews_enabled")
        .eq("id", 1)
        .single();
        
    if (settings && settings.reviews_enabled === false) {
        return NextResponse.json(
            { error: "Pengiriman review saat ini sedang ditutup oleh Admin." },
            { status: 403 }
        );
    }

    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Validasi field utama
    if (!body || !body.name || !body.text) {
        return NextResponse.json({ error: "Kolom name dan text wajib diisi." }, { status: 400 });
    }

    // Sanitasi Text Mencegah Keisengan (XSS HTML/Simbol berbahaya) menggunakan regex escape ringan
    const cleanName = escapeHTML(body.name).trim();
    const cleanLocation = escapeHTML(body.location || "").trim();
    const cleanText = escapeHTML(body.text).trim();

    // Cek ulang setelah dibersihkan (kalau isi script iseng semua, pas dibersihkan jadi kosong)
    if (!cleanName || !cleanText) {
         return NextResponse.json({ error: "Input mengandung karakter tidak diizinkan." }, { status: 400 });
    }

    const id = `rev-${Date.now()}`;
    
    let finalImageUrl = body.image;
    if (finalImageUrl && finalImageUrl.startsWith("data:image")) {
        const uploadedUrl = await uploadImageToStorage(finalImageUrl, id);
        if (uploadedUrl) finalImageUrl = uploadedUrl;
    }
    
    if (!finalImageUrl) {
        finalImageUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
    }

    const review = {
        id,
        name: cleanName,
        location: cleanLocation,
        rating: body.rating || 5,
        text: cleanText,
        image: finalImageUrl,
        date: body.date || new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric' }).format(new Date()),
    };

    const { data, error } = await supabase.from("reviews").insert([review]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    // Perbarui cache halaman utama agar testimoni langsung muncul
    revalidatePath("/");
    
    return NextResponse.json(data);
}

// PUT /api/reviews
export async function PUT(req: NextRequest) {
    if (!verifySession(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const { id, created_at, ...rest } = body;
    void created_at;

    let finalImageUrl = rest.image;
    if (finalImageUrl && finalImageUrl.startsWith("data:image")) {
        const uploadedUrl = await uploadImageToStorage(finalImageUrl, id);
        if (uploadedUrl) finalImageUrl = uploadedUrl;
    } else if (finalImageUrl === "") {
        finalImageUrl = null;
    }
    rest.image = finalImageUrl;

    const { data, error } = await supabase.from("reviews").update(rest).eq("id", id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    revalidatePath("/");
    
    return NextResponse.json(data);
}

// DELETE /api/reviews?id=xxx
export async function DELETE(req: NextRequest) {
    if (!verifySession(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    revalidatePath("/");
    
    return NextResponse.json({ ok: true });
}
