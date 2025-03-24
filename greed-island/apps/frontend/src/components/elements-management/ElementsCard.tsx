import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import AvatarAnimation from "@/components/animation/avatar-animation";
import PropAnimation from "@/components/animation/prop-animation";

interface PropCardProps {
    imageUrl : string
    name : string
    jsonData : JSON
}

const PropCard = ({imageUrl, name, jsonData} : PropCardProps) => {

    return <Card className={"border-1 border-[#232325] bg-transparent text-white w-72 h-96 "}>
        <CardHeader>
            <CardTitle>
                {`Avatar Name : ${name}`}
            </CardTitle>
        </CardHeader>
        <CardContent className={"flex justify-center items-center h-full"}>
            <PropAnimation imageUrl={imageUrl} jsonData={jsonData} />
        </CardContent>
    </Card>
}

export default PropCard