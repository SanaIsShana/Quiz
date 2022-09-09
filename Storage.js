const fs = require("fs");
const path = require("path");

module.exports = class Storage {
  static dataFromJson;

  static async storeResultToJson(result) {
    let filePath = path.join(__dirname, "data.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(jsonDataFromFile);

    let rawData = result;

    if (data.hasOwnProperty("results")) {
      data.results.push(rawData);
    } else {
      data.results = [];
      data.results.push(rawData);
    }
    let dataAsJson = JSON.stringify(data);
    fs.writeFileSync(filePath, dataAsJson, "utf-8");
  }

  static async readJsonFile() {
    let filePath = path.join(__dirname, "data.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    this.dataFromJson = JSON.parse(jsonDataFromFile);
    return this.dataFromJson;
  }
};
