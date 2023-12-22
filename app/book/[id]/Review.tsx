import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "./ReviewCard";

import Star from "@/components/Icons/Star";
import ReviewScore from "./ReviewScore";


export default function Review({bookId} : {bookId: string}) {
  return (
    <div>
      <div className="text-3xl font-bold mt-20 mb-10 border-b-2 pb-2 border-neutral-300">Reviews</div>
      <div className="md:flex gap-9">
        <div className="md:basis-5/12 mt-5">
          <ReviewScore bookId={bookId} />
        </div>
        <div className="flex-1 mt-5">
          <div>
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
    </div>
  );
}
