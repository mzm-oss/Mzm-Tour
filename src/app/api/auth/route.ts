import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

/** GET /api/auth — check if the current session cookie is valid */
export async function GET(req: NextRequest) {
    const authenticated = await verifySession(req);
    return NextResponse.json({ authenticated });
}
