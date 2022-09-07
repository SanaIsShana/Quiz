const promptly = require("promptly");

module.exports = class Menu {
  menuOption;
  constructor() {}
  static async create() {
    let instance = new Menu();
    await instance.showMenu();
    return instance;
  }

  async showMenu() {
    this.menuOption = await promptly.prompt(
      "Välj ett alternativ att fortsätta quizzet: \n 1. Ny Quiz 2. Min Historik \nVälj:"
    );
  }
};
