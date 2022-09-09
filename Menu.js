const promptly = require("promptly");

module.exports = class Menu {
  static menuOption;

  static async askMenuOption() {
    const validator = function (value) {
      let list = [1, 2, 3];
      if (!list.includes(+value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };

    this.menuOption = await promptly.prompt(
      "\nVälj ett alternativ: \n 1. Starta Valkompassen 2. Min Historik 3. Avsluta Valkompassen \nVälj:",
      { validator }
    );

    return this.menuOption;
  }
};
