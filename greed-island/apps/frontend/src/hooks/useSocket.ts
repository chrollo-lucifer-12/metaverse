"use client";

import { useEffect, useState } from "react";
import { fetchAvatars } from "@/actions/user";
import {SingleAvatarProps} from "@/types";

export const useSocket = (spaceId: string, clerkId: string | null | undefined) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
                        clerkId,
                    },
                }));
            }
        };

        ws.onclose = () => {
            console.log("disconnected");
        };

        ws.onerror = (error) => {
            console.error(error);
        };

        setSocket(ws);

        return () => {
            ws.close();
            setSocket(null);
        };
    }, [spaceId, clerkId]);

    return { socket, isLoading };
};
