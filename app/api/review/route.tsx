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

        const reviews : any = [];

        querySnapshot.forEach((doc) => {
          reviews.push(doc.data());
        })
        return NextResponse.json(reviews, { status: 200 });
    }
    console.log("You have to specify the book ID");
    return NextResponse.json({ authors: [] }, { status: 200 });
}