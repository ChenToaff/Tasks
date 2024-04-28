import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/ITask";

const TaskSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, alias: "id" }, // Alias _id to id
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

// Add a virtual property 'id' that's derived from '_id'.
TaskSchema.virtual("id").get(function (this: ITask) {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting a document to JSON/objects
TaskSchema.set("toJSON", { virtuals: true });
TaskSchema.set("toObject", { virtuals: true });

export default mongoose.model<ITask>("Task", TaskSchema);
