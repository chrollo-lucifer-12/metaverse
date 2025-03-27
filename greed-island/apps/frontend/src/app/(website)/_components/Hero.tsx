import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

const Hero = () => {
    return <main className={"flex-1 bg-[#2d2d2f]"}>
        <section className={"relative overflow-hidden py-20 md:py-32"}>
            <div
                className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>
            <div className={"container relative z-10 px-4 md:px-6"}>
                <div className={"grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"}>
                    <div className={"flex flex-col justify-center space-y-8"}>
                        <div>
                            <p className="inline-block text-white rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                                Welcome to the 2D Revolution
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                <span className="block text-white">Your Reality.</span>
                                <span
                                    className="block mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      Your Rules.
                    </span>
                            </h1>
                            <p className="max-w-[600px] text-gray-300 md:text-xl">
                                Step into a vibrant 2D universe where imagination has no boundaries. Build worlds, forge
                                connections, and redefine what's possible.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-6 text-white shadow-lg transition-all hover:shadow-pink-500/25">
                    <span className="relative z-10 flex items-center font-medium">
                      Enter PixelVerse
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                    </span>
                                <span
                                    className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
}

export default Hero