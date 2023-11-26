import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./user-auth-form"
export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account",
}

export default function LogInPage() {

    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/register"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Create Account
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-black dark:border-r lg:flex">
                    <div className="absolute inset-0">
                        <Image
                            src="/img/AdobeStock_111453960.jpeg"
                            alt="Authentication"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            quality={100}
                        />
                    </div>
                    <div className="relative z-20 flex items-center text-lg font-medium gap-4 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="mr-2 h-8"
                        >
                            <path d="M24.12,11.75L12.75,3.56v3.57v18.68l11.37,7.52V11.75L24.12,11.75z M18.46,49c-0.49,0.01-0.9-0.39-0.91-0.88
	c-0.01-0.49,0.39-0.9,0.88-0.91l5.85-0.11l-0.14-6.57H11.89c-3.08,0-5.89-0.96-7.86-3.04c-1.75-1.84-2.82-4.52-2.82-8.15V17.69
	v-4.18c0-0.49,0.4-0.9,0.9-0.9c0.49,0,0.9,0.4,0.9,0.9v3.29h3.86V5.84c0-0.5,0.4-0.9,0.9-0.9c0.11,0,0.21,0.02,0.31,0.05l0,0
	l2.9,0.92v-4.1c0-0.49,0.4-0.9,0.9-0.9c0.22,0,0.43,0.08,0.58,0.22l0,0l12.57,9.06l12.57-9.06c0.16-0.14,0.36-0.22,0.58-0.22
	c0.49,0,0.9,0.4,0.9,0.9v4.1L41.96,5c0.1-0.03,0.2-0.05,0.31-0.05c0.49,0,0.9,0.4,0.9,0.9V16.8h3.86v-3.29c0-0.49,0.4-0.9,0.9-0.9
	c0.49,0,0.9,0.4,0.9,0.9v4.18v11.66c0,3.63-1.07,6.31-2.82,8.15c-1.97,2.08-4.78,3.04-7.86,3.04H25.92l0.14,6.53l5.67-0.1
	c0.49-0.01,0.9,0.39,0.91,0.88c0.01,0.49-0.39,0.9-0.88,0.91L18.46,49L18.46,49z M47.02,18.59v10.77c0,3.13-0.88,5.41-2.32,6.92
	c-1.61,1.69-3.95,2.48-6.57,2.48H11.89c-2.61,0-4.96-0.78-6.57-2.48C3.88,34.76,3,32.49,3,29.35V18.59h3.86v10.96h0
	c0,0.38,0.24,0.73,0.63,0.85l17.23,5.45l0.01,0l0,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0
	l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0h0l0.01,0l0.01,0
	l0.01,0l0,0l0.02,0h0l0.01,0l0.01,0h0.01h0l0.01,0h0.01h0.01l0.01,0h0h0.01l0.01,0l0.01,0h0l0.02,0l0,0l0.01,0l0.01,0l0.01,0h0
	l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0
	l0.01,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0.01,0l0.01,0l0,0l0,0l0.01,0l0,0l17.22-5.45c0.38-0.12,0.63-0.47,0.63-0.85h0V18.59
	H47.02L47.02,18.59z M41.37,7.06l-2.31,0.73v18.5c0,0.33-0.18,0.62-0.45,0.78l-7.78,5.15l10.54-3.33v-11.2V7.06L41.37,7.06z
	 M10.96,7.79v18.5c0,0.33,0.18,0.62,0.45,0.78l7.78,5.15L8.65,28.89v-11.2V7.06L10.96,7.79L10.96,7.79z M37.27,3.56l-11.37,8.19
	v21.58l11.37-7.52V7.14V3.56z"/>
                        </svg>
                        Book Curator
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2 bg-white p-3 font-serif">
                            <p className="text-lg">
                                &ldquo;Books are the quietest and most constant of friends;
                                they are the most accessible and wisest of counselors, and the most patient of teachers.&rdquo;
                            </p>
                            <footer className="text-sm">Charles W. Eliot</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Log in with your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Choose one of the following sign in methods
                            </p>
                        </div>
                        <UserAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}