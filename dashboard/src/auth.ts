import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import { getServerTokenFromCookie } from "@/lib/auth/server-token";

declare module "next-auth" {
  interface Session {
    user: User & { githubProfile: any };
    acessToken: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.NEXT_SECRET!,
  callbacks: {
    async jwt({ token, profile }) {
      return { githubProfile: profile, ...token };
    },
    async session({ session, token }) {
      session.user.githubProfile = token.githubProfile;
      
      const refinedAcessToken = await getServerTokenFromCookie();

      if (refinedAcessToken != null) {
        session.acessToken = refinedAcessToken;
      }
      return session;
    },
  },
});
