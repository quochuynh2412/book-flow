import Image from "next/image";

import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import SubHeader from "@/components/ui/SubHeader";

import readingGuy from "@/public/manReading.jpeg";
import book1 from "@/public/book1.webp";


const stats = [
  { id: 1, name: 'Books', value: '10,000' },
  { id: 2, name: 'Book reviews', value: '55,000' },
  { id: 3, name: 'New users annually', value: '5,000' },
];

const features = [
  { name: 'Origin', description: 'Built by Vietnamese people, for Vietnamese people' },
  { name: 'Responsive', description: 'The website can be accessed with different devices' },
  { name: 'Best experience', description: 'Unlike other books review platforms, we say no to ads!' },
  { name: 'Books search', description: 'Our books search engine allows users to easily find the desired books' },
  { name: 'Books review', description: 'Our review system lessens bias of readers when making book reviews' },
  { name: 'Books recommendation', description: 'Our powerful books recommendation system can suggest the best matching books to users' },
];

export default function Home() {
  return (
    <div>
      <Header />
      <SubHeader />
      <Hero />

      {/* <div className="px-8 lg:px-32 md:flex gap-5">
        <div className="basis-5/12">
          
        </div>
        <div className="basis-7/12">

        </div>
      </div> */}


      <div className="bg-white py-24 sm:py-32"></div>


      <div className="mx-auto gap-6 md:gap-9 lg:gap-12 py-24 px-12 lg:max-w-7xl lg:px-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <div style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white border border-gray-200 shadow relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">Ngày xưa có một chuyện tình</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- Nguyễn Nhật Ánh</span>
          </div>
        </div>
        <div style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white border border-gray-200 shadow relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">Ngày xưa có một chuyện tình</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- Nguyễn Nhật Ánh</span>
          </div>
        </div>
        <div style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white border border-gray-200 shadow relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">Ngày xưa có một chuyện tình</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- Nguyễn Nhật Ánh</span>
          </div>
        </div>
        <div style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white border border-gray-200 shadow relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">Ngày xưa có một chuyện tình</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- Nguyễn Nhật Ánh</span>
          </div>
        </div>
        <div style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white border border-gray-200 shadow relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">Ngày xưa có một chuyện tình</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- Nguyễn Nhật Ánh</span>
          </div>
        </div>
        <div style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white border border-gray-200 shadow relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">Ngày xưa có một chuyện tình</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- Nguyễn Nhật Ánh</span>
          </div>
        </div>
        <div style={{backgroundImage: `url(${book1.src})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white border border-gray-200 shadow relative group" >
          <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
            <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">Ngày xưa có một chuyện tình</span>
            <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- Nguyễn Nhật Ánh</span>
          </div>
        </div>
      </div>

      <div className="h-96"></div>

      <div className="px-8 lg:px-32">
        dawd
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

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto lg:flex gap-12 py-24 px-12 lg:max-w-7xl lg:px-8">
        <div className="lg:my-0 basis-7/12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Specifications</h2>
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


      <Footer />
      <div className="fixed h-30 w-30 bottom-10 right-10">
        <a href="#top" className="scroll-smooth">
          <div className='button w-12 h-12 bg-neutral-500 rounded-full cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#303030,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_8px_0_0_#303030,0_13px_0_0_#30303041]
            border-[1px] border-neutral-400'>
            <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>UP</span>
          </div>
        </a>
      </div>
    </div>
  );
}
