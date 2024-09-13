import { NextRequest, NextResponse } from "next/server";
import { useCookies } from "next-client-cookies";
import { redirect, useRouter } from "next/navigation";

// 1. Specify protected and public routes
const protectedRoutes = ["/profile", "/cart", "/wishlist"];
const publicRoutes = !protectedRoutes;

export default async function middleware(req: NextRequest) {
  const router = useRouter();

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes;

  const cookie = useCookies();
  const refreshToken = cookie.get("refresh-token");

  if (isProtectedRoute && !refreshToken) {
    router.push("/login");
  }

  if (
    isPublicRoute &&
    refreshToken &&
    !req.nextUrl.pathname.startsWith("/profile")
  ) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
