import { AccessToken } from 'livekit-server-sdk';
import dotenv from 'dotenv';
dotenv.config();

export async function generateLiveKitToken(identity: string, room: string): Promise<string> {
    const API_KEY = process.env.LIVEKIT_API_KEY;
    const API_SECRET = process.env.LIVEKIT_API_SECRET;

    if (!API_KEY || !API_SECRET) {
        console.error("LiveKit API key or secret is missing in environment variables");
        throw new Error("Missing LiveKit API key or secret");
    }

    if (!identity || !room) {
        throw new Error("Missing identity or room");
    }

    try {
        const token = new AccessToken(API_KEY, API_SECRET, {
            identity,
            ttl: 6 * 60 * 60, // 6 hours in seconds
        });

        token.addGrant({
            roomJoin: true,
            room,
            canPublish: true,
            canSubscribe: true,
        });

        const jwt = token.toJwt();
        console.log(`Generated token for ${identity} in room ${room}, token type: ${typeof jwt}`);

        return jwt;
    } catch (error) {
        console.error("Error generating LiveKit token:", error);
        throw new Error("Failed to generate LiveKit token");
    }
}