import mongoose from "mongoose";

export type TransactionDocument = mongoose.Document & {
  createdAt: Date;
  tid: string;
  type: string;
  amount: number;
  sender_id: string;
  recipient: string;
  _id: string;
};

const TransactionSchema = new mongoose.Schema({
  sender_id: { type: String, required: true },
  recipient: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  tid: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now() },
});

export default mongoose.models.Transaction ||
  mongoose.model<TransactionDocument>("Transaction", TransactionSchema);
