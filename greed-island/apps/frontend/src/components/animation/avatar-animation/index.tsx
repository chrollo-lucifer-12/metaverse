import React, {useEffect, useState} from "react";


interface EntityAnimationProps {
    idleSpritesheet : string,
    idleJson : string,
    runningSpritesheet : string,
    runningJson : string
}

const EntityAnimation = ({ idleSpritesheet, idleJson, runningSpritesheet, runningJson } : EntityAnimationProps) => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [frameData, setFrameData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load the appropriate JSON data based on current animation state
    useEffect(() => {
        setLoading(true);

        fetch(isRunning ? runningJson : idleJson)
            .then(response => response.json())
            .then(data => {
                setFrameData(data);
                setCurrentFrame(0);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading sprite data:', error);
                setLoading(false);
            });
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
        return <div className="flex items-center justify-center h-32">Loading animation...</div>;
    }

    // Get the current frame data
    const frameNames = Object.keys(frameData.frames);
    const frame = frameData.frames[frameNames[currentFrame]];

    // Set the style for displaying the current frame
    const style = {
        width: `${frame.sourceSize.w }px`,
        height: `${frame.sourceSize.h }px`,
        backgroundImage: `url(${isRunning ? runningSpritesheet : idleSpritesheet})`,
        backgroundPosition: `-${frame.frame.x }px -${frame.frame.y }px`,
        backgroundSize: `${frameData.meta.size.w }px ${frameData.meta.size.h }px`,
        imageRendering: 'pixelated'
    };

    return (
        <div className="flex flex-col items-center">
            <div >
                <div style={style}></div>
            </div>

            <button
                onClick={toggleAnimation}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {isRunning ? "Show Idle" : "Show Running"}
            </button>

            <div className="mt-2 text-gray-600">
                Current Animation: <span className="font-bold">{isRunning ? "Running" : "Idle"}</span>
            </div>
        </div>
    );
};

export default EntityAnimation