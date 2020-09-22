import { NowRequest, NowResponse } from "@vercel/node";
import Highlight from "../../src/modules/highlight/Highlight";
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

  const highlights: Array<Highlight> = await db
    .collection("highlights")
    .find({}, { projection: { _id: 0 } })
    .toArray();

  return response.json(highlights);
};
