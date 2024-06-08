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

// Get all tasks
export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await TasksService.findAllTasks();
  res.json(tasks);
});

// Get a single task by ID
export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const task = await TasksService.findTaskById(req.params.id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
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

  const newTask = await TasksService.createTask({
    projectId,
    taskColumnId,
    assignedTo,
  } as ITask);

  if (assignedTo) {
    assignee = await PeopleService.findPersonById(assignedTo);
    if (!assignee) throw new ApiError(400, "Bad Requeest: assignee not found");
    PeopleService.addTask(assignedTo, newTask.id);
  }

  if (projectId && taskColumnId) {
    const project = await ProjectsService.findProjectById(projectId);
    if (!project) throw new ApiError(400, "Bad Requeest: Project not found");
    const taskColumn = TaskColumnService.findTaskColumnById(taskColumnId);
    if (!taskColumn) throw new ApiError(400, "Task column not found");
    await ProjectsService.addTaskToTaskColumn(
      projectId,
      taskColumnId,
      newTask._id
    );
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
  try {
    const updatedTask = await TasksService.updateTask(id, {
      title,
      description,
      completed,
      assignedTo,
      dueDate,
      projectId,
    });
    if (!updatedTask) {
      throw new ApiError(404, "Task not found");
    }
    if (updatedTask.projectId) {
      const project = await ProjectsService.findProjectById(
        updatedTask.projectId
      );
      if (!project) throw new ApiError(400, "Bad Requeest: Project not found");
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
  const task = await TasksService.deleteTask(id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  if (task.projectId) {
    const project = await ProjectsService.findProjectById(task.projectId);
    if (project) {
      (project.members as IPerson[]).forEach((member) => {
        emitToUser(member.id.toString(), "task_deleted", {
          message: `Task deleted: ${task.id}`,
          task: task,
        });
      });
    }
  }
  res.status(204).send();
});

// Update the completed field of a task
export const updateTaskCompleted = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
      const updatedTask = await TasksService.updateTask(id, { completed });
      if (!updatedTask) {
        throw new ApiError(404, "Task not found");
      }
      res.json(updatedTask);
    } catch (error) {
      throw new ApiError(400, "Bad Request");
    }
  }
);
