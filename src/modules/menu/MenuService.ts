import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

class MenuService {
  async getMenu(): Promise<any> {
    const res = await axios.get(publicRuntimeConfig.API_ENDPOINT + "/menu");
    const data = await res.data;
    return data;
  }
}

export default MenuService;
