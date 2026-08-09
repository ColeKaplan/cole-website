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
    <html lang="en" className="m-0 p-0">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>

        <script defer src="https://stats.colekaplan.dev/script.js" data-website-id="506e9d06-ba8e-41e9-acc1-7f8a670090eb"></script>
      </head>
      <body className={`${inter.className} bg-slate-500 overscroll-none  text-[#000000]`}>
        
        {children}
      </body>
    </html>
  );
}
