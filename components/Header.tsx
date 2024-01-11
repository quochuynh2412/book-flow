"use client";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetOverlay, SheetTrigger } from "@/components/ui/sheet";

import { Sheet2, SheetContent2, SheetTrigger2 } from "@/components/ui/sheet2";

import TextUnderline from "./TextUnderline";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

import { Book, Genre } from "@/types/interfaces";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { searchClient } from "@/lib/algolia";
import React from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch';
import TextCrossOver from "./TextCrossOver";
interface HitProps {
  hit: {
    objectID: string;
    author: string[];
    title: string;
    genre: string[];
  };
}
export default function Header() {
  const { loggedIn, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [uid, setUid] = useState("");

  useEffect(() => {
    async function getGenre() {
      await fetch(`/api/genre`, {
        method: "GET",
      })
        .then(async (response) => {
          const data = await response.json();
          setGenres(data.genres);
        })
        .catch((error) => {
          console.error("Failed to fetch genre description:", error);
        });
    }
    getGenre();
  }, []);

  const [showHits, setShowHits] = useState(false)

  const Hit: React.FC<HitProps> = ({ hit }) => {
    return (
      <Link href={`/book/${hit.objectID}`}>
        <div key={hit.objectID} className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer flex flex-row items-center font-light">
          {hit.title} <span className="ml-2 text-xs text-gray-700">{hit.author.map((a, index) =>
            <React.Fragment key={index}>
              {index === 0 ? "" : ", "}
              {a}
            </React.Fragment>)}</span>
        </div>
      </Link>
    )
  }

  function searchSubmit(event: any) {
    event.preventDefault();
    const query = event.target[0].value;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  const future = { preserveSharedStateOnUnmount: true };
  return (
    <header className="header bg-neutral-100 h-20 flex gap-2 border-b border-neutral-200">
      <div className="basis-2/12 text-xl font-bold flex text-neutral-700 min-w-fit">
        <Link
          href="/"
          className="lg:hidden my-auto ml-6 hover:text-neutral-900"
        >
          <Image src={'/img/bookflowlogo.png'} alt="Book" width={50} height={50} className="h-12 w-12 mb-2"></Image>
        </Link>
        <Link href="/" className="hidden my-auto ml-8 font-serif font-normal lg:flex flex-row gap-0.5 items-center">
          <Image src={'/img/bookflowlogo.png'} alt="Book" width={50} height={50} className="h-12 w-12 mb-2"></Image>
          <div>bookflow</div>
        </Link>
      </div>
      <div className="flex-1 flex relative align-middle">
        <InstantSearch searchClient={searchClient}
          indexName="dev_BOOKFLOW"
          future={future}
          insights>
          <Configure hitsPerPage={5} />
          <SearchBox
            placeholder="Search books by title, author, genre..."
            onSubmit={searchSubmit}
            onFocus={() => setShowHits(true)} onBlur={() => setTimeout(() => setShowHits(false), 200)}
            classNames={{
              root: "w-full flex border rounded-full border-neutral-300 relative my-auto font-light",
              form: "w-full flex",
              input: "w-full rounded-l-full h-12 px-5 bg-base-100 focus:outline-none",
              submit: "btn w-16 lg:w-24 rounded-r-full flex items-center justify-center",
              reset: "hidden",
              loadingIndicator: "hidden"
            }} />
          {showHits && (
            <Hits hitComponent={Hit} className="absolute inset-x-0 bottom-0 transform translate-y-full bg-white w-full border rounded-xl shadow-lg z-10 overflow-hidden touch-auto" />
          )}
        </InstantSearch>
      </div>
      <div className="basis-2/12 flex">
        <div className="ml-auto flex">
          <div className="my-auto mr-4 lg:mr-8">
            <Sheet>
              <SheetTrigger>
                <div className="hover:border aspect-square active:bg-neutral-300 p-2 rounded-md">
                  <svg
                    fill="none"
                    color="black"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </div>
              </SheetTrigger>
              <SheetContent className="w-36 lg:w-80 bg-rose-800 text-white font-serif border-none">
                <div className="h-full flex text-md lg:text-xl font-light">
                  <div className="w-full my-auto flex flex-col gap-24 text-center">
                    <div className="mx-auto">
                      <Image src={'/img/bookflowlogo.png'} alt="Book" width={50} height={50} className="h-20 w-20 mb-2 bg-white p-4 rounded-2xl"></Image>
                    </div>
                    <div className="mx-auto">
                      <Sheet2>
                        <SheetTrigger2>
                          <TextCrossOver color="white">Genres</TextCrossOver>
                        </SheetTrigger2>
                        <SheetContent2 className="w-36 lg:w-80 bg-rose-900 font-serif text-white border-none">
                          <div className="h-full flex text-xs lg:text-xl font-light">
                            <div className="h-full w-full flex flex-col gap-24 text-center overflow-y-auto scrollbar py-48">
                              {genres.map((genre) => (
                                <div className="mx-auto px-2" key={genre.id}>
                                  <Link href={`/genre/${genre.id}`}>
                                    <TextCrossOver color="white">{genre.name}</TextCrossOver>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </SheetContent2>
                      </Sheet2>
                    </div>
                    {loggedIn && (
                      <div className="mx-auto">
                        <Link href={`/profile`}>
                          <TextCrossOver color="white">Profile</TextCrossOver>
                        </Link>
                      </div>
                    )}
                    {loggedIn && (
                      <div className="mx-auto">
                        <Link href={`/list`}>
                          <TextCrossOver color="white">My Lists</TextCrossOver>
                        </Link>
                      </div>
                    )}
                    <div className="mx-auto">
                      {loggedIn && (
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            axios
                              .post("/api/authentication/logout")
                              .then((response) => {
                                signOut(auth).then(() => {
                                  logout();
                                  router.push("/");
                                  toast({
                                    description: "Logged out successfully",
                                  });
                                });
                              });
                          }}
                        >
                          <TextCrossOver color="white">Logout</TextCrossOver>
                        </div>
                      )}
                      {!loggedIn && (
                        <Link href="/login">
                          <TextCrossOver color="white">Login</TextCrossOver>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header >
  );
}
