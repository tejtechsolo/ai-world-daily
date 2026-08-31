import { auth } from "./auth";

// Protect only the authenticated admin area. The login page is intentionally
// excluded from the matcher so unauthenticated users can reach it without a
// redirect loop.
export default auth;

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
