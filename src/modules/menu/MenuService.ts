import axios from "axios";
import { isDev } from "../../utils/env";

class MenuService {
  async getMenu(): Promise<any> {
    const res = await axios.get(
      isDev() ? "http://localhost:3000/api/menu" : "/api/menu"
    );
    const data = await res.data;
    return data;
  }
}

export default MenuService;
