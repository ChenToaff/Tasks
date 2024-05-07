import { Schema, Document, Types } from "mongoose";

export default interface ITaskColumn extends Document {
  title: string;
  tasks: Types.ObjectId[]; // Array of task IDs
}
