import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import type { JWT } from "next-auth/jwt";
import type { User, Account, Profile, Session } from "next-auth";

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  ...authConfig,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({
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
      if (account?.provider === "google") {
        try {
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account && account.provider === "google") {
        token.googleId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
