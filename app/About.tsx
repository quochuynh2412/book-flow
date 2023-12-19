import Image from "next/image";

import readingGuy from "@/public/manReading.jpeg";


const features = [
  { name: 'Origin', description: 'Built by Vietnamese people, for Vietnamese people' },
  { name: 'Responsive', description: 'The website can be accessed with different devices' },
  { name: 'Best experience', description: 'Unlike other books review platforms, we say no to ads!' },
  { name: 'Books search', description: 'Our books search engine allows users to easily find the desired books' },
  { name: 'Books review', description: 'Our review system lessens bias of readers when making book reviews' },
  { name: 'Books recommendation', description: 'Our powerful books recommendation system can suggest the best matching books to users' },
];

export default function About() {
  return (
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
  );
}
