"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Video, MessageSquare, Gamepad2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {FloatingElements} from "@/app/(website)/_components/floating-elements";
import MetaverseDemo from "@/app/(website)/_components/metaverse-demo";
import VideoChatDemo from "@/app/(website)/_components/video-chat-demo";
import {useRouter} from "next/navigation";
import {useAuth, UserButton} from "@clerk/nextjs";
export default function LandingPage() {
    const {isSignedIn} = useAuth()
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col text-white">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 p-3 backdrop-blur flex justify-between supports-[backdrop-filter]:bg-background/60">
                        <Link href="/" className="flex items-center space-x-2">
                            <Gamepad2 className="h-6 w-6 text-primary" />
                            <span className="inline-block font-bold">MetaVerse2D</span>
                        </Link>
                        <nav className="hidden gap-6 md:flex">
                            <Link
                                href="#features"
                                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
                            >
                                Features
                            </Link>
                            <Link href="#demo" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                                Demo
                            </Link>
                            <Link
                                href="#pricing"
                                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
                            >
                                Pricing
                            </Link>
                        </nav>
                {
                    isSignedIn ? (<UserButton/>) : (     <Button onClick={ () => {router.push("/auth/sign-in")}}  size="sm" className={"bg-black text-white"}>
                        Log in
                    </Button>)
                }



            </header>
            <main className="flex-1">
                <section className="relative overflow-hidden py-24 md:py-32">
                    <FloatingElements />
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Video Chat in Your Own Virtual World
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Create customizable 2D spaces where people can video chat, collaborate, and gather together - with
                                        the natural feel of being in the same room.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button onClick={() => {
                                        router.push("/dashboard")
                                    }} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                                        Create Your Space <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button variant={"outline"} className={"text-black"}>Watch Demo</Button>
                                </div>
                                <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="overflow-hidden rounded-full border-2 border-background">
                                                    <Image
                                                        src={`/placeholder.svg?height=40&width=40&text=User${i}`}
                                                        alt={`User ${i}`}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-muted-foreground">Join 10,000+ users</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto lg:mx-0 relative">
                                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-75 blur-xl"></div>
                                <div className="relative bg-background rounded-xl border shadow-xl overflow-hidden">
                                    <MetaverseDemo />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-muted py-20">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                                    Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-black">
                                    Everything You Need in Your 2D World
                                </h2>
                                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                    Create customizable spaces for meetings, events, classrooms, and hangouts.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 text-black">
                            <div className="grid gap-4 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Video className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Proximity Video Chat</h3>
                                <p className="text-muted-foreground">
                                    Walk up to someone to start a video conversation, just like in real life.
                                </p>
                            </div>
                            <div className="grid gap-4 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Users className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Customizable Spaces</h3>
                                <p className="text-muted-foreground">Design your own virtual space with our easy-to-use editor.</p>
                            </div>
                            <div className="grid gap-4 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <MessageSquare className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Interactive Objects</h3>
                                <p className="text-muted-foreground">Add whiteboards, games, documents, and more to your space.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="demo" className="py-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Video Chat Like You're There</h2>
                                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                    Our proximity-based video chat makes online interactions feel natural and spontaneous.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto max-w-4xl py-12">
                            <VideoChatDemo />
                        </div>
                    </div>
                </section>

                <section className="bg-primary text-primary-foreground py-20">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 items-center">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Join the Metaverse?</h2>
                                <p className="text-primary-foreground/80 md:text-xl">
                                    Create your own virtual space in minutes and invite your friends, colleagues, or students.
                                </p>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button variant="secondary" size="lg">
                                        Get Started for Free
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                                        size="lg"
                                    >
                                        Schedule a Demo
                                    </Button>
                                </div>
                            </div>
                            <div className="relative rounded-xl overflow-hidden border-4 border-primary-foreground/20">
                                <Image
                                    src="/placeholder.svg?height=300&width=500&text=Metaverse+Preview"
                                    alt="Metaverse Preview"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center pb-8">
                                    <Button variant="secondary" size="lg" className="gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Try Demo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="pricing" className="py-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                    Choose the plan that's right for you and your team.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                            {[
                                {
                                    title: "Free",
                                    price: "$0",
                                    description: "Perfect for small gatherings",
                                    features: [
                                        "Up to 4 concurrent users",
                                        "Basic customization",
                                        "1 room template",
                                        "Standard video quality",
                                    ],
                                },
                                {
                                    title: "Pro",
                                    price: "$19",
                                    description: "Great for teams and events",
                                    features: [
                                        "Up to 25 concurrent users",
                                        "Advanced customization",
                                        "5 room templates",
                                        "HD video quality",
                                        "Custom branding",
                                    ],
                                },
                                {
                                    title: "Enterprise",
                                    price: "Custom",
                                    description: "For large organizations",
                                    features: [
                                        "Unlimited users",
                                        "Full customization",
                                        "Unlimited rooms",
                                        "4K video quality",
                                        "Custom integrations",
                                        "Dedicated support",
                                    ],
                                },
                            ].map((plan, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col rounded-xl border p-6 ${i === 1 ? "border-primary shadow-lg" : ""}`}
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold">{plan.title}</h3>
                                        <div className="text-4xl font-bold">{plan.price}</div>
                                        <p className="text-muted-foreground">{plan.description}</p>
                                    </div>
                                    <ul className="my-6 space-y-2 flex-1">
                                        {plan.features.map((feature, j) => (
                                            <li key={j} className="flex items-center">
                                                <svg
                                                    className="mr-2 h-4 w-4 text-primary"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant={i === 1 ? "default" : "outline"} className={`mx-auto ${i===2 ? "text-black" : "text-white"}`}>
                                        {i === 2 ? "Contact Sales" : "Get Started"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-t py-12">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Join Our Community</h2>
                                <p className="text-muted-foreground md:text-xl mb-6">
                                    Stay updated with the latest features and connect with other metaverse creators.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 text-black">
                                    <Button variant="outline" className="gap-2">
                                        <svg
                                            className="h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                        </svg>
                                        Twitter
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                        <svg
                                            className="h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                        Discord
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                        <svg
                                            className="h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        Newsletter
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-xl border bg-muted p-6">
                                <h3 className="text-xl font-bold mb-4 text-black">Subscribe to Updates</h3>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Gamepad2 className="h-6 w-6 text-primary" />
                        <p className="text-sm leading-loose text-center md:text-left">
                            &copy; {new Date().getFullYear()} MetaVerse2D. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="text-sm underline underline-offset-4">
                            Terms
                        </Link>
                        <Link href="#" className="text-sm underline underline-offset-4">
                            Privacy
                        </Link>
                        <Link href="#" className="text-sm underline underline-offset-4">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
