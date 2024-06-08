import mongoose, { Schema, Document } from "mongoose";
import IPerson from "../interfaces/IPerson";

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  colleagues: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

// Add a virtual property 'id' that's derived from '_id'.
PersonSchema.virtual("id").get(function (this: IPerson) {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting a document to JSON/objects
PersonSchema.set("toJSON", { virtuals: true });
PersonSchema.set("toObject", { virtuals: true });

export default mongoose.model<IPerson>("Person", PersonSchema);
