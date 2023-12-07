import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    // Check session to get userId
    const session = cookies().get("session")?.value || "";
    if (!session) {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
    const userId = (await auth().verifySessionCookie(session, true)).uid;

    const listsCollection = collection(db, "list");

    const q = query(listsCollection, where("ownerId", "==", userId));

    const snapshot = await getDocs(q);

    const result: any[] = [];

    snapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check session to get userId
    const session = cookies().get("session")?.value || "";
    if (!session) {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
    const userId = (await auth().verifySessionCookie(session, true)).uid;

    // Get the bookListName
    const { bookListName } = await req.json();
    if (!bookListName) {
      return NextResponse.json(
        { message: "Book list name not provided" },
        { status: 400 }
      );
    }

    const listData = {
      bookListName,
      ownerId: userId,
      books: [],
    };

    await addDoc(collection(db, "list"), {
      ...listData,
    });

    return NextResponse.json(
      { message: "Create list successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
