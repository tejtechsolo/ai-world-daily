import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authSecret = process.env.AUTH_SECRET;

if (process.env.NODE_ENV === "production" && !authSecret) {
  throw new Error("AUTH_SECRET must be configured in production.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret || "local-development-only-change-me",
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: { signIn: "/admin/login" },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
