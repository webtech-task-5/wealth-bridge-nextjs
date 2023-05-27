import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const { password, email } = req.body;
        if (!password || !email) {
          return res.status(400).json({ error: "Missing name/password" });
        }
        const isUser = await User.findOne({ email });
        if (!isUser || isUser.password !== password) {
          return res.status(400).json({ error: "Wrong Email or Password" });
        }
        const sectetKey = process.env.JWT_SECRET as string;
        const token = jwt.sign({ id: isUser._id }, sectetKey, {
          expiresIn: "1d",
        });
        res.status(200).json({ message: "User created successfully" });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
