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
  if (!allowedMethods(request.method, ["GET", "POST", "PATCH"])) {
    return statusServerError(response);
  }

  switch (request.method) {
    case "POST":
      console.log("Salvar endereço");
      statusOK(response, request.body);
      break;
    case "GET":
      console.log("Recuperar endereço");
      statusOK(response, request.body);
      break;
    case "PATCH":
      console.log("Atualizar endereço");
      statusOK(response, request.body);
      break;
    default:
      return statusServerError(response);
  }
};
