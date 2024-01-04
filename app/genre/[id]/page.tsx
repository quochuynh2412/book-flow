"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/app/search/BookCard";
import {
  InstantSearch,
  Hits,
  Configure,
  RefinementList,
  SortBy,
  Pagination
} from 'react-instantsearch';
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { searchClient } from "@/lib/algolia";
import Lottie from "lottie-react";
import lineAnimation from '@/public/svg/line.json'
import { useEffect, useState } from "react";
import React from "react";
import books from "@/lib/json/book.json"
import genres from "@/lib/json/genre.json";
import { OriginalBook, OriginalGenre } from "@/types/interfaces";
const originalBooks: OriginalBook[] = Object.values(books);

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
    <BookCard book={book} />
  )
}
const future = { preserveSharedStateOnUnmount: true };

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const genre = genres.find((genre) => genre.objectID === id) as OriginalGenre;
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    async function getImageUrl(imageID: string) {
      const storageRef = ref(storage, `${imageID}`);
      const url = await getDownloadURL(storageRef);
      setImage(url);
    }
    getImageUrl(genre.imageID);
  }, []);

  return (
    <div>
      <Header />
      <div className="h-72 flex shadow-inner border bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-500" style={{ backgroundImage: `url(${image})` }}>
        <h1 className="text-4xl md:text-6xl m-auto text-white font-serif z-0 relative">
          <Lottie animationData={lineAnimation} loop={true} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -z-10 -translate-y-1/2 h-auto w-full " />
          {genre?.name}
        </h1>
      </div>
      <InstantSearch searchClient={searchClient}
        indexName="dev_BOOKFLOW"
        future={future}
        initialUiState={{
          ["dev_BOOKFLOW"]: {
            query: "",
            refinementList: {
              genre: [genre?.name],
            },
            page: 1,
          },
        }}
        insights>
        <Configure hitsPerPage={20} disjunctiveFacets={["genreID"]} />
        <div className="mx-auto px-12 py-24 lg:max-w-7xl lg:px-8">
          <div>
            <h1 className="text-3xl mb-4 border-b border-neutral-300 py-2 font-serif text-title-gray">All {genre?.name} books</h1>
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
                  <div className="text-md font-serif font-bold text-neutral-500">Genres:</div>
                  <RefinementList attribute="genre"
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
      <Footer />
    </div>
  );
}
