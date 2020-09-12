import { NowRequest, NowResponse } from "@vercel/node";
import { Db, ObjectId } from "mongodb";
import Menu from "../../src/types/Menu";
import { connectToDatabase } from "../../src/utils/mongo";

let cachedDb: Db = null;

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  if (!cachedDb) {
    cachedDb = await connectToDatabase(process.env.MONGO_DB_URI);
  }

  const menu: Menu = await cachedDb
    .collection("menu")
    .findOne(
      { _id: new ObjectId("5f5c0bc308537565d5ed8dd2") },
      { projection: { _id: 0 } }
    );

  return response.json(menu);
};
