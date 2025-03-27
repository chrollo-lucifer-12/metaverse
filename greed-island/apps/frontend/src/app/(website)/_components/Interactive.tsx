import {Button} from "@/components/ui/button";
import {ArrowRight, Building2, Star, Zap} from "lucide-react";

const Interactive = () => {
    return <section id="create" className="relative py-20 overflow-hidden">
        <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>

        {/* Pixelated Cloud */}
        <div className="absolute top-12 right-[10%] opacity-30">
            <div className="w-32 h-16 relative">
                <div className="absolute w-8 h-8 bg-white/30 top-0 left-8"></div>
                <div className="absolute w-8 h-8 bg-white/30 top-0 left-16"></div>
                <div className="absolute w-8 h-8 bg-white/30 top-8 left-0"></div>
                <div className="absolute w-8 h-8 bg-white/30 top-8 left-8"></div>
                <div className="absolute w-8 h-8 bg-white/30 top-8 left-16"></div>
                <div className="absolute w-8 h-8 bg-white/30 top-8 left-24"></div>
            </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div className="order-2 lg:order-1">
                    <div className="relative">
                        <div
                            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-50 blur-xl"></div>
                        <div
                            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-purple-900/50 bg-black">
                            <div
                                className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-80"></div>
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div
                                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                            {/* Interactive Elements */}
                            <div
                                className="absolute top-1/4 left-1/4 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center animate-pulse">
                                <Star className="h-6 w-6 text-white"/>
                            </div>
                            <div
                                className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-pulse"
                                style={{animationDelay: "0.5s"}}
                            >
                                <Zap className="h-6 w-6 text-white"/>
                            </div>
                            <div
                                className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center animate-pulse"
                                style={{animationDelay: "1s"}}
                            >
                                <Building2 className="h-6 w-6 text-white"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <div
                        className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 backdrop-blur-sm mb-4">
                        <div
                            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-sm font-medium">
                            Interactive Worlds
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    Build Your Dream World
                  </span>
                    </h2>
                    <div className="space-y-4 text-gray-300">
                        <p>
                            Our intuitive creation tools make building your own digital spaces simple and fun. No
                            technical
                            skills required - just drag, drop, and watch your imagination come to life.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                                <span>Drag-and-drop world builder</span>
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                                <span>Thousands of pre-made assets</span>
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                                <span>Interactive elements and triggers</span>
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                                <span>Collaborative building with friends</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8">
                        <Button
                            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-white shadow-lg transition-all hover:shadow-cyan-500/25">
                    <span className="relative z-10 flex items-center font-medium">
                      Start Creating
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                    </span>
                            <span
                                className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Interactive