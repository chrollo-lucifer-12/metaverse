import Redis from "ioredis"

export const client = new Redis("redis://localhost:6379");
