import { NowRequest, NowResponse } from "@vercel/node";
import Brand from "../../src/types/Brand";
import { connectToDatabase } from "../../src/utils/mongo";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const brands: Array<Brand> = await db
    .collection("brands")
    .find({ enabled: true }, { projection: { _id: 0 } })
    .toArray();

  return response.json(brands);
};
