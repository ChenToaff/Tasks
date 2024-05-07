import IPerson from "../interfaces/IPerson";
import PersonModel from "../models/PeopleModel";

import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/validations";
import { Schema } from "mongoose";
import IProject from "../interfaces/IProject";

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

// Function to resolve usernames to _ids
export const getUserIds = async (
  usernames: string[]
): Promise<Schema.Types.ObjectId[]> => {
  const users = await PersonModel.find({
    username: { $in: usernames },
  }).select<IPerson>("_id");
  return users.map<Schema.Types.ObjectId>((user) => user._id);
};

export const getProjects = async (id: string): Promise<IProject[] | null> => {
  return await PersonModel.findById(id).select("projects").populate("projects");
};

export const findAllPeople = async (): Promise<IPerson[]> => {
  return await PersonModel.find().select("username name").lean();
};

export const findPersonById = async (id: string): Promise<IPerson | null> => {
  return await PersonModel.findById(id).populate("projects", "id name");
};
export const addProject = async (
  id: Schema.Types.ObjectId,
  projectId: string
): Promise<IPerson | null> => {
  return await PersonModel.findByIdAndUpdate<IPerson>(
    id,
    {
      $push: { projects: projectId },
    },
    { new: true }
  );
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
    throw new Error(
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
  const { _id, __v, ...personData } = savedPerson.toObject();
  return personData as IPerson;
};

export const updatePerson = async (
  id: string,
  data: UpdatePersonData
): Promise<IPerson | null> => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updateData = {
    ...data,
    passwordHash: data.password,
  };
  delete updateData.password; // Remove plaintext password if exists

  const updatedPerson = await PersonModel.findByIdAndUpdate(id, updateData, {
    new: true,
    select: "-_id -__v",
  }).exec();
  return updatedPerson;
};

export const deletePerson = async (id: string): Promise<IPerson | null> => {
  const deletedPerson = await PersonModel.findByIdAndDelete(id).select(
    "-_id -__v"
  );
  return deletedPerson;
};
