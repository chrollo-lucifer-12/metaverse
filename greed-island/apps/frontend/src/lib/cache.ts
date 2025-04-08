import { client } from "./redis";

export async function setCache(key: string, value: any, ttlSeconds: number = 300) {
    await client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
}

export async function getCache<T = any>(key: string): Promise<T | null> {
    console.log('🔁 Redis cache hit');

    const result = await client.get(key);
    return result ? JSON.parse(result) : null;
}
