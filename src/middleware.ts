import NextAuth from "next-auth";
import { authConfig } from "./auth/auth.config";
import { NextResponse } from "next/server";

const auth = NextAuth(authConfig).auth;

export default auth(() => {
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
