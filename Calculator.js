module.exports = class Calculator {
  constructor() {
    this.quizResult = [];
  }
  static async create(answers, points) {
    let instance = new Calculator();
    await instance.checkResult(answers, points);
    return instance;
  }

  async checkResult(answers, points) {
    let convertedAnswers = [];
    for (let answer of answers) {
      switch (answer) {
        case "1":
          convertedAnswers.push(2);
          break;
        case "2":
          convertedAnswers.push(1);
          break;
        case "3":
          convertedAnswers.push(-1);
          break;
        case "4":
          convertedAnswers.push(-2);
      }
    }
    let distanceWithParty = {};
    let listWithEachPoints = [];

    for (let point of points) {
      distanceWithParty = {};
      for (const [key, value] of Object.entries(point.points)) {
        let i = points.indexOf(point);
        distanceWithParty[key] = 4 - Math.abs(value - convertedAnswers[i]);
      }
      listWithEachPoints.push(distanceWithParty);
    }
    await this.convertResult(listWithEachPoints);
  }

  async convertResult(listWithEachPoints) {
    let allPartyPoint = { V: 0, S: 0, MP: 0, C: 0, L: 0, KD: 0, M: 0, SD: 0 };

    for (const [key, value] of Object.entries(listWithEachPoints)) {
      Object.keys(allPartyPoint).forEach((keyOfAllPartyPoint) => {
        allPartyPoint[keyOfAllPartyPoint] += value[keyOfAllPartyPoint];
      });
    }

    Object.keys(allPartyPoint).forEach((key) => {
      allPartyPoint[key] = Math.round(allPartyPoint[key] / 1.2);
      switch (key) {
        case "V":
          this.quizResult.push("Vänsterpartiet: " + allPartyPoint[key] + "%");
          break;
        case "S":
          this.quizResult.push(
            "Socialdemokraterna: " + allPartyPoint[key] + "%"
          );
          break;
        case "MP":
          this.quizResult.push("Miljöpartiet: " + allPartyPoint[key] + "%");
          break;
        case "C":
          this.quizResult.push("Centerpartiet: " + allPartyPoint[key] + "%");
          break;
        case "L":
          this.quizResult.push("Liberalerna: " + allPartyPoint[key] + "%");
          break;
        case "KD":
          this.quizResult.push(
            "Kristdemokraterna: " + allPartyPoint[key] + "%"
          );
          break;
        case "M":
          this.quizResult.push("Moderaterna: " + allPartyPoint[key] + "%");
          break;
        case "SD":
          this.quizResult.push(
            "Sverigedemokraterna: " + allPartyPoint[key] + "%"
          );
      }
    });
    await this.sortTheResult();
  }
  async sortTheResult() {
    this.quizResult.sort((a, b) => b.slice(-3, -1) - a.slice(-3, -1));
  }
};
