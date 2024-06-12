import { Document, Schema } from "mongoose";
import ITask from "./ITask";
import IProject from "./IProject";

export default interface IUser extends Document {
  id: string;
  name: string;
  username: string;
  passwordHash: string;
  projects: IProject[] | Schema.Types.ObjectId[];
  tasks: ITask[] | Schema.Types.ObjectId[];
  colleagues: IUser[] | Schema.Types.ObjectId[];
}
