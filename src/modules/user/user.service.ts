import { connectToDatabase } from "../../utils/mongo";
import User from "./User";

class UserService {
  async get(uid: string): Promise<User> {
    const db = await connectToDatabase(process.env.MONGO_DB_URI);
    const user: User = await db.collection("users").findOne({ uid });
    return user;
  }

  async create(user: User): Promise<User> {
    const db = await connectToDatabase(process.env.MONGO_DB_URI);

    const { name, email, isEmailVerified, picture, phoneNumber, uid } = user;
    const result = await db.collection("users").insertOne({
      name,
      email,
      isEmailVerified,
      phoneNumber,
      picture,
      uid,
      created_at: Date.now(),
    });

    if (result.result.ok) {
      return result.ops[0];
    } else {
      return null;
    }
  }
}

export default UserService;
