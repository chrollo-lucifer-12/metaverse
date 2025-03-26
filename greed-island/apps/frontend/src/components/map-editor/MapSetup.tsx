"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import CreateMapForm from "@/components/map-editor/CreateMapForm";

const MapSetup = () => {
    return (
    <div className={"flex justify-center items-center"}>
        <Card className={"bg-black text-white border-1 border-[#141416]"}>
            <CardHeader>
                <CardTitle>Create Map</CardTitle>
                <CardDescription>Create Your first map</CardDescription>
            </CardHeader>
            <CardContent >
                <CreateMapForm/>
            </CardContent>
        </Card>


    </div>
    )
}

export default MapSetup