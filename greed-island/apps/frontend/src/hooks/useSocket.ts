"use client";

import { useEffect, useState } from "react";
import { fetchAvatars } from "@/actions/user";
import {SingleAvatarProps} from "@/types";

export const useSocket = (spaceId: string, clerkId: string | null | undefined) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [initialX, setInitialX] = useState<number | null>(null);
    const [initialY, setInitialY] = useState<number | null>(null);
    const [initialUsers, setInitialUsers] = useState<{ id: string; username : string; x: number; y: number }[] | null>(null);
    const [avatarInfo, setAvatarInfo] = useState<{id : string, Avatar : SingleAvatarProps}[] | null>(null);

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

        ws.onmessage = async (e) => {
            const parsedData = JSON.parse(e.data);
            if (parsedData.type === "space-joined") {
                const { x, y, users } = parsedData.payload;
                setInitialX(x);
                setInitialY(y);
                setInitialUsers(users);
                    // const ids = users.map((user: any) => ({id: user.id}));
                    // const res = await fetchAvatars(ids);
                    // setAvatarInfo(res);
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
        };
    }, [spaceId, clerkId]);

    return { socket, isLoading, initialX, initialY, initialUsers, avatarInfo };
};
