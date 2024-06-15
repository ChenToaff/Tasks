import { createClient, RedisClientOptions } from "redis";

const redisURI = process.env.REDIS_URI;

const redisClient = createClient({
  url: redisURI,
} as RedisClientOptions);

redisClient.on("error", (err: Error) => {
  console.error("Redis error", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

export default redisClient;
