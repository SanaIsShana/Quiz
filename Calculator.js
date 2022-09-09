module.exports = class Calculator {
  static answersInPercentage = [];

  static async checkResult(userAnswers, jsonData) {
    let convertedAnswers = [];
    let { options, questions } = jsonData;
    for (let answer of userAnswers) {
      for (let option of options) {
        if (answer == option.number) {
          convertedAnswers.push(option.value);
        }
      }
    }

    let oneQuestionPoints = {};
    let allQuestionsPointsList = [];

    let i = 0;
    for (let question of questions) {
      oneQuestionPoints = {};
      for (const [key, value] of Object.entries(question.points)) {
        oneQuestionPoints[key] = 4 - Math.abs(value - convertedAnswers[i]);
      }
      i++;
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
          Calculator.answersInPercentage.push(
            "Vänsterpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "S":
          Calculator.answersInPercentage.push(
            "Socialdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "MP":
          Calculator.answersInPercentage.push(
            "Miljöpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "C":
          Calculator.answersInPercentage.push(
            "Centerpartiet: " + totalPointsList[key] + "%"
          );
          break;
        case "L":
          Calculator.answersInPercentage.push(
            "Liberalerna: " + totalPointsList[key] + "%"
          );
          break;
        case "KD":
          Calculator.answersInPercentage.push(
            "Kristdemokraterna: " + totalPointsList[key] + "%"
          );
          break;
        case "M":
          Calculator.answersInPercentage.push(
            "Moderaterna: " + totalPointsList[key] + "%"
          );
          break;
        case "SD":
          Calculator.answersInPercentage.push(
            "Sverigedemokraterna: " + totalPointsList[key] + "%"
          );
      }
    });

    Calculator.answersInPercentage.sort(
      (a, b) => b.slice(-3, -1) - a.slice(-3, -1)
    );
    return Calculator.answersInPercentage;
  }
};
