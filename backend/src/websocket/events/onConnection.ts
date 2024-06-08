import { Socket } from "socket.io";
import newTask from "./newTask";
import { addSocket, removeSocket } from "../socketManager";

export default function onConnection(socket: Socket) {
  const user = (socket.request as any).user;
  if (!user) {
    console.log("No authenticated user found for the socket connection.");
    return;
  }
  console.log("An authenticated user connected with user id:", user.id);

  const userId = user.id;
  addSocket(userId, socket);

  socket.on("disconnect", () => {
    removeSocket(userId, socket);
    console.log("User disconnected:", socket.id);
  });
  socket.on("new-task", newTask);
}
