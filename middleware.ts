import { NextResponse, type NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (token) {
    const decodedValue = jwt.decode(token);
  }
  const currentPath = request.nextUrl.pathname;

  const authRoutes = [
    "/login",
    "/admin",
    "/forgot-password",
    "/reset-password",
  ];

  if (currentPath === "/") {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  // Handle token presence and appropriate redirects
  if (token) {
    if (authRoutes.includes(currentPath)) {
      // If token exists and user is on /login, redirect to dashboard
      return Response.redirect(new URL("/dashboard", request.url));
    }
    // If token exists and user is on any other page (except /admin), stay there
    return NextResponse.next();
  } else {
    if (!authRoutes.includes(currentPath)) {
      // If no token and not on /login or /admin, redirect to login
      return Response.redirect(new URL("/login", request.url));
    }
    // If no token and on /login or /admin, stay there (allow access)
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
