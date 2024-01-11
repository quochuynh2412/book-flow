"use client";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/interfaces";
import React, { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Review from "./Review"
import TextCrossOver from "@/components/TextCrossOver";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddBookToListButton from "../../../components/add-book-to-list-button";
import { searchClient } from "@/lib/algolia";
import books from "@/lib/json/book.json";

import BookCard from "@/components/BookCard";

const index = searchClient.initIndex("dev_BOOKFLOW");

import Quiz from "@/components/Quiz";

export default function Page({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Book | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  useEffect(() => {
    async function fetchBook(id: string) {
      const response = await fetch(`/api/book?id=${id}`, { cache: "no-store" });
      const bookJson: Book = await response.json();
      setBook(bookJson);
      fetchSimilarBooks(id);
    }
    async function fetchSimilarBooks(id: string) {
      const book = books.find((book) => book.objectID === id);
      const queryTerm = book?.genre.map((genre) => genre).join(" ") + " " + book?.author.map((author) => author).join(" ");
      console.log(queryTerm);
      index.search('', {
        similarQuery: queryTerm,
        filters: `NOT objectID:${id}`,
        removeWordsIfNoResults: 'allOptional',
      }).then(({ hits }) => {
        console.log(hits);
        hits.slice(0, 6).map(async (hit) => {
          const response = await fetch(`/api/book?id=${hit.objectID}`, {
            method: "GET",
            cache: "no-store",
          });
          const bookJson: Book = await response.json();
          setSimilarBooks((similarBooks) => [...similarBooks, bookJson]);
        }
        );
      });
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
            <div className="w-[560px] h-[800px] bg-gray-100 rounded-xl flex justify-center align-middle min-w-[400px] xl:shrink-0">
              {book ? (
                <Image
                  src={book.imageUrl || "/img/book-cover-placeholder.png"}
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
                    <div className="text-[40px] text-title-gray font-serif font-semibold">{book?.title}</div>
                    <div className="text-neutral-900 text-base font-light flex flex-row gap-2">
                      {book?.genres.map((genre, index) => {
                        return (
                          <>
                            <Link
                              href={`/genre/${genre.id}`}
                              className="opacity-80 inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-neutral-500 text-primary-foreground hover:bg-rose-800"
                              key={index}
                            >
                              {genre.name}
                            </Link>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row font-serif text-neutral-500 text-lg font-medium mb-10">
                    By&nbsp;{book?.authors.map((author, index) => {
                      return (
                        <>
                          {index === 0 ? "" : <>,&nbsp;</>}
                          <Link key={index}
                            href={`/author/${author.id}`}
                            className="hover:text-rose-800">
                            {author.name}
                          </Link>
                        </>
                      );
                    })}
                    <hr className="border-l border-title-gray h-3/4 self-center w-[1px] mx-4"></hr>
                    <div className="flex flex-row gap-2 text-title-gray align-middle">
                      <Image src={'/svg/star.svg'} alt="Star" width={20} height={20} className="rounded h-fit my-auto"></Image>
                      <span className="text-base font-semibold">{rating}</span>
                    </div>
                  </div>
                  <div className="text-indigo-950 text-base font-normal flex flex-row gap-2 mb-16">
                    <AddBookToListButton bookId={book.id} bookTitle={book.title} />
                  </div>
                  <Tabs defaultValue="author" className="w-full">
                    <TabsList className="mb-4 font-serif bg-neutral-100 rounded-full p-1 h-auto">
                      <TabsTrigger value="author" className="rounded-full py-2.5 inline-flex items-center justify-center whitespace-nowrap px-4 data-[state=active]:bg-rose-800 data-[state=active]:text-white">Authors</TabsTrigger>
                      <TabsTrigger value="description" className="rounded-full inline-flex items-center justify-center whitespace-nowrap py-2 px-4 data-[state=active]:bg-rose-800 data-[state=active]:text-white">Description</TabsTrigger>
                    </TabsList>
                    <div className="border border-neutral-300 p-4 rounded-xl">
                      <TabsContent
                        value="author"
                        className="max-h-[320px] overflow-scroll flex flex-col gap-4 data-[state=inactive]:hidden"
                      >
                        {book?.authors.map((author, index) => (
                          <>
                            <Link
                              href={`/author/${author.id}`}
                              className="text-xl font-bold font-serif text-title-gray hover:text-rose-800"
                            >
                              {author.name}
                            </Link>
                            <div className="font-base mt-2 font-light">
                              {author.description.length > 500 ?
                                <>
                                  {author.description.substring(0, 500) + "..."}
                                  <Link
                                    href={`/author/${author.id}`}
                                    className="opacity-50 text-indigo-950 inline-block hover:opacity-100"
                                  >
                                    &nbsp;
                                    Read more
                                  </Link>
                                </> :
                                author.description.length > 0 ? author.description : "No description available"}
                            </div>
                          </>
                        ))}
                      </TabsContent>
                      <TabsContent
                        value="description"
                        className="max-h-[350px] overflow-scroll flex flex-col gap-4 data-[state=inactive]:hidden"
                      >
                        <div className="font-base font-light">{book?.description}</div>
                      </TabsContent>
                    </div>
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
            <div className="text-3xl font-bold mt-20 mb-10 border-b pb-2 border-neutral-300 font-serif text-title-gray">Similar Books</div>
            <div className="gap-4 lg:gap-8 grid grid-cols-3 md:grid-cols-6 lg:max-w-7xl mx-auto px-12 lg:px-8">
              {similarBooks.slice(0, 6).map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          </div>
          {
            // if not null
            book?.description ? (
              <div>
                <div className="text-3xl font-bold mt-20 mb-10 border-b pb-2 border-neutral-300 font-serif text-title-gray">Knowledge Quiz</div>
                <Quiz description={book.description} />
              </div>
            ) : (
              <></>
            )
          }
        </div>
      </main>
      <Footer />
    </>
  );
}
