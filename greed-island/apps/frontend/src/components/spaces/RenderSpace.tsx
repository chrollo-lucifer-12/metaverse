"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchSpaceElements} from "@/actions/elements";
import {SpaceElementProps, UserMetadata} from "@/types";
import PropAnimation from "@/components/animation/prop-animation";
import {fetchUserProfile} from "@/actions/user";
import Character from "@/components/character";
import {useSocket} from "@/hooks/useSocket";
import {useAuth} from "@clerk/nextjs";

const RenderSpace = ({spaceId} : {spaceId : string}) => {


    const {userId} = useAuth()
    const {socket, isLoading, initialY, initialX, initialUsers, avatarInfo} = useSocket(spaceId, userId);

    const {data : spaceElementsData, isFetching : spaceIsFetching} = useQueryData(["space-elements"], () => fetchSpaceElements(spaceId))

    const {data : userMetadataData, isFetching} = useQueryData(["user-metadata"], () => fetchUserProfile());

    if (isFetching || !spaceElementsData || spaceIsFetching) {
        return <div className="relative flex-1 border border-[#1c1b1e] overflow-hidden flex items-center justify-center text-white">
            <p>Loading space elements...</p>
        </div>
    }

    if (!socket || isLoading) {
        return <div
            className="relative flex-1 border border-[#1c1b1e] overflow-hidden flex items-center justify-center text-white">
            <p>Connecting to Server...</p>
        </div>
    }

    const spaceElements = spaceElementsData as SpaceElementProps;
    const userMetadata = userMetadataData as UserMetadata;

    return (
        <div>
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
            <Character idleSpritesheet={userMetadata.Avatar.imageUrl} idleJson={userMetadata.Avatar.idleJson} runningSpritesheet={userMetadata.Avatar.imageUrl2} runningJson={userMetadata.Avatar.runningJson} socket = {socket} isLoading = {isLoading} initialX={initialX} initialY={initialY} initialUsers={initialUsers} initialAvatars={avatarInfo!} />
        </div>
    );
}

export default RenderSpace;