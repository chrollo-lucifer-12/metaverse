"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import Image from "next/image"

const GRID_SIZE = 10
const TILE_SIZE = 32
const AVATAR_SPEED = 150 // pixels per second

export default function MetaverseDemo() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [avatarPosition, setAvatarPosition] = useState({ x: 5, y: 5 })
    const [otherAvatars, setOtherAvatars] = useState([
        { id: 1, x: 2, y: 3, color: "#FF5733" },
        { id: 2, x: 7, y: 2, color: "#33FF57" },
        { id: 3, x: 8, y: 7, color: "#3357FF" },
    ])
    const lastTimeRef = useRef<number>(0)
    const keysPressed = useRef<Set<string>>(new Set())
    const animationFrameRef = useRef<number>(null)

    // Handle keyboard input
    useEffect(() => {
        if (!isPlaying) return

        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current.add(e.key.toLowerCase())
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current.delete(e.key.toLowerCase())
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [isPlaying])

    // Game loop
    useEffect(() => {
        if (!isPlaying) return

        const gameLoop = (timestamp: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp
            const deltaTime = (timestamp - lastTimeRef.current) / 1000
            lastTimeRef.current = timestamp

            // Move avatar based on keys pressed
            const newPosition = { ...avatarPosition }
            const moveDistance = AVATAR_SPEED * deltaTime

            if (keysPressed.current.has("w") || keysPressed.current.has("arrowup")) {
                newPosition.y = Math.max(0, newPosition.y - moveDistance / TILE_SIZE)
            }
            if (keysPressed.current.has("s") || keysPressed.current.has("arrowdown")) {
                newPosition.y = Math.min(GRID_SIZE - 1, newPosition.y + moveDistance / TILE_SIZE)
            }
            if (keysPressed.current.has("a") || keysPressed.current.has("arrowleft")) {
                newPosition.x = Math.max(0, newPosition.x - moveDistance / TILE_SIZE)
            }
            if (keysPressed.current.has("d") || keysPressed.current.has("arrowright")) {
                newPosition.x = Math.min(GRID_SIZE - 1, newPosition.x + moveDistance / TILE_SIZE)
            }

            setAvatarPosition(newPosition)

            // Move other avatars randomly occasionally
            if (Math.random() < 0.01) {
                setOtherAvatars((prev) =>
                    prev.map((avatar) => ({
                        ...avatar,
                        x: Math.max(0, Math.min(GRID_SIZE - 1, avatar.x + (Math.random() - 0.5) * 0.5)),
                        y: Math.max(0, Math.min(GRID_SIZE - 1, avatar.y + (Math.random() - 0.5) * 0.5)),
                    })),
                )
            }

            // Draw the game
            drawGame()

            animationFrameRef.current = requestAnimationFrame(gameLoop)
        }

        animationFrameRef.current = requestAnimationFrame(gameLoop)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isPlaying, avatarPosition])

    // Initial draw
    useEffect(() => {
        drawGame()
    }, [])

    const drawGame = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw grid
        ctx.strokeStyle = "#ddd"
        ctx.lineWidth = 1

        for (let x = 0; x <= GRID_SIZE; x++) {
            ctx.beginPath()
            ctx.moveTo(x * TILE_SIZE, 0)
            ctx.lineTo(x * TILE_SIZE, GRID_SIZE * TILE_SIZE)
            ctx.stroke()
        }

        for (let y = 0; y <= GRID_SIZE; y++) {
            ctx.beginPath()
            ctx.moveTo(0, y * TILE_SIZE)
            ctx.lineTo(GRID_SIZE * TILE_SIZE, y * TILE_SIZE)
            ctx.stroke()
        }

        // Draw some furniture
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(3 * TILE_SIZE, 2 * TILE_SIZE, 2 * TILE_SIZE, 1 * TILE_SIZE) // Table

        ctx.fillStyle = "#6A0DAD"
        ctx.fillRect(1 * TILE_SIZE, 1 * TILE_SIZE, 1 * TILE_SIZE, 1 * TILE_SIZE) // Chair
        ctx.fillRect(7 * TILE_SIZE, 1 * TILE_SIZE, 1 * TILE_SIZE, 1 * TILE_SIZE) // Chair

        ctx.fillStyle = "#228B22"
        ctx.fillRect(8 * TILE_SIZE, 8 * TILE_SIZE, 1 * TILE_SIZE, 1 * TILE_SIZE) // Plant

        // Draw other avatars
        otherAvatars.forEach((avatar) => {
            ctx.fillStyle = avatar.color
            ctx.beginPath()
            ctx.arc(
                avatar.x * TILE_SIZE + TILE_SIZE / 2,
                avatar.y * TILE_SIZE + TILE_SIZE / 2,
                TILE_SIZE / 2 - 2,
                0,
                Math.PI * 2,
            )
            ctx.fill()
        })

        // Draw player avatar
        ctx.fillStyle = "#FF9900"
        ctx.beginPath()
        ctx.arc(
            avatarPosition.x * TILE_SIZE + TILE_SIZE / 2,
            avatarPosition.y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE / 2 - 2,
            0,
            Math.PI * 2,
        )
        ctx.fill()

        // Draw proximity circles for nearby avatars
        otherAvatars.forEach((avatar) => {
            const distance = Math.sqrt(Math.pow(avatar.x - avatarPosition.x, 2) + Math.pow(avatar.y - avatarPosition.y, 2))

            if (distance < 3) {
                ctx.strokeStyle = avatar.color
                ctx.lineWidth = 2
                ctx.setLineDash([5, 5])
                ctx.beginPath()
                ctx.arc(
                    avatar.x * TILE_SIZE + TILE_SIZE / 2,
                    avatar.y * TILE_SIZE + TILE_SIZE / 2,
                    3 * TILE_SIZE,
                    0,
                    Math.PI * 2,
                )
                ctx.stroke()
                ctx.setLineDash([])
            }
        })

        // Draw connection lines between nearby avatars and player
        otherAvatars.forEach((avatar) => {
            const distance = Math.sqrt(Math.pow(avatar.x - avatarPosition.x, 2) + Math.pow(avatar.y - avatarPosition.y, 2))

            if (distance < 2) {
                ctx.strokeStyle = avatar.color
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(avatarPosition.x * TILE_SIZE + TILE_SIZE / 2, avatarPosition.y * TILE_SIZE + TILE_SIZE / 2)
                ctx.lineTo(avatar.x * TILE_SIZE + TILE_SIZE / 2, avatar.y * TILE_SIZE + TILE_SIZE / 2)
                ctx.stroke()
            }
        })
    }

    const handlePlayClick = () => {
        setIsPlaying(true)
    }

    const renderVideoBubble = (avatar: { id: number; x: number; y: number; color: string }) => {
        const distance = Math.sqrt(Math.pow(avatar.x - avatarPosition.x, 2) + Math.pow(avatar.y - avatarPosition.y, 2))

        if (distance < 2) {
            return (
                <div
                    className="absolute bg-black rounded-md overflow-hidden border-2 border-white shadow-lg"
                    style={{
                        width: TILE_SIZE * 2.5,
                        height: TILE_SIZE * 1.8,
                        left: avatar.x * TILE_SIZE - TILE_SIZE * 0.75,
                        top: avatar.y * TILE_SIZE - TILE_SIZE * 2.5,
                    }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={`/placeholder.svg?height=60&width=80&text=User${avatar.id}`}
                            alt={`User ${avatar.id}`}
                            width={80}
                            height={60}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center py-0.5">
                            <Video className="h-2 w-2 text-white mr-1" />
                            <span className="text-white text-[8px]">User {avatar.id}</span>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <div className="relative w-full aspect-square max-w-[320px] mx-auto">
            <canvas
                ref={canvasRef}
                width={GRID_SIZE * TILE_SIZE}
                height={GRID_SIZE * TILE_SIZE}
                className="w-full h-full border rounded-lg bg-white"
            />

            {isPlaying && otherAvatars.map((avatar) => renderVideoBubble(avatar))}

            {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
                    <Button onClick={handlePlayClick} className="gap-2">
                        Play Demo
                    </Button>
                    <p className="text-xs text-white mt-2">Use WASD or arrow keys to move</p>
                </div>
            )}

            {isPlaying && (
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                    <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">Use WASD or arrows to move</div>
                    <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        {
                            otherAvatars.filter(
                                (a) => Math.sqrt(Math.pow(a.x - avatarPosition.x, 2) + Math.pow(a.y - avatarPosition.y, 2)) < 3,
                            ).length
                        }{" "}
                        nearby
                    </div>
                </div>
            )}
        </div>
    )
}
