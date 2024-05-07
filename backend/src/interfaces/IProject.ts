import { Schema, Document, Types } from "mongoose";
import ITaskColumn from "./ITaskColumn";

export default interface IProject extends Document {
  name: string;
  description: string;
  taskColumns: Types.DocumentArray<ITaskColumn>;
  members: Schema.Types.ObjectId[]; // Array of Person document references
}
