"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Video, Mic, MicOff, VideoOff, Users } from "lucide-react"

export default function VideoChatDemo() {
    const [isMicOn, setIsMicOn] = useState(true)
    const [isVideoOn, setIsVideoOn] = useState(true)

    return (
        <div className="bg-muted rounded-xl p-6 border">
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-black">Proximity-Based Video Chat</h3>
                <p className="text-muted-foreground">
                    As you move around in the 2D space, you'll automatically connect with others nearby - just like real life!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((id) => (
                        <div key={id} className="relative rounded-lg overflow-hidden bg-black aspect-video">
                            <Image
                                src={`/placeholder.svg?height=180&width=320&text=User${id}`}
                                alt={`User ${id}`}
                                width={320}
                                height={180}
                                className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">User {id}</div>
                            {id === 1 && <div className="absolute top-2 right-2 bg-primary text-xs px-2 py-1 rounded-full">You</div>}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    <Button variant={isMicOn ? "default" : "outline"} size="icon" onClick={() => setIsMicOn(!isMicOn)}>
                        {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button variant={isVideoOn ? "default" : "outline"} size="icon" onClick={() => setIsVideoOn(!isVideoOn)}>
                        {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon">
                        <Users className="h-4 w-4" />
                    </Button>
                    <Button className="ml-2">Join Meeting</Button>
                </div>

                <div className="bg-background rounded-lg p-4 mt-4 text-black">
                    <h4 className="font-medium mb-2">How it works:</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <Video className="h-3 w-3 text-primary" />
                            </div>
                            <span>Move your avatar close to others to automatically start video chatting</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <Users className="h-3 w-3 text-primary" />
                            </div>
                            <span>Create private areas for focused conversations with your team</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <Mic className="h-3 w-3 text-primary" />
                            </div>
                            <span>Spatial audio makes conversations feel natural and immersive</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
