import IPerson from "../interfaces/IPerson";
import PersonModel from "../models/PeopleModel";

import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/validations";

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

export const findAllPeople = async (): Promise<IPerson[]> => {
  return await PersonModel.find();
};

export const findPersonById = async (id: string): Promise<IPerson | null> => {
  return await PersonModel.findById(id);
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
  return person.save();
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

  return PersonModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

export const deletePerson = async (id: string): Promise<IPerson | null> => {
  return await PersonModel.findByIdAndDelete(id);
};
