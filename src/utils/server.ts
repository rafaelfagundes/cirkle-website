import _ from "lodash";
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
    return result;
  } catch (error) {
    return null;
  }
}
