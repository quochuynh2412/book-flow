import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc } from "firebase/firestore";
export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams;
    const author = searchParams.get('author');
    const genre = searchParams.get('genre');
    const id = searchParams.get('id');
    const booksCollection = collection(db, 'book');
    let queryConditions: any[] = [];
    let authorDoc: any;
    if (author) {
        queryConditions.push(where('authorID', '==', author));
    }
    if (genre) {
        queryConditions.push(where('genresID', "array-contains", genre));
    }
    const q = query(booksCollection, ...queryConditions);
    if (!id) {
        try {
            // Get the documents that match the query
            const snapshot = await getDocs(q);

            // Extract the data from the documents
            const books = await Promise.all(snapshot.docs.map(async (book) => {
                const docRef = doc(db, "author", book.data().authorID);
                const docSnap = await getDoc(docRef);
                let author: any;
                if (docSnap.exists()) {
                    author = { id: docSnap.id, ...docSnap.data() };
                } else {
                    console.log("No such document!");
                    author = null; // Return null for non-existent authors
                }

                const genres = await Promise.all(
                    book.data().genresID.map(async (genreID: string) => {
                        const docRef = doc(db, "genre", genreID);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            return { id: docSnap.id, ...docSnap.data() as Record<string, unknown> };
                        } else {
                            console.log("No such document!");
                            return null; // Return null for non-existent genres
                        }
                    })
                );

                const data = book.data() as Record<string, unknown>;
                delete data.genresID;
                delete data.authorID;
                return {
                    id: book.id,
                    ...data,
                    genres,
                    author,
                };
            }));

            return NextResponse.json({ books }, { status: 200 });
        } catch (error) {
            console.error('Error retrieving books:', error);
            return NextResponse.json({ message: 'Error retrieving books:' + error }, { status: 401 });
        }
    }
    if (id) {
        try {
            const docRef = doc(db, "book", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const book = docSnap.data() as Record<string, unknown>;
                const docRef = doc(db, "author", docSnap.data().authorID);
                let author: any;
                if (docSnap.exists()) {
                    author = { id: docSnap.id, ...docSnap.data() };
                } else {
                    console.log("No such document!");
                    author = null; // Return null for non-existent authors
                }

                const genres = await Promise.all(
                    docSnap.data().genresID.map(async (genreID: string) => {
                        const docRef = doc(db, "genre", genreID);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            return { id: docSnap.id, ...docSnap.data() as Record<string, unknown> };
                        } else {
                            console.log("No such document!");
                            return null; // Return null for non-existent genres
                        }
                    })
                );

                const data = docSnap.data() as Record<string, unknown>;
                delete data.genresID;
                delete data.authorID;
                return NextResponse.json({
                    id: docSnap.id,
                    ...data,
                    genres,
                    author,
                }, { status: 200 });
            } else {
                console.log("No such document!");
                return NextResponse.json({ message: 'No such document!' }, { status: 401 });
            }
        } catch (error) {
            console.error('Error retrieving book:', error);
            return NextResponse.json({ message: 'Error retrieving book:' + error }, { status: 401 });
        }
    }
}