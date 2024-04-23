import bcrypt from "bcryptjs";
import PeopleModel from "../models/PeopleModel";
import IPerson from "../interfaces/IPerson";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<IPerson | null> => {
  try {
    const user = await PeopleModel.findOne({ username }).exec();
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
