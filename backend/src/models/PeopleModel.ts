import mongoose, { Schema, Document } from "mongoose";
import IPerson from "../interfaces/IPerson";

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export default mongoose.model<IPerson>("Person", PersonSchema);
