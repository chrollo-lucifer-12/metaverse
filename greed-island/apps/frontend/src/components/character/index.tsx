import { useEffect, useRef, useState } from "react";

interface EntityAnimationProps {
    idleSpritesheet: string;
    idleJson: any;
    runningSpritesheet: string;
    runningJson: any;
    socket : WebSocket
    isLoading : boolean
    initialX : number | null
    initialY : number | null
}

const Character = ({ idleJson, idleSpritesheet, runningSpritesheet, runningJson, socket, isLoading, initialX, initialY }: EntityAnimationProps) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [loading, setLoading] = useState(true);
    const [frameData, setFrameData] = useState<any>(null);
    const [isRunning, setIsRunning] = useState(false);
    const characterRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({x : initialX, y: initialY})

    useEffect(() => {
        if (initialX != null && initialY != null) {
            setPosition({ x: initialX, y: initialY });
        }
    }, [initialX, initialY]);

    useEffect(() => {

        if (!socket || isLoading || socket.readyState !== WebSocket.OPEN) return ;

        const handleMove = (e: KeyboardEvent) => {
            if (e.key === "W" || e.key === "w") {
                setIsRunning(true);
                socket.send(JSON.stringify({
                    type : "move",
                    payload : {
                        x : position.x,
                        y : position.y! - 1
                    }
                }))
                setPosition(prevState => ({x : prevState.x, y : prevState.y! - 1}));
            }
            if (e.key === "s" || e.key==="S") {
                setIsRunning(true);
                socket.send(JSON.stringify({
                    type : "move",
                    payload : {
                        x : position.x,
                        y : position.y + 1
                    }
                }))
                setPosition(prevState => ({x : prevState.x, y : prevState.y! + 1}));
            }
            if (e.key === "d" || e.key==="D") {
                setIsRunning(true);
                socket.send(JSON.stringify({
                    type : "move",
                    payload : {
                        x : position.x! + 1,
                        y : position.y
                    }
                }))
                setPosition(prevState => ({x : prevState.x! + 1, y : prevState.y}));
            }
            if (e.key === "a" || e.key==="A") {
                setIsRunning(true);
                socket.send(JSON.stringify({
                    type : "move",
                    payload : {
                        x : position.x! - 1,
                        y : position.y
                    }
                }))
                setPosition(prevState => ({x : prevState.x! - 1, y : prevState.y }));
            }
        };

        const handleStop = () => {
            setIsRunning(false);
        }

        const messageHandler = (e) => {
            try {
                const parsedData = JSON.parse(e.data);
           //     console.log(parsedData);
                if (parsedData.type === "space-joined") {
                    setPosition({x  : parsedData.payload.x, y : parsedData.payload.y})
                }
                if (parsedData.type === "move-rejected") {
                    setPosition({x : parsedData.payload.x, y : parsedData.payload.y});
                }
            } catch (err) {
                console.error("Failed to parse message:", err, e.data);
            }
        };

        window.addEventListener("keydown", handleMove);
        window.addEventListener("keyup", handleStop);
        socket.addEventListener("message", messageHandler);

        return () => {
            window.removeEventListener("keydown", handleMove);
            window.removeEventListener("keyup", handleStop);
            socket.removeEventListener("message", messageHandler);
        };
    }, [socket, isLoading, position]);

    useEffect(() => {
        setLoading(true);
        setFrameData(isRunning ? runningJson : idleJson);
        setCurrentFrame(0);
        setLoading(false);
    }, [idleJson, runningJson, isRunning]);

    useEffect(() => {
        if (loading) return;
        const frameNames = Object.keys(frameData.frames);
        const frameDuration = frameData.frames[frameNames[currentFrame]]?.duration || 100;
        const timer = setTimeout(() => {
            setCurrentFrame(prevFrame => {
                const nextFrame = prevFrame + 1;
                return nextFrame >= frameNames.length ? 0 : nextFrame;
            });
        }, frameDuration);

        return () => clearTimeout(timer);
    }, [frameData, currentFrame, loading]);

    if (loading || !frameData) {
        return null;
    }

    const frameNames = Object.keys(frameData.frames);
    const frame = frameData.frames[frameNames[currentFrame]];

    const style = {
        width: `${frame.sourceSize.w}px`,
        height: `${frame.sourceSize.h}px`,
        backgroundImage: `url(${isRunning ? runningSpritesheet : idleSpritesheet})`,
         backgroundPosition: `-${frame.frame.x}px -${frame.frame.y}px`,
         backgroundSize: `${frameData.meta.size.w}px ${frameData.meta.size.h}px`,
        imageRendering: 'pixelated' as 'pixelated',
        left: `${position.x}px`, top: `${position.y}px`, zIndex: 2
    };
    return (
            <div ref={characterRef} style={style} className="absolute"></div>
    );
};

export default Character;