import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc } from "firebase/firestore";


export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const bookID = searchParams.get('bookID');
  const score = searchParams.get('score');

  if (bookID) {
      const q = query(collection(db, "review"), where("bookID", "==", bookID));
      const querySnapshot = await getDocs(q);

      const reviews: any = [];
      const promises: Promise<any>[] = [];

      querySnapshot.forEach((review) => {
          const docRef = doc(db, "user", review.data()["user"]);
          const promise = getDoc(docRef).then((docSnap) => {
              const result = review.data();
              result["user"] = docSnap.data();
              reviews.push(result);
          });
          promises.push(promise);
      });

      // Wait for all promises to resolve before sending the response
      await Promise.all(promises);
        
      reviews.sort((a : any, b : any) => {
        const dateA = new Date(a.date.seconds * 1000 + Math.floor(a.date.nanoseconds / 1e6));
        const dateB = new Date(b.date.seconds * 1000 + Math.floor(b.date.nanoseconds / 1e6));
    
        return dateB.getTime() - dateA.getTime();
    });

      return NextResponse.json(reviews, { status: 200 });
  }

  console.log("You have to specify the book ID");
  return NextResponse.json({ authors: [] }, { status: 200 });
}
