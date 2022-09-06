const fs = require("fs");
const path = require("path");

module.exports = class Result {
  results = [];
  constructor(answers) {
    Object.assign(this, answers);
  }

  static async create(person, answers) {
    let instance = new Result(person, answers);
    await instance.checkResult(person, answers);
    return instance;
  }

  async checkResult(person, answers) {
    this.storeResultToJson(person, answers);
  }

  storeResultToJson(person, answers) {
    let filePath = path.join(__dirname, "resultData.json");
    this.results.push({ name: person, choices: answers });
    let dataAsJson = JSON.stringify(this.results);
    fs.writeFileSync(filePath, dataAsJson, "utf-8");
  }
};
