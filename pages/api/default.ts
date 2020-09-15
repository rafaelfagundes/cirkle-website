import { NowRequest, NowResponse } from "@vercel/node";
import { allowedHosts, allowedMethods } from "../../src/utils/server";

export default (request: NowRequest, response: NowResponse): NowResponse => {
  if (!allowedHosts(request.headers.host)) {
    return response.status(500).json({ message: "Host Not Allowed" });
  }
  if (!allowedMethods(request.method, ["GET"])) {
    return response.status(500).json({ message: "Method Not Allowed" });
  }
  return response.json({ endpoint: process.env.API_ENDPOINT });
};
