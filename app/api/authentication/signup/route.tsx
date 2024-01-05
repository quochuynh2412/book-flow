import { auth } from "firebase-admin";
import { customInitApp } from "@/lib/firebase-admin-config";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { where, getDocs, getDoc, collection, query, doc, setDoc } from "firebase/firestore";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const authorization = headers().get('Authorization');

        if (authorization?.startsWith('Bearer ')) {
            const idToken = authorization.split('Bearer ')[1];
            const decodedToken = await auth().verifyIdToken(idToken);

            if (decodedToken) {
                // Extract user data from request body
                const { name, email } = await request.json();

                // Create user in Firestore
                const userRef = doc(db, 'user', decodedToken.uid);
                await setDoc(userRef, {
                    name,
                    email,
                });
                // Generate session cookie
                const expiresIn = 60 * 60 * 24 * 5 * 1000;
                const sessionCookie = await auth().createSessionCookie(idToken, {
                    expiresIn,
                });

                const options = {
                    name: 'session',
                    value: sessionCookie,
                    maxAge: expiresIn,
                    httpOnly: true,
                    secure: true,
                };

                // Add the cookie to the browser
                cookies().set(options);

                return NextResponse.json({}, { status: 200 });
            }
        }

        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
