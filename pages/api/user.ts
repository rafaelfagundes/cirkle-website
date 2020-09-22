import { NowRequest, NowResponse } from "@vercel/node";
import User from "../../src/modules/user/User";
import UserController from "../../src/modules/user/user.controller";
import { connectToDatabase } from "../../src/utils/mongo";
import {
  allowedHosts,
  allowedMethods,
  statusForbidden,
  statusNotFound,
  statusOK,
  statusServerError,
} from "../../src/utils/server";

// async function createUser(
//   user: firebaseAdmin.auth.DecodedIdToken,
//   response: NowResponse
// ) {
//   const db = await connectToDatabase(process.env.MONGO_DB_URI);

//   if (!user) {
//     return response.status(500).json("Invalid user");
//   } else {
//     const { email, email_verified, phone_number, picture, uid } = user;
//     const result = await db.collection("users").insertOne({
//       name: user.name || user.displayName,
//       email,
//       email_verified,
//       phone_number,
//       picture,
//       uid,
//       created_at: Date.now(),
//     });

//     if (result.result.ok) {
//       const databaseUser = await db
//         .collection("users")
//         .findOne({ uid: user.uid });
//       return response.status(200).json({ user: databaseUser });
//     } else {
//       return response.status(500).json("Cannot create user");
//     }
//   }
// }

async function createUser(user: User, token: string, response: NowResponse) {
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

async function updateUser(user: User, response: NowResponse) {
  console.log("updateUser -> user", user);
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  if (!user) {
    return response.status(500).json("Invalid user");
  } else {
    const result = await db.collection("users").updateOne(
      { uid: user.uid },
      {
        $set: {
          name: user.name,
          phone_number: user.phone_number,
          email: user.email,
          picture: user.picture,
        },
      }
    );
    if (result.result.ok) {
      return response.status(200).json({ user });
    } else {
      return response.status(404).json({ message: "User not found" });
    }
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
      await updateUser(request.body.user, response);
      break;
    default:
      return response.status(500).json({ message: "Fatal Error" });
  }
};
