import mongoose, { Schema, Document } from "mongoose";
import ITaskColumn from "../interfaces/ITaskColumn";

const TaskColumnSchema = new Schema({
  title: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

// Add a virtual property 'id' that's derived from '_id'.
TaskColumnSchema.virtual("id").get(function (this: ITaskColumn) {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting a document to JSON/objects
TaskColumnSchema.set("toJSON", { virtuals: true });
TaskColumnSchema.set("toObject", { virtuals: true });

export default mongoose.model<ITaskColumn>("TaskColumn", TaskColumnSchema);
