const fs = require("fs");
const path = require("path");

module.exports = class Storage {
  quizResultData = [];
  dateAndTime;

  static async getDateAndTime() {
    let today = new Date();
    let minute = today.getMinutes();
    if (minute < 10) {
      minute = 0 + minute.toString();
    }
    this.dateAndTime =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "," +
      today.getHours() +
      ":" +
      minute;

    return this.dataAndTime;
  }

  static async storeResultToJson(person, result) {
    await this.getDateAndTime();
    let filePath = path.join(__dirname, "data-copy.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(jsonDataFromFile);

    let rawData = {
      name: person,
      time: this.dateAndTime,
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

  static async readJsonFile() {
    let filePath = path.join(__dirname, "data-copy.json");
    let jsonDataFromFile = fs.readFileSync(filePath, "utf-8");
    this.quizResultData = JSON.parse(jsonDataFromFile);
    return this.quizResultData;
  }
};
