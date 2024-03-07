import { UserWithToken } from "@/types";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    avatar:string;
    id: number;
    username: string;
    email: string;
    jwt: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    avatar:string;
    username: string;
    email: string;
    jwt: string;
  }
}
