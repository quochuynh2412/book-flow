import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  where,
  getDocs,
  getDoc,
  collection,
  query,
  doc,
} from "firebase/firestore";

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const bookID = searchParams.get("bookID");
  const userID = searchParams.get("userID");
  const score = searchParams.get("score");

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
        result["user"]["userID"] = review.data()["user"];
        result["reviewID"] = review.id;
        reviews.push(result);
      });
      promises.push(promise);
    });

    // Wait for all promises to resolve before sending the response
    await Promise.all(promises);

    reviews.sort((a: any, b: any) => {
      // Compare by the length of helpful (descending order)
      const helpfulComparison = b.helpful.length - a.helpful.length;

      // If lengths are different, return the result
      if (helpfulComparison !== 0) {
        return helpfulComparison;
      }

      // If lengths are the same, compare by date (descending order)
      const dateA = new Date(
        a.date.seconds * 1000 + Math.floor(a.date.nanoseconds / 1e6)
      );
      const dateB = new Date(
        b.date.seconds * 1000 + Math.floor(b.date.nanoseconds / 1e6)
      );

      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json(reviews, { status: 200 });

  } else if (userID) {
    const q = query(collection(db, "review"), where("user", "==", userID));
    const querySnapshot = await getDocs(q);

    const reviews: any = [];
    const promises: Promise<any>[] = [];

    querySnapshot.forEach((review) => {
      const docRef = doc(db, "user", review.data()["user"]);
      const promise = getDoc(docRef).then((docSnap) => {
        const result = review.data();
        result["user"] = docSnap.data();
        result["user"]["userID"] = review.data()["user"];
        result["reviewID"] = review.id;
        reviews.push(result);
      });
      promises.push(promise);
    });

    await Promise.all(promises);

    reviews.sort((a: any, b: any) => {
      // Compare by the length of helpful (descending order)
      const helpfulComparison = b.helpful.length - a.helpful.length;

      // If lengths are different, return the result
      if (helpfulComparison !== 0) {
        return helpfulComparison;
      }

      // If lengths are the same, compare by date (descending order)
      const dateA = new Date(
        a.date.seconds * 1000 + Math.floor(a.date.nanoseconds / 1e6)
      );
      const dateB = new Date(
        b.date.seconds * 1000 + Math.floor(b.date.nanoseconds / 1e6)
      );

      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json(reviews, { status: 200 });
  }

  return NextResponse.json({ authors: [] }, { status: 200 });
}
