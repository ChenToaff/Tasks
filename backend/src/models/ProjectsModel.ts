import mongoose, { Schema, Document } from "mongoose";
import IProject from "../interfaces/IProject";

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  manager: { type: Schema.Types.ObjectId, ref: "Person", required: true },
  teamMembers: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

export default mongoose.model<IProject>("Project", ProjectSchema);
