import { NowRequest, NowResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import Shipping from "../../src/types/Shipping";
import { connectToDatabase } from "../../src/utils/mongo";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const shipping: Shipping = await db
    .collection("shipping")
    .findOne(
      { _id: new ObjectId("5f5d0b07d709632c56ee9067") },
      { projection: { _id: 0 } }
    );

  return response.json(shipping);
};
