import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    const { data, error } = await supabase
        .from("global_settings")
        .select("*")
        .eq("id", 1)
        .single();

    if (error) {
        return NextResponse.json({ reviews_enabled: true }); // Default jika tabel belum ada
    }

    return NextResponse.json(data);
}

import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
    if (!verifySession(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const { reviews_enabled } = body;

    // Gunakan supabaseAdmin (Service Role) untuk bypass RLS pada tabel global_settings
    const { data, error } = await supabaseAdmin
        .from("global_settings")
        .upsert({ id: 1, reviews_enabled })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Revalidasi homepage agar tombol form langsung hilang/muncul
    revalidatePath("/");

    return NextResponse.json(data);
}
