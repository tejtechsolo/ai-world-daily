import { auth } from "./auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Keep the login page public; otherwise an unauthenticated request can be
  // redirected back to /admin/login indefinitely.
  if (pathname === "/admin/login") return;

  if (!req.auth) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
