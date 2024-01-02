import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc } from "firebase/firestore";
import { cookies } from "next/headers";
import { auth } from "firebase-admin";


export async function GET(request: NextRequest, response: NextResponse) {
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return NextResponse.json({ message: "No user found" }, { status: 401 });
  }
  const userID = (await auth().verifySessionCookie(session, true)).uid;

  if (userID) {
    const docRef = doc(db, "user", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data(), { status: 200 });

    } else {
      console.log("No such document!");
    }
  }

  console.log("You have to specify user ID");
  return NextResponse.json({}, { status: 200 });
}
