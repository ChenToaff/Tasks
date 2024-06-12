import IPerson from "../interfaces/IPerson";
import PersonModel from "../models/PeopleModel";
import { NotFoundError } from "../utils/ApiError";

export const getColleagues = async (
  userId: string
): Promise<Partial<IPerson>[]> => {
  const user = await PersonModel.findById<IPerson>(userId, "people")
    .populate({
      path: "colleagues",
      select: "username name",
    })
    .exec();
  if (!user) throw new NotFoundError("Person not found");

  const colleagues = user.colleagues as IPerson[];
  return colleagues;
};

// export const addColleague = async (
//   id: string,
//   data: UpdatePersonData
// ): Promise<IPerson | null> => {
//   if (data.password) {
//     data.password = await bcrypt.hash(data.password, 10);
//   }
//   const updateData = {
//     ...data,
//     passwordHash: data.password,
//   };
//   delete updateData.password; // Remove plaintext password if exists

//   const updatedPerson = await PersonModel.findByIdAndUpdate(id, updateData, {
//     new: true,
//     select: "-_id -__v",
//   }).exec();
//   return updatedPerson;
// };

// export const removeColleague = async (id: string): Promise<IPerson | null> => {
//   const deletedPerson = await PersonModel.findByIdAndDelete(id).select(
//     "-_id -__v"
//   );
//   return deletedPerson;
// };
