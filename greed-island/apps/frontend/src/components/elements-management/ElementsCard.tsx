import {Card, CardContent} from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import PropAnimation from "@/components/animation/prop-animation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface PropCardProps {
    imageUrl : string
    name : string
    jsonData : JSON
}

const PropCard = ({imageUrl, name, jsonData} : PropCardProps) => {

    return (
        <HoverCard>
            <HoverCardTrigger>
                <Card
                    className={"border-1 border-[#232325] bg-transparent text-white w-20 h-20 rounded-full hover:ring-1 transition duration-200"}>
                    <CardContent className={"flex justify-center items-center h-full"}>
                        <PropAnimation imageUrl={imageUrl} jsonData={jsonData}/>
                    </CardContent>
                </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit items-center border-1 text-white border-[#232325] bg-black">
                <div className="flex space-x-4">
                    <Avatar>
                        <AvatarImage src={imageUrl}/>
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{name}</h4>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default PropCard