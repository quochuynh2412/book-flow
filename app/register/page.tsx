import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./user-auth-form"
import TextCrossOver from "@/components/TextCrossOver"
export const metadata: Metadata = {
    title: "Create a new account",
    description: "Sign in to your account",
}

export default function LogInPage() {

    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/login"
                    className="absolute right-4 top-4 md:right-8 md:top-8 font-serif"
                >
                    <TextCrossOver color="titleGray">
                        Log In
                    </TextCrossOver>
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
                        <Link href="/" className="hidden my-auto ml-8 font-serif font-normal lg:flex flex-row gap-0.5 items-center">
                            <Image src={'/img/bookflowlogo.png'} alt="Book" width={50} height={50} className="h-12 w-12 mb-2"></Image>
                            <div>bookflow</div>
                        </Link>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2 bg-white p-3 font-serif text-title-gray">
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
                            <h1 className="text-2xl font-semibold tracking-tight font-serif">
                                Create a new account
                            </h1>
                        </div>
                        <UserAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground font-light">
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