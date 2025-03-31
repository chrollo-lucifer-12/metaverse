import {ChevronRight, Compass} from "lucide-react";

const TotalSpacesCard = ({numberOfSpaces} : {numberOfSpaces: number}) => {
    return <div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/20 to-black/20 p-1 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/25 w-[300px]">
        <div
            className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
        <div
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="relative z-10 flex flex-col p-6 h-full">
            <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
                <Compass className="h-6 w-6 text-white"/>
            </div>
            <h3 className="mb-2 text-xl font-bold">Number of Spaces</h3>
            <p className="mb-6 text-gray-300">
                {numberOfSpaces}
            </p>
        </div>
    </div>
}

export default TotalSpacesCard