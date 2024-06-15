import bcrypt from "bcryptjs";
import * as UserService from "./userService";
import IUser from "../interfaces/IUser";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<IUser | null> => {
  try {
    const user = await UserService.findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
