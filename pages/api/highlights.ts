import { NowRequest, NowResponse } from "@vercel/node";
import Highlight from "../../src/types/Highlight";
import { closeConnection, connectToDatabase } from "../../src/utils/mongo";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const highlights: Array<Highlight> = await db
    .collection("highlights")
    .find({}, { projection: { _id: 0 } })
    .toArray();

  closeConnection();
  return response.json(highlights);
};
