"use client"
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import {
  InstantSearch,
  Hits,
  Configure,
  RefinementList,
  SortBy,
  Pagination
} from 'react-instantsearch';
import BookCardForAlgolia from "@/app/search/BookCardForAlgolia";
import { searchClient } from "@/lib/algolia";

import { useEffect, useState } from "react";
import { Book, Author, Genre, OriginalAuthor } from "@/types/interfaces";
import books from "@/lib/json/book.json"
import genres from "@/lib/json/genre.json";
import authors from "@/lib/json/author.json";
import { OriginalBook, OriginalGenre } from "@/types/interfaces";
const originalBooks: OriginalBook[] = Object.values(books);
import React from "react";

import Lottie from "lottie-react";
import lineAnimation from '@/public/svg/line.json'
interface HitProps {
  hit: {
    objectID: string;
    author: string[];
    title: string;
    genre: string[];
  };
}
const Hit: React.FC<HitProps> = ({ hit }) => {
  const book = originalBooks.find((book) => book.objectID === hit.objectID) as OriginalBook;
  return (
    <BookCardForAlgolia book={book} />
  )
}
const itemsPerPage: number = 25;
const numPopularItems: number = 6;
const future = { preserveSharedStateOnUnmount: true };

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const author = authors.find((author) => author.objectID === id) as OriginalAuthor;

  useEffect(() => {
  }, []);

  return (
    <div>
      <Header />
      <SubHeader />
      <div className="h-72 flex shadow-inner border bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-500" style={{ backgroundImage: `url(/img/author-placeholder.jpeg)` }}>
        <h1 className="text-4xl md:text-6xl m-auto text-white font-serif z-0 relative">
          <Lottie animationData={lineAnimation} loop={true} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -z-10 -translate-y-1/2 h-auto w-full " />
          {author?.name}
        </h1>
      </div>
      <InstantSearch searchClient={searchClient}
        indexName="dev_BOOKFLOW"
        future={future}
        initialUiState={{
          ["dev_BOOKFLOW"]: {
            query: "",
            refinementList: {
              author: [author?.name as string],
            },
            page: 1,
          },
        }}
        insights>
        <Configure hitsPerPage={20} disjunctiveFacets={["genreID"]} />
        <div className="mx-auto px-12 py-24 lg:max-w-7xl lg:px-8">
          <div>
            <h1 className="text-3xl mb-4 border-b border-neutral-300 py-2 font-serif text-title-gray">All {author?.name} books</h1>
            <div className="md:flex gap-5">
              <div className="md:w-64 lg:w-72 py-4">
                <div className="border border-neutral-300 sticky top-10 shadow-sm rounded-lg p-4 flex flex-col gap-4">
                  <div className="text-md font-serif font-bold text-neutral-500">Sort by:</div>
                  <SortBy items={[
                    { label: 'Default', value: 'dev_BOOKFLOW' },
                    { label: 'Title', value: 'dev_BOOKFLOW_title_asc' }
                  ]}
                    classNames={{
                      root: "font-serif text-md text-neutral-500 w-full",
                      select: "w-full border border-neutral-300 rounded-md px-2 py-1",
                    }} />
                  <div className="text-md font-serif font-bold text-neutral-500">Author:</div>
                  <RefinementList attribute="author"
                    classNames={{
                      root: "text-neutral-500",
                      list: "flex flex-col gap-2",
                      item: "hidden",
                      selectedItem: "!block touch-action-none pointer-events-none",
                      label: "flex gap-2 items-center",
                      labelText: "font-serif text-md",
                      count: "text-xs text-neutral-500 bg-neutral-200 px-2 py-1 rounded-full",
                      showMore: "w-full text-rose-800 font-serif text-xs hover:text-rose-900 my-2"
                    }}
                    limit={30}
                    showMore={false}
                    operator="or"
                    sortBy={['name:asc']} />
                </div>
              </div>
              <div className="flex-1">
                <Hits hitComponent={Hit} classNames={{ list: "py-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-12", item: "" }} />
                <Pagination classNames={{
                  list: "flex flex-row justify-center gap-4",
                  item: "font-serif text-lg text-neutral-500",
                  link: "hover:text-neutral-900 px-2 py-1",
                  selectedItem: "text-rose-800 font-bold touch-action-none pointer-events-none"
                }} />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
      {/* <div>
        <div className="mx-auto px-12 py-24 lg:max-w-7xl lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl mb-4 border-b border-neutral-200 py-2">Description</h1>
            <div className="md:flex gap-8">
              <p>{author ? author.description : ""}</p>
            </div>
          </div>
          <div className="mb-12">
            <h1 className="text-3xl mb-4 border-b border-neutral-200 py-2">Popular books</h1>
            <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6">
              {popularBooks && popularBooks.length > 0 && popularBooks.map((book: Book) => (
                <MemoizedBookCard key={book.id} book={book} />
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
                  {books && books.length > 0 && books.map((book: Book, index) => (
                    <MemoizedBookCard key={book.id} book={book} />
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
      </div> */}
      <Footer />
    </div>
  );
}
