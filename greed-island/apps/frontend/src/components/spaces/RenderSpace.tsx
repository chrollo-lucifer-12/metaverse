"use client"

import {SpaceElementProps, UserMetadata} from "@/types";
import { Progress } from "@/components/ui/progress"
import PropAnimation from "@/components/animation/prop-animation";
import Character from "@/components/character";
import {useSocket} from "@/hooks/useSocket";

const RenderSpace = ({spaceId, spaceElements, userMetadata, userId} : {spaceId : string, spaceElements : SpaceElementProps, userMetadata : UserMetadata, userId : string}) => {


    const {socket, isLoading, progress} = useSocket(spaceId, userId);

    if (!socket || isLoading) {
        return <div
            className="relative flex-1 flex-col gap-3 border border-[#1c1b1e] overflow-hidden flex items-center justify-center text-white">
            <p>Connecting to Server</p>
            <Progress className={"text-green-200"} value={progress} />
        </div>
    }

    return (
        <div >
            {spaceElements.map((spaceElement, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: `${spaceElement.x}px`,
                        top: `${spaceElement.y}px`,
                        zIndex: 2
                    }}
                >
                    <PropAnimation
                        imageUrl={spaceElement.Elements.imageUrl}
                        jsonData={spaceElement.Elements.jsonData}
                    />

                </div>
            ))}
            <Character idleSpritesheet={userMetadata.Avatar.imageUrl} idleJson={userMetadata.Avatar.idleJson} runningSpritesheet={userMetadata.Avatar.imageUrl2} runningJson={userMetadata.Avatar.runningJson} socket = {socket} isLoading = {isLoading} />
        </div>
    );
}

export default RenderSpace;