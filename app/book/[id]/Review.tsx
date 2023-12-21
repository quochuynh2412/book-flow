import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import Star from "@/components/Icons/Star";
import ReviewBar from "@/components/ReviewBar";

export default function Review({bookId} : {bookId: string}) {
  return (
    <div className="md:flex gap-9">
      <div className="md:basis-5/12">
        <ReviewForm bookId={bookId} />
      </div>
      <div className="flex-1">
        <div>
          <div className="flex items-center mb-2">
            <Star size={10} />
            <Star size={10}/>
            <Star size={10}/>
            <Star size={10}/>
            <Star size={10} color="text-gray-300" />
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
        <div className="mt-14">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="5">5 star</TabsTrigger>
              <TabsTrigger value="4">4 star</TabsTrigger>
              <TabsTrigger value="3">3 star</TabsTrigger>
              <TabsTrigger value="2">2 star</TabsTrigger>
              <TabsTrigger value="1">1 star</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </TabsContent>
            <TabsContent value="5">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </TabsContent>
            <TabsContent value="4">
              <ReviewCard />
              <ReviewCard />
            </TabsContent>
            <TabsContent value="3">
              <ReviewCard />
              <ReviewCard />
            </TabsContent>
            <TabsContent value="2">
              <ReviewCard />
            </TabsContent>
            <TabsContent value="1">
              <ReviewCard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
