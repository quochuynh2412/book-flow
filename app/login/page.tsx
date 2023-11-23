"use client";

import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getURL } from "next/dist/shared/lib/utils";
import { signOut } from "firebase/auth";
export default function SignIn() {
    const router = useRouter();

    async function signOutUser() {
        //Sign out with the Firebase client
        await signOut(auth);

        //Clear the cookies in the server
        const response = await fetch("/api/authentication/logout", {
            method: "POST",
        });

        if (response.status === 200) {
            router.push("/login");
        }
    }

    useEffect(() => {
        getRedirectResult(auth).then(async (userCred) => {
            if (!userCred) {
                return;
            }

            await fetch(`/api/authentication/login`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${await userCred.user.getIdToken()}`,
                },
            }).then((response) => {
                if (response.status === 200) {
                    router.push("/protected");
                }
            });
        });
    }, []);

    function signIn() {
        signInWithRedirect(auth, provider);
    }


    return (
        <>
            <button onClick={() => signIn()}>Sign In</button>
            <button onClick={() => signOutUser()}>Sign Out</button>
        </>
    );
}