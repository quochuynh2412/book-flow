"use client"

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import Link from "next/link";

import { Book } from "@/types/interfaces";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import ReviewCard from "../book/[id]/ReviewCard";
import PersonalityTest from "@/components/PersonalityTest";

import Lottie from "lottie-react";
import lineAnimation from '@/public/svg/line.json';
import { StarGenerator } from "@/components/Icons/Star";

import bg1 from "@/public/img/bg1.png";

export default function Page() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showScore, setShowScore] = useState([true, true, true, true, true]);
  const [sortBy, setSortBy] = useState('mostRecent');
  const [hasPreferredGenre, setHasPreferredGenre] = useState(false);
  const [preferredGenre1, setPreferredGenre1] = useState<Book[]>([]);
  const [preferredGenre2, setPreferredGenre2] = useState<Book[]>([]);
  const [preferredGenre3, setPreferredGenre3] = useState<Book[]>([]);

  const sortOptions = [
    { value: 'mostRecent', label: 'Most Recent' },
    { value: 'mostHelpful', label: 'Most Helpful' },
    { value: 'highestRating', label: 'Highest Rating' },
  ];

  useEffect(() => {
    async function fetchUser() {
      await fetch(`/api/user`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setUser(data);

        // users might not have any preferred genre
        if (data["preferredGenre"] === undefined || data["preferredGenre"].length === 0) {
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

    async function fetchReviews() {
      const user = await new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        });
      });
    
      if (!user) {
        console.error("User not authenticated");
        return;
      }
    
      const userId = (user as any).uid;

      await fetch(`/api/review?userID=${userId}`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setReviews(data);
      }).catch(error => {
        console.error("Failed to fetch genre description:", error)
      });
    }

    fetchUser();
    fetchReviews();
  }, []);

  const noReviewsMessage = <div className="border rounded-lg text-gray-500 border-neutral-300 flex-1 py-[121px] text-center">You don&apos;t have any reviews</div>

  const handleCheckboxChange = (index: number) => {
    setShowScore((prevShowScore) => {
      const newShowScore = [...prevShowScore];
      newShowScore[index] = !newShowScore[index];
      return newShowScore;
    });
  };

  return (
    <div >
      <Header />
      {
        user && user["score"] <= 3 ? (
            <div className="h-80 flex shadow-inner bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-600 border-solid border-8 border-neutral-400" style={{ backgroundImage: `url(${bg1.src})` }}>
              <div className="m-auto">
                <p className="text-center font-light text-white mb-2">User Profile</p>
                <h1 className="text-4xl md:text-6xl m-auto text-white font-serif z-0 relative">
                  <Lottie animationData={lineAnimation} loop={true} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -z-10 -translate-y-1/2 h-auto w-full " />
                  {user && user["name"]}
                </h1>
                <p className="text-center font-light text-white mb-2 mt-3">Score</p>
                <h1 className="text-xl md:text-2xl m-auto text-white font-serif z-0 relative flex justify-center">
                  {user && user["score"]}
                </h1>
              </div>
            </div>
          ) : (
            <div className="h-80 flex shadow-inner bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-600 border-solid border-8 border-yellow-500" style={{ backgroundImage: `url(${bg1.src})` }}>
              <div className="m-auto">
                <p className="text-center font-light text-white mb-2">User Profile</p>
                <h1 className="text-4xl md:text-6xl m-auto text-white font-serif z-0 relative">
                  <Lottie animationData={lineAnimation} loop={true} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -z-10 -translate-y-1/2 h-auto w-full " />
                  {user && user["name"]}
                </h1>
                <p className="text-center font-light text-white mb-2 mt-3">Score</p>
                <h1 className="text-xl md:text-2xl m-auto text-white font-serif z-0 relative flex justify-center">
                  {user && user["score"]}
                </h1>
              </div>
            </div>
        )
      }
      <div >
        <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8 font-serif">
          <h2 className="text-2xl font-serif text-title-gray md:text-3xl text-center mb-8 md:mb-12 font-light border-b border-neutral-300 pb-5">My Reviews</h2>
          <div className="gap-4 lg:gap-8 md:flex">
            <div className="w-full md:w-72 mb-4">
              <div className="border border-neutral-300 rounded-md sticky top-10">
                <div className="p-4 border-b border-neutral-300 bg-neutral-100">
                  <h2 className="text-lg">Filter Reviews</h2>
                </div>
                <div className="p-4">
                  <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    onChange={(e) => setSortBy(e.target.value)}
                    value={sortBy}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-4">
                  <p className="block text-sm font-medium text-gray-700">Review score</p>
                  {[5, 4, 3, 2, 1].map((score, index) => (
                    <label key={score} htmlFor={`${score}star`} className="flex gap-4 mb-4 mt-2">
                      <input
                        id={`${score}star`}
                        type="checkbox"
                        checked={showScore[4 - index]}
                        onChange={() => handleCheckboxChange(4 - index)}
                      />
                      <StarGenerator size={5} score={score} />
                      <span className="ais-RefinementList-count text-xs text-neutral-500 bg-neutral-200 px-2 py-1 rounded-full">
                        {reviews.filter(review => review.rating === score).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {
              reviews && reviews.length === 0 ? noReviewsMessage :
              <div className="flex-1 max-h-[600px] overflow-y-auto">
                {reviews.sort((a, b) => {
                  if (sortBy === 'mostRecent') {
                    return (
                      new Date(b.date.seconds * 1000 + Math.floor(b.date.nanoseconds / 1e6)).getTime() -
                      new Date(a.date.seconds * 1000 + Math.floor(a.date.nanoseconds / 1e6)).getTime()
                    );
                  } else if (sortBy === 'mostHelpful') {
                    return b.helpful.length - a.helpful.length;
                  } else if (sortBy === 'highestRating') {
                    return b.rating - a.rating;
                  }
                  return 0;
                }).map((review, index) => {
                  if (showScore[review.rating - 1]) { // Check if the score checkbox is checked
                    return (
                      <Link key={index} href={`/book/${review.bookID}`}>
                        <ReviewCard review={review} />
                      </Link>
                    );
                  }
                  return null; // Skip reviews with unchecked score
                })}
              </div>
            }
          </div>
        </div>
        {
          hasPreferredGenre ? (
            <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8 font-serif">
              <h2 className="text-2xl font-serif text-title-gray md:text-3xl text-center mb-8 md:mb-12 font-light border-b border-neutral-300 pb-5">You may also like</h2>
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
            <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8 font-serif">
              <h2 className="text-2xl font-serif text-title-gray md:text-3xl text-center mb-8 md:mb-12 font-light border-b border-neutral-300 pb-5">You have no preferred genre</h2>
            </div>
          )
        }
        <div className="mx-auto py-16 px-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-serif text-title-gray md:text-3xl text-center mb-8 md:mb-12 font-light border-b border-neutral-300 pb-5">Genres Recommendation</h2>
          <PersonalityTest />
        </div>
      </div>
      <Footer />
    </div>
  );
}