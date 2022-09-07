const fs = require("fs");
const path = require("path");

module.exports = class History {
  //should be able to get the persons all result
  constructor() {}
  static async create() {
    let instance = new History();
    await instance.showMenu();
    return instance;
  }

  async showMenu() {
    this.menuOption = await promptly.prompt(
      "Välj ett alternativ att fortsätta quizzet: \n 1. Ny Quiz 2. Min Historik \nVälj:"
    );
  }
};
