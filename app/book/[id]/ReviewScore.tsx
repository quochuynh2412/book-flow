import { auth } from "@/lib/firebase";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ReviewForm from "./ReviewForm";
import Star from "@/components/Icons/Star";
import { StarGenerator } from "@/components/Icons/Star";
import ReviewBar from "@/components/ReviewBar";
import { useEffect, useState } from "react";

export default function ReviewScore({ bookId, reviews }: { bookId: string, reviews: any[] }) {
  const user = auth.currentUser;
  const [myReview, setMyReview] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  let sum = 0, numOne = 0, numTwo = 0, numThree = 0, numFour = 0, numFive = 0;

  reviews.forEach((review) => {
    sum += review["rating"];

    switch (review["rating"]) {
      case 1:
        numOne++; break;
      case 2:
        numTwo++; break;
      case 3:
        numThree++; break;
      case 4:
        numFour++; break;
      case 5:
        numFive++; break;
    }
  });

  // setup percentage for each score
  let score = Number((sum / reviews.length).toFixed(2));
  numOne = (reviews.length == 0) ? 0 : Math.round(numOne / reviews.length * 100);
  numTwo = (reviews.length == 0) ? 0 : Math.round(numTwo / reviews.length * 100);
  numThree = (reviews.length == 0) ? 0 : Math.round(numThree / reviews.length * 100);
  numFour = (reviews.length == 0) ? 0 : Math.round(numFour / reviews.length * 100);
  numFive = (reviews.length == 0) ? 0 : Math.round(numFive / reviews.length * 100);
  if (reviews.length == 0) score = 0;

  // check if user has reviewed this book before
  useEffect(() => {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i]["user"]["userID"] === user?.uid) {
        setHasReviewed(true);
        setMyReview(reviews[i]);
        break;
      }
    }
  }, [reviews, user?.uid]);

  return (
    <div className="sticky top-10 pb-10">
      <div>
        <div className="flex items-center mb-2">
          <StarGenerator size={8} score={score} />
          <p className="ms-1 font-medium text-neutral-500 dark:text-neutral-400 text-lg font-serif">
            {score} out of 5 &nbsp;<span className={`font-roboto font-light text-sm`}>({reviews.length} global ratings)</span>
          </p>
        </div>
        <div className="mt-8 font-serif">
          <ReviewBar text="5 star" percent={`${numFive}%`} />
          <ReviewBar text="4 star" percent={`${numFour}%`} />
          <ReviewBar text="3 star" percent={`${numThree}%`} />
          <ReviewBar text="2 star" percent={`${numTwo}%`} />
          <ReviewBar text="1 star" percent={`${numOne}%`} />
        </div>
      </div>
      <div className="w-full flex">
        <Dialog>
          <DialogTrigger className="mx-auto mt-10">
            {
              (hasReviewed)
                ? <div className="w-full px-10 text-white bg-neutral-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-full text-sm py-2.5 text-center transition-all">Edit your review</div>
                : <div className="w-full px-10 text-white bg-neutral-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-full text-sm py-2.5 text-center transition-all">Write A Review</div>
            }
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="max-h-[600px] overflow-y-auto no-scrollbar">
              <DialogDescription>
                <ReviewForm bookId={bookId} myReview={myReview} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}