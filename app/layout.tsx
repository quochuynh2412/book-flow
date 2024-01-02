import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LoadSession from "@/components/load-session";
import Script from "next/script";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookflow",
  description: "A reliable and user-friendly book review platform for the Vietnamese market. Built by Vietnamese people, for Vietnamese people.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className={`${inter.className} min-h-screen`}>
      <LoadSession />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
          <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Ramaraja&display=swap" rel="stylesheet"></link>
        </Head>
        <main>
          {children}</main>
        <Toaster />
      </body>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries"></Script>
    </html>
  );
}
