"use client"

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { db } from "@/lib/firebase";

import Star from "@/components/Icons/Star";
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"


const ratingSystem : string[] = [
  "The 1 Star review is for books that have no place on your bookshelf. The ones that were snooze-worthy from start to finish (sadly, they are out there). If you think a book was utterly terrible and need everyone to know it, don't be afraid to use the 1 Star review.",
  "It's safe to say that you won't reread this book, and it's doubtful that it will remain on your bookshelf. However, perhaps this book wasn't complete nonsense. The 2-star review is for a book that definitely wasn't good but wasn't completely bad. If you appreciated the story or enjoyed a few snippets of text, but felt overall that the book lacked personality and storyline, then award your below-average read a 2-star review.",
  "Are you feeling neutral about your recent read? Were you a little underwhelmed? Are you plagued by the feeling of indifference? Then bring out the 3 Star review. You should award 3 Stars to books that you mostly enjoyed but didn't leave you with the \"wow, that was good\" kind of feeling.",
  "4 Stars are for books that you enjoyed, from beginning to end - a truly great read. It may not be top of your reread pile, but if the opportunity arose, you wouldn't say no. You should be pleased with all the components of the novel, and perhaps you were even thrilled about one element in particular (such as an engaging character or plot twist).",
  "Can't wait to reread? Top of your recommendation list? Can't stop thinking about the ending? Beginning? Chapter 13, page 4?! 5 Stars are for the creme de la creme of your bookshelf. Those books that give you the \"I'm so sad it has ended!\" kind of feeling. Of course, no book is entirely perfect, but if this book has you almost shouting from the rooftops, filled you with a joyous buzz and reminded you how wondrous it is to read, then 5 Stars are certainly on the menu."
];

export default function ReviewForm({bookId} : {bookId: string}) {
  const [rating, setRating] = useState(3);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast()

  async function submit() {
    const user = auth.currentUser;

    if (user) {
      const userID : string = await user.uid;

      const docRef = await addDoc(collection(db, "review"), {
        title: title || null,
        content: content || null,
        bookID: bookId || null,
        rating: rating || null,
        user: userID || null,
        date: serverTimestamp()
      });
    } else {
      toast({
        description: "You have to login to write review!",
      })
    }
  }

  return (
    <form className="mb-10 p-5 py-8 border border-neutral-300 mx-auto rounded-md sticky top-1 max-h-screen overflow-y-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Read this book before?</h2>
        <h3 className="text-sm mt-2">Tell us what you think!</h3>
      </div>
      <div className="mt-10">
        <div className="flex mb-10">
          <div className="mx-auto flex ">
            {Array.from({ length: rating }).map((_, index) => (
              <Star key={index} size={10} />
            ))}
          </div>     
        </div>
        <Slider onValueChange={(value) => setRating(value[0])} id="rating" defaultValue={[3]} min={1} max={5} step={1} />
        <div className="mt-10 bg-neutral-100 text-sm p-5 rounded-lg">
            {ratingSystem[rating - 1]}
        </div>
      </div>
      <div className="mt-10 mb-5">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review title</label>
        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Best book I have read in..." required />
      </div>
      <div className="mb-10">
        <label  htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tell us what you think about this book</label>
        <textarea id="message" rows={3} onChange={(e) => setContent(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Overall, it is a great book..." required></textarea>
      </div>
      <button onClick={submit} className="mb-3 w-full text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Submit</button>
    </form>
  );
}