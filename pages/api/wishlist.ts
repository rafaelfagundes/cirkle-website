import { NowRequest, NowResponse } from "@vercel/node";
import Wishlist from "../../src/types/Wishlist";
import { connectToDatabase } from "../../src/utils/mongo";
import { allowedHosts, allowedMethods } from "../../src/utils/server";

const updateWishlist = async (wishlist: Wishlist, response: NowResponse) => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  const { items, userId } = wishlist;
  const result = await db
    .collection("wishlists")
    .updateOne(
      { userId: wishlist.userId },
      { $set: { items, userId } },
      { upsert: true }
    );

  if (result.result.ok) {
    const databaseWishlist = await db
      .collection("wishlists")
      .findOne({ userId: wishlist.userId });
    return response.status(200).json({ wishlist: databaseWishlist });
  } else {
    return response.status(500).json("Cannot create or update wishlist");
  }
};

const getWishlist = async (id: string, response: NowResponse) => {
  const db = await connectToDatabase(process.env.MONGO_DB_URI);

  if (!id) {
    return response.status(500).json("Invalid ID");
  } else {
    const databaseWishlist: Wishlist = await db
      .collection("wishlists")
      .findOne({ userId: id });
    if (databaseWishlist) {
      return response.status(200).json({ wishlist: databaseWishlist });
    } else {
      return response.status(404).json({ message: "Wishlist not found" });
    }
  }
};

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

  console.log("request.method", request.method);
  switch (request.method) {
    case "POST":
      await updateWishlist(request.body.wishlist, response);
      break;
    case "GET":
      console.log("request", request.query);
      await getWishlist(request.query["userId"].toString(), response);
      break;
    default:
      return response.status(500).json({ message: "Fatal Error" });
  }
};
