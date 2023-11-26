import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc } from "firebase/firestore";
export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const genreCollection = collection(db, 'genre');
    if (id) {
        const docRef = doc(db, "genre", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const genre = { id: docSnap.id, ...docSnap.data() };
            return NextResponse.json({ genre }, { status: 200 });
        } else {
            console.log("No such document!");
            return NextResponse.json({ genre: null }, { status: 200 });
        }
    } else {
        try {
            // Get the documents that match the query
            const snapshot = await getDocs(genreCollection);
            // Extract the data from the documents
            const genres = await Promise.all(snapshot.docs.map(async (genre) => {
                const docRef = doc(db, "genre", genre.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() };
                } else {
                    console.log("No such document!");
                    return null; // Return null for non-existent genres
                }
            }));
            return NextResponse.json({ genres }, { status: 200 });
        } catch (e) {
            console.log(e);
            return NextResponse.json({ genres: [] }, { status: 200 });
        }
    }
}