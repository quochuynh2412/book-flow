"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { Book, Genre } from "@/types/interfaces";
import BookCard from "@/components/BookCard";
import Marquee from 'react-fast-marquee';
import TextCrossOver from "@/components/TextCrossOver";


export default function Discover() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [itBooks, setItBooks] = useState<Book[]>([]);
  const [cookingBooks, setCookingBooks] = useState<Book[]>([]);
  const [cultureBooks, setCultureBooks] = useState<Book[]>([]);

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
      const response = await fetch(`/api/book?itemsPerPage=6&page=1`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        await setBooks(data.books);
      }).catch(error => {
        console.error("Failed to fetch books:", error)
      });
    }
    async function getItBooks() {
      const response = await fetch(`/api/book?genre=d3b701b0-1142-4c71-b94e-5f2daa7e1eaf&itemsPerPage=6&page=1`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        await setItBooks(data.books);
      }).catch(error => {
        console.error("Failed to fetch books:", error)
      });
    }
    async function getCookingBooks() {
      const response = await fetch(`/api/book?genre=f3977e6c-6474-4c50-90c9-921fec4f6c49&itemsPerPage=6&page=1`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        await setCookingBooks(data.books);
      }).catch(error => {
        console.error("Failed to fetch books:", error)
      });
    }
    async function getCultureBooks() {
      const response = await fetch(`/api/book?genre=e5456ed6-fded-4b44-af67-928e7c393b53&itemsPerPage=6&page=1`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        await setCultureBooks(data.books);
      }).catch(error => {
        console.error("Failed to fetch books:", error)
      });
    }
    getGenre();
    getBooks();
    getItBooks();
    getCookingBooks();
    getCultureBooks();
  }, []);

  return (
    <div id="discover" className="">
      <div className="mb-10">
        <h2 className="text-xl md:text-3xl text-center mb-8 md:mb-12 text-white font-thin py-6 bg-rose-800 font-serif">
          <Marquee autoFill pauseOnHover><span className="mx-4">BEST OF ALL TIME</span></Marquee>
        </h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 lg:max-w-7xl mx-auto px-12 lg:px-8 my-24">
          {books && books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-base text-center mb-8 md:mb-12 text-white font-thin py-2 bg-title-gray font-serif">
          <Marquee autoFill pauseOnHover><span className="mx-4">Understand the Tech</span></Marquee>
        </h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 lg:max-w-7xl mx-auto px-12 lg:px-8 mt-24">
          {itBooks && itBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="flex mt-12 font-serif text-title-gray">
          <Link className="mx-auto" href={`/genre/d3b701b0-1142-4c71-b94e-5f2daa7e1eaf/1`}>
            <TextCrossOver color="amber-800">Explore More</TextCrossOver>
          </Link>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-base text-center mb-8 md:mb-12 text-white font-thin py-2 bg-amber-800 font-serif">
          <Marquee autoFill pauseOnHover><span className="mx-4">Delicious Meals</span></Marquee>
        </h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 lg:max-w-7xl mx-auto px-12 lg:px-8 mt-24">
          {cookingBooks && cookingBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="flex mt-12 font-serif text-title-gray">
          <Link className="mx-auto" href={`/genre/f3977e6c-6474-4c50-90c9-921fec4f6c49/1`}>
            <TextCrossOver color="amber-800">Explore More</TextCrossOver>
          </Link>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-base text-center mb-8 md:mb-12 text-white font-thin py-2 bg-green-800 font-serif">
          <Marquee autoFill pauseOnHover><span className="mx-4">Vietnamese Culture</span></Marquee>
        </h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6 lg:max-w-7xl mx-auto px-12 lg:px-8 mt-24">
          {cultureBooks && cultureBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="flex mt-12 font-serif text-title-gray">
          <Link className="mx-auto" href={`/genre/e5456ed6-fded-4b44-af67-928e7c393b53/1`}>
            <TextCrossOver color="amber-800">Explore More</TextCrossOver>
          </Link>
        </div>
      </div>

      <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 font-light border-b-2 border-neutral-300 pb-5">ALL GENRES</h2>
        <div className="gap-4 lg:gap-12 grid grid-cols-4 md:grid-cols-6">
          {genres.map((genre) => (
            <Link href={`/genre/${genre.id}/1`} key={genre.id} style={{ backgroundImage: `url(${genre.imageUrl})` }} className="bg-cover bg-no-repeat aspect-square bg-white shadow-md relative group" >
              <div className="absolute flex inset-0 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-70">
                <span className="m-auto text-center text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{genre.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
