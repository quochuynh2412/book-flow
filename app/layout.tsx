import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LoadSession from "@/components/load-session";
import Script from "next/script";
import Head from "next/head";
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"], variable: '--font-roboto', display: 'swap' });

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

      <body className={`${roboto.className} min-h-screen`}>
        <LoadSession />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        </Head>
        <main>
          {children}</main>
        <Toaster />
      </body>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries"></Script>
    </html>
  );
}
