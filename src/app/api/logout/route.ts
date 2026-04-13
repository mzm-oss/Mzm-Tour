import { NextRequest, NextResponse } from "next/server";
import { revokeSession, SESSION_COOKIE } from "@/lib/auth";

/** POST /api/logout — invalidate the session and clear the cookie */
export async function POST(req: NextRequest) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (token) revokeSession(token);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0, // Immediately expire the cookie
    });
    return res;
}
