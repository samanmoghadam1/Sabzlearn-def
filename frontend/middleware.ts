import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl; 

    if (pathname.startsWith('/dashboard')) {
        

    }
    return NextResponse.next(); 
}

export const config = {
    matcher: ['/dash/:path*']
}
