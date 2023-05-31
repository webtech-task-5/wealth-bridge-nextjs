import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnect";
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
        const { id, name } = req.body;
        if (!id || !name) {
          return res.status(400).json({ error: "Missing id / Name" });
        }
        const apiKey = new Key({ id, name });
        await apiKey.save();
        res.status(200).json({ message: "Key created successfully" });
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
