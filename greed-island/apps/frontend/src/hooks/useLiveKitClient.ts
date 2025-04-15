import { useEffect, useRef, useState } from "react";
import { Room, RoomEvent, ConnectionState, ConnectionQuality } from "livekit-client";

export const useLiveKitClient = (url: string | null, token: string | null) => {
    const roomRef = useRef<Room | null>(null);
    const [connectionState, setConnectionState] = useState<ConnectionState | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Check for valid URL and token
        if (!url) {
            console.log("Missing LiveKit URL, not connecting");
            return;
        }

        if (!token) {
            console.log("Missing LiveKit token, not connecting");
            return;
        }

        // Check token type
        if (typeof token !== 'string') {
            console.error("Token is not a string:", typeof token);
            setError(new Error(`Invalid token type: ${typeof token}`));
            return;
        }

        if (token.length < 10) {
            console.error("Token seems too short:", token.length);
            setError(new Error("Token appears invalid (too short)"));
            return;
        }

        const joinRoom = async () => {
            // Create a new Room instance
            const room = new Room({
                videoCaptureDefaults: {
                    resolution: { width: 640, height: 360 },
                },
                audioCaptureDefaults: {
                    echoCancellation: true,
                    noiseSuppression: true,
                },
                adaptiveStream: true,
                dynacast: true,
            });

            // Set up state tracking
            room.on(RoomEvent.ConnectionStateChanged, (state: ConnectionState) => {
                console.log("LiveKit connection state changed:", state);
                setConnectionState(state);
            });

            room.on(RoomEvent.Disconnected, () => {
                console.log("Disconnected from LiveKit room");
            });

            room.on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality) => {
                console.log("Connection quality changed:", quality);
            });

            try {
                console.log("Connecting to LiveKit:", { url, tokenLength: token.length });
                console.log("Token preview:", `${token.substring(0, 5)}...${token.substring(token.length - 5)}`);

                // Connect to the room
                await room.connect(url, token);
                console.log("Connected to LiveKit room:", room.name);

                // Enable local media
                await room.localParticipant.setCameraEnabled(true);
                await room.localParticipant.setMicrophoneEnabled(true);

                roomRef.current = room;

                room.on(RoomEvent.ParticipantConnected, (participant) => {
                    console.log(`Participant connected: ${participant.identity}`);
                });

                room.on(RoomEvent.ParticipantDisconnected, (participant) => {
                    console.log(`Participant disconnected: ${participant.identity}`);
                });

            } catch (err) {
                console.error("LiveKit connection error:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            }
        };

        joinRoom();

        // Cleanup function
        return () => {
            if (roomRef.current) {
                console.log("Disconnecting from LiveKit room");
                roomRef.current.disconnect();
                roomRef.current = null;
            }
        };
    }, [token, url]);

    return { room: roomRef.current, connectionState, error };
};