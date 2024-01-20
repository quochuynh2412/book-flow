"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import {
  getRedirectResult,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getURL } from "next/dist/shared/lib/utils";
import { signOut } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  async function submitLogInForm(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
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
            router.push("/");
            toast({
              description: "Logged in successfully",
            });
          }
        });
      })
      .catch((error) => {
        toast({
          description: "Incorrect email or password",
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  }

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
    getRedirectResult(auth)
      .then(async (userCred) => {
        if (!userCred) {
          return;
        }

        // Check if the user document exists in Firestore
        const docRef = doc(db, "user", userCred.user.uid);
        await getDoc(docRef).then(async (doc) => {
          if (!doc.exists()) {
            // If the user document doesn't exist, create it
            const user = {
              email: userCred.user.email,
              name: userCred.user.displayName,
            };
            await setDoc(docRef, user);

            // Create two lists in the "list" collection
            const list1 = {
              name: "Read",
              ownerId: userCred.user.uid,
              books: [],
            };
            const list2 = {
              name: "Want to read",
              ownerId: userCred.user.uid,
              books: [],
            };
            await addDoc(collection(db, "list"), list1);
            await addDoc(collection(db, "list"), list2);
          }
        });

        // Authenticate with your server by sending a POST request
        await fetch(`/api/authentication/login`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`,
          },
        }).then((response) => {
          setIsLoading(false);
          if (response.status === 200) {
            // If authentication with the server is successful, redirect to "/" and set login state
            router.push("/");
            login(true);
            toast({
              description: "Logged in successfully",
            });
          } else {
            // If authentication with the server fails, display an error toast
            toast({
              title: "Error",
              description: "Failed to log in",
            });
          }
        });
      })
      .catch((error) => {
        setIsLoading(false);
        // Handle errors, such as displaying an error toast
        toast({
          title: "Error",
          description: error.message,
        });
      });
  }, []);

  async function signInWithGoogle() {
    setIsLoading(true);
    await signInWithRedirect(auth, provider);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={submitLogInForm}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={signInWithGoogle}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Sign in with Google
      </Button>
    </div>
  );
}
