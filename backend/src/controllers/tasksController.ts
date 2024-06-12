import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as TasksService from "../services/tasksService";
import * as ProjectsService from "../services/projectsService";
import * as TaskColumnService from "../services/taskColumnService";
import * as PeopleService from "../services/peopleService";
import { ApiError } from "../utils/ApiError";
import ITask from "../interfaces/ITask";
import { getIO } from "../websocket";
import { emitToUser } from "../websocket/socketManager";
import IPerson from "../interfaces/IPerson";

export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const projects = await PeopleService.getTasks(userId);
  res.json(projects);
});

// Get a single task by ID
export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const task = await TasksService.findTaskById(req.params.id);
  res.json(task);
});

/**
 * Creates a new task and adds it at the start of a specified task column.
 *
 * @param projectId The ID of the project.
 * @param taskColumnId The ID of the task column within the project.
 * @param taskData Data for creating the new task.
 */
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, taskColumnId, assignedTo } = req.body;

  let assignee = null;
  let project = null;
  let taskColumn = null;
  if (assignedTo) {
    assignee = await PeopleService.findPersonById(assignedTo);
  }
  if (projectId) {
    project = await ProjectsService.findProjectById(projectId);
    if (taskColumnId) {
      taskColumn = await TaskColumnService.findTaskColumnById(taskColumnId);
    }
  }
  const newTask = await TasksService.createTask({
    projectId,
    taskColumnId,
    assignedTo,
  } as ITask);

  if (assignee) {
    PeopleService.addTask(assignedTo, newTask.id);
  }

  if (project) {
    if (taskColumn) {
      await TaskColumnService.addTaskToTaskColumn(taskColumnId, newTask._id);
    }
    (project.members as IPerson[]).forEach((member) => {
      emitToUser(member.id.toString(), "task_created", {
        message: `Task created: ${newTask.id}`,
        task: newTask,
      });
    });
  }

  res.status(201).json({ task: newTask });
});

// Update an existing task
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed, assignedTo, dueDate, projectId } =
    req.body;
  if (assignedTo) {
    await PeopleService.addTask(assignedTo, id);
  }

  try {
    const updatedTask = await TasksService.updateTask(id, {
      title,
      description,
      completed,
      assignedTo,
      dueDate,
      projectId,
    });
    if (updatedTask.projectId) {
      const project = await ProjectsService.findProjectById(
        updatedTask.projectId
      );
      (project.members as IPerson[]).forEach((member) => {
        emitToUser(member.id.toString(), "task_updated", {
          message: `Task updated: ${updatedTask.id}`,
          task: updatedTask,
        });
      });
    }
    res.json(updatedTask);
  } catch (error) {
    throw new ApiError(400, "Bad Request");
  }
});

// Delete a task
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTask = await TasksService.deleteTask(id);
  if (deletedTask.projectId) {
    if (deletedTask.taskColumnId) {
      TaskColumnService.removeTaskfromTaskColumn(
        deletedTask.taskColumnId,
        deletedTask._id
      );
    }
    const project = await ProjectsService.findProjectById(
      deletedTask.projectId
    );
    (project.members as IPerson[]).forEach((member) => {
      emitToUser(member.id.toString(), "task_deleted", {
        message: `Task deleted: ${deletedTask.id}`,
        task: deletedTask,
      });
    });
  }
  res.status(204).send();
});
