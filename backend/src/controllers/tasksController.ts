import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as TasksService from "../services/tasksService";
import * as ProjectsService from "../services/projectsService";
import { ApiError } from "../utils/ApiError";
import ITask from "../interfaces/ITask";

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
  const { projectId, taskColumnId, taskData } = req.body;

  const project = await ProjectsService.findProjectById(projectId);
  if (!project) throw new ApiError(400, "Bad Requeest: Project not found");

  const taskColumn = project.taskColumns.id(taskColumnId);
  if (!taskColumn) throw new ApiError(400, "Task column not found");

  const newTask = await TasksService.createTask({
    ...taskData,
    projectId,
  } as ITask);

  await ProjectsService.addTaskToTaskColumn(
    projectId,
    taskColumnId,
    newTask._id
  );

  res.status(201).json({ message: "Task added successfully" });
});

// Update an existing task
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, assignedTo, dueDate } = req.body;
  try {
    const updatedTask = await TasksService.updateTask(id, {
      title,
      description,
      status,
      assignedTo,
      dueDate,
    });
    if (!updatedTask) {
      throw new ApiError(404, "Task not found");
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
  res.status(204).send();
});

// Update the status of a task
export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedTask = await TasksService.updateTask(id, { status });
      if (!updatedTask) {
        throw new ApiError(404, "Task not found");
      }
      res.json(updatedTask);
    } catch (error) {
      throw new ApiError(400, "Bad Request");
    }
  }
);
