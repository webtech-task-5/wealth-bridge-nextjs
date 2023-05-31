import mongoose from "mongoose";

export type KeyDocument = mongoose.Document & {
  id: string;
  createdAt: Date;
  name: string;
  _id: string;
};

const KeySchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now() },
});

export default mongoose.models.Key ||
  mongoose.model<KeyDocument>("Key", KeySchema);
