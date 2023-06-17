import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Key from "@/models/Key";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const { bankAccountNumber, apiKey, total, seller } = req.body;
        console.log(req.body);
        if (!bankAccountNumber || !apiKey) {
          return res
            .status(400)
            .json({ error: "Missing bankAccountNumber/apiKey" });
        }
        const bankAccount = (await User.findOne({
          accountNumber: bankAccountNumber,
        })) as any;
        const api = await Key.findById(apiKey);
        if (!bankAccount) {
          return res.status(400).json({ error: "bankAccount not found" });
        }
        if (!api) {
          return res.status(400).json({ error: "Api not found" });
        }
        if (bankAccount.wallet < total)
          return res.status(400).json({ error: "Insufficient Balance" });
        for (let i = 0; i < seller.length; i++) {
          const sellerUser = await User.findOne({
            accountNumber: seller[i].sellerId,
          });
          console.log(seller);
          await Transaction.create({
            sender_id: bankAccount._id,
            recipient: sellerUser._id,
            amount: seller[i].amount,
            type: "payment",
            tid: "TX-" + Date.now(),
          });
        }
        bankAccount.wallet = bankAccount.wallet - parseInt(total);
        await bankAccount.save();

        return res.status(200).json({ message: "Order Successfully..." });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
