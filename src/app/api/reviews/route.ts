import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

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
    const body = await req.json();
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
        name: body.name,
        location: body.location || "",
        rating: body.rating || 5,
        text: body.text,
        image: finalImageUrl,
        date: body.date || new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric' }).format(new Date()),
    };

    const { data, error } = await supabase.from("reviews").insert([review]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// PUT /api/reviews
export async function PUT(req: NextRequest) {
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
    return NextResponse.json(data);
}

// DELETE /api/reviews?id=xxx
export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
}
