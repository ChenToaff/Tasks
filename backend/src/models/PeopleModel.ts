import mongoose, { Schema, Document } from "mongoose";
import IPerson from "../interfaces/IPerson";

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

export default mongoose.model<IPerson>("Person", PersonSchema);
