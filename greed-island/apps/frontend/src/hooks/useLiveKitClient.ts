import { useEffect, useRef } from "react";
import { Room } from "livekit-client";

export const useLiveKitClient = (url: string | null, token: string | null) => {
    const roomRef = useRef<Room | null>(null);

    useEffect(() => {
        if (!token || !url) return;

        const joinRoom = async () => {
            const room = new Room({
                // Optional: configure defaults
                videoCaptureDefaults: {
                    resolution: { width: 640, height: 360 },
                },
                audioCaptureDefaults: {
                    echoCancellation: true,
                },
            });

            await room.connect(url, token);

            await room.localParticipant.setCameraEnabled(true);
            await room.localParticipant.setMicrophoneEnabled(true);

            roomRef.current = room;

            room.on("participantConnected", (participant) => {
                console.log(`${participant.identity} joined the call`);
            });

            room.on("participantDisconnected", (participant) => {
                console.log(`${participant.identity} left the call`);
            });
        };

        joinRoom();

        return () => {
            roomRef.current?.disconnect();
        };
    }, [token, url]);

    return roomRef;
};
