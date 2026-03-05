import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
        return NextResponse.json({ valid: false }, { status: 400 });
    }

    // Cek ke tabel admin_users
    const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("username", username)
        .eq("password", password)
        .single();

    if (error || !data) {
        return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({ valid: true });
}
