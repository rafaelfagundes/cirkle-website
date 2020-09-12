import axios from "axios";

class MenuService {
  async getMenu(): Promise<any> {
    const res = await axios.get(process.env.API_ENDPOINT + "/menu");
    const data = await res.data;
    return data;
  }
}

export default MenuService;
