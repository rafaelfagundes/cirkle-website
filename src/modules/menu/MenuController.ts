import MenuService from "./MenuService";

class MenuController {
  service: MenuService;

  constructor() {
    this.service = new MenuService();
  }

  async getMenu(): Promise<any> {
    return await this.service.getMenu();
  }
}

export default MenuController;
