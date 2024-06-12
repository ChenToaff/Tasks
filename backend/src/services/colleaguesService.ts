import IUser from "../interfaces/IUser";
import UserModel from "../models/UsersModel";
import { NotFoundError } from "../utils/ApiError";

export const getColleagues = async (
  userId: string
): Promise<Partial<IUser>[]> => {
  const user = await UserModel.findById<IUser>(userId, "users")
    .populate({
      path: "colleagues",
      select: "username name",
    })
    .exec();
  if (!user) throw new NotFoundError("User not found");

  const colleagues = user.colleagues as IUser[];
  return colleagues;
};

export const addColleague = async (
  id: string,
  colleagueId: string
): Promise<IUser> => {
  const updatedUser = await UserModel.findByIdAndUpdate<IUser>(
    id,
    {
      $push: { colleagues: colleagueId },
    },
    { new: true }
  );
  if (!updatedUser) throw new NotFoundError("User not found");
  return updatedUser;
};

// export const removeColleague = async (id: string): Promise<IUser | null> => {
//   const deletedUser = await UserModel.findByIdAndDelete(id).select(
//     "-_id -__v"
//   );
//   return deletedUser;
// };
