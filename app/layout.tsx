import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { decrypt } from "./_utils/crypto";
import { cookies } from "next/headers";
import Navigation from "@/components/ui/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const encryptedUser = cookies().get("user")?.value;
  const decryptedUser = encryptedUser && decrypt(encryptedUser);
  const user = decryptedUser && JSON.parse(decryptedUser).email;
  return (
    <html lang="en">
      <body className={inter.className + " dark "}>
        {user && <Navigation />}

        {children}
      </body>
    </html>
  );
}
