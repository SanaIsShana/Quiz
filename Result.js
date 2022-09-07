const fs = require("fs");
const path = require("path");

module.exports = class Result {
  results = [];
  totalPointsWithParty = { V: 0, S: 0, MP: 0, C: 0, L: 0, KD: 0, M: 0, SD: 0 };

  constructor(answers) {
    Object.assign(this, answers);
  }

  static async create(person, answers, points) {
    let instance = new Result(person, answers);
    await instance.checkResult(person, answers, points);
    return instance;
  }

  async checkResult(person, answers, points) {
    answers.forEach((x) => {
      switch (x) {
        case 1:
          this.results.push(2);
          break;
        case 2:
          this.results.push(1);
          break;
        case 3:
          this.results.push(-1);
          break;
        case 4:
          this.results.push(-2);
      }
    });

    for (let result of this.results) {
      for (let point of points) {
        for (let i = 0; i < 8; i++) {
          if (point(Object.keys(point)[i]) == result) {
            this.totalPointsWithParty.Object.keys(point)[i] += 1;
          }
        }
      }
    }

    this.storeResultToJson(person, this.totalPointsWithParty);
  }

  storeResultToJson(person, totalPointsWithParty) {
    let filePath = path.join(__dirname, "resultData.json");
    const rawData = { name: person, choices: totalPointsWithParty };
    let dataAsJson = JSON.stringify(rawData);
    fs.writeFileSync(filePath, dataAsJson, "utf-8");
  }
};
