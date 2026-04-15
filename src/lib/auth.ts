import { NextRequest } from "next/server";
import { supabaseAdmin } from "./supabase";

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

/** Create a new session token stored in Supabase. Returns the token. */
export async function createSession(): Promise<string> {
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
    await supabaseAdmin
        .from("admin_sessions")
        .insert({ token, expires_at: expiresAt });
    return token;
}

/** Returns true if request carries a valid unexpired session token in Supabase. */
export async function verifySession(req: NextRequest): Promise<boolean> {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return false;

    const { data, error } = await supabaseAdmin
        .from("admin_sessions")
        .select("expires_at")
        .eq("token", token)
        .single();

    if (error || !data) return false;
    if (new Date(data.expires_at) < new Date()) {
        // Expired: clean it up
        await supabaseAdmin.from("admin_sessions").delete().eq("token", token);
        return false;
    }
    return true;
}

/** Revoke a specific session token (logout). */
export async function revokeSession(token: string): Promise<void> {
    await supabaseAdmin.from("admin_sessions").delete().eq("token", token);
}

// ─── Login rate limiter (still in-memory, this is fine — it's per cold start) ───
const globalLogins = (globalThis as any)._adminLogins || new Map<string, { count: number; lockedUntil: number }>();
(globalThis as any)._adminLogins = globalLogins;
const loginAttempts: Map<string, { count: number; lockedUntil: number }> = globalLogins;

function getLockoutSeconds(attemptCount: number): number {
    if (attemptCount <= 3) return 0;
    if (attemptCount === 4) return 1 * 60;
    if (attemptCount === 5) return 5 * 60;
    return 15 * 60;
}

export function checkLoginRateLimit(ip: string): number {
    const now = Date.now();
    const record = loginAttempts.get(ip);

    if (!record) {
        loginAttempts.set(ip, { count: 1, lockedUntil: 0 });
        return 0;
    }

    if (record.lockedUntil > now) {
        return Math.ceil((record.lockedUntil - now) / 1000);
    }

    record.count++;
    const lockSecs = getLockoutSeconds(record.count);
    record.lockedUntil = lockSecs > 0 ? now + lockSecs * 1000 : 0;
    return 0;
}

export function resetLoginRateLimit(ip: string): void {
    loginAttempts.delete(ip);
}
