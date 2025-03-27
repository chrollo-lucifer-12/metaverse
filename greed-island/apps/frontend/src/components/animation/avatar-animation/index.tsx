import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";


interface EntityAnimationProps {
    idleSpritesheet : string,
    idleJson : JSON,
    runningSpritesheet : string,
    runningJson : JSON
}

const EntityAnimation = ({ idleSpritesheet, idleJson, runningSpritesheet, runningJson } : EntityAnimationProps) => {

    const [isRunning, setIsRunning] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [frameData, setFrameData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setFrameData(isRunning ? runningJson : idleJson);
        setCurrentFrame(0);
        setLoading(false);
    }, [isRunning, idleJson, runningJson]);

    // Handle animation frames
    useEffect(() => {
        if (!frameData || loading) return;

        // Get all frame names and durations
        const frameNames = Object.keys(frameData.frames);
        const frameDuration = frameData.frames[frameNames[currentFrame]]?.duration || 100;

        // Set up animation timer
        const timer = setTimeout(() => {
            setCurrentFrame(prevFrame => {
                const nextFrame = prevFrame + 1;
                return nextFrame >= frameNames.length ? 0 : nextFrame;
            });
        }, frameDuration);

        return () => clearTimeout(timer);
    }, [frameData, currentFrame, loading]);

    const toggleAnimation = () => {
        setIsRunning(!isRunning);
    };

    if (loading || !frameData) {
        return ;
    }

    // Get the current frame data
    const frameNames = Object.keys(frameData.frames);
    const frame = frameData.frames[frameNames[currentFrame]];

    // Set the style for displaying the current frame
    const style = {
        width: `${frame.sourceSize.w }px`,
        height: `${frame.sourceSize.h }px`,
        backgroundImage: `url(${isRunning ? runningSpritesheet : idleSpritesheet})`,
        backgroundPosition: `-${frame.frame.x}px -${frame.frame.y}px`,
        backgroundSize: `${frameData.meta.size.w}px ${frameData.meta.size.h}px`,
        imageRendering: 'pixelated'
    };

    return (
        <div className="flex flex-col items-center justify-between h-[100%]">
            <div>
                <div style={style}></div>
            </div>
            <div className={"flex flex-col items-center"}>

                <Button
                    onClick={toggleAnimation}
                    className="transition duration-150 cursor-pointer"
                >
                    {isRunning ? "Show Idle" : "Show Running"}
                </Button>

                <div className="mt-2 text-gray-600">
                    Current Animation: <span className="font-bold">{isRunning ? "Running" : "Idle"}</span>
                </div>
            </div>
        </div>
    );
}

export default EntityAnimation