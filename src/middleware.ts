import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

// Initialize the edge-compatible auth wrapper
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;

  // 1. Belum login
  if (!session) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // 2. Dashboard admin check
  if (
    pathname.startsWith("/dashboard/admin") &&
    session.user?.role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/user", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  // This will only run the middleware on dashboard routes
  matcher: ["/dashboard/:path*"],
};