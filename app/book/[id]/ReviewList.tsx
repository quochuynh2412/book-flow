import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const filteredReviews = selectedTab === 'all'
    ? reviews
    : reviews.filter(review => review.rating.toString() === selectedTab);

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={value => setSelectedTab(value)}>
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
            {filteredReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
