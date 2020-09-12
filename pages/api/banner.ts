import { NowRequest, NowResponse } from "@vercel/node";
import { Db, ObjectId } from "mongodb";
import Banner from "../../src/types/Banner";
import { connectToDatabase } from "../../src/utils/mongo";

let cachedDb: Db = null;

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  if (!cachedDb) {
    cachedDb = await connectToDatabase(process.env.MONGO_DB_URI);
  }

  const banner: Banner = await cachedDb
    .collection("banner")
    .findOne(
      { _id: new ObjectId("5f5cf4c730015dcd82d114ba") },
      { projection: { _id: 0 } }
    );

  return response.json(banner);
};
