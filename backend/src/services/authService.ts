import bcrypt from "bcryptjs";
import * as PeopleService from "../services/peopleService";
import IPerson from "../interfaces/IPerson";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<IPerson | null> => {
  try {
    const user = await PeopleService.findPersonByUsername(username);
    console.log({ user }, username);
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
