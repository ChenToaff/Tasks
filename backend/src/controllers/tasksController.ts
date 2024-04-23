import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as TasksService from "../services/tasksService";
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

// Create a new task
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, status, assignedTo, dueDate } = req.body;
  try {
    const newTask = await TasksService.createTask({
      title,
      description,
      status,
      assignedTo,
      dueDate,
    } as ITask);

    res.status(201).json(newTask);
  } catch (error) {
    throw new ApiError(400, "Bad Request");
  }
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
