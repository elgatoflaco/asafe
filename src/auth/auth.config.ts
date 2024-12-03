import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User, Account, Profile, Session } from "next-auth";

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
    jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    signIn({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      account,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }) {
      return true;
    },
  },
  providers: [], // Los proveedores se configuran en auth.ts
};
