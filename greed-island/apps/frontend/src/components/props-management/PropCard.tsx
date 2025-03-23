import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import AvatarAnimation from "@/components/animation/avatar-animation";

interface PropCardProps {
    imageUrl : string
    name : string
    imageUrl2 : string
    idleJson : JSON
    runningJson : JSON
}

const PropCard = ({imageUrl, name, imageUrl2, idleJson, runningJson} : PropCardProps) => {

    return <Card className={"border-1 border-[#232325] bg-transparent text-white w-72 h-96 "}>
        <CardHeader>
            <CardTitle>
                {`Avatar Name : ${name}`}
            </CardTitle>
        </CardHeader>
        <CardContent className={"flex justify-center items-center h-full"}>
            {/*<Image src={imageUrl} alt={"prop image"} height={300} width={400} />*/}
            <AvatarAnimation idleSpritesheet={imageUrl} idleJson={idleJson} runningSpritesheet={imageUrl2} runningJson={runningJson}/>
        </CardContent>
    </Card>
}

export default PropCard