"use client"
import Image from "next/image"
import Link from "next/link"
import { Book } from "@/types/interfaces"
import { useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { badgeVariants } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Review from "./Review"

import Header from "@/components/Header"
export default function Page({ params }: { params: { id: string } }) {
    const [book, setBook] = useState<Book | null>(null);
    useEffect(() => {
        async function fetchBook(id: string) {
            const response = await fetch(`/api/book?id=${id}`, { cache: 'no-store' })
            const bookJson: Book = await response.json();
            setBook(bookJson);
        }
        fetchBook(params.id);
    }, [])
    const rating = 4.5;
    const reviews = 230;
    return (
        <>
            <Header />
            <main className="container my-10">
                <div className="flex flex-col gap-9 md:flex-row mb-10">
                    <div className="w-[536px] h-[463px] bg-gray-100 rounded-3xl flex justify-center align-middle min-w-[400px] xl:shrink-0">
                        {book ?
                            <Image src={book.imageUrl}
                                alt="Book"
                                width={225}
                                height={400}
                                className="rounded h-fit m-auto"
                            ></Image> :
                            <Skeleton className="h-[400px] w-[225px] m-auto" />
                        }
                    </div>
                    <div className="flex flex-col max-h-[463px]">
                        {book ? <>
                            <div className="text-[32px] font-bold">{book?.title}</div>
                            <div className="opacity-50 text-indigo-950 text-base font-normal flex flex-row gap-2 mb-4">
                                {book?.genres.map((genre, index) => {
                                    return (
                                        <>
                                            <Link href={`/genre/${genre.id}`} className={badgeVariants({ variant: "default" })} key={index}>{genre.name}</Link>
                                        </>
                                    )
                                })}
                            </div>
                            <div className="opacity-50 text-indigo-950 text-base font-normal flex flex-row gap-2 mb-4">
                                Authors:
                                {book?.authors.map((author, index) => {
                                    return (
                                        <>
                                            <span key={index}>{author.name}</span>
                                        </>
                                    )
                                })}
                            </div>
                            <div className="flex flex-row gap-2 mb-10">
                                {[1, 2, 3, 4, 5].map((num) => {
                                    if (rating >= num + 0.5) {
                                        return (
                                            <svg key={num} width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.1631 1.26548C11.8573 -0.346446 14.1427 -0.346442 14.8369 1.26548L16.8564 5.95491C17.1459 6.62726 17.7797 7.0877 18.5086 7.15531L23.5925 7.62683C25.3401 7.78891 26.0463 9.96253 24.7278 11.1208L20.892 14.4906C20.342 14.9737 20.0999 15.7187 20.2609 16.4329L21.3835 21.4137C21.7693 23.1258 19.9203 24.4692 18.4113 23.5731L14.0211 20.9663C13.3917 20.5926 12.6083 20.5926 11.9789 20.9663L7.58872 23.5731C6.07966 24.4692 4.23066 23.1258 4.61654 21.4137L5.73912 16.4329C5.90007 15.7187 5.658 14.9737 5.10803 14.4906L1.27217 11.1208C-0.0463493 9.96253 0.659906 7.78891 2.40745 7.62683L7.49141 7.15531C8.22033 7.0877 8.85407 6.62726 9.14362 5.95491L11.1631 1.26548Z" fill="#F2C94C" />
                                            </svg>)
                                    } else {
                                        return (
                                            <svg key={num} width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.1631 1.26548C11.8573 -0.346446 14.1427 -0.346442 14.8369 1.26548L16.8564 5.95491C17.1459 6.62726 17.7797 7.0877 18.5086 7.15531L23.5925 7.62683C25.3401 7.78891 26.0463 9.96253 24.7278 11.1208L20.892 14.4906C20.342 14.9737 20.0999 15.7187 20.2609 16.4329L21.3835 21.4137C21.7693 23.1258 19.9203 24.4692 18.4113 23.5731L14.0211 20.9663C13.3917 20.5926 12.6083 20.5926 11.9789 20.9663L7.58872 23.5731C6.07966 24.4692 4.23066 23.1258 4.61654 21.4137L5.73912 16.4329C5.90007 15.7187 5.658 14.9737 5.10803 14.4906L1.27217 11.1208C-0.0463493 9.96253 0.659906 7.78891 2.40745 7.62683L7.49141 7.15531C8.22033 7.0877 8.85407 6.62726 9.14362 5.95491L11.1631 1.26548Z" fill="#C4C4C4" />
                                            </svg>)
                                    }
                                })}
                                <span className="text-base font-semibold">{rating}</span>
                                <span className="opacity-50 text-indigo-950 text-base font-normal">from {reviews} readers</span>

                            </div>
                            <Tabs defaultValue="author" className="w-full">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="author">Authors</TabsTrigger>
                                    <TabsTrigger value="description">Description</TabsTrigger>
                                </TabsList>
                                <TabsContent value="author" className="max-h-[152px] overflow-scroll">
                                    {book?.authors.map((author, index) =>
                                        <>
                                            <Link href={`/author/${author.id}`} className="text-xl font-bold">{author.name}</Link>
                                            <div className="font-base mt-2">{author.description.substring(0, 500)}...
                                                <Link href={`/author/${author.id}`} className="opacity-50 text-indigo-950 inline-block hover:opacity-100"> Read more</Link></div>
                                        </>)}
                                </TabsContent>
                                <TabsContent value="description" className="max-h-[152px] overflow-scroll">
                                    <div className="font-base">{book?.description}</div>
                                </TabsContent>
                            </Tabs>
                        </> :
                            <>
                                <Skeleton className="h-12 w-[360px] mb-1" />
                                <Skeleton className="h-6 w-[480px] mb-4" />
                                <Skeleton className="h-6 w-[360px] mb-4" />
                                <Skeleton className="h-6 w-[360px]" />
                            </>
                        }
                    </div>
                </div>
                <div>
                    <div className="text-3xl font-bold mt-20 mb-10 border-b-2 pb-2 border-neutral-300">Reviews</div>
                    <Review />
                </div>
                <div>
                <div className="text-3xl font-bold mt-20 mb-10 border-b-2 pb-2 border-neutral-300">Similar Books</div>
                </div>
            </main>
        </>
    )
}