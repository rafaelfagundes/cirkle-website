import { NowRequest, NowResponse } from "@vercel/node";

export default (request: NowRequest, response: NowResponse): NowResponse => {
  return response.json({ endpoint: process.env.API_ENDPOINT });
};
