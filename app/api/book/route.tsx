import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, collection, query } from "firebase/firestore";
export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams;
    const authorId = searchParams.get('query');
    const genre = searchParams.get('genre');
    const booksCollection = collection(db, 'book');
    let queryConditions: any[] = [];
    if (authorId) {
        queryConditions.push(where('author', '==', authorId));
    }
    if (genre) {
        queryConditions.push(where('genre', '==', genre));
    }
    const q = query(booksCollection, ...queryConditions);
    try {
        // Get the documents that match the query
        const snapshot = await getDocs(q);

        // Extract the data from the documents
        const books = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Record<string, unknown>),
        }));

        return NextResponse.json({ books }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving books:', error);
        return NextResponse.json({ message: 'Error retrieving books:' + error }, { status: 401 });
    }
}