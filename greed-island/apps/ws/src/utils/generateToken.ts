import { AccessToken } from 'livekit-server-sdk';

const API_KEY = process.env.LIVEKIT_API_KEY
const API_SECRET = process.env.LIVEKIT_API_SECRET

console.log(API_KEY,API_SECRET);

export function generateLiveKitToken(identity: string, room: string) {
    const token = new AccessToken(API_KEY, API_SECRET, {
        identity,
    });

    token.addGrant({
        room,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
    });

    return token.toJwt();
}