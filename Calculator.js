module.exports = class Calculator {
  static quizResult = [];

  static async checkResult(userAnswers, points, quizOptions) {
    let convertedAnswers = [];
    for (let answer of userAnswers) {
      for (let option of quizOptions) {
        if (answer == option.number) {
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

    await Calculator.getTotalPoints(allQuestionsPointsList);
  }

  static async getTotalPoints(allQuestionsPointsList) {
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
    await Calculator.calulatePercentage(totalPointsList);
  }

  static async calulatePercentage(totalPointsList) {
    Object.keys(totalPointsList).forEach((key) => {
      totalPointsList[key] = Math.round(totalPointsList[key] / 1.2);

      switch (key) {
        case "V":
          Calculator.quizResult.push(
            "Vänsterpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "S":
          Calculator.quizResult.push(
            "Socialdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "MP":
          Calculator.quizResult.push(
            "Miljöpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "C":
          Calculator.quizResult.push(
            "Centerpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "L":
          Calculator.quizResult.push(
            "Liberalerna: " + totalPointsList[key] + "%"
          );
          break;
        case "KD":
          Calculator.quizResult.push(
            "Kristdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "M":
          Calculator.quizResult.push(
            "Moderaterna: " + totalPointsList[key] + "%"
          );
          break;
        case "SD":
          Calculator.quizResult.push(
            "Sverigedemokraterna: " + totalPointsList[key] + "%"
          );
      }
    });

    Calculator.quizResult.sort((a, b) => b.slice(-3, -1) - a.slice(-3, -1));
    return Calculator.quizResult;
  }
};
