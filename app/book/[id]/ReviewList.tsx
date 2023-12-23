import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "./ReviewCard";

export default function ReviewList() {

  return (
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
  );
}