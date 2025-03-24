"use client";

import React, { useState, useEffect } from "react";

const PropAnimation = ({imageUrl, jsonData} : {imageUrl : string, jsonData : JSON}) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [frameData, setFrameData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setFrameData(jsonData);
        setCurrentFrame(0);
        setLoading(false);
    }, [jsonData]);

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

    if (loading || !frameData) {
        return ;
    }

    const frameNames = Object.keys(frameData.frames);
    const frame = frameData.frames[frameNames[currentFrame]];

    // Set the style for displaying the current frame
    const style = {
        width: `${frame.sourceSize.w }px`,
        height: `${frame.sourceSize.h }px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${frame.frame.x}px -${frame.frame.y}px`,
        backgroundSize: `${frameData.meta.size.w}px ${frameData.meta.size.h}px`,
        imageRendering: 'pixelated'
    };

    return (
        <div className="flex flex-col items-center">
            <div>
                <div style={style}></div>
            </div>
        </div>
    );
};

export default PropAnimation;
