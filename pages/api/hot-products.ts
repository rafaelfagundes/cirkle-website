import { NowRequest, NowResponse } from "@vercel/node";
import Product from "../../src/modules/product/Product";
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

  const hotProducts: Array<Product> = await db
    .collection("products")
    .find({ enabled: true })
    .sort({ viewCount: -1 })
    .limit(8)
    .toArray();

  return response.json(hotProducts);
};
