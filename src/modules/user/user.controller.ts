import { verifyToken } from "../../utils/server";
import User from "./User";
import UserService from "./user.service";

class UserController {
  async get(token: string): Promise<User> {
    const service = new UserService();
    const user = await verifyToken(token);
    if (user) return await service.get(user.uid);
    else return null;
  }
  async create(user: User, token?: string): Promise<User> {
    const tokenUser = await verifyToken(token);

    if (!tokenUser) return null;
    if (tokenUser.uid !== user.uid) return null;

    const service = new UserService();
    return await service.create(user);
  }

  async update(user: User, token?: string): Promise<User> {
    const tokenUser = await verifyToken(token);

    if (!tokenUser) return null;
    if (tokenUser.uid !== user.uid) return null;

    const service = new UserService();
    return await service.update(user);
  }
}

export default UserController;
