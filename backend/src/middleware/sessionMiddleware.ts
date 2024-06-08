import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "../db/redisClient";

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: "yourSecret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true if running over HTTPS
});

export default sessionMiddleware;
