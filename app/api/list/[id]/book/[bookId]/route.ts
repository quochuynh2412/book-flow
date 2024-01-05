import { db } from "@/lib/firebase";
import { auth } from "firebase-admin";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; bookId: string } }
) {
  try {
    // Check session to get userId
    const session = cookies().get("session")?.value || "";
    if (!session) {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
    const userId = (await auth().verifySessionCookie(session, true)).uid;
    const searchParams = req.nextUrl.searchParams;
    const note = searchParams.get("note");
    const title = searchParams.get("title");
    // Check if the list with the given id belongs to the authenticated user
    const listRef = doc(db, "list", params.id);
    const listSnap = await getDoc(listRef);

    if (!listSnap.exists()) {
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    }

    const listData = listSnap.data();

    if (listData.ownerId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const bookObject = {
      bookId: params.bookId,
      note,
      title,
    };

    await updateDoc(listRef, {
      books: arrayUnion(bookObject),
    });
    return NextResponse.json(
      { message: "Book added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding book to list", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; bookId: string } }
) {
  try {
    // Check session to get userId
    const session = cookies().get("session")?.value || "";
    if (!session) {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
    const userId = (await auth().verifySessionCookie(session, true)).uid;

    // Check if the list with the given id belongs to the authenticated user
    const listRef = doc(db, "list", params.id);
    const listSnap = await getDoc(listRef);

    if (!listSnap.exists()) {
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    }

    const listData = listSnap.data();

    if (listData.ownerId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await updateDoc(listRef, {
      books: arrayRemove(
        listData.books.find((book: any) => book.bookId === params.bookId)
      ),
    });
    return NextResponse.json(
      { message: "Book removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing book from list", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
