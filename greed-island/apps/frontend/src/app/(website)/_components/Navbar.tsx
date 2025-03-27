import Link from "next/link";
import {ChevronRight, Sparkles} from "lucide-react";
import {Button} from "@/components/ui/button";
import {UserButton} from "@clerk/nextjs";

const Navbar = ({isLoggedIn} : {isLoggedIn : boolean}) => {
    return <header className={"relative z-10 w-full py-4"}>
        <div className={"flex items-center justify-between ml-4 mr-4"}>
            <Link href={"/"} className={"flex items-center space-x-2"}>
                <div className={"relative w-10 h-10"}>

                    <div
                        className={"absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg rotate-45 transform-gpu"}>
                    </div>
                    <div className={"absolute inset-1 bg-black rounded-lg rotate-45 flex items-center justify-center"}>
                        <Sparkles className={"h-5 w-5 text-white"}/>
                    </div>
                </div>
                <span
                    className={"font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500"}>
                    PixelVerse
                </span>
            </Link>
            <nav className={"hidden md:flex space-x-8"}>
                <Link href={"/"} className="group text-sm font-medium text-gray-300 transition-colors hover:text-white">
                    <span className="flex items-center">
                Explore
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4"/>
                </span>
              </span>
                </Link>
                <Link href={"/"} className="group text-sm font-medium text-gray-300 transition-colors hover:text-white">
                    <span className="flex items-center">
                Create
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4"/>
                </span>
              </span>
                </Link>
                <Link href={"/"} className="group text-sm font-medium text-gray-300 transition-colors hover:text-white">
                    <span className="flex items-center">
                Connect
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4"/>
                </span>
              </span>
                </Link>
            </nav>
            {
                isLoggedIn ? (<UserButton/>) : (
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                            Login
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0">
                            Join Now
                        </Button>
                    </div>
                )
            }

        </div>
    </header>
}

export default Navbar