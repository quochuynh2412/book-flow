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

export default function ReviewScore({bookId, reviews} : {bookId: string, reviews: any[]}) {
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
  }});

  const score = (sum / reviews.length).toFixed(2);
  
  return (
    <div className="sticky top-10 pb-10">
      <div>
        <div className="flex items-center mb-2">
          <StarGenerator size={8} score={ Number(score) } />
          <p className="ms-1 font-medium text-gray-500 dark:text-gray-400 text-lg">
            {score} out of 5
          </p>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {reviews.length} global ratings
        </p>
        <ReviewBar text="5 star" percent={`${Math.round(numFive / reviews.length * 100)}%`} />
        <ReviewBar text="4 star" percent={`${Math.round(numFour / reviews.length * 100)}%`} />
        <ReviewBar text="3 star" percent={`${Math.round(numThree / reviews.length * 100)}%`} />
        <ReviewBar text="2 star" percent={`${Math.round(numTwo / reviews.length * 100)}%`} />
        <ReviewBar text="1 star" percent={`${Math.round(numOne / reviews.length * 100)}%`} />
      </div>
      <div className="w-full flex">
        <Dialog>
          <DialogTrigger className="mx-auto mt-10">
            <div className="w-full px-10 text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Write A Review</div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="max-h-[600px] overflow-y-auto no-scrollbar">
              <DialogDescription>
                <ReviewForm bookId={bookId} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}