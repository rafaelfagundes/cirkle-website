import { NowRequest, NowResponse } from "@vercel/node";
import { Db } from "mongodb";
import Brand from "../../src/types/Brand";
import { connectToDatabase } from "../../src/utils/mongo";

let cachedDb: Db = null;

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  if (!cachedDb) {
    cachedDb = await connectToDatabase(process.env.MONGO_DB_URI);
  }

  const brands: Array<Brand> = await cachedDb
    .collection("brands")
    .find({ enabled: true }, { projection: { _id: 0 } })
    .toArray();

  return response.json(brands);
};
