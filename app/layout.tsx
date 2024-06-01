import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cole Kaplan",
  description: "Cole's Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FEFEFE]  text-[#000000] overflow-hidden`}>
        <Header />
        {children}
        </body>
    </html>
  );
}
