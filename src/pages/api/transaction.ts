import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import Key from "@/models/User";
import User from "@/models/User";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        let { id, amount, type } = req.body;
        console.log(req.body);
        amount = parseInt(amount);

        if (!id || !amount || !type) {
          return res.status(400).json({ error: "Missing ID / Amount / Type" });
        }
        const user = (await User.findById(id)) as any;
        console.log(user);
        if (!user) {
          return res.status(400).json({ error: "User not found" });
        }

        if (type === "deposit") {
          if (amount < 0)
            return res.status(400).json({ error: "Invalid amount" });
          //  add transaction also
          const newUser = await User.findByIdAndUpdate(
            id,
            {
              wallet: parseInt(user.wallet + amount),
            },
            {
              new: true,
            }
          );
          return res
            .status(200)
            .json({ message: "Amount Added Successfully..." });
        } else if (type === "withdraw") {
          if (amount < 0)
            return res.status(400).json({ error: "Invalid amount" });
          if (user.wallet < amount)
            return res.status(400).json({ error: "Insufficient Balance" });
          //  add transaction also
          const newUser = await User.findByIdAndUpdate(
            id,
            {
              wallet: user.wallet - amount,
            },
            {
              new: true,
            }
          );
          return res
            .status(200)
            .json({ message: "Amount Withdrawn Successfully..." });
        } else {
          return res.status(400).json({ error: "Invalid type" });
        }
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      break;
    case "GET":
      try {
        const id = req.headers.id as string;
        if (!id) {
          return res.status(400).json({ error: "Missing id" });
        }
        const data = await Key.find({ id });

        res
          .status(200)
          .json({ keys: data, message: "Key fetched successfully" });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
