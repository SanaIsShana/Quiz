const promptly = require("promptly");

module.exports = class Menu {
  constructor(menuOption) {
    this.menuOption = menuOption;
  }
  static async create(menuOption) {
    let instance = new Menu();
    await instance.showMenu(menuOption);
    return instance;
  }

  async showMenu() {
    this.menuOption = await promptly.prompt(
      "Välj ett alternativ att fortsätta quizzet: \n 1. Ny Quiz 2. Min Historik \nVälj:"
    );
    return this.menuOption;
  }
};
