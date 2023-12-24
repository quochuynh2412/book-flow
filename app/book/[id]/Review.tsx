import { useEffect, useState } from "react";

import ReviewScore from "./ReviewScore";
import ReviewList from "./ReviewList";

export default function Review({bookID} : {bookID: string}) {
  
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function getReviews(bookID: string) {
      await fetch(`/api/review?bookID=${bookID}`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setReviews(data);
      }).catch(error => {
        console.error("Failed to fetch genre description:", error)
      });
    }
    getReviews(bookID);
  }, []);

  return (
    <div>
      <div className="text-3xl font-bold mt-20 mb-10 border-b-2 pb-2 border-neutral-300">Reviews</div>
      <div className="md:flex gap-9">
        <div className="md:basis-5/12 mt-5">
          <ReviewScore bookId={bookID} reviews={reviews} />
        </div>
        <div className="flex-1 mt-5">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
