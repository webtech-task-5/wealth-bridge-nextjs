import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
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
        const data = (await User.findById(id)) as any;
        if (!data) {
          return res.status(400).json({ error: "User not found" });
        }
        let dataToSend = {
          wallet: data.wallet,
          accountNumber: data.accountNumber,
        };

        res
          .status(200)
          .json({ data: dataToSend, message: "Key fetched successfully" });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
