import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/ITask";
export const TaskSchema: Schema = new Schema({
  title: { type: String },
  description: { type: String },
  completed: { type: Boolean, default: false },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  dueDate: { type: Date },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  taskColumnId: { type: Schema.Types.ObjectId, ref: "TaskColumn" },
  createdAt: { type: Date, default: Date.now },
});

// Add a virtual property 'id' that's derived from '_id'.
TaskSchema.virtual("id").get(function (this: ITask) {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting a document to JSON/objects
TaskSchema.set("toJSON", { virtuals: true });
TaskSchema.set("toObject", { virtuals: true });

export default mongoose.model<ITask>("Task", TaskSchema);
