import { NowRequest, NowResponse } from "@vercel/node";
import { Db } from "mongodb";
import Product from "../../src/types/Product";
import { connectToDatabase } from "../../src/utils/mongo";

let cachedDb: Db = null;

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  if (!cachedDb) {
    cachedDb = await connectToDatabase(process.env.MONGO_DB_URI);
  }

  const hotProducts: Array<Product> = await cachedDb
    .collection("products")
    .find({ enabled: true })
    .sort({ viewCount: -1 })
    .limit(8)
    .toArray();
  return response.json(hotProducts);
};
