import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // 1. ADMIN ROUTES - HARUS LOGIN + ADMIN
    if (pathname.startsWith("/admin")) {
        const token = await getToken({ 
            req: request, 
            secret: process.env.NEXTAUTH_SECRET 
        });
        
        if (!token) {
            // Belum login → ke login
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURIComponent(request.url));
            return NextResponse.redirect(url);
        }
        
        if (token.role !== "admin") {
            // Sudah login tapi bukan admin → ke home
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

   if (pathname.startsWith("/editor")) {
    const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token) {
        const url = new URL("/auth/login", request.url);
        url.searchParams.set("callbackUrl", encodeURIComponent(request.url));
        return NextResponse.redirect(url);
    }
    
    // Pastikan role dicek dengan benar
    const role = token.role as string;
    if (!["admin", "editor"].includes(role)) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}
    
    // 2. AUTH ROUTES - HARUS LOGIN SAJA (/produk, /about, /profile)
    if (["/produk", "/about", "/profile"].includes(pathname)) {
        const token = await getToken({ 
            req: request, 
            secret: process.env.NEXTAUTH_SECRET 
        });
        
        if (!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURIComponent(request.url));
            return NextResponse.redirect(url);
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/produk", "/about", "/profile", "/editor/:path*"],
};