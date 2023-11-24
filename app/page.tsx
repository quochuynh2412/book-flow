import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Footer from "@/components/ui/Footer";

import vnBooksStore from "@/public/vnbooksstore.jpeg";


export default function Home() {
  return (
    <div>
      <header className="bg-white h-20 flex gap-2 border-b border-neutral-200">
        <div className="basis-2/12 text-2xl font-bold flex text-neutral-700 min-w-fit">
          <Link href="" className="lg:hidden my-auto mx-8 hover:text-neutral-900">BF</Link>
          <Link href="" className="hidden lg:block my-auto mx-8">Book Flow</Link>
        </div>
        <div className="flex-1 flex">
          <div className="w-full my-auto flex border border-neutral-300 rounded-full max-w-3xl mx-auto">
            <input type="text" placeholder="Search for books.." className="h-12 w-full px-5 rounded-l-full border-r border-neutral-200 outline-gray-300"/>
            <button className="w-20 lg:w-28 rounded-r-full bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="m-auto">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="basis-2/12 flex">
          <div className="ml-auto flex">
            <div className="my-auto mr-4 lg:mr-8">
              <Sheet>
                <SheetTrigger>
                  <div className="hover:border aspect-square active:bg-neutral-300 p-2 rounded-md">
                    <svg fill="none" color="black" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                      <path strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </div>
                </SheetTrigger>
                <SheetContent >
                  <div className="h-full flex text-2xl font-light">
                    <div className="w-full my-auto flex flex-col gap-24 text-center">
                      <div className="mx-auto">
                        <a href="#" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200 after:origin-center">
                          Profile
                        </a>
                      </div>
                      <div className="mx-auto">
                        <a href="#" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200 after:origin-center">
                          Setting
                        </a>
                      </div>
                      <div className="mx-auto">
                        <a href="#" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-200 after:origin-center">
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white h-14 flex gap-2 border-b border-neutral-200 top-0 shadow">
        <div className="m-auto h-full flex gap-24 md:gap-24 lg:gap-48 ">
          <div className="flex gap-4 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512" className="my-auto">
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
            </svg>
            <p className="text-lg my-auto hidden md:block">We Love</p>
          </div>
          <div className="flex gap-4 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 576 512" className="my-auto">
              <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
            </svg>
            <p className="text-lg my-auto hidden md:block">Trending</p>
          </div>
          <div className="flex gap-4 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512" className="my-auto">
              <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52V24zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8V334.7l-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5v-237z"/>
            </svg>
            <p className="text-lg my-auto hidden md:block">Events</p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{backgroundImage: `url(${vnBooksStore.src})`}} className="bg-cover bg-no-repeat bg-center bg-blend-multiply bg-fixed bg-neutral-400">
        <div className="w-full h-full flex py-48">
          <div className="text-white m-auto text-center">
            <h1 className="text-5xl lg:text-9xl">
              <div className="relative w-fit block after:block after:content-[''] after:absolute after:h-[5px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-center">
                BOOK FLOW
              </div>
            </h1>
            <p className="max-w-xs md:max-w-md mt-8 text-sm lg:text-xl mx-auto">THE FIRST EVER BOOKS REVIEW PLATFORM FOR VIETNAMESE PEOPLE 🇻🇳</p>
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-32 md:flex gap-5">
        <div className="basis-5/12">
          
        </div>
        <div className="basis-7/12">

        </div>
      </div>
      {/* <div className='button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
          active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
          active:border-b-[0px]
          transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
          border-b-[1px] border-blue-400'>
        <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Active</span>
      </div> */}
      <div className="h-96"></div>
      <div className="h-96"></div>
      <div className="h-96"></div>
      <div className="px-8 lg:px-32 md:flex gap-5">
      </div>
      <div className="relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-green-400">
          <h2 className="text-4xl">The First Title</h2>
          <p>Scroll Down</p>
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white">
          <h2 className="text-4xl">The Second Title</h2>
          <p>Scroll Down</p>
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-purple-600 text-white">
          <h2 className="text-4xl">The Third Title</h2>
          <p>Scroll Down</p>
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-neutral-800 text-white">
          <h2 className="text-4xl">The Fourth Title</h2>
        </div>
        </div>
      <Footer />
      {/* <div className="fixed h-30 w-30 bottom-10 right-10">
        <a href="#top" className="scroll-smooth">
          <div className='button w-12 h-12 bg-neutral-500 rounded-sm cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#303030,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_8px_0_0_#303030,0_13px_0_0_#30303041]
            border-[1px] border-neutral-400'>
            <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>UP</span>
          </div>
        </a>
      </div> */}
    </div>
  );
}
