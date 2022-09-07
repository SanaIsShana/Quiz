const fs = require("fs");
const path = require("path");

module.exports = class History {
  //should be able to get the persons all result
  constructor() {}
  static async create() {
    let instance = new Menu();
    await instance.showMenu();
    return instance;
  }
  // function readJsonFile(filename) {
  //   let filePath = path.join(__dirname, filename);
  //   let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
  //   let data = JSON.parse(jsonDataFromFile);
  //   return data;
  // }

  // // let someData = [{ name: "Kalle" }, { name: "Olle" }];
  // // storeAsJsonFile("myData.json", someData);
  // let someDataFromFile = readJsonFile("myData.json");
  // console.log(someDataFromFile[1].name);

  async showMenu() {
    this.menuOption = await promptly.prompt(
      "Välj ett alternativ att fortsätta quizzet: \n 1. Ny Quiz 2. Min Historik \nVälj:"
    );
  }
};
