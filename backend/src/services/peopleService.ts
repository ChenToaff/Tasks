import IPerson from "../interfaces/IPerson";
import PersonModel from "../models/PeopleModel";
import { validatePassword } from "../utils/validations";
import { Schema } from "mongoose";
import IProject from "../interfaces/IProject";
import { NotFoundError, ValidationError } from "../utils/ApiError";
import { NotFoundError, ValidationError } from "../utils/ApiError";
import ITask from "../interfaces/ITask";
import ITask from "../interfaces/ITask";

interface CreatePersonData {
  name: string;
  username: string;
  password: string;
}

interface UpdatePersonData {
  name?: string;
  username?: string;
  password?: string;
}
export const findPersonById = async (id: string): Promise<IPerson> => {
  const person = await PersonModel.findById(id);
  if (!person) throw new NotFoundError("Person not found");
  return person;
};

// Resolve usernames to _ids
export const findPersonById = async (id: string): Promise<IPerson> => {
  const person = await PersonModel.findById(id);
  if (!person) throw new NotFoundError("Person not found");
  return person;
};

// Resolve usernames to _ids
export const getUserIds = async (
  usernames: string[]
export const getProjects = async (
  userId: string,
  start: number,
  limit: number
): Promise<IProject[]> => {
  const user = await PersonModel.findById(userId)
    .select("projects")
    .populate({ path: "projects", select: "name description" });

  if (!user) {
    throw new Error("User not found");
  }

  const projects = (user.projects as IProject[]).slice(start, start + limit);
  return projects;
};

export const getTasks = async (userId: string): Promise<ITask[]> => {
  const user = await PersonModel.findById<IPerson>(userId, "people")
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
): Promise<Partial<IPerson>[] | null> => {
  const user = await PersonModel.findById<IPerson>(userId, "people")
    .populate({
      path: "colleagues",
      select: "username name",
    })
    .exec();
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const colleagues = user.colleagues as IPerson[];
  return colleagues;
    username: { $in: usernames },
  }).select<IPerson>("_id");
  return users.map<Schema.Types.ObjectId>((user) => user._id);
  return await PersonModel.find().select("username name id");

export const getProjects = async (
): Promise<IProject[]> => {
  const user = await PersonModel.findById(userId)
    .select("projects")
): Promise<IPerson> => {
  const updatedPerson = await PersonModel.findByIdAndUpdate<IPerson>(
  if (!user) {
    throw new Error("User not found");
      $push: { projects: { $each: [projectId], $position: 0 } },

  const projects = (user.projects as IProject[]).slice(start, start + limit);
  return projects;
  if (!updatedPerson) throw new NotFoundError("Person not found");
  return updatedPerson;
};

export const addTask = async (id: Schema.Types.ObjectId, taskId: string) => {
  const updatedPerson = await PersonModel.findByIdAndUpdate<IPerson>(
    id,
    { $push: { tasks: { $each: [taskId], $position: 0 } } },
    { new: true }
  );
  if (!updatedPerson) throw new NotFoundError("Person not found");
};

export const getTasks = async (userId: string): Promise<ITask[]> => {
  const user = await PersonModel.findById<IPerson>(userId, "people")
    .populate({
      path: "tasks",
    })
    .exec();
  if (!user) {
    throw new NotFoundError("User not found");
  }

    throw new ValidationError(
  return tasks;
};

export const getColleagues = async (
  userId: string
): Promise<Partial<IPerson>[] | null> => {
  const user = await PersonModel.findById<IPerson>(userId, "people")
    .populate({
      path: "colleagues",
      select: "username name",
    })
  const { name, username, id } = savedPerson.toObject();
  return { name, username, id } as IPerson;
    throw new NotFoundError("User not found");
  }

  const colleagues = user.colleagues as IPerson[];
  return colleagues;
): Promise<IPerson> => {

    if (!validatePassword(data.password)) {
      throw new ValidationError(
        "Password must be at least 8 characters long, include at least one uppercase letter, and one number."
      );
    }
export const findAllPeople = async (): Promise<IPerson[]> => {
  return await PersonModel.find().select("username name id");
};
    name: data.name,
    username: data.username,
export const addProject = async (
  id: Schema.Types.ObjectId,
): Promise<IPerson> => {
  const updatedPerson = await PersonModel.findByIdAndUpdate<IPerson>(
    id,
    select: "name username id",
      $push: { projects: { $each: [projectId], $position: 0 } },
  if (!updatedPerson) throw new NotFoundError("Person not found");

    },
    { new: true }
  );
export const deletePerson = async (id: string) => {
  const deletedPerson = await PersonModel.findByIdAndDelete(id);
  if (!deletedPerson) throw new NotFoundError("Person not found");
  const updatedPerson = await PersonModel.findByIdAndUpdate<IPerson>(
    id,
    { $push: { tasks: { $each: [taskId], $position: 0 } } },
    { new: true }
  );
  if (!updatedPerson) throw new NotFoundError("Person not found");
};

export const findPersonByUsername = async (
  username: string
): Promise<IPerson | null> => {
  return await PersonModel.findOne({ username });
};

export const createPerson = async (
  data: CreatePersonData
): Promise<IPerson> => {
  if (!validatePassword(data.password)) {
    throw new ValidationError(
      "Password must be at least 8 characters long, include at least one uppercase letter, and one number."
    );
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const person = new PersonModel({
    name: data.name,
    username: data.username,
    passwordHash,
  });
  const savedPerson = await person.save();
  const { name, username, id } = savedPerson.toObject();
  return { name, username, id } as IPerson;
};

export const updatePerson = async (
  id: string,
  data: UpdatePersonData
): Promise<IPerson> => {
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

  const updatedPerson = await PersonModel.findByIdAndUpdate(id, updateData, {
    new: true,
    select: "name username id",
  }).exec();
  if (!updatedPerson) throw new NotFoundError("Person not found");

  return updatedPerson;
};

export const deletePerson = async (id: string) => {
  const deletedPerson = await PersonModel.findByIdAndDelete(id);
  if (!deletedPerson) throw new NotFoundError("Person not found");
};
