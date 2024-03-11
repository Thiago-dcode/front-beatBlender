import { beatFetcher } from "@/lib/core/httpClient";
import { InternalError } from "@/lib/exceptions/exceptions";
import { verifyJwt } from "@/lib/utils";
import { UserWithToken } from "@/types";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function refreshToken(jwt: string) {
  const secret = process.env.JWT_KEY;

  if (!secret) {
    throw new InternalError("JWT SECRET IS MISSING");
  }
  const isValidJwt = await verifyJwt(jwt, secret);
  if (isValidJwt) {
    beatFetcher.setHeaders({
      Authorization: `Bearer ${jwt}`,
    });

    return;
  }

  try {
    const newToken = await beatFetcher.get("/refresh-token");
  } catch (error) {
    await signOut();
    redirect("/login");
  }
}
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
        cookies().set("jwt-token", jwt, {
          httpOnly: true,
          secure: true,
        });
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
        const { username, email, id, jwt, avatar } = user;

        return { ...token, username, email, id, jwt, avatar };
      }

      await refreshToken(token.jwt);
      return token;
    },
    async session({ session, token }) {
      const { email, jwt, username, name, avatar } = token;

      return {
        ...session,
        user: {
          id: session.user.id,
          email,
          jwt,
          username,
          name,
          avatar,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
