import { NowRequest, NowResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import Banner from "../../src/types/Banner";
import { closeConnection, connectToDatabase } from "../../src/utils/mongo";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const banner: Banner = await db
    .collection("banner")
    .findOne(
      { _id: new ObjectId("5f5cf4c730015dcd82d114ba") },
      { projection: { _id: 0 } }
    );

  closeConnection();

  return response.json(banner);
};
