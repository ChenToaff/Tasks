import mongoose, { Schema, Document } from "mongoose";
import IUser from "../interfaces/IUser";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  colleagues: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Add a virtual property 'id' that's derived from '_id'.
UserSchema.virtual("id").get(function (this: IUser) {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting a document to JSON/objects
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

export default mongoose.model<IUser>("User", UserSchema);
