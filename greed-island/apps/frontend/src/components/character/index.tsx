import { useEffect, useRef, useState } from "react";
import {fetchAvatars} from "@/actions/user";
import {SingleAvatarProps} from "@/types";

interface EntityAnimationProps {
    idleSpritesheet: string;
    idleJson: any;
    runningSpritesheet: string;
    runningJson: any;
    socket : WebSocket
    isLoading : boolean
}

const Character = ({ idleJson, idleSpritesheet, runningSpritesheet, runningJson, socket, isLoading}: EntityAnimationProps) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [loading, setLoading] = useState(true);
    const [frameData, setFrameData] = useState<any>(null);
    const [isRunning, setIsRunning] = useState(false);
    const characterRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{x : number, y : number} | null>(null)
    const [usersInRoom, setUsersInRoom] = useState<{id: string,x: number | undefined,y: number | undefined }[]>([]);
    const [userAvatars, setUserAvatars] = useState<{id : string, Avatar : SingleAvatarProps}[]>([]);
    const [isFetchingAvatar, setIsFetchingAvatar] = useState<boolean>(false);

    useEffect(() => {
        const handleMove = (e: KeyboardEvent) => {

            function sendUpdate (x : number, y : number) {
                setIsRunning(true);
                socket.send(JSON.stringify({
                    type : "move",
                    payload : {
                        x : position!.x + x,
                        y : position!.y! + y
                    }
                }))
                setPosition(prevState => ({x : prevState!.x + x, y : prevState!.y! + y}));
            }


            if (e.key === "W" || e.key === "w") {
                sendUpdate(0,-1);
            }
            if (e.key === "s" || e.key==="S") {
                sendUpdate(0,1);
            }
            if (e.key === "d" || e.key==="D") {
                sendUpdate(1,0);
            }
            if (e.key === "a" || e.key==="A") {
                sendUpdate(-1,0);
            }
        };

        const handleStop = () => {
            setIsRunning(false);
        }


        window.addEventListener("keydown", handleMove);
        window.addEventListener("keyup", handleStop);


        return () => {
            window.removeEventListener("keydown", handleMove);
            window.removeEventListener("keyup", handleStop);
        }


    },[position,socket])

    useEffect(() => {
        const messageHandler = async (e : any) => {
            const parsedData = JSON.parse(e.data);
            switch (parsedData.type) {
                case "space-joined" : {
                    const {x, y, users} = parsedData.payload;
                    setPosition({x, y});
                    setUsersInRoom(users);
                    let ids = [];
                    for (const user of users) {
                        ids.push(user.id);
                    }
                    setIsFetchingAvatar(true);
                    const res = await fetchAvatars(ids);
                    setUserAvatars(res);
                    setIsFetchingAvatar(false);
                    break
                }
                case "move-rejected" : {
                    setPosition({x: parsedData.payload.x, y: parsedData.payload.y});
                    break
                }
                case "user-joined" : {
                    const newUser = parsedData.payload;
                    console.log("user joined : ", newUser.username);
                    setUsersInRoom(prevUsers => {
                        if (!prevUsers.some(user => user.id === newUser.id)) {
                            return [...prevUsers, newUser];
                        }
                        return prevUsers;
                    });
                    try {
                        const res = await fetchAvatars([newUser.id]);
                        if (res && res.length > 0) {
                            setUserAvatars(prevAvatars => [...prevAvatars, res[0]]);
                        }
                    } catch (error) {
                        console.error("Failed to fetch avatar:", error);
                    }
                    break
                }
                case "user-left" : {
                    const userToRemove = parsedData.payload.userId
                    setUsersInRoom(prevState => prevState.filter(user => user.id !== userToRemove));
                    setUserAvatars(prevAvatars => prevAvatars.filter(avatar => avatar.id !== userToRemove));
                    break
                }
                case "user-move" : {
                    console.log("user moved")
                    const userMoved = parsedData.payload;
                    setUsersInRoom(prevState =>
                        prevState.map(user =>
                            user.id === userMoved.id
                                ? {...user, x: userMoved.x, y: userMoved.y}
                                : user
                        )
                    );
                    break
                }
                default: {
                    break
                }
            }
        }


        socket.addEventListener("message", messageHandler);

        return () => {

            socket.removeEventListener("message", messageHandler);
        };
    }, [socket]);

    useEffect(() => {
        setLoading(true);
        setFrameData(isRunning ? runningJson : idleJson);
        setCurrentFrame(0);
        setLoading(false);
    }, [isRunning]);

    useEffect(() => {
        if (!frameData) return;
        const frameNames = Object.keys(frameData.frames);
        const frameDuration = frameData.frames[frameNames[currentFrame]]?.duration || 100;
        const timer = setTimeout(() => {
            setCurrentFrame(prevFrame => {
                const nextFrame = prevFrame + 1;
                return nextFrame >= frameNames.length ? 0 : nextFrame;
            });
        }, frameDuration);

        return () => clearTimeout(timer);
    }, [frameData, currentFrame]);

    if (loading || !frameData || !position) {
        return null;
    }

    if (isFetchingAvatar) {
        return <p>fetching avatar...</p>
    }

    const frameNames = Object.keys(frameData.frames);
    const frame = frameData.frames[frameNames[currentFrame]];

    console.log(frame);

    const style = {
        width: `${frame.sourceSize.w}px`,
        height: `${frame.sourceSize.h}px`,
        backgroundImage: `url(${isRunning ? runningSpritesheet : idleSpritesheet})`,
         backgroundPosition: `-${frame.frame.x}px -${frame.frame.y}px`,
         backgroundSize: `${frameData.meta.size.w}px ${frameData.meta.size.h}px`,
        imageRendering: 'pixelated' as 'pixelated',
        left: `${position!.x}px`, top: `${position!.y}px`, zIndex: 2
    };


    return (
            <div ref={characterRef} style={style} className="absolute"></div>
    );
};

export default Character;