import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./user-auth-form"
import logo from "@/public/svg/logo.svg"
export const metadata: Metadata = {
    title: "Authentication",
    description: "Sign in to your account",
}

export default function LogInPage() {

    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                {/* <Link
                    href="/examples/authentication"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Create Account
                </Link> */}
                <div className="relative hidden h-full flex-col bg-muted p-10 text-black dark:border-r lg:flex">
                    <div className="absolute inset-0">
                        <Image
                            src="/img/AdobeStock_111453960.jpeg"
                            alt="Authentication"
                            fill
                            objectFit="cover"
                            quality={100}
                        />
                    </div>
                    <div className="relative z-20 flex items-center text-lg font-medium gap-4 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48.7482 10"
                            fill="white"
                            className="mr-2 h-4"
                        >
                            <path d="m36.57172,4.812c-1.72169-.48249-3.57869-.74512-5.36047-.62091-1.83298.12775-3.52308.8784-4.7596,2.11384-.5101.50962-.95475,1.11965-1.32331,1.81513h-1.50804c-.36857-.69548-.81321-1.30551-1.32331-1.81513-1.23651-1.23544-2.92705-1.98609-4.76003-2.11384-1.78133-.12421-3.63967.13863-5.36003.62091C6.91258,6.28734,0,8.55097,0,8.55097l1.87525,1.14592,11.56445-3.46187c2.60434-.7284,6.75858-.81744,8.05163,2.21221.21543.50474.36988,1.01082.45759,1.55276h4.85082c.01158,0,.13842-.89244.45713-1.55276,1.4346-2.97155,5.32042-2.97604,8.05163-2.21221l11.56443,3.46187,1.87527-1.14592s-6.91215-2.26363-12.17649-3.73897Z" />
                            <path d="m8.69125,2.25062c2.75925-.69484,5.88705-1.48291,8.72108-1.37896,4.20096.15268,6.71184,2.82289,6.73366,2.84246,0,0-1.56413-3.19055-5.91377-3.63498-3.33211-.34053-6.55471.47916-9.76353,1.28723-1.40166.353-2.72586.68615-3.81593.84795l.98814.75247c.93295-.1834,1.96874-.444,3.05036-.71617Z" />
                            <path d="m31.33546.87166c2.83399-.10395,5.96177.68412,8.72106,1.37896,1.08163.27218,2.11738.53278,3.05031.71617l.98814-.75247c-1.09005-.16179-2.41427-.49495-3.81591-.84795-3.20571-.8072-6.44301-1.62642-9.76307-1.28723-4.35008.44443-5.9142,3.63498-5.9142,3.63498.02182-.01957,2.53269-2.68978,6.73368-2.84246Z" />
                            <path d="m14.18705,3.41058c3.26133-.59579,6.93528-.09505,9.33577,2.38312.26795.27685.72283.82812.85106,1.0952.12819-.26708.58307-.81835.85102-1.0952,2.40408-2.48128,6.07133-2.98002,9.3358-2.38312,2.62887.48026,9.42169,2.41872,10.37155,2.64265l1.29972-.93051c-.94943-.24328-8.80833-2.29702-11.45582-2.84451-2.79442-.57797-5.74731-.45245-8.29957.90158-.91824.48694-1.61666,1.05068-2.10269,1.52295-.48608-.47227-1.18445-1.03601-2.10272-1.52295-2.55227-1.35403-5.50515-1.47956-8.29955-.90158-2.64753.54749-10.50643,2.60123-11.45584,2.84451l1.29972.93051c.94986-.22392,7.74271-2.16238,10.37155-2.64265Z" />
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