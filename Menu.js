const promptly = require("promptly");

module.exports = class Menu {
  static menuOption;
  static personName;

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

   static async askName() {
    const validator = function (value) {
      let regex = new RegExp("^^[a-zA-ZäöåÄÖÅ]+$");
      if (!regex.test(value)) {
        throw new Error("Fel inmatning!");
      }

      return value;
    };

    const firstName = await promptly.prompt("Förnamn?", { validator });
    const lastName = await promptly.prompt("Efternamn?", { validator });

    console.clear();

    this.personName = firstName + " " + lastName;
  }
};
