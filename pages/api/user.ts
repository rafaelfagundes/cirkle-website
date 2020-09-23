import { NowRequest, NowResponse } from "@vercel/node";
import User, { LoginType } from "../../src/modules/user/User";
import UserController from "../../src/modules/user/user.controller";
import {
  allowedHosts,
  allowedMethods,
  statusBadRequest,
  statusForbidden,
  statusNotFound,
  statusOK,
  statusServerError,
} from "../../src/utils/server";
import { validateEmail } from "../../src/utils/string";

const checkUser = (user: User) => {
  // First and Lastname
  const splitedFullName: Array<string> = user.name.split(" ");
  if (user.name === "" || user.name === null || user.name === undefined) {
    return false;
  } else if (splitedFullName.length < 2) {
    return false;
  } else if (splitedFullName.length > 2) {
    return false;
  }

  // Phone Number
  if (user.phoneNumber === "(  )      -    ") {
    return false;
  }

  // Email
  if (user.email === "" || user.email === null || user.email === undefined) {
    return false;
  } else if (!validateEmail(user.email)) {
    return false;
  }

  // Login Type
  if (
    user.loginType !== LoginType.EMAIL_PASSWORD &&
    user.loginType !== LoginType.FACEBOOK &&
    user.loginType !== LoginType.GOOGLE
  ) {
    return false;
  }

  return true;
};

async function createUser(user: User, token: string, response: NowResponse) {
  if (!checkUser(user)) return statusBadRequest(response);
  if (!token) return statusForbidden(response);
  const controller = new UserController();
  const data = await controller.create(user, token);
  if (data) {
    return statusOK(response, data);
  } else {
    return statusServerError(response);
  }
}

async function getUser(token: string, response: NowResponse) {
  if (!token) return statusForbidden(response);
  const controller = new UserController();
  const data = await controller.get(token);
  if (data) {
    return statusOK(response, data);
  } else {
    return statusNotFound(response);
  }
}

async function updateUser(user: User, token: string, response: NowResponse) {
  if (!checkUser(user)) return statusBadRequest(response);

  if (!token) return statusForbidden(response);
  const controller = new UserController();
  const data = await controller.update(user, token);
  if (data) {
    return statusOK(response, data);
  } else {
    return statusServerError(response);
  }
}

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<NowResponse> => {
  if (!allowedHosts(request.headers.host)) {
    return response.status(500).json({ message: "Host Not Allowed" });
  }
  if (!allowedMethods(request.method, ["GET", "POST", "PATCH"])) {
    return response.status(500).json({ message: "Method Not Allowed" });
  }

  switch (request.method) {
    case "POST":
      await createUser(request.body.user, request.body.token, response);
      break;
    case "GET":
      await getUser(request.query["idToken"].toString(), response);
      break;
    case "PATCH":
      await updateUser(request.body.user, request.body.token, response);
      break;
    default:
      return response.status(500).json({ message: "Fatal Error" });
  }
};
