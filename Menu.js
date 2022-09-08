const promptly = require("promptly");

module.exports = class Menu {
  //this can be static as well probebly
  constructor(menuOption) {
    this.menuOption = menuOption;
  }
  static async start() {
    let instance = new Menu();
    await instance.getMenu();
    return instance;
  }

  async getMenu() {
    const validator = function (value) {
      let list = [1, 2, 3];
      if (!list.includes(+value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };
    this.menuOption = await promptly.prompt(
      "Välj ett alternativ: \n 1. Ny Quiz 2. Min Historik 3.Avsluta Quizzet \nVälj:",
      { validator }
    );
    return this.menuOption;
  }
};
