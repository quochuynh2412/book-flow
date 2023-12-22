import { db } from "@/lib/firebase";
import { auth } from "firebase-admin";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json({ message: "List id missing" }, { status: 400 });
    }
    const listRef = doc(db, "list", params.id);
    const listSnap = await getDoc(listRef);
    if (listSnap.exists()) {
      return NextResponse.json({ id: listSnap.id, ...listSnap.data() });
    }
    return NextResponse.json({ message: "List not found" }, { status: 404 });
  } catch (error) {
    console.error("Error getting list by id", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
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

    await deleteDoc(listRef);

    return NextResponse.json({ message: "Delete successful" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting list by id", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
