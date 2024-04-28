import { Schema, Document } from "mongoose";

export default interface IProject extends Document {
  name: string;
  description: string;
  tasks: Schema.Types.ObjectId[]; // Array of task references
  members: Schema.Types.ObjectId[]; // Array of Person document references
}
