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

export const addTaskToTaskColumn = async (
  taskColumnId: string,
  taskId: Types.ObjectId,
  position?: number
) => {
  // Default the position if it's out of range
  if (!position || position < 0) {
    position = 0;
  }

  await TaskColumnModel.findByIdAndUpdate(
    taskColumnId,
    {
      $push: {
        tasks: {
          $each: [taskId],
          $position: position,
        },
      },
    },
    { new: true, useFindAndModify: false }
  );
};

export const removeTaskfromTaskColumn = async (
  taskColumnId: string,
  taskId: Types.ObjectId
) => {
  await TaskColumnModel.findByIdAndUpdate(
    taskColumnId,
    { $pull: { tasks: taskId } },
    { new: true, useFindAndModify: false }
  );
};

export const deleteTaskColumn = async (
  id: string
): Promise<ITaskColumn | null> => {
  return await TaskColumnModel.findByIdAndDelete(id);
};
