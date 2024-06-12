import { Schema, Document, Types } from "mongoose";
import ITaskColumn from "./ITaskColumn";
import IUser from "./IUser";

export default interface IProject extends Document {
  name: string;
  description: string;
  taskColumns: Types.DocumentArray<ITaskColumn>;
  members: (IUser | Schema.Types.ObjectId)[];
}
