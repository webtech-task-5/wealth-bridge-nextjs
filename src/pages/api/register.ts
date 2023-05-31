import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";
import { sendMail } from "@/utils/mail";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const { name, password, email } = req.body;
        const accountNumber = genarateBankId();
        if (!name || !password || !email) {
          return res.status(400).json({ error: "Missing name/password" });
        }
        // check if user already exists
        const isUser = await User.findOne({ email });
        if (isUser) {
          return res.status(400).json({ error: "User already exists" });
        }
        const user = await User.create({
          name,
          password,
          email,
          accountNumber,
        });
        const mail = {
          to: email,
          subject: "Welcome to Wealth Bridge",
          text: "Welcome to Wealth Bridge",
          html: `<h1>Welcome to Wealth Bridge</h1><p>Your account number is ${accountNumber}</p>`,
        };
        await sendMail(email, mail);
        res.status(200).json({ message: "User created successfully", user });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

function genarateBankId() {
  const res = "WB-" + Math.floor(100000 + Math.random() * 900000).toString();
  return res;
}
