import passport from "passport";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import sessionMiddleware from "../middleware/sessionMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import onlyForHandshake from "../utils/onlyForHandshake";
import onConnection from "./events/onConnection";

let io: SocketIOServer | null = null;

const initializeWebsocket = (server: Server) => {
  io = new SocketIOServer(server);

  io.engine.use(onlyForHandshake(sessionMiddleware));
  io.engine.use(onlyForHandshake(passport.session()));
  io.engine.use(onlyForHandshake(authMiddleware));
  io.on("connection", onConnection);
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export { initializeWebsocket, getIO };
