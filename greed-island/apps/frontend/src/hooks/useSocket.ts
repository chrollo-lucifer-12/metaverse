"use client"

import { useEffect, useState } from "react";

export const useSocket = (spaceId: string, clerkId: string | null | undefined) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [initialX, setInitialX] = useState<number | null>(null);
    const [initialY, setInitialY] = useState<number | null>(null);
    const [initialUsers, setInitialUsers] = useState<{id: string,x: number | undefined,y: number | undefined }[] | null
    >(null)

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            console.log("connected to 8080");
            setIsLoading(false);
            if (clerkId && spaceId) {
                console.log("Sending joining request");
                ws.send(JSON.stringify({
                    type: "join",
                    payload: {
                        spaceId,
                        clerkId
                    }
                }))
            }
        };

        ws.onmessage = (e) => {
            const parsedData = JSON.parse(e.data);
            if (parsedData.type === "space-joined") {
                setInitialX(parsedData.payload.x);
                setInitialY(parsedData.payload.y);
                setInitialUsers(parsedData.payload.users)
            }
        };

        ws.onclose = () => {
            console.log("disconnected");
        };

        ws.onerror = () => {
            console.error("WebSocket error");
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [spaceId, clerkId]);

    return { socket, isLoading, initialX, initialY, initialUsers };
}
