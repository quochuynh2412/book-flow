"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
  Configure,
} from 'react-instantsearch';
interface HitProps {
  hit: {
    objectID: string;
    author: string;
    title: string;
    genre: string;
  };
}
export default function Header() {
  const { loggedIn, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [genres, setGenres] = useState<Genre[]>([]);

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
        <div key={hit.objectID} className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer flex flex-row items-center">
          {hit.title} <span className="ml-2 text-xs text-gray-700">{hit.author}</span>
        </div>
      </Link>
    )
  }
  return (
    <header className="header bg-white h-20 flex gap-2 border-b border-neutral-200">
      <div className="basis-2/12 text-2xl font-bold flex text-neutral-700 min-w-fit">
        <Link
          href="/"
          className="lg:hidden my-auto mx-8 hover:text-neutral-900"
        >
          BF
        </Link>
        <Link href="/" className="hidden lg:block my-auto mx-8">
          Book Flow
        </Link>
      </div>
      <div className="flex-1 flex relative align-middle">
        <InstantSearch searchClient={searchClient}
          indexName="dev_BOOKFLOW"
          insights>
          <Configure hitsPerPage={5} />
          <SearchBox
            onFocus={() => setShowHits(true)} onBlur={() => setTimeout(() => setShowHits(false), 200)}
            classNames={{
              root: "w-full flex border rounded-full border-neutral-300 relative my-auto",
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
              <SheetContent className="w-36 lg:w-80 bg-white">
                <div className="h-full flex text-md lg:text-xl font-light">
                  <div className="w-full my-auto flex flex-col gap-24 text-center">
                    <div className="mx-auto">
                      <Sheet2>
                        <SheetTrigger2>
                          <TextUnderline content="Genres" />
                        </SheetTrigger2>
                        <SheetContent2 className="w-36 lg:w-80 bg-white">
                          <div className="h-full flex text-xs lg:text-xl font-light">
                            <div className="h-full w-full flex flex-col gap-24 text-center overflow-y-auto scrollbar py-48">
                              {genres.map((genre) => (
                                <div className="mx-auto px-2" key={genre.id}>
                                  <Link href={`/genre/${genre.id}/1`}>
                                    <TextUnderline content={genre.name} />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </SheetContent2>
                      </Sheet2>
                    </div>
                    <div className="mx-auto">
                      <Link href="#">
                        <TextUnderline content="Profile" />
                      </Link>
                    </div>
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
                          <TextUnderline content="Logout" />
                        </div>
                      )}
                      {!loggedIn && (
                        <Link href="/login">
                          <TextUnderline content="Login" />
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
    </header>
  );
}
