"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { Book, Genre } from "@/types/interfaces";
import BookCard from "@/components/BookCard";


export default function Discover() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function getGenre() {
      await fetch(`/api/genre`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setGenres(data.genres);
      }).catch(error => {
        console.error("Failed to fetch genre description:", error)
      });
    }
    async function getBooks() {
      const response = await fetch(`/api/book?itemsPerPage=18&page=1`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        await setBooks(data.books);
      }).catch(error => {
        console.error("Failed to fetch books:", error)
      });
    }
    getGenre();
    getBooks();
  }, []);

  return (
    <div id="discover" className="py-32">
      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 font-light border-b-2 border-neutral-300 pb-5">BEST OF ALL TIME</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="flex mt-12">
          <Button content="Explore More" />
        </div>
      </div>

      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
      <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 font-light border-b-2 border-neutral-300 pb-5">BOOKS OF THE MONTH</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 ">
          {books.slice(6, 12).map((book) => (
            <div key={book.id} style={{backgroundImage: `url(${book.imageUrl})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
              <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book.title}</span>
                {
                  book.authors.map((author, index) => (
                    <div key={author.id}>
                      <span className="text-xs md:text-sm lg:text-md italic line-clamp-2">{index === 0 ? "" : ", "}{author.name}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-12">
          <Button content="Explore More" />
        </div>
      </div>

      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 font-light border-b-2 border-neutral-300 pb-5">RISING STARS</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 ">
          {books.slice(12, 18).map((book) => (
            <div key={book.id} style={{backgroundImage: `url(${book.imageUrl})`}} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
              <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book.title}</span>
                {
                  book.authors.map((author, index) => (
                    <div key={author.id}>
                      <span className="text-xs md:text-sm lg:text-md italic line-clamp-2">{index === 0 ? "" : ", "}{author.name}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-12">
          <Button content="Explore More" />
        </div>
      </div>

      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 font-light border-b-2 border-neutral-300 pb-5">ALL GENRES</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-5">
          {genres?.map((genre) => (
            <Link href={`/genre/${genre.id}/1`} key={genre.id} style={{backgroundImage: `url(/img/${genre.id}).jpeg`}} className="bg-cover bg-no-repeat aspect-square rounded-full bg-white shadow-md relative group" >
              <div className="rounded-full absolute flex inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                <span className="m-auto text-center text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{genre.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
