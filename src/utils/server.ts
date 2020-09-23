import { NowResponse } from "@vercel/node";
import _ from "lodash";
import moment from "moment";
import firebaseAdmin from "../config/firebaseAdmin";

let ALLOWED_HOSTS: Array<string>;
if (process.env.NODE_ENV === "development") {
  ALLOWED_HOSTS = ["localhost"];
  console.log("Servidor de desenvolvimento");
} else if (process.env.NODE_ENV === "test") {
  ALLOWED_HOSTS = ["localhost", "cirkle.com.br"];
} else if (process.env.NODE_ENV === "production") {
  ALLOWED_HOSTS = ["cirkle.com.br"];
}
export function allowedHosts(host: string): boolean {
  const result = _.findIndex(ALLOWED_HOSTS, function (o) {
    return host.includes(o);
  });

  if (result >= 0) {
    return true;
  } else {
    return false;
  }
}

export function allowedMethods(
  method: string,
  allowedMethodsList: Array<string>
): boolean {
  if (allowedMethodsList.includes(method)) return true;
  return false;
}

export async function verifyToken(
  token: string
): Promise<firebaseAdmin.auth.DecodedIdToken> {
  try {
    const result: firebaseAdmin.auth.DecodedIdToken = await firebaseAdmin
      .auth()
      .verifyIdToken(token);
    if (result.aud === "cirklebr") {
      console.log(
        "Token expira em:",
        moment(result.exp * 1000).toLocaleString()
      );
      return result;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export function statusOK(
  response: NowResponse,
  data: Record<any, any>
): NowResponse {
  return response.status(200).json({ data });
}

export function statusForbidden(response: NowResponse): NowResponse {
  return response.status(403).json({ message: "Forbidden" });
}

export function statusNotFound(response: NowResponse): NowResponse {
  return response.status(404).json({ message: "Not found" });
}

export function statusServerError(response: NowResponse): NowResponse {
  return response.status(500).json({ message: "Internal server error" });
}

export function statusBadRequest(response: NowResponse): NowResponse {
  return response.status(400).json({ message: "Bad Request" });
}
