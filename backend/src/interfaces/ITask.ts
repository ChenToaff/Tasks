import { Schema, Document } from "mongoose";

export default interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: Schema.Types.ObjectId; // Link to a Person document
  dueDate: Date;
  projectId: string;
}
