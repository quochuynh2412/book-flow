"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { getRedirectResult, signInWithRedirect, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getURL } from "next/dist/shared/lib/utils";
import { signOut } from "firebase/auth";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const router = useRouter();
    const { toast } = useToast();

    async function submitSignUpForm(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
            name: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;
        const name = target.name.value;

        createUserWithEmailAndPassword(auth, email, password).then(async (userCred) => {
            if (!userCred) {
                return;
            }
            await fetch(`/api/authentication/signup`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${await userCred.user.getIdToken()}`,
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            }).then((response) => {
                if (response.status === 200) {
                    router.push("/");
                    toast({
                        description: "Account created successfully",
                    });
                }
            });
        }).catch((error) => {
            toast({
                description: error.message,
            });
        }).then(() => {
            setIsLoading(false);
        });
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

    async function signIn() {
        setIsLoading(true);
        await signInWithRedirect(auth, provider);
        setIsLoading(false);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={submitSignUpForm}>
                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Fullname
                        </Label>
                        <Input
                            id="name"
                            className="font-light rounded-full p-6"

                            placeholder="John Doe"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="name"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="font-light rounded-full p-6"
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
                            className="font-light rounded-full p-6"

                            placeholder="Password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading} type="submit" className="rounded-full p-6 hover:bg-rose-800 font-serif">
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign Up with Email
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
            <Button variant="outline" type="button" disabled={isLoading} onClick={signIn}
                className="font-serif rounded-full p-6">
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Sign in with Google
            </Button>
        </div>
    )
}