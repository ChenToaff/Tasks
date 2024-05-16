// services/socketService.ts
import io from "socket.io-client";

const socket = io("http://localhost:5000", { withCredentials: true });

export const sendTask = (task: any) => {
  socket.emit("new-task", task, (response: any) => {
    if (response.success) {
      console.log("Task created with ID:", response.taskId);
    } else {
      console.error("Error creating task:", response.message);
    }
  });
};

export const onTaskAdded = (callback: (task: any) => void) => {
  socket.on("task-added", callback);
};

export default socket;
