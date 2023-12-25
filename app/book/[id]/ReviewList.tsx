import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [visibleReviews, setVisibleReviews] = useState<number>(3);

  const filteredReviews = selectedTab === 'all'
    ? reviews
    : reviews.filter(review => review.rating.toString() === selectedTab);

  const showMoreReviews = () => {
    // Increase the number of visible reviews by 3, up to the total number of reviews
    setVisibleReviews(prev => Math.min(prev + 3, filteredReviews.length));
  };

  const noReviewsMessage = <div className="border rounded-lg text-gray-500 border-neutral-300 px-5 py-[121px] text-center">There are no reviews for this</div>

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={value => {
        setSelectedTab(value);
        setVisibleReviews(3); // Reset visible reviews when changing tabs
      }}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="5">5 star</TabsTrigger>
          <TabsTrigger value="4">4 star</TabsTrigger>
          <TabsTrigger value="3">3 star</TabsTrigger>
          <TabsTrigger value="2">2 star</TabsTrigger>
          <TabsTrigger value="1">1 star</TabsTrigger>
        </TabsList>

        {['all', '5', '4', '3', '2', '1'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue}>
            {filteredReviews.length === 0 ? (
              noReviewsMessage
            ) : (
              <>
                {filteredReviews.slice(0, visibleReviews).map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
                {visibleReviews < filteredReviews.length && (
                  <div className="flex">
                    <button onClick={showMoreReviews} className="mx-auto px-10 text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Show More</button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
