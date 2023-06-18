import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Key from "@/models/Key";
import { parse } from "path";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const { sellerId, amount, bankAccountNumber, apiKey } = req.body;
        console.log(req.body);
        if (!bankAccountNumber || !apiKey) {
          return res
            .status(400)
            .json({ error: "Missing bankAccountNumber/apiKey" });
        }
        let bankAccount = (await User.findOne({
          accountNumber: bankAccountNumber,
        })) as any;
        let sellerUser = await User.findOne({
          accountNumber: sellerId,
        });
        console.log(sellerUser);
        bankAccount.wallet = sellerUser.wallet + parseInt(amount);

        await bankAccount.save();
        await Transaction.create({
          sender_id: bankAccount._id,
          recipient: "-",
          amount: parseInt(amount),
          type: "deposit",
          tid: "TX-" + Date.now(),
        });
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
