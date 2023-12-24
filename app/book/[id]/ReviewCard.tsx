"use client"

import { useState } from "react"
import Star from "@/components/Icons/Star";
import { StarGenerator } from "@/components/Icons/Star";


import { db } from "@/lib/firebase";

export default function ReviewCard({review} : {review : any}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className=" border rounded-lg border-neutral-300 p-5 mb-4">
            <article>
                <div className="flex items-center mb-4">
                    <img className="w-10 h-10 me-4 rounded-full" src="  https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg" alt="" />
                    <div className="font-medium dark:text-white">
                        <p>{review["user"]["name"]} <time className="block text-sm text-gray-500 dark:text-gray-400">Reviewed on August 2014</time></p>
                    </div>
                </div>
                <div className="flex items-center mb-4 space-x-1 rtl:space-x-reverse">
                    <StarGenerator size={4} score={review["rating"]} />
                    <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">{review["title"]}</h3>
                </div>
                <p className={`mb-2 text-gray-500 dark:text-gray-400 ${isExpanded ? "" : "line-clamp-2"}`}>{review["content"]}</p>
                <p onClick={toggleReadMore} className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">{isExpanded ? "Hide" : "Read more"}</p>
                <aside>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                    <div className="flex items-center mt-3">
                        <a href="#" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Helpful</a>
                        <a href="#" className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                    </div>  
                </aside>
            </article>
        </div>
    );
}