import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/ITask";
export const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default: "To Do",
    enum: ["To Do", "In Progress", "Done"],
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: "Person" },
  dueDate: { type: Date },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" }, // Reference to the parent project
});

// Add a virtual property 'id' that's derived from '_id'.
TaskSchema.virtual("id").get(function (this: ITask) {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting a document to JSON/objects
TaskSchema.set("toJSON", { virtuals: true });
TaskSchema.set("toObject", { virtuals: true });

export default mongoose.model<ITask>("Task", TaskSchema);
