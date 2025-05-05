import mongoose, { Document, Schema } from "mongoose";

// User Mongoose Schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// User Document Interface
export interface IUser extends Document {
  email: string;
  clerkUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Model
export const UserModel = mongoose.model<IUser>("User", UserSchema);
