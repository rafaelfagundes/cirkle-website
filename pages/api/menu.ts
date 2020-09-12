import { NowRequest, NowResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import Menu from "../../src/types/Menu";
import { connectToDatabase } from "../../src/utils/mongo";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const menu: Menu = await db
    .collection("menu")
    .findOne(
      { _id: new ObjectId("5f5c0bc308537565d5ed8dd2") },
      { projection: { _id: 0 } }
    );
  return response.json(menu);
};
