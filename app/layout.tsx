import type { Metadata } from "next";
import Image from "next/image";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LoadSession from "@/components/load-session";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";
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
      <Head>
        <Link rel="preconnect" href="https://fonts.googleapis.com"></Link>
        <Link rel="preconnect" href="https://fonts.gstatic.com"></Link>
        <Link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></Link>
      </Head>
      <body className={`${roboto.className} min-h-screen`}>
        <LoadSession />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        </Head>
        <main className="hidden sm:block">
          {children}
        </main>
        <main className="sm:hidden">
          <div className="flex flex-col gap-2 justify-center items-center h-screen w-screen p-4 bg-rose-900 text-white font-serif">
            <Image src={'/img/bookflowlogo.png'} alt="Book" width={50} height={50} className="h-20 w-20 mb-2 bg-white p-4 rounded-2xl"></Image>
            <div className="text-xl font-bold text-center">
              Sorry, this site is not available on mobile devices yet.
            </div>
            <div className="text-center text-sm font-light">
              Please visit us on a desktop device.
            </div>
          </div>
        </main>
        <Toaster />
      </body>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default%2CArray.prototype.find%2CArray.prototype.includes%2CPromise%2CObject.assign%2CObject.entries"></Script>
    </html >
  );
}
