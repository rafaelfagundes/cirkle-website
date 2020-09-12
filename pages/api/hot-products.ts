import { NowRequest, NowResponse } from "@vercel/node";
import Product from "../../src/types/Product";
import { closeConnection, connectToDatabase } from "../../src/utils/mongo";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const hotProducts: Array<Product> = await db
    .collection("products")
    .find({ enabled: true })
    .sort({ viewCount: -1 })
    .limit(8)
    .toArray();

  closeConnection();

  return response.json(hotProducts);
};
