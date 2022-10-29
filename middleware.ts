// <root>/middleware.ts
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/lyrics")) {
        console.log("lyrics");
    }
}
