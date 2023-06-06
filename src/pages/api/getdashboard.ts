import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const id = req.headers.id as string;
        if (!id) {
          return res.status(400).json({ error: "Missing id" });
        }
        const transactions = await Transaction.find({ sender_id: id });
        const recieved = await Transaction.find({ recipient: id });
        const all = [...transactions, ...recieved];
        all.sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
        let total = 0;
        const depositCount = transactions.filter(
          (t) => t.type === "deposit"
        ).length;
        const withdrawCount = transactions.filter(
          (t) => t.type === "withdraw"
        ).length;
        const payoutCount = transactions.filter(
          (t) => t.type === "payment"
        ).length;
        total = depositCount + withdrawCount + payoutCount;
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ error: "User not found" });
        }
        return res
          .status(200)
          .json({
            transactions: all,
            user,
            total,
            depositCount,
            paymentCount: payoutCount,
          });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
