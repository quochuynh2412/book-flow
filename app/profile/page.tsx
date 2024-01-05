"use client"

import { useState, useEffect } from "react";

import { Book } from "@/types/interfaces";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import PersonalityTest from "@/components/PersonalityTest";

import bg1 from "@/public/img/bg1.png";

export default function Page() {
  const [user, setUser] = useState(null);
  const [hasPreferredGenre, setHasPreferredGenre] = useState(false);
  const [preferredGenre1, setPreferredGenre1] = useState<Book[]>([]);
  const [preferredGenre2, setPreferredGenre2] = useState<Book[]>([]);
  const [preferredGenre3, setPreferredGenre3] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchUser() {
      await fetch(`/api/user`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setUser(data);

        // users might not have any preferred genre
        if (data["preferredGenre"] === undefined) {
          setHasPreferredGenre(false);
          return;
        } else {
          setHasPreferredGenre(true);
          for (let i = 0; i < data["preferredGenre"].length; i++) {
            fetchBooks(data["preferredGenre"][i], i);
          }
        }

      }).catch(error => {
        console.error("Failed to fetch user: ", error);
      });
    }

    // 3 preferred genre x 2 books per genre = 6 books
    async function fetchBooks(id: string, row: number) {
      await fetch(`/api/book?genre=` + id + `&itemsPerPage=2&page=1`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();

        if (row === 0) {
          setPreferredGenre1(data.books);
        } else if (row === 1) {
          setPreferredGenre2(data.books);
        } else if (row === 2) {
          setPreferredGenre3(data.books);
        }

      }).catch(error => {
        console.error("Failed to fetch books: ", error);
      });
    }

    fetchUser();
  }, []);

  return (
    <div >
      <Header />
      {
        // display diffrent border color based on score value
        user && user["score"] <= 2 ? (
          <>
            <div className="h-80 flex shadow-inner bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-400 border-solid border-8 border-neutral-400" style={{ backgroundImage: `url(${bg1.src})` }}>
              <div className="m-auto">
                <p className="text-center font-light text-white mb-2">User Profile</p>
                <h1 className="text-4xl md:text-6xl font-semibold text-white mb-3">{user && user["name"]}</h1>
                {
                  // if user does not contain score field
                  !user || !user["score"] ? (
                    <>
                    </>
                  ) : (
                    <>
                      <p className="text-center font-light text-white mb-2">Score</p>
                      <p className="text-center font-light text-white mb-2">{user["score"]}</p>
                    </>
                  )
                }
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-80 flex shadow-inner bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-400 border-solid border-8 border-yellow-300" style={{ backgroundImage: `url(${bg1.src})` }}>
              <div className="m-auto">
                <p className="text-center font-light text-white mb-2">User Profile</p>
                <h1 className="text-4xl md:text-6xl font-semibold text-white mb-3">{user && user["name"]}</h1>
                {
                  // if user does not contain score field
                  !user || !user["score"] ? (
                    <>
                    </>
                  ) : (
                    <>
                      <p className="text-center font-light text-white mb-2">Score</p>
                      <p className="text-center font-light text-white mb-2">{user["score"]}</p>
                    </>
                  )
                }
              </div>
            </div>
          </>
        )
      }
      <div className="min-h-screen">
        <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
          <PersonalityTest />
        </div>
        {
          hasPreferredGenre ? (
            <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
              <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 font-light border-b-2 border-neutral-300 pb-5">You may also like</h2>
              <div className="gap-4 lg:gap-12 grid grid-cols-3 md:grid-cols-6">
                {preferredGenre1 && preferredGenre1.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
                {preferredGenre2 && preferredGenre2.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
                {preferredGenre3 && preferredGenre3.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
              <h2 className="text-3xl md:text-5xl text-center mb-8 md:mb-12 font-light border-b-2 border-neutral-300 pb-5">You have no preferred genre</h2>
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  );
}