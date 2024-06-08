import express from "express";
import routes from "./routes";
import passport from "passport";
import redisClient from "./db/redisClient";
import connectMongo from "./db/mongoConfig";
import "./config/passportConfig";
import { createServer } from "http";
import errorHandler from "./middleware/errorHandler";
import sessionMiddleware from "./middleware/sessionMiddleware";
import { initializeWebsocket } from "./websocket";

const PORT = process.env.PORT || 5000;

connectMongo();
redisClient.connect();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(errorHandler);
initializeWebsocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
