import { createClient, RedisClientOptions } from "redis";

const redisClient = createClient({
  host: "localhost",
  port: 6379,
  // url: 'redis://localhost:6379'
  // password: 'redisPassword'
} as RedisClientOptions);

redisClient.on("error", (err: Error) => {
  console.error("Redis error", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

export default redisClient;
