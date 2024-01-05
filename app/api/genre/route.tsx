import { NextRequest, NextResponse } from "next/server";
import { db, storage } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const genreCollection = collection(db, 'genre');
    if (id) {
        const docRef = doc(db, "genre", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const imageUrl = await getDownloadURL(ref(storage, data.imageID));
            delete data.imageID;
            const genre = { id: docSnap.id, ...data, imageUrl };
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
                    const data = docSnap.data();
                    const imageUrl = await getDownloadURL(ref(storage, data.imageID));
                    delete data.imageID;
                    return { id: docSnap.id, ...data, imageUrl };
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