import { Document, Schema } from "mongoose";
import ITask from "./ITask";
import IProject from "./IProject";

export default interface IPerson extends Document {
  id: string;
  name: string;
  username: string;
  passwordHash: string;
  projects: IProject[] | Schema.Types.ObjectId[];
  tasks: ITask[] | Schema.Types.ObjectId[];
  colleagues: IPerson[] | Schema.Types.ObjectId[];
}
