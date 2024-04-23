import ITask from "../interfaces/ITask";
import TaskModel from "../models/TasksModel";

export const findAllTasks = async (): Promise<ITask[]> => {
  return await TaskModel.find().populate("assignedTo");
};

export const findTaskById = async (id: string): Promise<ITask | null> => {
  return await TaskModel.findById(id).populate("assignedTo");
};

export const createTask = async (taskData: ITask): Promise<ITask> => {
  const newTask = new TaskModel(taskData);
  return await newTask.save();
};

export const updateTask = async (
  id: string,
  taskData: Partial<ITask>
): Promise<ITask | null> => {
  return await TaskModel.findByIdAndUpdate(id, taskData, {
    new: true,
  }).populate("assignedTo");
};

export const deleteTask = async (id: string): Promise<ITask | null> => {
  return await TaskModel.findByIdAndDelete(id);
};
