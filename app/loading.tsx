"use client"
import animationData from '../public/svg/book.json';
import Lottie from "lottie-react";
export default function Loading() {
    return (
        <>
            <div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
                <div className='w-[300px] h-[300px]'>
                    <Lottie animationData={animationData} loop={true} />
                </div>
            </div>
        </>
    )
}