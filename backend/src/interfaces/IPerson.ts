import { Document, Schema } from "mongoose";

export default interface IPerson extends Document {
  name: string;
  username: string;
  passwordHash: string;
  projects: Schema.Types.ObjectId[];
  tasks: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}
