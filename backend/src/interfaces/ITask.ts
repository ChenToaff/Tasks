import { Schema, Document } from "mongoose";

export default interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  completed: Boolean;
  assignedTo: string;
  dueDate: Date;
  projectId: string;
  taskColumnId: string;
}
