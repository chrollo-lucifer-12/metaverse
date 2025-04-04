'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link";

const images = [
    "snorlax-1",
    "snorlax-2",
    "snorlax-3",
    "snorlax-4"
]

const NotFound = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length)
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col h-full w-full justify-center items-center text-white">
            <Image
                src={`/${images[index]}.png`}
                alt="snorlax"
                width={300}
                height={300}
            />
            <p>Space your'e trying to join doesn't exist</p>
            <Link className={"text-blue-400"} href={"/dashboard"}>Dashboard</Link>
        </div>
    )
}

export default NotFound
