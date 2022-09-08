const fs = require("fs");
const path = require("path");

module.exports = class Storage {
  constructor() {
    this.quizResultData = [];
  }

  static async storeResultToJson(person, result) {
    let today = new Date();
    let dateAndTime =
      today.toLocaleDateString() + " " + today.toLocaleTimeString();
    let filePath = path.join(__dirname, "data-copy.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(jsonDataFromFile);

    let rawData = {
      name: person,
      time: dateAndTime,
      match: result,
    };

    if (data.hasOwnProperty("results")) {
      data.results.push(rawData);
    } else {
      data.results = [];
      data.results.push(rawData);
    }
    let dataAsJson = JSON.stringify(data);
    fs.writeFileSync(filePath, dataAsJson, "utf-8");
  }
};
