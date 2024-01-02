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
    async function getUid() {
      const user = auth.currentUser;
      if (user != null) {
        const id = await user?.uid;
        setUid(id);
      }
    }

    getGenre();
    getUid();
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
    <header className="header bg-neutral-100 h-20 flex gap-2 border-b border-neutral-200">
      <div className="basis-2/12 text-xl font-bold flex text-neutral-700">
        <Link
          href="/"
          className="lg:hidden my-auto mx-8 hover:text-neutral-900"
        >
          BF
        </Link>
        <Link href="/" className="hidden my-auto ml-8 font-serif font-normal lg:flex flex-row gap-2">
          <div className="w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              fill="#404040"
              fillRule="evenodd"
              clipRule="evenodd"
              className="mr-2 h-8"
            >
              <path d="M24.12,11.75L12.75,3.56v3.57v18.68l11.37,7.52V11.75L24.12,11.75z M18.46,49c-0.49,0.01-0.9-0.39-0.91-0.88
	c-0.01-0.49,0.39-0.9,0.88-0.91l5.85-0.11l-0.14-6.57H11.89c-3.08,0-5.89-0.96-7.86-3.04c-1.75-1.84-2.82-4.52-2.82-8.15V17.69
	v-4.18c0-0.49,0.4-0.9,0.9-0.9c0.49,0,0.9,0.4,0.9,0.9v3.29h3.86V5.84c0-0.5,0.4-0.9,0.9-0.9c0.11,0,0.21,0.02,0.31,0.05l0,0
	l2.9,0.92v-4.1c0-0.49,0.4-0.9,0.9-0.9c0.22,0,0.43,0.08,0.58,0.22l0,0l12.57,9.06l12.57-9.06c0.16-0.14,0.36-0.22,0.58-0.22
	c0.49,0,0.9,0.4,0.9,0.9v4.1L41.96,5c0.1-0.03,0.2-0.05,0.31-0.05c0.49,0,0.9,0.4,0.9,0.9V16.8h3.86v-3.29c0-0.49,0.4-0.9,0.9-0.9
	c0.49,0,0.9,0.4,0.9,0.9v4.18v11.66c0,3.63-1.07,6.31-2.82,8.15c-1.97,2.08-4.78,3.04-7.86,3.04H25.92l0.14,6.53l5.67-0.1
	c0.49-0.01,0.9,0.39,0.91,0.88c0.01,0.49-0.39,0.9-0.88,0.91L18.46,49L18.46,49z M47.02,18.59v10.77c0,3.13-0.88,5.41-2.32,6.92
	c-1.61,1.69-3.95,2.48-6.57,2.48H11.89c-2.61,0-4.96-0.78-6.57-2.48C3.88,34.76,3,32.49,3,29.35V18.59h3.86v10.96h0
	c0,0.38,0.24,0.73,0.63,0.85l17.23,5.45l0.01,0l0,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0
	l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0h0l0.01,0l0.01,0
	l0.01,0l0,0l0.02,0h0l0.01,0l0.01,0h0.01h0l0.01,0h0.01h0.01l0.01,0h0h0.01l0.01,0l0.01,0h0l0.02,0l0,0l0.01,0l0.01,0l0.01,0h0
	l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0
	l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0,0l0.01,0l0,0l17.22-5.45c0.38-0.12,0.63-0.47,0.63-0.85h0V18.59
	H47.02L47.02,18.59z M41.37,7.06l-2.31,0.73v18.5c0,0.33-0.18,0.62-0.45,0.78l-7.78,5.15l10.54-3.33v-11.2V7.06L41.37,7.06z
	 M10.96,7.79v18.5c0,0.33,0.18,0.62,0.45,0.78l7.78,5.15L8.65,28.89v-11.2V7.06L10.96,7.79L10.96,7.79z M37.27,3.56l-11.37,8.19
	v21.58l11.37-7.52V7.14V3.56z"/>
            </svg>
          </div>
          <div>bookflow</div>
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
                    {loggedIn && (
                      <div className="mx-auto">
                        <Link href={`/profile/${uid}`}>
                          <TextUnderline content="Profile" />
                        </Link>
                      </div>
                    )}
                    {loggedIn && (
                      <div className="mx-auto">
                        <Link href={`/list`}>
                          <TextUnderline content="My Lists" />
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
