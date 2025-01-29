import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "../globals.css";

import { Header } from "../../components/Header"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserrat.variable} antialiased h-full min-h-screen bg-blue-500`}
      >
          <header>
            <Header />
          </header>

          <main className="relative pt-16 w-full h-full">
            {children}
          </main>
      </body>
    </html>
  );
}
