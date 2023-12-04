import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc, limit, startAt, orderBy } from "firebase/firestore";
export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams;
    const author = searchParams.get('author');
    const genre = searchParams.get('genre');
    const id = searchParams.get('id');
    const itemsPerPage: any = Number.parseInt(searchParams.get('itemsPerPage') || "0");
    const page: any = Number.parseInt(searchParams.get('page') || "0");

    const booksCollection = collection(db, 'book');
    let queryConditions: any[] = [];
    queryConditions.push(orderBy("title"));
    let authorDoc: any;
    if (author) {
        queryConditions.push(where('authorID', 'array-contains', author));
    }
    if (genre) {
        queryConditions.push(where('genreID', "array-contains", genre));
    }

    if (!id) {
        if (itemsPerPage != 0 && page != 0) {
            const startAtDoc = (page - 1) * itemsPerPage;
            queryConditions.push(limit(itemsPerPage));
            queryConditions.push(startAt(startAtDoc));
        }
        const q = query(booksCollection, ...queryConditions);
        try {
            const snapshot = await getDocs(q);
            const books = await Promise.all(snapshot.docs.map(async (book) => {
                const authorIdArray: string[] = book.data().authorID;
                const authors = await Promise.all(
                    authorIdArray.map(async (id: string) => {
                        const docRef = doc(db, "author", id);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            return { id: docSnap.id, ...docSnap.data() };
                        } else {
                            return null;
                        }
                    })
                );
                const genres = await Promise.all(
                    book.data().genreID.map(async (id: string) => {
                        const docRef = doc(db, "genre", id);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            return { id: docSnap.id, ...docSnap.data() };
                        } else {
                            console.log("No such document!");
                            return null; // Return null for non-existent genres
                        }
                    })
                );

                const data = book.data() as Record<string, unknown>;
                delete data.genreID;
                delete data.authorID;
                return {
                    id: book.id,
                    ...data,
                    genres,
                    authors,
                };
            }));
            return NextResponse.json({ books }, { status: 200 });
        } catch (error) {
            console.error('Error retrieving books:', error);
            return NextResponse.json({ message: 'Error retrieving books:' + error }, { status: 400 });
        }
    }
    if (id) {
        try {
            const docRef = doc(db, "book", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const book = docSnap.data();
                const authorIdArray: string[] = book.authorID;
                const authors = await Promise.all(
                    authorIdArray.map(async (id: string) => {
                        const docRef = doc(db, "author", id);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            return { id: docSnap.id, ...docSnap.data() };
                        } else {
                            return null;
                        }
                    })
                )
                const genres = await Promise.all(
                    docSnap.data().genreID.map(async (id: string) => {
                        const docRef = doc(db, "genre", id);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            return { id: docSnap.id, ...docSnap.data() };
                        } else {
                            console.log("No such document!");
                            return null; // Return null for non-existent genres
                        }
                    })
                );

                const data = docSnap.data();
                delete data.genreID;
                delete data.authorID;
                return NextResponse.json({
                    id: docSnap.id,
                    ...data,
                    genres,
                    authors,
                }, { status: 200 });
            } else {
                console.log("No such document!");
                return NextResponse.json({ message: 'No such document!' }, { status: 404 });
            }
        } catch (error) {
            console.error('Error retrieving book:', error);
            return NextResponse.json({ message: 'Error retrieving book:' + error }, { status: 400 });
        }
    }
}