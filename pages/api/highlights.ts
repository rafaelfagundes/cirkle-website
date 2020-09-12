import { NowRequest, NowResponse } from "@vercel/node";
import { Db } from "mongodb";
import Highlight from "../../src/types/Highlight";
import { connectToDatabase } from "../../src/utils/mongo";

let cachedDb: Db = null;

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  if (!cachedDb) {
    cachedDb = await connectToDatabase(process.env.MONGO_DB_URI);
  }

  const highlights: Array<Highlight> = await cachedDb
    .collection("highlights")
    .find({}, { projection: { _id: 0 } })
    .toArray();

  return response.json(highlights);
};
