import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkLoginRateLimit, createSession, resetLoginRateLimit, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
    // 1. Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || req.headers.get("x-real-ip")
        || "unknown";

    const lockoutSeconds = checkLoginRateLimit(ip);
    if (lockoutSeconds > 0) {
        return NextResponse.json(
            { error: "too_many_attempts", retryAfterSeconds: lockoutSeconds },
            { status: 429 }
        );
    }

    // 2. Parse & validate body
    let body: { username?: unknown; password?: unknown };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const username = typeof body.username === "string" ? body.username.slice(0, 64).trim() : "";
    const password = typeof body.password === "string" ? body.password.slice(0, 64) : "";

    if (!username || !password) {
        return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    // 3. Check credentials against DB (server-side only — password never reaches client)
    const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("username", username)
        .eq("password", password)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
    }

    // 4. Success — create session, reset rate limit, set HttpOnly cookie
    resetLoginRateLimit(ip);
    const token = await createSession();

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 8 * 60 * 60, // 8 hours in seconds
        // secure: true — enable this in production (requires HTTPS)
    });
    return res;
}
