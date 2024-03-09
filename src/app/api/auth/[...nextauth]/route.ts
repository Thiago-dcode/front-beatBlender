import { beatFetcher } from "@/lib/core/httpClient";
import { UserWithToken } from "@/types";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const result: UserWithToken = await beatFetcher.post("auth/login", {
          username: credentials?.username,
          password: credentials?.password,
        });
        const { email, avatarUrl, id, username } = result.user;
        const jwt = result.accessToken;
        return {
          email,
          avatar: avatarUrl,
          id,
          username,
          jwt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { username, email, id, jwt,avatar } = user;
        return { ...token, username, email, id, jwt,avatar };
      }
      return token;
    },
    async session({ session, token }) {
      const { email, jwt, username, name ,avatar} = token;
    return {
        ...session,
        user: {
          id: session.user.id,
          email,
          jwt,
          username,
          name,
          avatar
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
