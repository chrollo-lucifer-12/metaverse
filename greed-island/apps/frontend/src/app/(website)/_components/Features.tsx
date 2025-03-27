import {ChevronRight, Compass, Sparkles, Users} from "lucide-react";

const Features = () => {
    return <section className={"relative py-20 text-white bg-[#140322]"}>
        <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,0,128,0.15),transparent_50%)]"></div>
        <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
                <div
                    className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 backdrop-blur-sm mb-4">
                    <div
                        className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1 text-sm font-medium">
                        Endless Possibilities
                    </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <span
                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    Reimagine Reality
                  </span>
                </h2>
                <p className="mt-4 max-w-[700px] text-gray-300 md:text-xl">
                    In PixelVerse, you're not just a player - you're a creator, explorer, and innovator.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Feature Card 1 */}
                <div
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/20 to-black/20 p-1 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/25">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div
                        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <div className="relative z-10 flex flex-col p-6 h-full">
                        <div
                            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
                            <Compass className="h-6 w-6 text-white"/>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Explore Dimensions</h3>
                        <p className="mb-6 text-gray-300">
                            Discover countless user-created worlds, each with unique themes, games, and experiences.
                        </p>
                        <div className="mt-auto flex items-center text-pink-400 font-medium">
                            <span>Discover More</span>
                            <ChevronRight className="ml-1 h-4 w-4"/>
                        </div>
                    </div>
                </div>

                {/* Feature Card 2 */}
                <div
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/20 to-black/20 p-1 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/25">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div
                        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <div className="relative z-10 flex flex-col p-6 h-full">
                        <div
                            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
                            <Sparkles className="h-6 w-6 text-white"/>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Create & Build</h3>
                        <p className="mb-6 text-gray-300">
                            Design your own spaces with intuitive tools. No coding required - just pure imagination.
                        </p>
                        <div className="mt-auto flex items-center text-cyan-400 font-medium">
                            <span>Start Creating</span>
                            <ChevronRight className="ml-1 h-4 w-4"/>
                        </div>
                    </div>
                </div>

                {/* Feature Card 3 */}
                <div
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/20 to-black/20 p-1 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/25">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div
                        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <div className="relative z-10 flex flex-col p-6 h-full">
                        <div
                            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                            <Users className="h-6 w-6 text-white"/>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Connect & Thrive</h3>
                        <p className="mb-6 text-gray-300">
                            Meet friends, join communities, and collaborate on projects in real-time.
                        </p>
                        <div className="mt-auto flex items-center text-green-400 font-medium">
                            <span>Join Communities</span>
                            <ChevronRight className="ml-1 h-4 w-4"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Features