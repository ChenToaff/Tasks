import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import IPerson from "../../interfaces/IPerson";
import * as SocketManager from "../socketManager";
import * as ProjectsService from "../../services/projectsService";
import * as TasksService from "../../services/tasksService";
import ITask from "../../interfaces/ITask";

export default async function newTask(
  { projectId, columnId }: { projectId: string; columnId: string },
  callback: (data: any) => void
) {
  try {
    if (!callback) {
      callback = () => null;
    }
    const newTask = await TasksService.createTask({
      projectId,
    } as Partial<ITask>);
    if (projectId) {
      const project = await ProjectsService.findProjectById(projectId);

      if (!project) {
        throw new Error("Project not found");
      }
      await ProjectsService.addTaskToTaskColumn(
        projectId,
        columnId,
        newTask._id
      );
      // Broadcast to project members
      project.members.forEach((memberId) => {
        SocketManager.emitToUser(memberId.toString(), "new_task", {
          message: `New task created in project: ${project.name}`,
          task: newTask,
        });
      });
    }

    callback({
      success: true,
      taskId: newTask._id,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error("Error creating task:", error);
    callback({ success: false, message: "Failed to create task" });
  }
}
