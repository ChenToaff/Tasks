import express from "express";
import errorHandler from "./middleware/errorHandler";
import routes from "./routes";
import session from "express-session";
import passport from "passport";
import RedisStore from "connect-redis";
import redisClient from "./db/redisClient";
import connectMongo from "./db/mongoConfig";

connectMongo();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "yourSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if running over HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
