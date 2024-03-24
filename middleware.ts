import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("user")?.value;
  console.log("user: ", currentUser, "req url:", request.nextUrl.pathname);
  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/overview", request.url));
  }
  if (currentUser && request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/overview", request.url));
  }
  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
