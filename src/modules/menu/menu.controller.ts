import MenuService from "./menu.service";

class MenuController {
  service: MenuService;

  constructor() {
    this.service = new MenuService();
  }

  async getMenu(): Promise<string> {
    return await this.service.getMenu();
  }
}

export default MenuController;
