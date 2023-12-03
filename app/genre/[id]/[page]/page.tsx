"use client"
import Header from "@/components/ui/Header";
import SubHeader from "@/components/ui/SubHeader";
import Footer from "@/components/ui/Footer";
import BookCard from "@/components/BookCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { Book, Author, Genre } from "@/types/interfaces";

const itemsPerPage : number = 20;

export default function Page({ params }: { params: { id: string; page: string } }) {
  const { id, page } = params;
  const [genre, setGenre] = useState<Genre | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function getGenre(id: string) {
      await fetch(`/api/genre?id=${id}`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setGenre(data.genre);
      }).catch(error => {
        console.error("Failed to fetch genre description:", error)
      });
    }
    async function getBooks(id: string, page: string) {
      const response = await fetch(`/api/book?genre=${id}&itemsPerPage=${itemsPerPage}&page=${page}`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setBooks(data.books);
      }).catch(error => {
        console.error("Failed to fetch books:", error)
      });
    }
    getGenre(id);
    getBooks(id, page);

    if (books.length === 0 && parseInt(page) > 1) {
      window.location.href = `/genre/${id}/${parseInt(page) - 1}`;
    }
  }, []);

  function forwardPage() {
    const nextPage = parseInt(page) + 1;
    window.location.href = `/genre/${id}/${nextPage}`;
  }

  function backwardPage() {
    const previousPage = parseInt(page) - 1;
    if (previousPage > 0) window.location.href = `/genre/${id}/${previousPage}`;
  }

  return (
    <div>
      <Header />
      <SubHeader />
      <div className="h-72 flex shadow-inner border bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-400" style={{ backgroundImage: `url(/img/${genre?.name}Genre.jpg)` }}>
        <h1 className="text-4xl md:text-6xl m-auto font-semibold text-white">{genre?.name}</h1>
      </div>
      <div>
        <div className="mx-auto px-12 py-24 lg:max-w-7xl lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl mb-4 border-b border-neutral-200 py-2">Description</h1>
            <div className="md:flex gap-8">
              <p>{genre ? genre.description : ""}</p>
            </div>
          </div>
          <div className="mb-12">
            <h1 className="text-3xl mb-4 border-b border-neutral-200 py-2">Popular books</h1>
            <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6">
              {books.length > 0 && books.slice(0, 6).map((book: Book, index) => (
                <div key={index} style={{ backgroundImage: `url(${book.imageUrl})` }} className="bg-contain aspect-[6/9] rounded-lg bg-white shadow-md relative group" >
                  <div className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 text-white p-4 transition duration-300 ease-in-out">
                    <span className="mb-3 text-sm md:text-md lg:text-lg font-semibold line-clamp-3">{book.title}</span>
                    <span className="text-xs md:text-sm lg:text-md italic line-clamp-3">- {book.author.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl mb-4 border-b border-neutral-200 py-2">All books</h1>
            <div className="md:flex gap-5">
              <div className="md:w-64 lg:w-72 py-4">
                <div className="border border-neutral-300 sticky top-10 shadow-sm">
                  <div className="w-full p-4 bg-neutral-100 text-xl border-b border-neutral-300 ">
                    <h2>Filter your result</h2>
                  </div>
                  <div className="p-4 text-neutral-500">
                    <input type="text" placeholder="Search books by name" className="rounded-lg mb-4 h-12 w-full px-3 border border-neutral-200 outline-gray-300" />
                    <input type="text" placeholder="Search books by author" className="rounded-lg mb-4 h-12 w-full px-3 border border-neutral-200 outline-gray-300" />
                    <Select>
                      <SelectTrigger className="rounded-lg h-12 border-neutral-200 mb-4">
                        <SelectValue placeholder="Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">Rating ≥ 4</SelectItem>
                        <SelectItem value="3">Rating ≥ 3</SelectItem>
                        <SelectItem value="2">Rating ≥ 2</SelectItem>
                        <SelectItem value="1">Rating ≥ 1</SelectItem>
                        <SelectItem value="0">Rating ≥ 0</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="w-full">
                      <input type="checkbox" id="top-rated" value="" className="hidden peer" />
                      <label htmlFor="top-rated" className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-sm">Highest rated</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="py-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-12">
                  {books.length > 0 && books.map((book: Book, index) => (
                    <BookCard key={index} name={book.title} author={book.author.name} image={book.imageUrl} />
                  ))}
                </div>
                <div>
                  <div className="flex mt-8">
                    <div className="mx-auto shadow rounded-xl">
                      <button onClick={backwardPage} className="text-neutral-600 bg-neutral-100 p-3 text-md rounded-l-xl border hover:bg-neutral-200 active:bg-neutral-300 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                      </button>
                      <button onClick={forwardPage} className="text-neutral-600 bg-neutral-100 p-3 text-md rounded-r-xl border border-l-0 hover:bg-neutral-200 active:bg-neutral-300 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
