import Image from "next/image";

import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import SubHeader from "@/components/ui/SubHeader";
import TextUnderline from "@/components/ui/TextUnderline";

import readingGuy from "@/public/manReading.jpeg";
import book1 from "@/public/book1.webp";
import vietnam from "@/public/vietnam.png";


const stats = [
  { id: 1, name: 'Books', value: '10,000+' },
  { id: 2, name: 'Book reviews', value: '50,000+' },
  { id: 3, name: 'New users annually', value: '5,000+' },
];

const features = [
  { name: 'Origin', description: 'Built by Vietnamese people, for Vietnamese people' },
  { name: 'Responsive', description: 'The website can be accessed with different devices' },
  { name: 'Best experience', description: 'Unlike other books review platforms, we say no to ads!' },
  { name: 'Books search', description: 'Our books search engine allows users to easily find the desired books' },
  { name: 'Books review', description: 'Our review system lessens bias of readers when making book reviews' },
  { name: 'Books recommendation', description: 'Our powerful books recommendation system can suggest the best matching books to users' },
];

const books = [
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
  { name: 'Thám tử lừng danh Conan', author: 'Đặng Thái Hoàng'},
]

export default function Home() {
  return (
    <div>
      <Header />
      <SubHeader />
      <Hero />

      <div id="statistic" className="relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white">
          <div className="mx-auto max-w-7xl px-12 lg:px-8 py-32">
            <dl className="grid grid-cols-1 gap-x-20 gap-y-16 text-center lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="order-first font-semibold tracking-tight text-3xl lg:text-6xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div style={{backgroundImage: `url(${vietnam.src})`}} className="bg-cover bg-no-repeat bg-center sticky top-0 h-screen flex flex-col items-center justify-center text-white" >
          <div className="w-full">
              <h1 className="mx-12 mb-10 text-center text-4xl lg:text-6xl">FOCUS ON THE <span className="text-yellow-400 font-bold">VIETNAMESE</span>!</h1>
              <p className="mx-20 text-center text-lg">Built by Vietnamese people, for Vietnamese people.</p>
          </div>
        </div>
      </div>
      

      <div id="discover" className="py-32">
        <h1 className="text-center text-6xl lg:text-8xl mb-12 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-black">DISCOVER</h1>
        
        <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-12 font-extrabold text-yellow-400">BEST OF ALL TIME</h2>
          <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6">
            {books.map((book) => (
              <div key={book["name"]} style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
                <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                  <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book["name"]}</span>
                  <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book["author"]}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-8">
          <button className="mx-auto text-neutral-600 bg-neutral-100 p-3 text-md rounded-xl border-2 hover:bg-neutral-200 active:bg-neutral-300 shadow-md active:shadow-none font-semibold">Explore More</button>
          </div>
        </div>

        <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-12 font-extrabold text-yellow-400">BOOKS OF THE MONTH</h2>
          <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 ">
            {books.map((book) => (
              <div key={book["name"]} style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white relative group shadow-md" >
                <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                  <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book["name"]}</span>
                  <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book["author"]}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-8">
            <button className="mx-auto text-neutral-600 bg-neutral-100 p-3 text-md rounded-xl border-2 hover:bg-neutral-200 active:bg-neutral-300 shadow-md active:shadow-none font-semibold">Explore More</button>
          </div>
        </div>

        <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-12 font-extrabold text-yellow-400">RISING STARS</h2>
          <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 ">
            {books.map((book) => (
              <div key={book["name"]} style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
                <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                  <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book["name"]}</span>
                  <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book["author"]}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-8">
          <button className="mx-auto text-neutral-600 bg-neutral-100 p-3 text-md rounded-xl border-2 hover:bg-neutral-200 active:bg-neutral-300 shadow-md active:shadow-none font-semibold">Explore More</button>
          </div>
        </div>
      </div>

      <div className="w-full bg-neutral-50">
        <div id="about" className="mx-auto lg:flex gap-12 py-24 px-12 lg:max-w-7xl lg:px-8">
          <div className="lg:my-0 basis-7/12">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">About The Project</h2>
            <p className="mt-4 text-gray-500">
              This is a project delivered by Team 19 of Software Engineering Project Management. We hope that 
              the occurance of this website addresses the current void in the Vietnamese market for a reliable 
              and user-friendly book review platform, which also aligns with the goal of promoting reading 
              culture in Vietnam.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="text-gray-900 font-bold">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="basis-5/12 hidden lg:block">
            <Image
              src={readingGuy.src}
              height={1000}
              width={500}
              alt="A reading guy"
              className="rounded-lg bg-gray-100 "
            />
          </div>
        </div>
      </div>


      <Footer />
      <div className="fixed h-30 w-30 bottom-10 right-10">
        <a href="#top">
          <div className="w-12 h-12 bg-neutral-700 rounded-full cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_8px_0_0_#000000,0_13px_0_0_#00000041]
            border-[1px] ">
            <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>UP</span>
          </div>
        </a>
      </div>
    </div>
  );
}
