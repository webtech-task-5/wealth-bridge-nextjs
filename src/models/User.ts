
import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  email: string;
  name: string;
  password: string;
  isVerified: boolean;
  wallet: number;
  type: string;
  accountNumber: string;
  createdAt: Date;
  _id: string;
};

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  wallet: { type: Number, default: 0 },
  type: { type: String, default: "user" },
  accountNumber: { type: String, default: "" },
  createdAt: { type: Date, default: () => Date.now() },
});

export default mongoose.models.User ||
  mongoose.model<UserDocument>("User", UserSchema);
