import { beatFetcher } from "@/lib/core/httpClient";
import { InternalError } from "@/lib/exceptions/exceptions";
import { verifyJwt } from "@/lib/utils";
import { RefreshToken, UserWithToken } from "@/types";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

// async function refreshToken(jwt: string): Promise<string> {
//   const secret = process.env.JWT_KEY;

//   if (!secret) {
//     throw new InternalError("JWT SECRET IS MISSING");
//   }
//   const isValidJwt = await verifyJwt(jwt, secret);
//   if (isValidJwt) return jwt;
//   const refreshTokenCookie = cookies().get("refresh-token");
//   try {
//     const { accessToken, newRefreshToken }: RefreshToken =
//       await beatFetcher.post("/auth/refresh-token", {
//         "refresh-token": refreshTokenCookie?.value || "",
//       });
//     return accessToken;
//   } catch (error) {
//     console.log("REFRESH TOKEN ERROR,", error);
//   }

//   return "";
//   //
//   // console.log('refreshTokenCookie',refreshTokenCookie)
//   // try {
//   //
//   //   const {accessToken,newRefreshToken}: RefreshToken = await beatFetcher.post("/auth/refresh-token", {
//   //     "refresh-token": refreshTokenCookie?.value,
//   //   });
//   //   console.log('NEW TOKEN', accessToken)
//   //   cookies().set("refresh-token", newRefreshToken, {
//   //     httpOnly: true,
//   //     secure: true,
//   //   });
//   //   return accessToken;
//   // } catch (error) {
//   //   console.log("Error refreshing token", error);
//   //   await signOut();
//   //   redirect("/login");
//   // }
// }
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
        console.log("------LOGGED IN SUCCESFULLY------");
        const refreshToken = result.refreshToken;
        cookies().set("refresh-token", refreshToken, {
          httpOnly: true,
          secure: true,
        });
        cookies().set("access-token", jwt, {
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
  events: {
    signOut: () => {
      console.log("SIGN OUT EVENT TRIGGERED");
      cookies().delete("access-token");
      cookies().delete("refresh-token");
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
