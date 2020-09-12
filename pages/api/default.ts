import { NowRequest, NowResponse } from "@vercel/node";

export default (request: NowRequest, response: NowResponse): NowResponse => {
  return response.json({ message: "OK" });
};
