import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc, orderBy, limit, startAt } from "firebase/firestore";
export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const authorCollection = collection(db, 'author');
    const itemsPerPage: any = Number.parseInt(searchParams.get('itemsPerPage') || "0");
    const page: any = Number.parseInt(searchParams.get('page') || "1");
    let queryConditions: any[] = [];
    const booksCollection = collection(db, 'author');
    const startAtDoc = (page - 1) * itemsPerPage;
    queryConditions.push(orderBy("name"));
    if (id) {
        const docRef = doc(db, "author", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const author = { id: docSnap.id, ...docSnap.data() };
            return NextResponse.json({ author }, { status: 200 });
        } else {
            console.log("No such document!");
            return NextResponse.json({ author: null }, { status: 200 });
        }
    } else {
        try {
            if (itemsPerPage != 0 && page != 0) {
                queryConditions.push(limit(itemsPerPage));
                queryConditions.push(startAt(startAtDoc));
            }
            const q = query(booksCollection, ...queryConditions);
            // Get the documents that match the query
            const snapshot = await getDocs(q);
            // Extract the data from the documents
            const authors = await Promise.all(snapshot.docs.map(async (author) => {
                const docRef = doc(db, "author", author.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() };
                } else {
                    console.log("No such document!");
                    return null; // Return null for non-existent authors
                }
            }));
            return NextResponse.json({ authors }, { status: 200 });
        } catch (e) {
            console.log(e);
            return NextResponse.json({ authors: [] }, { status: 200 });
        }
    }
}