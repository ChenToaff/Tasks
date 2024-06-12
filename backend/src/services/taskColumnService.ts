import ITaskColumn from "../interfaces/ITaskColumn";
import TaskColumnModel from "../models/TaskColumnModel";
import { Types } from "mongoose";
import { NotFoundError } from "../utils/ApiError";

export const findTaskColumnById = async (id: string): Promise<ITaskColumn> => {
  const taskColumn = await TaskColumnModel.findById(id);
  if (!taskColumn) throw new NotFoundError("Task column not found");
  return taskColumn;
};

export const createTaskColumn = async (
  taskData: Partial<ITaskColumn>
): Promise<ITaskColumn> => {
  const newTask = new TaskColumnModel(taskData);
  return await newTask.save();
};

// export const updateTask = async (
//   id: string,
//   taskData: Partial<ITask>
// ): Promise<ITask | null> => {
//   return await TaskModel.findByIdAndUpdate(id, taskData, {
//     new: true,
//   }).populate("assignedTo");
// };

export const deleteTaskColumn = async (
  id: string
): Promise<ITaskColumn | null> => {
  return await TaskColumnModel.findByIdAndDelete(id);
};
