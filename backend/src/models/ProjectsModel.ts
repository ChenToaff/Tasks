import mongoose, { Schema, Document } from "mongoose";
import IProject from "../interfaces/IProject";

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    taskColumns: [{ type: Schema.Types.ObjectId, ref: "TaskColumn" }],
  },
  { optimisticConcurrency: true }
);

// Add a virtual property 'id' that's derived from '_id'.
ProjectSchema.virtual("id").get(function (this: IProject) {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting a document to JSON/objects
ProjectSchema.set("toJSON", { virtuals: true });
ProjectSchema.set("toObject", { virtuals: true });

export default mongoose.model<IProject>("Project", ProjectSchema);
