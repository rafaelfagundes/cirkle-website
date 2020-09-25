import { NowRequest, NowResponse } from "@vercel/node";
import {
  allowedHosts,
  allowedMethods,
  statusOK,
  statusServerError,
} from "../../src/utils/server";

export default (request: NowRequest, response: NowResponse): NowResponse => {
  if (!allowedHosts(request.headers.host)) {
    return statusServerError(response);
  }
  if (!allowedMethods(request.method, ["GET"])) {
    return statusServerError(response);
  }
  return statusOK(response, { message: "OK" });
};
