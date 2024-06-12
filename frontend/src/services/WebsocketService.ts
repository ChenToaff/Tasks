// src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import store from "../store";
import {
  addTask,
  updateTask,
  removeTask,
  updateTaskColumn,
} from "@features/tasks/redux/tasksSlice";
import {
  removeTaskFromProject,
  updateTaskInProject,
  addTaskToProject,
  changeTaskLocation,
} from "@features/projects/redux/projectsSlice";

class SocketService {
  private socket: Socket | null = null;

  connect(url: string) {
    this.socket = io(url, { withCredentials: true });

    this.socket.on("connect", () => {
      console.log("Socket.io connected");
    });

    this.socket.on("task_location_changed", ({ changeData }) => {
      if (changeData) {
        store.dispatch(updateTaskColumn(changeData));
        store.dispatch(changeTaskLocation(changeData));
      }
    });

    this.socket.on("task_created", ({ task }) => {
      console.log({ task });
      if (task) {
        store.dispatch(addTask(task));
        if (task.projectId) {
          store.dispatch(addTaskToProject(task));
        }
      }
    });

    this.socket.on("task_updated", ({ task }) => {
      if (task) {
        store.dispatch(updateTask(task));
        if (task.projectId) {
          store.dispatch(updateTaskInProject(task));
        }
      }
    });

    this.socket.on("task_deleted", ({ task }) => {
      if (task) {
        store.dispatch(removeTask(task.id));
        if (task.projectId) {
          store.dispatch(removeTaskFromProject(task));
        }
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Socket.io disconnected");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Optionally, methods to send messages to the server
  sendMessage(event: string, message: object) {
    if (this.socket) {
      this.socket.emit(event, message);
    }
  }
}

const socketService = new SocketService();
export default socketService;
