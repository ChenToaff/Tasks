import IUser from "../interfaces/IUser";
import UserModel from "../models/UsersModel";
import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/validations";
import { Schema } from "mongoose";
import IProject from "../interfaces/IProject";
import { NotFoundError, ValidationError } from "../utils/ApiError";
import ITask from "../interfaces/ITask";

interface CreateUserData {
  name: string;
  username: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  username?: string;
  password?: string;
}

export const findUserById = async (id: string): Promise<IUser> => {
  const user = await UserModel.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return user;
};

// Resolve usernames to _ids
export const getUserIds = async (
  usernames: string[]
): Promise<Schema.Types.ObjectId[]> => {
  const users = await UserModel.find({
    username: { $in: usernames },
  }).select<IUser>("_id");
  return users.map<Schema.Types.ObjectId>((user) => user._id);
};

export const getProjects = async (
  userId: string,
  start: number,
  limit: number
): Promise<IProject[]> => {
  const user = await UserModel.findById(userId)
    .select("projects")
    .populate({ path: "projects", select: "name description" });

  if (!user) {
    throw new Error("User not found");
  }

  const projects = (user.projects as IProject[]).slice(start, start + limit);
  return projects;
};

export const getTasks = async (userId: string): Promise<ITask[]> => {
  const user = await UserModel.findById<IUser>(userId, "users")
    .populate({
      path: "tasks",
    })
    .exec();
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const tasks = user.tasks as ITask[];
  return tasks;
};

export const getColleagues = async (
  userId: string
): Promise<Partial<IUser>[] | null> => {
  const user = await UserModel.findById<IUser>(userId, "users")
    .populate({
      path: "colleagues",
      select: "username name",
    })
    .exec();
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const colleagues = user.colleagues as IUser[];
  return colleagues;
};

export const findAllUsers = async (): Promise<IUser[]> => {
  return await UserModel.find().select("username name id");
};

export const addProject = async (
  id: Schema.Types.ObjectId,
  projectId: string
): Promise<IUser> => {
  const updatedUser = await UserModel.findByIdAndUpdate<IUser>(
    id,
    {
      $push: { projects: { $each: [projectId], $position: 0 } },
    },
    { new: true }
  );
  if (!updatedUser) throw new NotFoundError("User not found");
  return updatedUser;
};

export const addTask = async (id: Schema.Types.ObjectId, taskId: string) => {
  const updatedUser = await UserModel.findByIdAndUpdate<IUser>(
    id,
    { $push: { tasks: { $each: [taskId], $position: 0 } } },
    { new: true }
  );
  if (!updatedUser) throw new NotFoundError("User not found");
};

export const findUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  return await UserModel.findOne({ username });
};

export const createUser = async (data: CreateUserData): Promise<IUser> => {
  if (!validatePassword(data.password)) {
    throw new ValidationError(
      "Password must be at least 8 characters long, include at least one uppercase letter, and one number."
    );
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = new UserModel({
    name: data.name,
    username: data.username,
    passwordHash,
  });
  const savedUser = await user.save();
  const { name, username, id } = savedUser.toObject();
  return { name, username, id } as IUser;
};

export const updateUser = async (
  id: string,
  data: UpdateUserData
): Promise<IUser> => {
  if (data.password) {
    if (!validatePassword(data.password)) {
      throw new ValidationError(
        "Password must be at least 8 characters long, include at least one uppercase letter, and one number."
      );
    }
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updateData = {
    name: data.name,
    username: data.username,
    passwordHash: data.password,
  };

  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    select: "name username id",
  }).exec();
  if (!updatedUser) throw new NotFoundError("User not found");

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await UserModel.findByIdAndDelete(id);
  if (!deletedUser) throw new NotFoundError("User not found");
};
