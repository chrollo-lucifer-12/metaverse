import {useEffect, useState} from "react";

interface OtherCharacterProps {
    idleSpritesheet: string;
    idleJson: any;
    runningSpritesheet: string;
    runningJson: any;
    position : {x : number, y :  number}
}

const OtherCharacter = ({idleJson, idleSpritesheet, runningJson, runningSpritesheet, position} : OtherCharacterProps) => {
    const [frameData, setFrameData] = useState<any>(null);
    const [currentFrame, setCurrentFrame] = useState(0); const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setFrameData(idleJson);
        setCurrentFrame(0);
        setLoading(false);
    }, []);

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

    if (loading || !frameData) {
        return null;
    }

    const frameNames = Object.keys(frameData.frames);
    const frame = frameData.frames[frameNames[currentFrame]];

    console.log(frame);

    const style = {
        width: `${frame.sourceSize.w}px`,
        height: `${frame.sourceSize.h}px`,
        backgroundImage: `url(${idleSpritesheet})`,
        backgroundPosition: `-${frame.frame.x}px -${frame.frame.y}px`,
        backgroundSize: `${frameData.meta.size.w}px ${frameData.meta.size.h}px`,
        imageRendering: 'pixelated' as 'pixelated',
        left: `${position!.x}px`, top: `${position!.y}px`, zIndex: 2
    };

    return <div style={style} className={"absolute"}></div>
}

export default OtherCharacter