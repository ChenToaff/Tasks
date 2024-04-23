import { Document } from "mongoose";

export default interface IPerson extends Document {
  name: string;
  username: string;
  passwordHash: string;
}
