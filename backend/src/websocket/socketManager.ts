import { Socket } from "socket.io";
const userSockets = new Map();

const addSocket = (id: string, socket: Socket) => {
  if (!userSockets.has(id)) {
    userSockets.set(id, new Set());
  }
  userSockets.get(id).add(socket);
};

const removeSocket = (id: string, socket: Socket) => {
  if (userSockets.has(id)) {
    const sockets = userSockets.get(id);
    sockets.delete(socket);
    if (sockets.size === 0) {
      userSockets.delete(id);
    }
  }
};

const getSockets = (id: string) => {
  return userSockets.get(id) || new Set();
};

const emitToUser = (id: string, event: string, data: object) => {
  const sockets = getSockets(id);
  sockets.forEach((socket: Socket) => {
    socket.emit(event, data);
  });
};

export { addSocket, removeSocket, getSockets, emitToUser };
