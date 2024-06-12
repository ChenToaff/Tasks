import ITask from "../interfaces/ITask";
import TaskModel from "../models/TasksModel";
import { NotFoundError } from "../utils/ApiError";

export const findTaskById = async (id: string): Promise<ITask> => {
  const task = await TaskModel.findById(id).populate("assignedTo");
  if (!task) throw new NotFoundError("Task not found");
  return task;
};

export const createTask = async (taskData: Partial<ITask>): Promise<ITask> => {
  const newTask = new TaskModel(taskData);
  return await newTask.save();
};

export const updateTask = async (
  id: string,
  taskData: Partial<ITask>
): Promise<ITask> => {
  const updatedTask = await TaskModel.findByIdAndUpdate(id, taskData, {
    new: true,
  });

  if (!updatedTask) throw new NotFoundError("Task not found");
  return updatedTask;
};

export const deleteTask = async (id: string): Promise<ITask> => {
  const deletedTask = await TaskModel.findByIdAndDelete(id);
  if (!deletedTask) throw new NotFoundError("Task not found");
  return deletedTask;
};
