"use client"

import {Link2} from "lucide-react";
import {Button} from "@/components/ui/button";

const CopyId = ({spaceId} : {spaceId : string}) => {
    return <Button onClick={() => {
        navigator.clipboard.writeText(spaceId);
    }} className={"cursor-pointer"}>
        <Link2></Link2>
    </Button>
}

export default CopyId