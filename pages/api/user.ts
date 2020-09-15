import { NowRequest, NowResponse } from "@vercel/node";
import firebaseAdmin from "../../src/config/firebaseAdmin";
import User from "../../src/types/User";
import { connectToDatabase } from "../../src/utils/mongo";
import {
  allowedHosts,
  allowedMethods,
  verifyToken,
} from "../../src/utils/server";

async function createUser(
  user: firebaseAdmin.auth.DecodedIdToken,
  response: NowResponse
) {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  if (!user) {
    return response.status(500).json("Invalid user");
  } else {
    const { email, email_verified, phone_number, picture, uid, name } = user;
    const result = await db.collection("users").insertOne({
      name,
      email,
      email_verified,
      phone_number,
      picture,
      uid,
      created_at: Date.now(),
    });

    if (result.result.ok) {
      const databaseUser = await db
        .collection("users")
        .findOne({ uid: user.uid });
      return response.status(200).json({ user: databaseUser });
    } else {
      return response.status(500).json("Cannot create user");
    }
  }
}

async function getUser(
  user: firebaseAdmin.auth.DecodedIdToken,
  response: NowResponse
) {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  if (!user) {
    return response.status(500).json("Invalid user");
  } else {
    const databaseUser: User = await db
      .collection("users")
      .findOne({ uid: user.uid });
    if (databaseUser) {
      return response.status(200).json({ user: databaseUser });
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
  if (!allowedMethods(request.method, ["GET", "POST"])) {
    return response.status(500).json({ message: "Method Not Allowed" });
  }

  switch (request.method) {
    case "POST":
      await createUser(await verifyToken(request.body.idToken), response);
      break;
    case "GET":
      await getUser(
        await verifyToken(request.query["idToken"].toString()),
        response
      );
      break;
    default:
      return response.status(500).json({ message: "Fatal Error" });
  }
};
