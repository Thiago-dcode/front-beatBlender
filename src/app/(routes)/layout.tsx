import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Main from "@/components/wrapper/Main";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function publicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //await for the session


  return (
    <>
      <header>NAVIGATION</header>
      <Main>{children}</Main>
    </>
  );
}
