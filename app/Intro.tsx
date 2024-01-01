"use client"
import { useRef, useEffect, useState } from "react";
import vietnam from "@/public/vietnam.png";
import CountUp from 'react-countup';
import arrowAnimation from '@/public/svg/arrow.json'
import fireAnimation from '@/public/svg/fire.json'
import Lottie from "lottie-react";


const stats = [
  { id: 1, name: 'Books', value: 10000, duration: 1 },
  { id: 2, name: 'Book reviews', value: 50000, duration: 2 },
  { id: 3, name: 'New users annually', value: 5000, duration: 3 },
];

export default function Intro() {
  const countUpRef = useRef(null); // Add type annotation to countUpRef
  // start counting when scroll to the element
  const [countUp, setCountUp] = useState(false);

  return (
    <div id="intro" className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white">
        <div className="mx-auto max-w-7xl px-12 lg:px-8 py-32 relative">
          <dl className="grid grid-cols-1 gap-x-20 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first font-semibold tracking-tight text-3xl lg:text-6xl">
                  <CountUp end={stat.value} // Add ref prop to CountUp component
                    duration={stat.duration}
                    decimals={0}
                    decimal="."
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce={true}
                    scrollSpyDelay={100} />
                </dd>
              </div>
            ))}
          </dl>
          <Lottie animationData={fireAnimation} loop={true} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 h-2/3 w-auto opacity-50" />
        </div>
      </div>

      <div style={{ backgroundImage: `url(${vietnam.src})` }} className="bg-cover bg-no-repeat bg-center sticky top-0 h-screen flex flex-col items-center justify-center text-white" >
        <div className="w-full">
          <h1 className="mx-12 mb-10 text-center text-2xl lg:text-4xl font-thin">FOCUSES ON THE
            <span className="text-yellow-400 font-bold font-serif text-7xl relative">
              VIETNAMESE
              <Lottie animationData={arrowAnimation} loop={true} className="absolute -top-[70%] -right-56 text-amber-800 w-auto h-[200%] -z-10" />
            </span>
            !</h1>
          <div className="mx-20 text-center text-lg font-mono">
            Built by Vietnamese people, for Vietnamese people.
          </div>
        </div>
      </div>
    </div>
  );
}
