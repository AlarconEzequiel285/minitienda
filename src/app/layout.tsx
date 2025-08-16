import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Vollkorn } from '@next/font/google';

import "./globals.css";

const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-vollkorn',
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
  title: "Watermelon Sugar",
  description: "fashion or something like that?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vollkorn.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
