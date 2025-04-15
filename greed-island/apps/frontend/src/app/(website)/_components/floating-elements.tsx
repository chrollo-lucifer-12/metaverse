"use client"

import { useEffect, useState } from "react"

type FloatingElement = {
    id: number
    x: number
    y: number
    size: number
    speed: number
    color: string
    rotation: number
    rotationSpeed: number
}

export function FloatingElements() {
    const [elements, setElements] = useState<FloatingElement[]>([])

    useEffect(() => {
        // Create random floating elements
        const newElements: FloatingElement[] = []
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"]

        for (let i = 0; i < 15; i++) {
            newElements.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 30 + 10,
                speed: (Math.random() * 0.5 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() * 0.5 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
            })
        }

        setElements(newElements)

        // Animation loop
        const interval = setInterval(() => {
            setElements((prev) =>
                prev.map((element) => ({
                    ...element,
                    x: (element.x + element.speed) % 100,
                    y: element.y + Math.sin(Date.now() / 1000) * 0.1,
                    rotation: (element.rotation + element.rotationSpeed) % 360,
                })),
            )
        }, 50)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {elements.map((element) => (
                <div
                    key={element.id}
                    className="absolute rounded-md opacity-20"
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        width: `${element.size}px`,
                        height: `${element.size}px`,
                        backgroundColor: element.color,
                        transform: `rotate(${element.rotation}deg)`,
                        transition: "transform 0.5s ease-out",
                    }}
                />
            ))}
        </div>
    )
}
