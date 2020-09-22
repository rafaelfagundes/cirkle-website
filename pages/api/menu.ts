import { NowRequest, NowResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import Menu from "../../src/modules/menu/Menu";
import { connectToDatabase } from "../../src/utils/mongo";
import { allowedHosts, allowedMethods } from "../../src/utils/server";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  if (!allowedHosts(request.headers.host)) {
    return response.status(500).json({ message: "Host Not Allowed" });
  }
  if (!allowedMethods(request.method, ["GET"])) {
    return response.status(500).json({ message: "Method Not Allowed" });
  }
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const menu: Menu = await db
    .collection("menu")
    .findOne(
      { _id: new ObjectId("5f5c0bc308537565d5ed8dd2") },
      { projection: { _id: 0 } }
    );
  return response.json(menu);
};
