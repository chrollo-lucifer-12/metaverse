import { useEffect, useRef, useState } from "react";

interface EntityAnimationProps {
    idleSpritesheet: string;
    idleJson: any;
    runningSpritesheet: string;
    runningJson: any;
}

const Character = ({ idleJson, idleSpritesheet, runningSpritesheet, runningJson }: EntityAnimationProps) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [loading, setLoading] = useState(true);
    const [frameData, setFrameData] = useState<any>(null);
    const [isRunning, setIsRunning] = useState(false);
    const characterRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({x : 50, y: 50})

    useEffect(() => {
        const handleMove = (e: KeyboardEvent) => {
            if (e.key === "W" || e.key === "w") {
                setIsRunning(true);

                setPosition(prevState => ({ x: prevState.x, y: prevState.y-1 }));
            }
            if (e.key === "s" || e.key==="S") {
                setIsRunning(true);

                setPosition(prevState => ({ x: prevState.x, y: prevState.y+1 }));
            }
            if (e.key === "d" || e.key==="D") {

                setIsRunning(true);
                setPosition(prevState => ({ x: prevState.x+1, y: prevState.y }));
            }
            if (e.key === "a" || e.key==="A") {
                setIsRunning(true);
                setPosition(prevState => ({ x: prevState.x-1, y: prevState.y }));
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
        };
    }, []);


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