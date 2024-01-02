"use client";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/interfaces";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton"
import { badgeVariants } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Review from "./Review"
import TextCrossOver from "@/components/TextCrossOver";

import Header from "@/components/Header";
import AddBookToListButton from "../../../components/add-book-to-list-button";
export default function Page({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Book | null>(null);
  useEffect(() => {
    async function fetchBook(id: string) {
      const response = await fetch(`/api/book?id=${id}`, { cache: "no-store" });
      const bookJson: Book = await response.json();
      setBook(bookJson);
    }
    fetchBook(params.id);
  }, []);
  const rating = 4.5;
  const reviews = 230;
  return (
    <>
      <Header />
      <main>

        <div className="bg-rose-800 h-16 w-full flex items-center justify-center font-serif font-semibold text-white">
          <Link href={`/genre/${book?.genres.at(0)?.id}`} className="p-2">
            <TextCrossOver color="white">{book?.genres.at(0)?.name}</TextCrossOver>
          </Link>
        </div>
        <div className="container my-10">
          <div className="flex flex-col gap-9 md:flex-row mb-10">
            <div className="w-[560px] h-[800px] bg-gray-100 rounded-3xl flex justify-center align-middle min-w-[400px] xl:shrink-0">
              {book ? (
                <Image
                  src={book.imageUrl}
                  alt="Book"
                  width={400}
                  height={650}
                  className="rounded h-fit m-auto"
                ></Image>
              ) : (
                <Skeleton className="h-[650px] w-[400px] m-auto" />
              )}
            </div>
            <div className="flex flex-col">
              {book ? (
                <>
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="text-[40px] text-title-gray font-serif font-extrabold">{book?.title}</div>
                    <div className="opacity-50 text-neutral-900 text-base font-thin flex flex-row gap-2">
                      {book?.genres.map((genre, index) => {
                        return (
                          <>
                            <Link
                              href={`/genre/${genre.id}`}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                              key={index}
                            >
                              {genre.name}
                            </Link>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 font-serif text-rose-800 text-lg font-medium mb-10">
                    By
                    {book?.authors.map((author, index) => {
                      return (
                        <>
                          <span key={index}>{author.name}</span>
                        </>
                      );
                    })}
                    <hr className="border-l border-title-gray h-3/4 self-center w-[1px] mx-4"></hr>
                    <div className="flex flex-row gap-2 text-title-gray align-middle">
                      <Image src={'/svg/star.svg'} alt="Star" width={20} height={20} className="rounded h-fit my-auto"></Image>
                      <span className="text-base font-semibold">{rating}</span>
                    </div>
                  </div>
                  <div className="opacity-50 text-indigo-950 text-base font-normal flex flex-row gap-2 mb-4">
                    <AddBookToListButton bookId={book.id} bookTitle={book.title}/>
                  </div>
                  <Tabs defaultValue="author" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="author">Authors</TabsTrigger>
                      <TabsTrigger value="description">Description</TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="author"
                      className="max-h-[152px] overflow-scroll"
                    >
                      {book?.authors.map((author, index) => (
                        <>
                          <Link
                            href={`/author/${author.id}`}
                            className="text-xl font-bold"
                          >
                            {author.name}
                          </Link>
                          <div className="font-base mt-2">
                            {author.description.substring(0, 500)}...
                            <Link
                              href={`/author/${author.id}`}
                              className="opacity-50 text-indigo-950 inline-block hover:opacity-100"
                            >
                              {" "}
                              Read more
                            </Link>
                          </div>
                        </>
                      ))}
                    </TabsContent>
                    <TabsContent
                      value="description"
                      className="max-h-[152px] overflow-scroll"
                    >
                      <div className="font-base">{book?.description}</div>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <>
                  <Skeleton className="h-12 w-[360px] mb-1" />
                  <Skeleton className="h-6 w-[480px] mb-4" />
                  <Skeleton className="h-6 w-[360px] mb-4" />
                  <Skeleton className="h-6 w-[360px]" />
                </>
              )}
            </div>
          </div>
          <div>
            <Review bookID={params.id} />
          </div>
          <div>
            <div className="text-2xl font-bold my-10">Similar Books</div>
          </div>
        </div>
      </main>
    </>
  );
}
