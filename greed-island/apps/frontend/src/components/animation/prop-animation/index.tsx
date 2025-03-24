"use client";

import React, { useState, useEffect } from "react";

const PropAnimation = () => {
    const [spriteData, setSpriteData] = useState<any | null>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        fetch("/assets/Alchemy_Table_03.json")
            .then((response) => response.json())
            .then((data) => {
                setSpriteData(data);

                const frameNames = Object.keys(data.frames);
                const frame = data.frames[frameNames[0]]; // Get the first frame

                setStyle({
                    width: `${frame.sourceSize.w * 3}px`,
                    height: `${frame.sourceSize.h * 3}px`,
                    backgroundImage: `url("/assets/Alchemy_Table_03.png")`,
                    backgroundPosition: `-${frame.frame.x * 3}px -${frame.frame.y * 3}px`,
                    backgroundSize: `${data.meta.size.w * 3}px ${data.meta.size.h * 3}px`,
                    imageRendering: "pixelated",
                });
            })
            .catch((error) => {
                console.error("Error loading sprite data:", error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div>
                <div style={style}></div>
            </div>
        </div>
    );
};

export default PropAnimation;
