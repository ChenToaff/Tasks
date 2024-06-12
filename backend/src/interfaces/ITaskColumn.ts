import { Schema, Document, Types } from "mongoose";

export default interface ITaskColumn extends Document {
  id: string;
  title: string;
  tasks: Types.ObjectId[];
}
