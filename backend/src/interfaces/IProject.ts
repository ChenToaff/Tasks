import { Schema, Document } from "mongoose";

export default interface IProject extends Document {
  name: string;
  description: string;
  tasks: Schema.Types.ObjectId[]; // Array of task references
  manager: Schema.Types.ObjectId; // Link to a Person document who manages the project
  teamMembers: Schema.Types.ObjectId[]; // Array of Person document references
}
