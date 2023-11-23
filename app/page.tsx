import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div>
      <header className="bg-white h-20 flex gap-2 border-b">
        <div className="basis-2/12 text-2xl font-bold flex text-neutral-700 min-w-fit">
          <Link href="" className="lg:hidden my-auto mx-8 hover:text-neutral-900">BF</Link>
          <Link href="" className="hidden lg:block my-auto mx-8">Book Flow</Link>
        </div>
        <div className="flex-1 flex">
          <div className="w-full my-auto flex border-2 border-neutral-200 rounded-full max-w-3xl mx-auto">
            <input type="text" placeholder="Search for books.." className="w-full rounded-l-full border-r-2 border-neutral-200 h-12 px-5 outline-gray-300"/>
            <button className="w-20 lg:w-28 rounded-r-full bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="m-auto">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="basis-2/12"></div>
      </header>
      <div className="bg-white h-14 flex gap-2 border-b sticky top-0">
        
      </div>
      <div className="h-96 bg-red-200"></div>
      <div className="h-96 bg-red-200"></div>
      <div className="h-96 bg-red-200"></div>
      <div className="px-8 lg:px-32 md:flex gap-5">
        {/* <div className="w-full flex border-2 rounded-full">
          <input type="text" placeholder="Search for courses" className="w-full rounded-l-full h-12 px-5  focus:outline-none"/>
          <button className="bg-slate-400 w-16 rounded-r-full">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
}
