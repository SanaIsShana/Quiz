module.exports = class Calculator {
  constructor() {
    this.quizResult = [];
  }

  static async create(userAnswers, points, quizOptions) {
    let instance = new Calculator();
    await instance.checkResult(userAnswers, points, quizOptions);
    return instance;
  }

  async checkResult(userAnswers, points, quizOptions) {
    let convertedAnswers = [];
    for (let answer of userAnswers) {
      for (let option of quizOptions) {
        if ((answer = option.number)) {
          convertedAnswers.push(option.value);
        }
      }
    }

    let oneQuestionPoints = {};
    let allQuestionsPointsList = [];

    for (let point of points) {
      oneQuestionPoints = {};
      for (const [key, value] of Object.entries(point.points)) {
        let i = points.indexOf(point);
        oneQuestionPoints[key] = 4 - Math.abs(value - convertedAnswers[i]);
      }
      allQuestionsPointsList.push(oneQuestionPoints);
    }
    await this.getTotalPoints(allQuestionsPointsList);
  }

  async getTotalPoints(allQuestionsPointsList) {
    let totalPointsList = {
      V: 0,
      S: 0,
      MP: 0,
      C: 0,
      L: 0,
      KD: 0,
      M: 0,
      SD: 0,
    };

    for (const [key, value] of Object.entries(allQuestionsPointsList)) {
      Object.keys(totalPointsList).forEach((keyTotalPoints) => {
        totalPointsList[keyTotalPoints] += value[keyTotalPoints];
      });
    }

    await this.calulatePercentage(totalPointsList);
  }

  async calulatePercentage(totalPointsList) {
    Object.keys(totalPointsList).forEach((key) => {
      totalPointsList[key] = Math.round(totalPointsList[key] / 1.2);

      switch (key) {
        case "V":
          this.quizResult.push("Vänsterpartiet: " + totalPointsList[key] + "%");
          break;
        case "S":
          this.quizResult.push(
            "Socialdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "MP":
          this.quizResult.push("Miljöpartiet: " + totalPointsList[key] + "%");
          break;
        case "C":
          this.quizResult.push("Centerpartiet: " + totalPointsList[key] + "%");
          break;
        case "L":
          this.quizResult.push("Liberalerna: " + totalPointsList[key] + "%");
          break;
        case "KD":
          this.quizResult.push(
            "Kristdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "M":
          this.quizResult.push("Moderaterna: " + totalPointsList[key] + "%");
          break;
        case "SD":
          this.quizResult.push(
            "Sverigedemokraterna: " + totalPointsList[key] + "%"
          );
      }
    });
    await this.sortTheResult();
  }

  async sortTheResult() {
    this.quizResult.sort((a, b) => b.slice(-3, -1) - a.slice(-3, -1));
    return this.quizResult;
  }
};
