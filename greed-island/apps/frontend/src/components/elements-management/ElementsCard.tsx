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
    onClick?: () => void;
}

const PropCard = ({imageUrl, name, jsonData, onClick} : PropCardProps) => {

    return (
        <HoverCard>
            <HoverCardTrigger>
                <Card
                    onClick={onClick}
                    className={
                        "border-1 border-[#232325] bg-transparent text-white " +
                        "w-64 h-64 flex flex-col " + // Fixed width and height, flex layout
                        "hover:ring-1 hover:ring-blue-500 hover:cursor-pointer " +
                        "transition duration-200 overflow-hidden group"
                    }>
                    <CardContent className={
                        "flex justify-center items-center " +
                        "w-full h-full " +
                        "group-hover:scale-105 transition duration-300"
                    }>
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