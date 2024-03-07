import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Main from "@/components/wrapper/Main";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const isLoggedIn = false
export default async function publicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //await for the session

  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  } else {
    console.log('YOU ARE NOOT LOGGED IN!!')
  }

  return (
    <>
      <Main>{children}</Main>
    </>
  );
}
