import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import AvatarAnimation from "@/components/animation/avatar-animation";
import {useRef, useState} from "react";

interface PropCardProps {
    imageUrl : string
    name : string
    imageUrl2 : string
    idleJson : JSON
    runningJson : JSON
}

const PropCard = ({imageUrl, name, imageUrl2, idleJson, runningJson} : PropCardProps) => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e : any) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({ x, y });
        }
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };


    return (
        <div ref={cardRef} className={"group relative"} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <Card
                className={"border-1 border-[#232325] bg-transparent text-white w-72 h-96 hover:scale-105 transition duration-200 hover:cursor-pointer relative overflow-hidden"}>
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: `radial-gradient(
                            circle 100px at ${mousePosition.x}px ${mousePosition.y}px, 
                            rgba(30, 64, 175, 0.2), 
                            transparent 50%
                        )`
                    }}
                />
                <CardHeader>
                    <CardTitle className={"flex gap-2"}>
                        <p className={"text-[#96979b]"}>Avatar Name :</p> <p
                        className={"text-white group-hover:text-blue-500 transition duration-200"}>{`${name}`}</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className={"flex justify-center items-center h-full"}>
                    {/*<Image src={imageUrl} alt={"prop image"} height={300} width={400} />*/}
                    <AvatarAnimation idleSpritesheet={imageUrl} idleJson={idleJson} runningSpritesheet={imageUrl2}
                                     runningJson={runningJson}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default PropCard