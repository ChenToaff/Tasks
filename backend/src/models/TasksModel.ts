import mongoose, { Schema, Document } from "mongoose";
import ITask from "../interfaces/ITask";

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "In Progress", "Completed"],
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: "Person" },
  dueDate: { type: Date },
});

export default mongoose.model<ITask>("Task", TaskSchema);
