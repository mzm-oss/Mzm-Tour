import { NextRequest } from "next/server";

// ─── In-memory session store ─────────────────────────────────────────────────
const globalSessions = (globalThis as any)._adminSessions || new Map<string, number>();
(globalThis as any)._adminSessions = globalSessions;

const sessions: Map<string, number> = globalSessions; // token → expiresAt (ms)
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
export const SESSION_COOKIE = "admin_session";

/** Create a new session token and store it. Returns the token. */
export function createSession(): string {
    const now = Date.now();
    // Prune expired sessions
    for (const [token, exp] of sessions.entries()) {
        if (exp < now) sessions.delete(token);
    }
    const token = crypto.randomUUID();
    sessions.set(token, now + SESSION_TTL_MS);
    return token;
}

/** Returns true if the request carries a valid unexpired session cookie. */
export function verifySession(req: NextRequest): boolean {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return false;
    const exp = sessions.get(token);
    if (!exp) return false;
    if (exp < Date.now()) { sessions.delete(token); return false; }
    return true;
}

/** Revoke a specific session token (logout). */
export function revokeSession(token: string): void {
    sessions.delete(token);
}

// ─── Login rate limiter ───────────────────────────────────────────────────────
const globalLogins = (globalThis as any)._adminLogins || new Map<string, { count: number; lockedUntil: number }>();
(globalThis as any)._adminLogins = globalLogins;
const loginAttempts: Map<string, { count: number; lockedUntil: number }> = globalLogins;

// Progressive lockout: attempt 1-3 = free, 4 = 1 min, 5 = 5 min, 6+ = 15 min
function getLockoutSeconds(attemptCount: number): number {
    if (attemptCount <= 3) return 0;
    if (attemptCount === 4) return 1 * 60;   // 1 menit
    if (attemptCount === 5) return 5 * 60;   // 5 menit
    return 15 * 60;                           // 15 menit
}

/**
 * Tracks login attempts by IP.
 * Returns seconds remaining in lockout, or 0 if the attempt is allowed.
 */
export function checkLoginRateLimit(ip: string): number {
    const now = Date.now();
    const record = loginAttempts.get(ip);

    if (!record) {
        loginAttempts.set(ip, { count: 1, lockedUntil: 0 });
        return 0;
    }

    // Still locked out?
    if (record.lockedUntil > now) {
        return Math.ceil((record.lockedUntil - now) / 1000);
    }

    // Lockout expired — increment and apply next tier
    record.count++;
    const lockSecs = getLockoutSeconds(record.count);
    record.lockedUntil = lockSecs > 0 ? now + lockSecs * 1000 : 0;
    return 0;
}

/** Reset the rate limit counter for an IP (call on successful login). */
export function resetLoginRateLimit(ip: string): void {
    loginAttempts.delete(ip);
}
