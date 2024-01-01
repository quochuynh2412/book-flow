"use client"
import vnBooksStore from "@/public/vnbooksstore.jpeg";
import { Poppins } from 'next/font/google'
import Link from "next/link";
import TextUnderline from "@/components/TextUnderline";
import TextCrossOver from "@/components/TextCrossOver";
import Lottie from "lottie-react";
import lineAnimation from '@/public/svg/line.json'
export default function Hero() {

  return (
    <>
      <div style={{ backgroundImage: `url(${vnBooksStore.src})` }} className="bg-cover bg-no-repeat bg-center bg-blend-multiply bg-fixed bg-neutral-400 h-[95vh]">
        <div className="h-14 flex top-0 shadow bg-transparent">
          <div className="m-auto h-full flex gap-8 md:gap-24 lg:gap-48 font-serif text-white">
            <Link href="#intro" className="flex p-3">
              <div className="text-lg md:text-xl my-auto">
                <TextCrossOver color="white" >Intro</TextCrossOver>
              </div>
            </Link>
            <Link href="#discover" className="flex p-3">
              <div className="text-lg md:text-xl my-auto ">
                <TextCrossOver color="white">Discover</TextCrossOver>
              </div>
            </Link>
            <Link href="#about" className="flex p-3">
              <div className="text-lg md:text-xl my-auto">
                <TextCrossOver color="white">About</TextCrossOver>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex py-56">
          <div className="text-white m-auto text-center">
            <h1 className="text-5xl lg:text-8xl inter.className">
              <div className="font-serif mx-auto w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-center relative z-0">
                <Lottie animationData={lineAnimation} loop={true} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -z-10 -translate-y-1/2 h-auto w-full " />
                BOOKFLOW
              </div>
            </h1>
            <p className="max-w-xs md:max-w-md mt-8 text-sm lg:text-xl mx-auto font-mono">THE FIRST EVER BOOKS REVIEW PLATFORM FOR VIETNAMESE PEOPLE 🇻🇳</p>
          </div>
        </div>
      </div>
    </>
  );
}
