import { Schema, Document, Types } from "mongoose";
import ITaskColumn from "./ITaskColumn";
import IPerson from "./IPerson";

export default interface IProject extends Document {
  name: string;
  description: string;
  taskColumns: Types.DocumentArray<ITaskColumn>;
  members: (IPerson | Schema.Types.ObjectId)[];
}
