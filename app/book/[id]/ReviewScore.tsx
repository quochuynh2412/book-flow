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
import ReviewBar from "@/components/ReviewBar";

export default function ReviewScore({bookId} : {bookId: string}) {
  
  return (
    <div className="sticky top-10 pb-10">
      <div>
        <div className="flex items-center mb-2">
          <Star size={8} />
          <Star size={8}/>
          <Star size={8}/>
          <Star size={8}/>
          <Star size={8} color="text-gray-300" />
          <p className="ms-1 font-medium text-gray-500 dark:text-gray-400 text-lg">
            4.95 out of 5
          </p>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          1,745 global ratings
        </p>
        <ReviewBar text="5 star" percent="70%" />
        <ReviewBar text="4 star" percent="17%" />
        <ReviewBar text="3 star" percent="8%" />
        <ReviewBar text="2 star" percent="4%" />
        <ReviewBar text="1 star" percent="1%" />
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